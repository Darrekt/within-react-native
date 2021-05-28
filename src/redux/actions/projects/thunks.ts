import { AppThunk } from "../../store";
import firestore from "@react-native-firebase/firestore";
import Project, { ProjectEntity } from "../../../models/Project";
import { defaultProject } from "../../reducers/projects";
import * as ActionCreators from "./actions";
import { findProject } from "../../selectors";

export const projectsCollection = (userID: string) =>
  firestore().collection("Users").doc(userID).collection("projects");

export const writeToProjectsCollection =
  (userID: string) => (project: ProjectEntity, mergeFields?: string[]) =>
    firestore()
      .collection("Users")
      .doc(userID)
      .collection("projects")
      .doc(project.id)
      .set(project, {
        mergeFields: mergeFields?.length ? mergeFields : undefined,
      });

export const sanitiseFirebaseProjects =
  (loginUser?: string): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;

    if (user)
      await writeToProjectsCollection(loginUser ?? user)(defaultProject, [
        "id",
        "name",
        "completed",
      ]);
    else if (loginUser)
      await writeToProjectsCollection(loginUser)(defaultProject, [
        "id",
        "name",
        "completed",
      ]);
  };

export const addFirebaseProject =
  (project: Project): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    if (user) await writeToProjectsCollection(user)(project.toEntity());
    else dispatch(ActionCreators.addProject(project.toEntity()));
  };

export const updateFirebaseProject =
  (project: Project): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    if (user) await writeToProjectsCollection(user)(project.toEntity());
    else dispatch(ActionCreators.updateProject(project.toEntity()));
  };

export const deleteFirebaseProject =
  (projectID: string): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    if (user) await projectsCollection(user).doc(projectID).delete();
    else dispatch(ActionCreators.deleteProject(projectID));
  };

export const completeFirebaseProject =
  (projectID: string): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    if (user)
      await projectsCollection(user)
        .doc(projectID)
        .set(
          { completed: !findProject(getState().projects, projectID).completed },
          { merge: true }
        );
    else dispatch(ActionCreators.completeProject(projectID));
  };
