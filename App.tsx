import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsContext, ProjContext } from "./src/state/context";
import useSettingsRepository from "./src/hooks/useSettingsRepository";
import useProjectRepository from "./src/hooks/useProjectRepository";
import Toast from "react-native-toast-message";

import TodoScreen from "./src/screens/Todo/TodoScreen";
import StatScreen from "./src/screens/StatScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SettingsScreen from "./src/screens/Settings/SettingsScreen";
import AuthManagementScreen from "./src/screens/Onboarding/AuthManagementScreen";
import EmailSignInScreen from "./src/screens/Onboarding/EmailSignInScreen";
import EditEmailScreen from "./src/screens/Settings/EditEmailScreen";
import EditPasswordScreen from "./src/screens/Settings/EditPasswordScreen";
import EditNameScreen from "./src/screens/Settings/EditNameScreen";
import EditProductivitySettingScreen from "./src/screens/Settings/EditSettingScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [settings, dispatch] = useSettingsRepository();

  return (
    <SettingsContext.Provider
      value={{
        settings: settings,
        dispatch: dispatch,
      }}
    >
      <NavigationContainer>
        {!settings.onboarding ? (
          <>
            <Stack.Navigator>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator>
              <Stack.Screen
                name="AppHome"
                component={appTabNav}
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
                name="AuthScreen"
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
                name="EmailSignInScreen"
                component={EmailSignInScreen}
                options={{
                  title: "Sign-in with Email",
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
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SettingsContext.Provider>
  );
}

const appTabNav = () => {
  const [projects, proj_dispatch] = useProjectRepository();

  return (
    <ProjContext.Provider
      value={{ projects: projects, dispatch: proj_dispatch }}
    >
      <Tab.Navigator
        initialRouteName="Todos"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case "Stats":
                return (
                  <Icon
                    name="md-stats-chart"
                    type="ionicon"
                    size={size}
                    color={color}
                  />
                );
              case "Groups":
                return (
                  <Icon
                    name="message"
                    type="material"
                    size={size}
                    color={color}
                  />
                );
              default:
                return (
                  <Icon
                    name="checkbox"
                    type="ionicon"
                    size={size}
                    color={color}
                  />
                );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "#01D1EE",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Todos" component={TodoScreen} />
        <Tab.Screen name="Stats" component={StatScreen} />
        {/* <Tab.Screen name="Groups" component={GroupScreen} /> */}
      </Tab.Navigator>
    </ProjContext.Provider>
  );
};
