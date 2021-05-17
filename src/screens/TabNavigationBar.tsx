import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import TodoScreen from "./Todo/TodoScreen";
import StatScreen from "./StatScreen";

const Tab = createBottomTabNavigator();

const TabNavigationBar = () => {
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
  );
};

export default TabNavigationBar;
