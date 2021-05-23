import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ProjectEntity } from "../../models/Project";
import { DeadlineEntity } from "../../models/Deadline";
import { TodoEntity } from "../../models/Todo";
import { FirestoreSageSettings, SageSettings } from "../reducers/settings";

export enum Actions {
  Reset = "REPO_FLUSH",
  ProjectHydrate = "PROJECT_HYDRATE",
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
  SettingsHydrate = "SETTINGS_HYDRATE",
  SettingsAuth = "SETTINGS_AUTH",
  SettingsReset = "SETTINGS_RESET",
  SettingsToggleOnboarding = "SETTINGS_TOGGLE_ONBOARDING",
  SettingsChangeWorkParams = "SETTINGS_CHANGE_PARAMS",
}

export type Action = ProjectAction | TodoAction | SettingsAction;

export type ProjectAction =
  | {
      type: Actions.ProjectHydrate;
      payload: ProjectEntity[];
    }
  | {
      type:
        | Actions.ProjectAdd
        | Actions.ProjectDelete
        | Actions.ProjectUpdate
        | Actions.ProjectComplete
        | Actions.ProjectAddDeadline
        | Actions.ProjectDeleteDeadline
        | Actions.ProjectCompleteDeadline
        | Actions.ProjectUpdateDeadline;
      payload: ProjectEntity;
    };

export type DeadlineAction = {
  type:
    | Actions.DeadlineAdd
    | Actions.DeadlineRemove
    | Actions.DeadlineUpdate
    | Actions.DeadlineComplete;
  targetProj: string;
  payload: DeadlineEntity;
};

export type TodoAction =
  | {
      type: Actions.TodoStart;
      payload: TodoEntity;
      interval: number;
    }
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
      payload: TodoEntity;
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
