import { List } from "immutable";
import Project, { compareByDeadline } from "../../models/Project";
import { Actions, ProjectAction, TodoAction } from "../actions/actionTypes";
import { findTodoByID } from "../selectors";
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

    case Actions.ProjectComplete:
      return findAndUpdateProject(
        state,
        action.payload.id,
        (proj) => new Project({ ...proj, completed: !proj.completed })
      );
    case Actions.ProjectCompleteDeadline:
      return state;

    case Actions.TodoAdd:
    case Actions.TodoDelete:
    case Actions.TodoUpdate:
    case Actions.TodoAssignDeadline:
    case Actions.TodoDeassignDeadline:
    case Actions.TodoSelect:
    case Actions.TodoToggleComplete:
    case Actions.TodoStart:
    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
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
    case Actions.TodoAssignProject:
      const prevTodo = findTodoByID(state, action.payload.id);
      // TODO: Updating Todo sometimes requires editing of 2 projects
      // Remove from list if reassigned to other project
      // Add to list if new to this project

      // Find the previous version of this todo
      // compare to the new payload
      return state;
    default:
      console.log(`Ignored Project Action: ${action.type}`);
      return state;
  }
};

export default projectReducer;
