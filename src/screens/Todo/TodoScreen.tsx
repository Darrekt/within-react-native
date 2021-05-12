import React from "react";
import { View, useWindowDimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import { TodoContext } from "./../../state/context";
import LinearGradient from "react-native-linear-gradient";
import useTodoRepository from "../../hooks/useTodoRepository";
import * as TodoComponents from "../../components/todo/TodoComponents";
import SettingsButton from "../../components/settings/SettingsButton";

import ViewProjectScreen from "./../../screens/Todo/ViewProjectScreen";
import ViewTodoScreen from "./ViewTodoScreen";
import Todo from "../../models/Todo";

const Stack = createStackNavigator();

const TodoScreen = () => {
  const modalizeRef = React.useRef<Modalize>(null);
  const windowHeight = useWindowDimensions().height;
  const [isOpen, setIsOpen] = React.useState(false);
  const { todos, dispatch, running, selected } = React.useContext(TodoContext);

  return (
    <View style={globalStyles.container}>
      {!isOpen && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          colors={["#01D1EE", "#96E9F5"]}
          style={{
            position: "absolute",
            height: "37%",
            width: "100%",
            top: 0,
            // borderBottomStartRadius: 20,
            // borderBottomEndRadius: 20,
          }}
        />
      )}
      {!isOpen && (
        <Header
          backgroundColor="transparent"
          rightComponent={SettingsButton()}
          containerStyle={{ borderBottomWidth: 0 }}
        />
      )}
      {isOpen ? (
        <TodoComponents.TimerDisplay
          selectedTask={todos.find((todo) => todo.id == selected)}
          dispatch={dispatch}
        />
      ) : (
        <TodoComponents.HomeDisplay />
      )}
      <Modalize
        ref={modalizeRef}
        modalHeight={windowHeight * 0.45}
        alwaysOpen={80}
        handlePosition="inside"
        withOverlay={false}
        onPositionChange={(position) => {
          position == "top" ? setIsOpen(true) : setIsOpen(false);
        }}
        panGestureEnabled={!running || !isOpen}
        HeaderComponent={<View style={globalStyles.spacer}></View>}
        flatListProps={{
          ListHeaderComponent: (
            <TodoComponents.ListHeader
              todos={todos.toArray()}
              dispatch={dispatch}
              isOpen={isOpen}
            />
          ),
          data: isOpen ? todos.toArray() : [],
          keyExtractor: (item: Todo) => item.id,
          renderItem: ({ item }) => (
            <TodoComponents.ItemTile
              todo={item}
              dispatch={dispatch}
              selected={selected}
              running={running}
            />
          ),
          ListEmptyComponent: isOpen
            ? TodoComponents.ListEmptyDisplay
            : undefined,
        }}
      />
    </View>
  );
};

const TodoNavigator = () => {
  const [todos, dispatch, selected, running] = useTodoRepository();

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        dispatch: dispatch,
        selected: selected,
        running: running,
      }}
    >
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
    </TodoContext.Provider>
  );
};

export default TodoNavigator;
