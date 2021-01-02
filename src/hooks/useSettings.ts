import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer } from "react";
// Note: Might be good to use native settings API for iOS users.
// import { Settings } from "react-native";

export type SageSettings = {
  onboarding: boolean;
  theme: "light" | "dark";
  defaultInterval: number;
};

export const sageDefaultSettings : SageSettings = {
  onboarding: false,
  theme: "light",
  defaultInterval: 25 * 60,
};

export type SettingsAction = AsyncSettingsAction | ToggleSetting | SetSetting;

type AsyncSettingsAction = {
  key: "hydrate" | "reset";
  value: SageSettings;
};

type ToggleSetting = {
  key: "onboarding" | "theme";
};

type SetSetting = { key: "defaultInterval"; value: number };

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

  switch (action.key) {
    case "hydrate":
      newState = action.value;
      break;
    case "reset":
      newState = sageDefaultSettings;
      break;
    case "theme":
    case "onboarding":
      newState = { ...state, [action.key]: !state[action.key] };
      break;
    default:
      newState = { ...state, [action.key]: action.value };
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

  // TODO: show splash screen until onboarding is resolved.
  // TODO: Add jest testing for onboarding flow
  let onBoardingStatus = false;
  useEffect(() => {
    AsyncStorage.getItem(settingsAyncStoreKey)
      .then((settingsStr) => {
        if (settingsStr)
          dispatch({ key: "hydrate", value: JSON.parse(settingsStr) });
      })

      .catch((e) => console.log(e));
  }, []);

  return [settings, dispatch];
};

export default useSettingsRepository;
