import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  FirestoreSageSettings,
  SageSettings,
} from "../redux/reducers/settings";
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
import { ProjectFromEntity } from "../models/Project";
import { hydrateProjects } from "../redux/actions/projects/actions";
import {
  authStateChanged,
  hydrateSettings,
} from "../redux/actions/settings/actions";
import { Screens } from "./navConstants";
import SignUpScreen from "./Onboarding/SignUpScreen";
import ChangeThemeScreen from "./Settings/ChangeThemeScreen";

const Stack = createStackNavigator();

function ChooseScreens(settings: SageSettings) {
  if (!settings.onboarding) {
    return <Stack.Screen name="Onboarding" component={OnboardingScreen} />;
  }
  if (!settings.user) {
    return (
      <>
        <Stack.Screen
          name={Screens.SignIn}
          component={SignInScreen}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={Screens.SignUp}
          component={SignUpScreen}
          options={{
            title: "Create an account",
            headerBackTitleVisible: false,
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <Stack.Screen
          name={Screens.Home}
          component={TabNavigationBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Screens.Settings}
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={Screens.Theme}
          component={ChangeThemeScreen}
          options={{
            title: "Choose Theme",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={Screens.AuthManagement}
          component={AuthManagementScreen}
          options={{
            title: "Account Management",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={Screens.ChangeDisplayName}
          component={EditNameScreen}
          options={{
            title: "Change display name",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={Screens.ChangePassword}
          component={EditPasswordScreen}
          options={{
            title: "Change Password",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={Screens.ChangeEmail}
          component={EditEmailScreen}
          options={{
            title: "Change email settings",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={Screens.ChangeProductivitySettings}
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
    () => auth().onAuthStateChanged((user) => dispatch(authStateChanged(user))),
    []
  );

  useEffect(() => {
    if (settings.user) {
      console.log("SETTINGS LISTENER SUBSCRIBED");
      const cleanupSettingsListener = firestore()
        .collection("Users")
        .doc(settings.user)
        .onSnapshot((documentSnapshot) => {
          const snapshot = documentSnapshot.data() as FirestoreSageSettings;
          if (snapshot) {
            dispatch(hydrateSettings({ ...snapshot }));
          }
        });

      console.log("PROJECT LISTENER SUBSCRIBED");
      const cleanupProjectListener = firestore()
        .collection("Users")
        .doc(settings.user)
        .collection("projects")
        .onSnapshot((querySnapshot) => {
          const storedData =
            querySnapshot && querySnapshot.empty
              ? []
              : querySnapshot.docs.map((doc) =>
                ProjectFromEntity(doc.data()).toEntity()
              );
          dispatch(hydrateProjects(storedData));
        });

      return () => {
        cleanupSettingsListener();
        cleanupProjectListener();
      };
    }
  }, [settings.user]);

  return (
    <NavigationContainer>
      <Stack.Navigator>{ChooseScreens(settings)}</Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreens;
