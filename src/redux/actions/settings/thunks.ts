import firestore from "@react-native-firebase/firestore";
import { ActionCreator } from "redux";
import { SageTheme } from "../../../util/constants";
import {
  SageSettings,
  SAGE_DEFAULT_SETTINGS,
} from "../../reducers/appSettings";
import { defaultProject } from "../../reducers/projects";
import { AppThunk } from "../../store";
import { Actions } from "../actionTypes";
import { writeToProjectsCollection } from "../projects/thunks";
import * as ActionCreators from "./actions";

const settingsDoc = (userID: string) =>
  firestore().collection("Users").doc(userID);

export const initUserData =
  (loginUser: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const { user, selected, ...syncData } = {
      ...state.appSettings,
      ...state.workSettings,
    };
    await settingsDoc(loginUser).set(syncData);
    await writeToProjectsCollection(loginUser)(defaultProject);
  };

export const resetSettings: ActionCreator<AppThunk> =
  () => async (dispatch, getState) => {
    const loggedInUser = getState().appSettings.user;
    const { user, ...settingsWithoutUser } = SAGE_DEFAULT_SETTINGS;
    if (loggedInUser)
      await settingsDoc(loggedInUser).set(
        { ...settingsWithoutUser, onboarding: true },
        { merge: true }
      );
    else
      dispatch({
        type: Actions.SettingsReset,
      });
  };

export const toggleOnboarding = (): AppThunk => async (dispatch, getState) => {
  const settings = getState().appSettings;
  if (settings.user)
    await settingsDoc(settings.user).set(
      { onboarding: !settings.onboarding },
      { mergeFields: ["onboarding"] }
    );
  else dispatch({ type: Actions.SettingsToggleOnboarding });
};

export const changeFirebaseTheme =
  (newTheme: SageTheme): AppThunk =>
  async (dispatch, getState) => {
    const settings = getState().appSettings;
    if (settings.user)
      await settingsDoc(settings.user).set(
        { theme: newTheme },
        { mergeFields: ["theme"] }
      );
    else dispatch(ActionCreators.changeTheme(newTheme));
  };

export const changeWorkParams =
  (maxProjects: number, maxTasks: number, defaultInterval: number): AppThunk =>
  async (dispatch, getState) => {
    const settings: SageSettings = getState().appSettings;
    if (settings.user)
      await settingsDoc(settings.user).set(
        { maxProjects, maxTasks, defaultInterval },
        { mergeFields: ["maxProjects", "maxTasks", "defaultInterval"] }
      );
    else dispatch(changeWorkParams(maxProjects, maxTasks, defaultInterval));
  };
