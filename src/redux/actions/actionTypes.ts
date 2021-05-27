import { ProjectEntity } from "../../models/Project";
import { DeadlineEntity } from "../../models/Deadline";
import { TodoEntity } from "../../models/Todo";
import { FirestoreSageSettings } from "../reducers/settings";

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
  TodoSelect = "TODO_SELECT",
  TodoToggleComplete = "TODO_TOGGLECOMPLETE",
  TodoAssignProject = "TODO_ASSIGN_PROJECT",
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
  SettingsChangeWorkParams = "SETTINGS_CHANGE_PARAMS",
}

export type Action =
  | ProjectAction
  | DeadlineAction
  | TodoAction
  | SettingsAction;

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
      target: string;
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
        | Actions.TodoAssignProject
        | Actions.TodoAssignDeadline
        | Actions.TodoDeassignDeadline
        | Actions.TodoDelete
        | Actions.TodoSelect
        | Actions.TodoToggleComplete
        | Actions.TodoPause
        | Actions.TodoReset
        | Actions.TodoFinish;
      payload: TodoEntity;
    }
  | {
      type: Actions.TodoStart;
      payload: TodoEntity;
      interval: number;
    };

export type SettingsAction =
  | {
      type: Actions.SettingsHydrate;
      payload: FirestoreSageSettings;
    }
  | {
      type: Actions.SettingsReset;
    }
  | {
      type: Actions.SettingsAuth;
      user: string | null;
    }
  | {
      type: Actions.SettingsToggleOnboarding;
    }
  | {
      type: Actions.SettingsChangeWorkParams;
      value: [number, number, number];
    };
