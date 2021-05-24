import { Action, Actions } from "../actions/actionTypes";

export interface SageSettings {
  onboarding: boolean;
  user: string | null;
  theme: boolean;
  maxProjects: number;
  maxTasks: number;
  defaultInterval: number;
}

export type FirestoreSageSettings = Omit<SageSettings, "user">;

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
  action: Action
): SageSettings => {
  switch (action.type) {
    case Actions.SettingsHydrate:
      return {
        ...action.payload,
        user: state.user,
      };
    case Actions.SettingsAuth:
      return { ...state, user: action.user };
    case Actions.SettingsReset:
      return SAGE_DEFAULT_SETTINGS;
    case Actions.SettingsToggleOnboarding:
      return { ...state, onboarding: !state.onboarding };
    case Actions.SettingsChangeWorkParams:
      return {
        ...state,
        maxProjects: action.value[0],
        maxTasks: action.value[1],
        defaultInterval: action.value[2],
      };
    default:
      console.log(`Settings unchanged: ${action.type}`);
      return state;
  }
};

export default settingsReducer;