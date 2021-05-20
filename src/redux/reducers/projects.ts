import { List } from "immutable";
import Project, { compareByDeadline } from "../../models/Project";
import { Actions, ProjectAction, TodoAction } from "../actionTypes";
import deadlineReducer from "./deadlines";
import todoReducer from "./todos";

const defaultProject = new Project({
  id: "uncategorised",
  name: "Uncategorised Tasks",
});

const findAndUpdateProject = (
  state: Project[],
  target: string,
  updater: (proj: Project) => Project
) =>
  List(state)
    .update(
      state.findIndex((item) => item.id === target),
      updater
    )
    .toArray();

const projectReducer = (
  state: Project[] = [defaultProject],
  action: ProjectAction | TodoAction
) => {
  switch (action.type) {
    // Project Actions
    case Actions.ProjectUpdate:
      return findAndUpdateProject(
        state,
        action.payload.id,
        (proj) => action.payload
      );
    case Actions.ProjectAdd:
      return List(state).push(action.payload).sort(compareByDeadline).toArray();
    case Actions.ProjectDelete:
      return state.filter((item) => item.id !== action.payload.id);

    case Actions.TodoAdd:
    case Actions.TodoDelete:
    case Actions.TodoUpdate:
    case Actions.TodoAssign:
    case Actions.TodoDeassign:
    case Actions.TodoSelect:
    case Actions.TodoToggleComplete:
    case Actions.TodoStart:
    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
      console.log("Got to theright part?")
      return findAndUpdateProject(
        state,
        action.payload.project,
        (proj) =>
          new Project({
            ...proj,
            deadlines: deadlineReducer(proj.deadlines, action),
            todos: todoReducer(proj.todos, action),
          })
      );
    default:
      console.log(`Ignored Project Action: ${action.type}`);
      return state;
  }
};

export default projectReducer;
