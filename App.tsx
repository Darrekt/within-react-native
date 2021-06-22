import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";
import StackScreens from "./src/screens/StackScreens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_STATUS_KEY } from "./src/util/constants";
import OnboardingScreen from "./src/screens/Onboarding/OnboardingScreen";

export const OnboardingContext =
  React.createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(
    null
  );

export default function App() {
  const [onboarded, setOnboarded] = useState(true);

  useEffect(() => {
    const getOnboardingStatus = async () => {
      let status = true;
      try {
        status =
          (await AsyncStorage.getItem(ONBOARDING_STATUS_KEY)) === "true"
            ? true
            : false;
      } catch (e) {
        console.log("Onboarding status issue");
        status = false;
      }
      setOnboarded(status);
    };
    getOnboardingStatus();
  }, []);

  return (
    <OnboardingContext.Provider value={setOnboarded}>
      {onboarded ? (
        <Provider store={store}>
          <StackScreens />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </Provider>
      ) : (
        <OnboardingScreen onFinish={() => setOnboarded(true)} />
      )}
    </OnboardingContext.Provider>
  );
}
