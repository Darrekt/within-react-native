import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Actions, ProjectAction, SettingsAction } from "../actions/actionTypes";

export type SageSettings = {
  onboarding: boolean;
  user: FirebaseAuthTypes.User | null;
  theme: boolean;
  maxProjects: number;
  maxTasks: number;
  defaultInterval: number;
};

export const SAGE_DEFAULT_SETTINGS: SageSettings = {
  onboarding: false,
  user: null,
  theme: true,
  maxProjects: 4,
  maxTasks: 3,
  defaultInterval: 25 * 60,
};

const settingsReducer = (
  state: SageSettings = SAGE_DEFAULT_SETTINGS,
  action: ProjectAction | SettingsAction
) => {
  switch (action.type) {
    case Actions.SettingsAuth:
      console.log("LOGGED IN USER: ", action.user?.email);
      return { ...state, user: action.user };
    case Actions.SettingsReset:
      return SAGE_DEFAULT_SETTINGS;
    case Actions.SettingsToggleOnboarding:
      return { ...state, onboarding: !state.onboarding };
    case Actions.SettingsChangeMaxProjects:
      return { ...state, maxProjects: action.value };
    case Actions.SettingsChangeMaxTasks:
      return { ...state, maxTasks: action.value };
    case Actions.SettingsChangeDefaultInterval:
      return { ...state, defaultInterval: action.value };
    default:
      console.log(`Ignored settings action: ${action.type}`);
      return state;
  }
};

export default settingsReducer;
