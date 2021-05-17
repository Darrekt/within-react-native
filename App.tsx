import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import useAppState from "./src/hooks/useAppState";
import { GlobalStateContext } from "./src/state/context";

import OnboardingScreen from "./src/screens/Onboarding/OnboardingScreen";
import SettingsScreen from "./src/screens/Settings/SettingsScreen";
import AuthManagementScreen from "./src/screens/Onboarding/AuthManagementScreen";
import EditEmailScreen from "./src/screens/Settings/EditEmailScreen";
import EditPasswordScreen from "./src/screens/Settings/EditPasswordScreen";
import EditNameScreen from "./src/screens/Settings/EditNameScreen";
import EditProductivitySettingScreen from "./src/screens/Settings/EditSettingScreen";
import TabNavigationBar from "./src/screens/TabNavigationBar";
import { SageSettings } from "./src/state/State";
import SignInScreen from "./src/screens/Onboarding/SignInScreen";

const Stack = createStackNavigator();

function ChooseScreens(settings: SageSettings) {
  if (!settings.onboarding) {
    return <Stack.Screen name="Onboarding" component={OnboardingScreen} />;
  } else if (!settings.user) {
    return (
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    );
  } else {
    return (
      <>
        <Stack.Screen
          name="AppHome"
          component={TabNavigationBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="AuthMgmtScreen"
          component={AuthManagementScreen}
          options={{
            title: "Account Management",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="EditNameScreen"
          component={EditNameScreen}
          options={{
            title: "Change display name",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="EditPasswordScreen"
          component={EditPasswordScreen}
          options={{
            title: "Change Password",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="EditEmailScreen"
          component={EditEmailScreen}
          options={{
            title: "Change email settings",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="EditProductivitySettingScreen"
          component={EditProductivitySettingScreen}
          options={{
            title: "Change Productivity Settings",
            headerBackTitleVisible: false,
          }}
        />
      </>
    );
  }
}

export default function App() {
  console.log("App rendered.");
  const [state, dispatch] = useAppState();

  return (
    <GlobalStateContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          {ChooseScreens(state.settings)}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </GlobalStateContext.Provider>
  );
}
