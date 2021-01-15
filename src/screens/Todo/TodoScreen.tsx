import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import { TodoContext } from "./../../state/context";
import useTodoRepository from "../../hooks/useTodoRepository";
import * as TodoComponents from "../../components/todo/TodoComponents";
import AddTodoScreen from "./AddTodoScreen";
import SettingsButton from "../../components/SettingsButton"
import SettingsScreen from "../SettingsScreen"

const styles = StyleSheet.create({
  spacer: {
    height: 30,
  },
});

const Stack = createStackNavigator();

const TodoScreen = () => {
  const [repo, dispatch, selected, running] = useTodoRepository();

  return (
    <TodoContext.Provider
      value={{
        todos: repo,
        dispatch: dispatch,
        selected: selected,
        running: running,
      }}
    >
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="TodoScreenHome"
          component={TodoScreenContents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: "Settings", headerBackTitle:"Back" }}
        />
        <Stack.Screen
          name="AddTodoScreen"
          component={AddTodoScreen}
          options={{ title: "Add a task" }}
        />
      </Stack.Navigator>
    </TodoContext.Provider>
  );
};

const TodoScreenContents = () => {
  const { todos, dispatch, selected, running } = React.useContext(TodoContext);
  const modalizeRef = React.useRef<Modalize>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const windowHeight = useWindowDimensions().height;

  return (
    <View style={globalStyles.container}>
      {!isOpen && (
        <Header
          placement="left"
          backgroundColor="transparent"
          leftComponent={{ icon: "menu", color: "#000" }}
          rightComponent={SettingsButton()}
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
        alwaysOpen={100}
        handlePosition="inside"
        withOverlay={false}
        onPositionChange={(position) => {
          position == "top" ? setIsOpen(true) : setIsOpen(false);
        }}
        panGestureEnabled={!running || !isOpen}
        HeaderComponent={<View style={styles.spacer}></View>}
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

export default TodoScreen;
