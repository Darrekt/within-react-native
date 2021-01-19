import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export type SageSettings = {
  onboarding: boolean;
  user: FirebaseAuthTypes.User | null;
  theme: boolean;
  defaultInterval: number;
};

export const sageDefaultSettings: SageSettings = {
  onboarding: false,
  user: null,
  theme: true,
  defaultInterval: 25 * 60,
};

export type SettingsAction =
  | AsyncSettingsAction
  | SettingsAuthAction
  | ToggleSetting
  | SetSetting;

type SettingsAuthAction = {
  type: "auth";
  user: FirebaseAuthTypes.User | null;
};

type AsyncSettingsAction = {
  type: "hydrate" | "reset";
  value: Omit<SageSettings, "user">;
};

type ToggleSetting = {
  type: "onboarding" | "theme";
};

type SetSetting = { type: "defaultInterval"; value: number };

const settingsAyncStoreKey = "settings";
const settingsTimeStamp = "settingsTimeStamp";

const setAsyncStorageSettings = async (settings: SageSettings) => {
  if (settings.user !== null) {
    const { user, ...settingsEntity } = settings;
    firestore().collection("Users").doc(settings.user.uid).set(settingsEntity);
  }
  try {
    await AsyncStorage.setItem(settingsTimeStamp, JSON.stringify(Date.now()));
    await AsyncStorage.setItem(settingsAyncStoreKey, JSON.stringify(settings));
  } catch (e) {
    console.log(e);
  }
};

const settingsReducer = (state: SageSettings, action: SettingsAction) => {
  let newState: SageSettings;

  switch (action.type) {
    case "hydrate":
      newState = { ...action.value, user: auth().currentUser };
      break;
    case "reset":
      newState = sageDefaultSettings;
      break;
    case "theme":
    case "onboarding":
      newState = { ...state, [action.type]: !state[action.type] };
      break;
    case "auth":
      newState = { ...state, user: action.user };
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

  useEffect(
    () =>
      auth().onAuthStateChanged((user) =>
        dispatch({ type: "auth", user: user })
      ),
    []
  );

  useEffect(() => {
    if (settings.user !== null) {
      firestore()
        .collection("Users")
        .doc(settings.user.uid)
        .onSnapshot((documentSnapshot) => {
          const snapshot = documentSnapshot.data() as Omit<
            SageSettings,
            "user"
          >;
          if (snapshot) {
            console.log("hydrating");
            dispatch({ type: "hydrate", value: snapshot });
          }
        });
    } else {
      AsyncStorage.getItem(settingsAyncStoreKey)
        .then((settingsStr) => {
          if (settingsStr)
            dispatch({ type: "hydrate", value: JSON.parse(settingsStr) });
        })
        .catch((e) => console.log(e));
    }
  }, []);

  return [settings, dispatch];
};

export default useSettingsRepository;
