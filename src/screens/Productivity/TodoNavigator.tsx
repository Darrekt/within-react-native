import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import TodoScreen from "./TodoScreen";
import ViewProjectScreen from "./ViewProjectScreen";
import ViewTodoScreen from "./ViewTodoScreen";
import ViewDeadlineScreen from "./ViewDeadlineScreen";
import { Screens } from "../navConstants";

const TodoNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.TodoHome}
        component={TodoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.ViewProject}
        component={ViewProjectScreen}
        options={{
          title: "View Project",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={Screens.AddProject}
        component={ViewProjectScreen}
        options={{
          title: "Add a Project",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={Screens.ViewDeadline}
        component={ViewDeadlineScreen}
        options={{
          title: "View Deadline",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={Screens.AddDeadline}
        component={ViewDeadlineScreen}
        options={{
          title: "Add Deadline",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={Screens.ViewTodo}
        component={ViewTodoScreen}
        options={{
          title: "Edit task",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={Screens.AddTodo}
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
