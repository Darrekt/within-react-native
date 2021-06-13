import { ProjectEntity } from "../../../models/Project";
import { Actions, ProjectAction } from "../actionTypes";

export const hydrateProjects = (projects: ProjectEntity[]): ProjectAction => ({
  type: Actions.ProjectHydrate,
  payload: projects,
});

export const addProject = (project: ProjectEntity): ProjectAction => ({
  type: Actions.ProjectAdd,
  payload: project,
});

export const updateProject = (project: ProjectEntity): ProjectAction => ({
  type: Actions.ProjectUpdate,
  payload: project,
});

export const deleteProject = (target: string): ProjectAction => ({
  type: Actions.ProjectDelete,
  payload: target,
});

export const completeProject = (target: string): ProjectAction => ({
  type: Actions.ProjectComplete,
  payload: target,
});
