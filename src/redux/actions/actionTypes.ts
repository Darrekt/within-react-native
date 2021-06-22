import { ProjectEntity } from "../../models/Project";
import { DeadlineEntity } from "../../models/Deadline";
import { TodoEntity } from "../../models/Todo";
import { FirestoreAppSettings } from "../reducers/appSettings";
import { SageTheme } from "../../util/constants";
import { FirestoreWorkSettings } from "../reducers/workSettings";

export enum Actions {
  Reset = "REPO_FLUSH",
  ProjectHydrate = "PROJECT_HYDRATE",
  ProjectAdd = "PROJECT_ADD",
  ProjectDelete = "PROJECT_DELETE",
  ProjectUpdate = "PROJECT_UPDATE",
  ProjectComplete = "PROJECT_COMPLETE",
  DeadlineAdd = "DEADLINE_ADD",
  DeadlineRemove = "DEADLINE_REMOVE",
  DeadlineUpdate = "DEADLINE_UPDATE",
  DeadlineComplete = "DEADLINE_COMPLETE",
  TodoAdd = "TODO_ADD",
  TodoDelete = "TODO_DELETE",
  TodoUpdate = "TODO_UPDATE",
  TodoToggleComplete = "TODO_TOGGLECOMPLETE",
  TodoAssignDeadline = "TODO_ASSIGN_DEADLINE",
  TodoDeassignDeadline = "TODO_DEASSIGN_DEADLINE",
  TodoStart = "TODO_START",
  TodoPause = "TODO_PAUSE",
  TodoReset = "TODO_RESET",
  TodoFinish = "TODO_FINISH",
  SettingsHydrate = "SETTINGS_HYDRATE",
  SettingsAuth = "SETTINGS_AUTH",
  SettingsReset = "SETTINGS_RESET",
  SettingsToggleOnboarding = "SETTINGS_TOGGLE_ONBOARDING",
  SettingsChangeTheme = "SETTINGS_CHANGE_THEME",
  SettingsChangeWorkParams = "SETTINGS_CHANGE_PARAMS",
  SelectTodo = "SELECT_TODO",
  ToggleFilter = "FILTER_TOGGLE",
  ClearWorkSession = "CLEAR_WORK_SESSION",
}

export type Action =
  | ProjectAction
  | DeadlineAction
  | TodoAction
  | SettingsAction
  | WorkAction;

export type WorkAction =
  | { type: Actions.SelectTodo; payload: string }
  | { type: Actions.ToggleFilter; payload: string }
  | { type: Actions.ClearWorkSession };

export type ProjectAction =
  | {
      type: Actions.ProjectHydrate;
      payload: ProjectEntity[];
    }
  | {
      type: Actions.ProjectAdd | Actions.ProjectUpdate;
      payload: ProjectEntity;
    }
  | {
      type: Actions.ProjectDelete | Actions.ProjectComplete;
      payload: string;
    };

export type DeadlineAction = {
  type:
    | Actions.DeadlineAdd
    | Actions.DeadlineRemove
    | Actions.DeadlineUpdate
    | Actions.DeadlineComplete;
  payload: DeadlineEntity;
};

export type TodoAction =
  | {
      type:
        | Actions.TodoAdd
        | Actions.TodoUpdate
        | Actions.TodoDelete
        | Actions.TodoDeassignDeadline
        | Actions.TodoToggleComplete
        | Actions.TodoPause
        | Actions.TodoReset
        | Actions.TodoFinish;
      payload: TodoEntity;
    }
  | {
      type: Actions.TodoStart;
      payload: { todo: TodoEntity; interval: number };
    }
  | {
      type: Actions.TodoAssignDeadline;
      payload: { todo: TodoEntity; deadline: string };
    };

export type SettingsAction =
  | {
      type: Actions.SettingsHydrate;
      payload: {
        appSettings: FirestoreAppSettings;
        workSettings: FirestoreWorkSettings;
      };
    }
  | {
      type: Actions.SettingsReset;
    }
  | {
      type: Actions.SettingsAuth;
      payload: string | null;
    }
  | {
      type: Actions.SettingsToggleOnboarding;
    }
  | {
      type: Actions.SettingsChangeTheme;
      payload: SageTheme;
    }
  | {
      type: Actions.SettingsChangeWorkParams;
      payload: [number, number, number];
    };
