import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SageSettings } from "../redux/reducers/settings";
import { getSettings } from "../redux/selectors";

import OnboardingScreen from "./Onboarding/OnboardingScreen";
import SettingsScreen from "./Settings/SettingsScreen";
import AuthManagementScreen from "./Onboarding/AuthManagementScreen";
import EditEmailScreen from "./Settings/EditEmailScreen";
import EditPasswordScreen from "./Settings/EditPasswordScreen";
import EditNameScreen from "./Settings/EditNameScreen";
import EditProductivitySettingScreen from "./Settings/EditSettingScreen";
import TabNavigationBar from "./TabNavigationBar";
import SignInScreen from "./Onboarding/SignInScreen";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Actions } from "../redux/actions/actionTypes";

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

function StackScreens() {
  const settings = useAppSelector(getSettings);
  const dispatch = useAppDispatch();

  useEffect(
    () =>
      auth().onAuthStateChanged((user) =>
        dispatch({ type: Actions.SettingsAuth, user: user })
      ),
    [settings.user]
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>{ChooseScreens(settings)}</Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreens;
