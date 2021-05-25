import { List } from "immutable";
import Project, {
  compareByDeadline,
  fromEntity,
  ProjectEntity,
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

const projectReducer = (
  state: ProjectEntity[] = [defaultProject],
  action: Action
): ProjectEntity[] => {
  let currProj: ProjectEntity;
  switch (action.type) {
    case Actions.ProjectHydrate:
      return action.payload;

    case Actions.ProjectUpdate:
      return findAndUpdateProject(
        state,
        action.payload.id,
        (proj) => action.payload
      );

    case Actions.ProjectAdd:
      return List(state).push(action.payload).sort(compareByDeadline).toArray();

    case Actions.ProjectDelete:
      return state.filter((item) => item.id !== action.target);

    case Actions.ProjectComplete:
      return findAndUpdateProject(state, action.target, (proj) =>
        fromEntity({ ...proj, completed: !proj.completed }).toEntity()
      );

    case Actions.TodoUpdate:
      const prevTodo = findTodoInState(state, action.payload.id);

      let newState = state;
      if (action.payload.project !== prevTodo.project) {
        // Add to list of new project
        newState = findAndUpdateProject(state, action.payload.project, (proj) =>
          fromEntity({
            ...proj,
            todos: todoReducer(proj.todos, {
              type: Actions.TodoAdd,
              payload: action.payload,
            }),
          }).toEntity()
        );
        // Remove from list of old project
        newState = findAndUpdateProject(newState, prevTodo.project, (proj) =>
          fromEntity({
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
    case Actions.TodoSelect:
    case Actions.TodoToggleComplete:
    case Actions.TodoStart:
    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
      return findAndUpdateProject(state, action.payload.project, (proj) => ({
        ...proj,
        deadlines: deadlineReducer(proj.deadlines, action),
        todos: todoReducer(proj.todos, action),
      }));
    case Actions.TodoAssignProject:
      return state;
    default:
      console.log(`Projects unchanged: ${action.type}`);
      return state;
  }
};

export default projectReducer;
