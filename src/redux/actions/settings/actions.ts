import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SageTheme } from "../../../util/constants";
import { FirestoreSageSettings } from "../../reducers/settings";
import { Actions, SettingsAction } from "../actionTypes";

export const hydrateSettings = (
  settings: FirestoreSageSettings
): SettingsAction => ({
  type: Actions.SettingsHydrate,
  payload: settings,
});

export const authStateChanged = (
  user: FirebaseAuthTypes.User | null
): SettingsAction => ({
  type: Actions.SettingsAuth,
  user: user ? user.uid : user,
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
  value: [maxProjects, maxTasks, defaultInterval],
});
