import { SageTheme } from "../../util/constants";
import { Action, Actions } from "../actions/actionTypes";

export interface SageSettings {
  user: string | null;
  theme: SageTheme;
  maxProjects: number;
  maxTasks: number;
  defaultInterval: number;
}

export type FirestoreSageSettings = Omit<SageSettings, "user">;

export type FirestoreAppSettings = Omit<FirestoreSageSettings, "filters">;

export const SAGE_DEFAULT_SETTINGS: SageSettings = {
  user: null,
  theme: SageTheme.Mint,
  maxProjects: 4,
  maxTasks: 3,
  defaultInterval: 25 * 60,
};

const appSettingsReducer = (
  state: SageSettings = SAGE_DEFAULT_SETTINGS,
  action: Action
): SageSettings => {
  switch (action.type) {
    case Actions.SettingsHydrate:
      return {
        ...action.payload.appSettings,
        user: state.user,
      };
    case Actions.SettingsAuth:
      return { ...state, user: action.payload };
    case Actions.SettingsReset:
      return SAGE_DEFAULT_SETTINGS;
    case Actions.SettingsChangeTheme:
      return { ...state, theme: action.payload };
    case Actions.SettingsChangeWorkParams:
      return {
        ...state,
        maxProjects: action.payload[0],
        maxTasks: action.payload[1],
        defaultInterval: action.payload[2],
      };
    default:
      return state;
  }
};

export default appSettingsReducer;
