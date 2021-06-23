import firestore from "@react-native-firebase/firestore";
import workSettingsReducer from "../../reducers/workSettings";
import { AppThunk } from "../../store";
import { clearWorkSession, toggleFilter } from "./actions";

const settingsDoc = (userID: string) =>
  firestore().collection("Users").doc(userID);

export const clearFirebaseWorkSession =
  (): AppThunk => async (dispatch, getState) => {
    const user = getState().appSettings.user;
    const action = clearWorkSession();
    if (user)
      await settingsDoc(user).set(
        {
          filters: workSettingsReducer(getState().workSettings, action).filters,
        },
        { mergeFields: ["filters"] }
      );
    else dispatch(action);
  };

export const toggleFilterFirebase =
  (filter: string): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().appSettings.user;
    const action = toggleFilter(filter);
    if (user)
      await settingsDoc(user).set(
        {
          filters: workSettingsReducer(getState().workSettings, action).filters,
        },
        { mergeFields: ["filters"] }
      );
    else dispatch(action);
  };
