import React from "react";
import { View, useWindowDimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import { ProjContext, TodoContext } from "./../../state/context";
import LinearGradient from "react-native-linear-gradient";
import useTodoRepository from "../../hooks/useTodoRepository";
import ViewProjectScreen from "./../../screens/Todo/ViewProjectScreen";
import AddProjectScreen from "./../../screens/Todo/AddProjectScreen";
import AddTodoScreen from "./../../screens/Todo/AddTodoScreen";
import * as TodoComponents from "../../components/todo/TodoComponents";
import SettingsButton from "../../components/settings/SettingsButton";
import useProjectRepository from "../../hooks/useProjectRepository";

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
          selectedTask={selected}
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
          keyExtractor: (item) => item.id,
          renderItem: ({ item }) => (
            <TodoComponents.ItemTile
              todo={item}
              running={running}
              dispatch={dispatch}
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
  const [projects, proj_dispatch] = useProjectRepository();

  return (
    <ProjContext.Provider
      value={{ projects: projects, dispatch: proj_dispatch }}
    >
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
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="AddProjScreen"
            component={AddProjectScreen}
            options={{
              title: "Add a Project",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="AddTodoScreen"
            component={AddTodoScreen}
            options={{
              title: "Add a task",
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </TodoContext.Provider>
    </ProjContext.Provider>
  );
};

export default TodoNavigator;
