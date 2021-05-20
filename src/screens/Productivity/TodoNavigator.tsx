import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import TodoScreen from "./TodoScreen";
import ViewProjectScreen from "./ViewProjectScreen";
import ViewTodoScreen from "./ViewTodoScreen";

const TodoNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppHome"
        component={TodoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewProjScreen"
        component={ViewProjectScreen}
        options={{
          title: "View Project",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddProjScreen"
        component={ViewProjectScreen}
        options={{
          title: "Add a Project",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="EditTodoScreen"
        component={ViewTodoScreen}
        options={{
          title: "Edit task",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddTodoScreen"
        component={ViewTodoScreen}
        options={{
          title: "Add task",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TodoNavigator;
