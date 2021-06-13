import { List } from "immutable";
import Project, {
  ProjectFromEntity,
  ProjectEntity,
  compareProjectsByDeadline,
} from "../../models/Project";
import { Action, Actions } from "../actions/actionTypes";
import { findTodoInState } from "../selectors";
import deadlineReducer from "./deadlines";
import todoReducer from "./todos";

export const defaultProject = new Project({
  id: "uncategorised",
  name: "Uncategorised Tasks",
}).toEntity();

export const findAndUpdateProject = (
  state: ProjectEntity[],
  target: string,
  updater: (proj: ProjectEntity) => ProjectEntity
) =>
  List(state)
    .update(
      state.findIndex((item) => item.id === target),
      updater
    )
    .toArray();

export const projectReducer = (
  state: ProjectEntity[] = [defaultProject],
  action: Action
): ProjectEntity[] => {
  switch (action.type) {
    // Project Actions
    case Actions.ProjectHydrate:
      return action.payload;
    case Actions.ProjectUpdate:
      return findAndUpdateProject(
        state,
        action.payload.id,
        (proj) => action.payload
      );
    case Actions.ProjectAdd:
      return List(state)
        .push(action.payload)
        .sort(compareProjectsByDeadline)
        .toArray();
    case Actions.ProjectDelete:
      return state.filter((item) => item.id !== action.payload);
    case Actions.ProjectComplete:
      return findAndUpdateProject(state, action.payload, (proj) =>
        ProjectFromEntity({
          ...proj,
          completed: proj.completed ? null : new Date().getTime(),
        }).toEntity()
      );

    // Deadline Actions
    case Actions.DeadlineAdd:
    case Actions.DeadlineUpdate:
    case Actions.DeadlineRemove:
    case Actions.DeadlineComplete:
      return findAndUpdateProject(state, action.payload.project, (proj) =>
        ProjectFromEntity({
          ...proj,
          deadlines: deadlineReducer(proj.deadlines, action),
          todos: todoReducer(proj.todos, action),
        }).toEntity()
      );

    // Todo Actions
    case Actions.TodoUpdate:
      const prevTodo = findTodoInState(state, action.payload.id);
      let newState = state;

      if (action.payload.project !== prevTodo.project) {
        newState = findAndUpdateProject(state, action.payload.project, (proj) =>
          ProjectFromEntity({
            ...proj,
            todos: todoReducer(proj.todos, {
              type: Actions.TodoAdd,
              payload: action.payload,
            }),
          }).toEntity()
        );
        newState = findAndUpdateProject(newState, prevTodo.project, (proj) =>
          ProjectFromEntity({
            ...proj,
            todos: todoReducer(proj.todos, {
              type: Actions.TodoDelete,
              payload: action.payload,
            }),
          }).toEntity()
        );
        return newState;
      }
    case Actions.TodoAdd:
    case Actions.TodoDelete:
    case Actions.TodoToggleComplete:
    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
      return findAndUpdateProject(state, action.payload.project, (proj) => ({
        ...proj,
        deadlines: deadlineReducer(proj.deadlines, action),
        todos: todoReducer(proj.todos, action),
      }));
    case Actions.TodoStart:
      return findAndUpdateProject(
        state,
        action.payload.todo.project,
        (proj) => ({
          ...proj,
          deadlines: deadlineReducer(proj.deadlines, action),
          todos: todoReducer(proj.todos, action),
        })
      );
    default:
      return state;
  }
};

export default projectReducer;
