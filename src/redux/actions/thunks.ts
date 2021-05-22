import { AppThunk } from "../store";
import firestore from "@react-native-firebase/firestore";
import Project from "../../models/Project";
import * as ActionCreators from "./actions";

const projectsCollection = (userID: string) =>
  firestore().collection("Users").doc(userID).collection("projects");

export const addFirebaseProject =
  (project: Project): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    if (user)
      await projectsCollection(user.uid)
        .doc(project.id)
        .set(project.toEntity());
    else dispatch(ActionCreators.addProject(project));
  };

export const deleteFirebaseProject =
  (project: Project): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    if (user) await projectsCollection(user.uid).doc(project.id).delete();
    else dispatch(ActionCreators.deleteProject(project));
  };

export const updateFirebaseProject =
  (project: Project): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    if (user) await projectsCollection(user.uid).doc(project.id).set(project);
    else dispatch(ActionCreators.updateProject(project));
  };

export const completeFirebaseProject =
  (project: Project): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    if (user)
      await projectsCollection(user.uid)
        .doc(project.id)
        .set({ completed: !project.completed }, { merge: true });
    else dispatch(ActionCreators.deleteProject(project));
  };
