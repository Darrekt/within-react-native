import Project from "../../models/Project";
import Todo from "../../models/Todo";
import { Actions, ProjectAction, TodoAction } from "./actionTypes";

export const hydrateProjects = (projects: Project[]): ProjectAction => ({
  type: Actions.ProjectHydrate,
  payload: projects,
});

export const addProject = (project: Project): ProjectAction => ({
  type: Actions.ProjectAdd,
  payload: project,
});

export const deleteProject = (project: Project): ProjectAction => ({
  type: Actions.ProjectDelete,
  payload: project,
});

export const updateProject = (project: Project): ProjectAction => ({
  type: Actions.ProjectUpdate,
  payload: project,
});

export const completeProject = (project: Project): ProjectAction => ({
  type: Actions.ProjectComplete,
  payload: project,
});

export const selectTodo = (todo: Todo): TodoAction => ({
  type: Actions.TodoSelect,
  payload: todo,
});
