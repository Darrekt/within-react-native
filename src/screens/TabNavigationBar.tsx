import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import StatScreen from "./StatScreen";
import TodoNavigator from "./Productivity/TodoNavigator";
import { useAppSelector } from "../redux/hooks";
import { getTheme } from "../redux/selectors";
import SettingsScreen from "./Settings/SettingsScreen";

const Tab = createBottomTabNavigator();

const TabNavigationBar = () => {
  const theme = useAppSelector(getTheme);
  return (
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
            case "Settings":
              return (
                <Icon
                name="settings"
                type="materialicons"
                size={size}
                color={color}
                />
              )
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.dark,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Todos" component={TodoNavigator} />
      <Tab.Screen name="Stats" component={StatScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigationBar;
