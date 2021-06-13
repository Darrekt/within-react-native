import { AppThunk } from "../../store";
import firestore from "@react-native-firebase/firestore";
import Project, { ProjectEntity } from "../../../models/Project";
import { defaultProject } from "../../reducers/projects";
import * as ActionCreators from "./actions";
import { findProject } from "../../selectors";
import Toast from "react-native-toast-message";
import { UNCATEGORISED_TODO_PROJID } from "../../../util/constants";

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
    const user = getState().appSettings.user;

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
    const settings = getState().appSettings;

    if (
      getState().projects.filter(
        (item) => item.id !== UNCATEGORISED_TODO_PROJID && !item.completed
      ).length < settings.maxProjects
    ) {
      if (settings.user)
        await writeToProjectsCollection(settings.user)(project.toEntity());
      else dispatch(ActionCreators.addProject(project.toEntity()));
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Added Project:",
        text2: project.name,
      });
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Too many projects!",
        text2: "Complete the existing ones first!",
      });
    }
  };

export const updateFirebaseProject =
  (project: Project): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().appSettings.user;
    if (user) await writeToProjectsCollection(user)(project.toEntity());
    else dispatch(ActionCreators.updateProject(project.toEntity()));
    Toast.show({
      type: "info",
      position: "bottom",
      text1: "Updated Project:",
      text2: project.name,
    });
  };

export const deleteFirebaseProject =
  (projectID: string): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().appSettings.user;
    if (user) await projectsCollection(user).doc(projectID).delete();
    else dispatch(ActionCreators.deleteProject(projectID));
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Deleted project!",
      text2: findProject(getState().projects, projectID).name,
    });
  };

export const completeFirebaseProject =
  (projectID: string): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().appSettings.user;
    const project = findProject(getState().projects, projectID);
    if (user)
      await projectsCollection(user)
        .doc(projectID)
        .set(
          { completed: project.completed ? null : new Date().getTime() },
          { merge: true }
        );
    else dispatch(ActionCreators.completeProject(projectID));
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Completed project!",
      text2: project.name,
    });
  };
