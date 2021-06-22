import "react-native-get-random-values";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";
import StackScreens from "./src/screens/StackScreens";
import OnboardingScreen from "./src/screens/Onboarding/OnboardingScreen";
import { OnboardingContext, useOnboardingState } from "./src/redux/hooks";

export default function App() {
  const [onboarded, setOnboarded] = useOnboardingState();

  return (
    <OnboardingContext.Provider value={{ setOnboarded }}>
      {onboarded ? (
        <Provider store={store}>
          <StackScreens />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </Provider>
      ) : (
        <OnboardingScreen />
      )}
    </OnboardingContext.Provider>
  );
}
