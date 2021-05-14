import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GlobalState, SageSettings } from "./State";
import Project from "../models/Project";
import Todo from "../models/Todo";

export enum Actions {
  RepoHydrate = "REPO_HYDRATE",
  RepoFlush = "REPO_FLUSH",
  ProjectAdd = "PROJECT_ADD",
  ProjectDelete = "PROJECT_DELETE",
  ProjectUpdate = "PROJECT_UPDATE",
  TodoAdd = "TODO_ADD",
  TodoDelete = "TODO_DELETE",
  TodoUpdate = "TODO_UPDATE",
  TodoSelect = "TODO_SELECT",
  TodoToggleComplete = "TODO_TOGGLECOMPLETE",
  TodoAssign = "TODO_ASSIGN",
  TodoDeassign = "TODO_DEASSIGN",
  TodoStart = "TODO_START",
  TodoPause = "TODO_PAUSE",
  TodoReset = "TODO_RESET",
  TodoFinish = "TODO_FINISH",
  SettingsAuth = "SETTINGS_AUTH",
  SettingsReset = "SETTINGS_RESET",
  SettingsToggleOnboarding = "SETTINGS_TOGGLE_ONBOARDING",
  SettingsChangeMaxTasks = "SETTINGS_CHANGE_MAX_TASKS",
  SettingsChangeMaxProjects = "SETTINGS_CHANGE_MAX_PROJECTS",
  SettingsChangeDefaultInterval = "SETTINGS_CHANGE_DEFAULT_INTERVAL",
}

export type Action = RepoAction | ProjectAction | TodoAction | SettingsAction;

export type RepoAction = {
  type: Actions.RepoFlush | Actions.RepoHydrate;
  payload: GlobalState;
};

export type ProjectAction = {
  type: Actions.ProjectAdd | Actions.ProjectDelete | Actions.ProjectUpdate;
  payload: Project;
};

export type TodoAction = {
  type:
    | Actions.TodoAdd
    | Actions.TodoUpdate
    | Actions.TodoDelete
    | Actions.TodoSelect
    | Actions.TodoToggleComplete
    | Actions.TodoAssign
    | Actions.TodoDeassign
    | Actions.TodoStart
    | Actions.TodoPause
    | Actions.TodoReset
    | Actions.TodoFinish;
  payload: Todo;
};

export type SettingsAction =
  | SettingResetAction
  | SettingsAuthAction
  | SettingToggleAction
  | SettingChangeValueAction;

type SettingsAuthAction = {
  type: Actions.SettingsAuth;
  user: FirebaseAuthTypes.User | null;
};

type SettingResetAction = {
  type: Actions.SettingsReset;
  value: Omit<SageSettings, "user">;
};

type SettingToggleAction = {
  type: Actions.SettingsToggleOnboarding;
};

type SettingChangeValueAction = {
  type:
    | Actions.SettingsChangeDefaultInterval
    | Actions.SettingsChangeMaxProjects
    | Actions.SettingsChangeMaxTasks;
  value: number;
};
