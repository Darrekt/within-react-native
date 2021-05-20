import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import Project from "../models/Project";
import Todo from "../models/Todo";
import { SageSettings } from "./reducers/settings";
import Deadline from "../models/Deadline";

export enum Actions {
  RepoHydrate = "REPO_HYDRATE",
  RepoFlush = "REPO_FLUSH",
  ProjectAdd = "PROJECT_ADD",
  ProjectDelete = "PROJECT_DELETE",
  ProjectUpdate = "PROJECT_UPDATE",
  ProjectComplete = "PROJECT_COMPLETE",
  ProjectAddDeadline = "PROJECT_ADD_DEADLINE",
  ProjectDeleteDeadline = "PROJECT_DEL_DEADLINE",
  ProjectCompleteDeadline = "PROJECT_COMPLETE_DEADLINE",
  ProjectUpdateDeadline = "PROJECT_UPDATE_DEADLINE",
  DeadlineAdd = "DEADLINE_ADD",
  DeadlineRemove = "DEADLINE_REMOVE",
  DeadlineUpdate = "DEADLINE_UPDATE",
  DeadlineComplete = "DEADLINE_COMPLETE",
  TodoAdd = "TODO_ADD",
  TodoDelete = "TODO_DELETE",
  TodoUpdate = "TODO_UPDATE",
  TodoSelect = "TODO_SELECT",
  TodoToggleComplete = "TODO_TOGGLECOMPLETE",
  TodoAssignProject = "TODO_ASSIGN_PROJECT",
  TodoAssignDeadline = "TODO_ASSIGN_DEADLINE",
  TodoDeassignDeadline = "TODO_DEASSIGN_DEADLINE",
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
  type:
    | Actions.ProjectAdd
    | Actions.ProjectDelete
    | Actions.ProjectUpdate
    | Actions.ProjectComplete
    | Actions.ProjectAddDeadline
    | Actions.ProjectDeleteDeadline
    | Actions.ProjectCompleteDeadline
    | Actions.ProjectUpdateDeadline;
  payload: Project;
};

export type DeadlineAction = {
  type:
    | Actions.DeadlineAdd
    | Actions.DeadlineRemove
    | Actions.DeadlineUpdate
    | Actions.DeadlineComplete;
  targetProj: string;
  payload: Deadline;
};

export type TodoAction =
  | TodoStart
  | {
      type:
        | Actions.TodoAdd
        | Actions.TodoUpdate
        | Actions.TodoDelete
        | Actions.TodoSelect
        | Actions.TodoToggleComplete
        | Actions.TodoAssignProject
        | Actions.TodoAssignDeadline
        | Actions.TodoDeassignDeadline
        | Actions.TodoPause
        | Actions.TodoReset
        | Actions.TodoFinish;
      payload: Todo;
    };

export type TodoStart = {
  type: Actions.TodoStart;
  payload: Todo;
  interval: number;
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
