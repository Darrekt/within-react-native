import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsContext } from "./src/state/context";
import useSettingsRepository from "./src/hooks/useSettingsRepository";

import TodoScreen from "./src/screens/Todo/TodoScreen";
import StatScreen from "./src/screens/StatScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import GroupScreen from "./src/screens/GroupScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import AddTodoScreen from "./src/screens/Todo/AddTodoScreen";
import AuthManagementScreen from "./src/screens/Onboarding/AuthManagementScreen";
import EmailSignInScreen from "./src/screens/Onboarding/EmailSignInScreen";

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
                options={{ title: "Settings", headerBackTitle: "Back" }}
              />
              <Stack.Screen
                name="AuthScreen"
                component={AuthManagementScreen}
                options={{ title: "Account Management", headerBackTitle: "Back" }}
              />
              <Stack.Screen
                name="EmailSignInScreen"
                component={EmailSignInScreen}
                options={{ title: "Sign-in with Email", headerBackTitle: "Back" }}
              />
              <Stack.Screen
                name="AddTodoScreen"
                component={AddTodoScreen}
                options={{ title: "Add a task" }}
              />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const appTabNav = () => (
  <Tab.Navigator
    initialRouteName="Todos"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case "Stats":
            iconName = "md-stats";
            break;
          case "Groups":
            iconName = "ios-chatboxes";
            break;
          default:
            iconName = "ios-checkbox";
            break;
        }
        return (
          <Icon name={iconName} type="ionicon" size={size} color={color} />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen name="Todos" component={TodoScreen} />
    <Tab.Screen name="Stats" component={StatScreen} />
    <Tab.Screen name="Groups" component={GroupScreen} />
  </Tab.Navigator>
);
