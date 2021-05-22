import firestore from "@react-native-firebase/firestore";
import { ActionCreator } from "redux";
import { SageSettings, SAGE_DEFAULT_SETTINGS } from "../../reducers/settings";
import { AppThunk } from "../../store";
import { Actions } from "../actionTypes";

const settingsDoc = (userID: string) =>
  firestore().collection("Users").doc(userID);

export const resetSettings: ActionCreator<AppThunk> =
  () => async (dispatch, getState) => {
    const loggedInUser = getState().settings.user;
    const { user, ...settingsWithoutUser } = SAGE_DEFAULT_SETTINGS;
    if (loggedInUser)
      await settingsDoc(loggedInUser.uid).set(settingsWithoutUser);
    else
      dispatch({
        type: Actions.SettingsReset,
      });
  };

export const changeWorkParams =
  (maxProjects: number, maxTasks: number, defaultInterval: number): AppThunk =>
  async (dispatch, getState) => {
    const settings: SageSettings = getState().settings;
    const user = settings.user;
    if (user)
      await settingsDoc(user.uid).set(
        { maxProjects, maxTasks, defaultInterval },
        { mergeFields: ["maxProjects", "maxTasks", "defaultInterval"] }
      );
    else
      dispatch({
        type: Actions.SettingsChangeWorkParams,
        value: [maxProjects, maxTasks, defaultInterval],
      });
  };
