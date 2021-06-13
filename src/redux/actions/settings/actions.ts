import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SageTheme } from "../../../util/constants";
import { FirestoreWorkSettings } from "../../reducers/workSettings";
import { FirestoreAppSettings } from "../../reducers/appSettings";
import { Actions, SettingsAction } from "../actionTypes";

export const hydrateSettings = (
  appSettings: FirestoreAppSettings,
  workSettings: FirestoreWorkSettings
): SettingsAction => ({
  type: Actions.SettingsHydrate,
  payload: { appSettings, workSettings },
});

export const authStateChanged = (
  user: FirebaseAuthTypes.User | null
): SettingsAction => ({
  type: Actions.SettingsAuth,
  payload: user ? user.uid : user,
});

export const changeTheme = (theme: SageTheme): SettingsAction => ({
  type: Actions.SettingsChangeTheme,
  payload: theme,
});

export const changeWorkParams = (
  maxProjects: number,
  maxTasks: number,
  defaultInterval: number
): SettingsAction => ({
  type: Actions.SettingsChangeWorkParams,
  payload: [maxProjects, maxTasks, defaultInterval],
});
