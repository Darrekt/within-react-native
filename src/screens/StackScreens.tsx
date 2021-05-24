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
import { fromEntity } from "../models/Project";
import { hydrateProjects } from "../redux/actions/projects/actions";
import {
  authStateChanged,
  hydrateSettings,
} from "../redux/actions/settings/actions";

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
  // const projects = useAppSelector(getProjects);
  const settings = useAppSelector(getSettings);
  const dispatch = useAppDispatch();

  useEffect(
    () => auth().onAuthStateChanged((user) => dispatch(authStateChanged(user))),
    []
  );

  // Project listener
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
                  fromEntity(doc.data()).toEntity()
                );
          dispatch(hydrateProjects(storedData));
          // let result = true;
          // storedData.forEach((proj, index) => {
          //   if (!proj.equals(projects[index])) result = false;
          // });
          // if (!result) {
          //   console.log("DISPATCHING HYDRATION");
          //   dispatch({
          //     type: Actions.ProjectHydrate,
          //     payload: storedData,
          //   });
          // }
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
