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
  | TodoUpdateAction
  | TodoProductivityAction
  | TodoTimerAction;

export type TodoAsyncStorageAction = {
  type: "hydrate";
  payload: List<Todo>;
};

export type TodoUpdateAction = {
  type: "add" | "update" | "delete";
  payload: Todo;
};

export type TodoProductivityAction = {
  type: "select" | "toggleComplete" | "assign" | "de-assign";
  payload: Todo;
};

export type TodoTimerAction = {
  type: "start" | "pause" | "reset" | "finished";
  payload: Todo;
};

const useTodoRepository: () => [
  List<Todo>,
  React.Dispatch<TodoRepoAction>,
  string,
  boolean
] = () => {
  const { projects, dispatch } = useContext(ProjContext);
  const { settings } = useContext(SettingsContext);
  const [selected, setSelected] = useState("");
  const [running, setRunning] = useState(false);

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
    if (action.type == "hydrate") return action.payload;

    const [project, todoIndex] = findTodoProj(projects, action.payload);
    const [ddl, ddlIndex] = findTodoDeadline(project, action.payload);
    let updatedTodo: Todo;
    let updatedDeadline: Deadline;

    switch (action.type) {
      case "select":
        setSelected(selected == action.payload.id ? "" : action.payload.id);
        break;
      // TodoTimerActions
      case "start":
        state.update(
          state.findIndex((item) => item.id == action.payload.id),
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
        setRunning(true);
        break;
      case "pause":
      case "reset":
      case "finished":
        state.update(
          state.findIndex((item) => item.id == action.payload.id),
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
        setRunning(false);
        break;

      // TodoProductivityActions
      case "toggleComplete":
        writeToProjectRepo(
          new Todo({ ...action.payload, completed: !action.payload.completed })
        );
        break;

      // TodoCRUDActions
      case "update":
        writeToProjectRepo(action.payload);
        break;
      case "add":
        updatedDeadline = action.payload.deadline
          ? new Deadline({ ...ddl, todos: ddl.todos.push(action.payload.id) })
          : ddl;
        dispatch({
          type: "update",
          payload: new Project({
            ...project,
            deadlines: action.payload.deadline
              ? project.deadlines.set(ddlIndex, updatedDeadline)
              : project.deadlines,
            todos: project.todos.push(action.payload),
          }),
        });
        break;
      case "delete":
        updatedDeadline = action.payload.deadline
          ? new Deadline({ ...ddl, todos: ddl.todos.remove(ddlIndex) })
          : ddl;
        dispatch({
          type: "update",
          payload: new Project({
            ...project,
            deadlines: action.payload.deadline
              ? project.deadlines.set(ddlIndex, updatedDeadline)
              : project.deadlines,
            todos: project.todos.remove(todoIndex),
          }),
        });
        break;

      default:
        throw new Error("Invalid Todo Action");
    }
    return state;
  };
  const [todos, todoDispatch] = useReducer(todoReducer, List<Todo>());

  useEffect(
    () =>
      todoDispatch({
        type: "hydrate",
        payload: projects
          .map((proj) => proj.todos)
          .reduce((agg, projTodos) => agg.concat(projTodos), List<Todo>()),
      }),
    [projects]
  );

  return [todos, todoDispatch, selected, running];
};

export default useTodoRepository;
