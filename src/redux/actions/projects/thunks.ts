import { AppThunk } from "../../store";
import firestore from "@react-native-firebase/firestore";
import Project, { ProjectEntity } from "../../../models/Project";
import { defaultProject } from "../../reducers/projects";
import * as ActionCreators from "./actions";
import { findProject } from "../../selectors";

export const projectsCollection = (userID: string) =>
  firestore().collection("Users").doc(userID).collection("projects");

export const writeToProjectsCollection =
  (userID: string) =>
  (project: ProjectEntity, merge: boolean = true) =>
    firestore()
      .collection("Users")
      .doc(userID)
      .collection("projects")
      .doc(project.id)
      .set(project, { merge: merge });

export const sanitiseFirebaseProjects =
  (): AppThunk => async (dispatch, getState) => {
    const user = getState().settings.user;

    if (user) await writeToProjectsCollection(user)(defaultProject);
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
