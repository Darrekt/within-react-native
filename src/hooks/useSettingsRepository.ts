import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export type SageSettings = {
  onboarding: boolean;
  signedIn?: string;
  theme: "light" | "dark";
  defaultInterval: number;
};

export const sageDefaultSettings: SageSettings = {
  onboarding: false,
  theme: "light",
  defaultInterval: 25 * 60,
};

export type SettingsAction =
  | AsyncSettingsAction
  | SettingsAuthAction
  | ToggleSetting
  | SetSetting;

type SettingsAuthAction = {
  type: "auth";
  userID?: string;
};

type AsyncSettingsAction = {
  type: "hydrate" | "reset";
  value: SageSettings;
};

type ToggleSetting = {
  type: "onboarding" | "theme";
};

type SetSetting = { type: "defaultInterval"; value: number };

const settingsAyncStoreKey = "settings";

const setAsyncStorageSettings = async (settings: SageSettings) => {
  try {
    await AsyncStorage.setItem(settingsAyncStoreKey, JSON.stringify(settings));
    AsyncStorage;
  } catch (e) {
    console.log(e);
  }
};

const settingsReducer = (state: SageSettings, action: SettingsAction) => {
  let newState: SageSettings;

  switch (action.type) {
    case "hydrate":
      newState = action.value;
      break;
    case "reset":
      newState = sageDefaultSettings;
      break;
    case "theme":
    case "onboarding":
      newState = { ...state, [action.type]: !state[action.type] };
      break;
    case "auth":
      newState = { ...state, signedIn: action.userID };
      break;
    default:
      newState = { ...state, [action.type]: action.value };
      break;
  }
  setAsyncStorageSettings(newState);
  return newState;
};

const useSettingsRepository: () => [
  settings: SageSettings,
  dispatch: React.Dispatch<SettingsAction>
] = () => {
  const [settings, dispatch] = useReducer(settingsReducer, sageDefaultSettings);

  useEffect(() => {
    AsyncStorage.getItem(settingsAyncStoreKey)
      .then((settingsStr) => {
        if (settingsStr)
          dispatch({ type: "hydrate", value: JSON.parse(settingsStr) });
      })
      .catch((e) => console.log(e));

    const subscriber = auth().onAuthStateChanged((user) =>
      dispatch({ type: "auth", userID: user?.uid })
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  return [settings, dispatch];
};

export default useSettingsRepository;
