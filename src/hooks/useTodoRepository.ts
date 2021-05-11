import { useEffect, useReducer, useContext, useState } from "react";
import { List } from "immutable";
import Todo, {
  findTodoDeadline,
  findTodoProj,
  UNCATEGORISED_TODO_PROJID,
} from "../models/Todo";
import { getTimeLeft } from "../util/timer";
import { ProjContext, SettingsContext } from "../state/context";
import Project from "../models/Project";
import Deadline from "../models/Deadline";

export type TodoRepoAction =
  | TodoAsyncStorageAction
  | TodoCRUDAction
  | TodoProductivityAction
  | TodoTimerAction;

export type TodoAsyncStorageAction = {
  type: "hydrate";
  payload: List<Todo>;
};

export type TodoCRUDAction = {
  type: "add" | "update" | "delete";
  payload: Todo;
};

export type TodoProductivityAction = {
  type: "toggleComplete" | "assign" | "de-assign";
  target: Todo["id"];
};

export type TodoTimerAction = {
  type: "start" | "pause" | "reset" | "finished";
  target: Todo["id"];
};

const useTodoRepository: () => [
  List<Todo>,
  React.Dispatch<TodoRepoAction>
  // Todo | undefined,
  // boolean
] = () => {
  const { projects, dispatch } = useContext(ProjContext);
  const { settings } = useContext(SettingsContext);
  // const [selected, setSelected] = useState("");

  // Each action should result in at most a single call using this function, which batches all relevant updates in a single action, and thus a single database operation.
  function writeToProjectRepo(todo: Todo, ddl?: Deadline) {
    const [project, todoIndex] = findTodoProj(projects, todo);
    const [_, deadlineIndex] = findTodoDeadline(project, todo);

    dispatch({
      type: "update",
      payload: new Project({
        ...project,
        deadlines: ddl
          ? project.deadlines.set(deadlineIndex, ddl)
          : project.deadlines,
        todos: project?.todos.set(todoIndex, todo),
      }),
    });
  }

  const todoReducer = (state: List<Todo>, action: TodoRepoAction) => {
    let updatedEntry: Todo;
    switch (action.type) {
      // TodoTimerActions
      case "start":
        state.update(
          state.findIndex((item) => item.id == action.target),
          (item) => {
            const finishAt = new Date();
            if (item.remaining) {
              finishAt.setSeconds(finishAt.getSeconds() + item.remaining);
            } else {
              finishAt.setMinutes(
                finishAt.getMinutes() + settings.defaultInterval / 60
              );
            }
            // Padding to offset re-render delays
            finishAt.setMilliseconds(finishAt.getMilliseconds() + 500);
            return new Todo({
              ...item,
              remaining: undefined,
              finishingTime: finishAt,
            });
          }
        );
        break;
      case "pause":
      case "reset":
      case "finished":
        state.update(
          state.findIndex((item) => item.id == action.target),
          (item) => {
            return new Todo({
              ...item,
              laps: item.laps + (action.type === "finished" ? 1 : 0),
              remaining:
                action.type === "pause" ? getTimeLeft(item) : undefined,
              finishingTime: undefined,
            });
          }
        );
        break;

      // TodoProductivityActions
      case "toggleComplete":
        const target = state.find((item) => item.id == action.target);
        updatedEntry = new Todo({
          ...target,
          completed: !target?.completed ?? false,
        });
        writeToProjectRepo(updatedEntry);
        break;

      // TodoCRUDActions
      case "update":
        updatedEntry = action.payload;
        writeToProjectRepo(updatedEntry);
        break;
      case "add":
        const [project, _] = findTodoProj(projects, action.payload);
        const [ddl, ddlIndex] = findTodoDeadline(project, action.payload);
        dispatch({
          type: "update",
          payload: new Project({
            ...project,
            deadlines: action.payload.deadline
              ? project.deadlines.set(ddlIndex, new Deadline(ddl))
              : project.deadlines,
            todos: project.todos.push(action.payload),
          }),
        });
        break;
      case "delete":
        break;

      // TodoAsyncStorageActions
      case "hydrate":
        return action.payload;
      default:
        throw new Error("Invalid Todo Action");
    }
    return state;
  };
  const [todos, todoDispatch] = useReducer(todoReducer, List<Todo>());

  useEffect(() => {
    todoDispatch({
      type: "hydrate",
      payload: projects
        .map((proj) => proj.todos)
        .reduce((agg, projTodos) => agg.concat(projTodos), List<Todo>()),
    });
  }, [projects]);

  return [todos, todoDispatch];
};

export default useTodoRepository;
