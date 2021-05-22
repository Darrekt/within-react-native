import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SageSettings } from "../../reducers/settings";
import { Actions, SettingsAction } from "../actionTypes";

export const hydrateSettings = (
  settings: Omit<SageSettings, "user">
): SettingsAction => ({
  type: Actions.SettingsHydrate,
  payload: settings,
});

export const userChanged = (
  user: FirebaseAuthTypes.User | null
): SettingsAction => ({
  type: Actions.SettingsAuth,
  user: user ? user.uid : user,
});

export const toggleOnboarding = () => ({
  type: Actions.SettingsToggleOnboarding,
});
