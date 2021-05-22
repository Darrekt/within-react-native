import { SageSettings } from "../../reducers/settings";
import { Actions, SettingsAction } from "../actionTypes";

export const hydrateSettings = (
  settings: Omit<SageSettings, "user">
): SettingsAction => ({
  type: Actions.SettingsHydrate,
  payload: settings,
});

export const toggleOnboarding = () => ({
  type: Actions.SettingsToggleOnboarding,
});
