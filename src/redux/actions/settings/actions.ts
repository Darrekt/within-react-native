import { FirebaseAuthTypes } from "@react-native-firebase/auth";
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
