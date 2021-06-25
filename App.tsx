import "react-native-get-random-values";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";
import StackScreens from "./src/screens/StackScreens";
import OnboardingScreen from "./src/screens/Onboarding/OnboardingScreen";
import { OnboardingContext, useOnboardingState } from "./src/redux/hooks";
import PushNotification, { Importance } from "react-native-push-notification";

export default function App() {
  const [onboarded, setOnboarded] = useOnboardingState();

  useEffect(
    () =>
      PushNotification.createChannel(
        {
          channelId: "within_react_native", // (required)
          channelName: "Within", // (required)
          channelDescription:
            "Notification channel to detect and prevent user distractions", // (optional) default: undefined.
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      ),
    []
  );

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
