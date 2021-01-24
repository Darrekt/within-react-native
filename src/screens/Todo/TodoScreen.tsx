import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import { TodoContext } from "./../../state/context";
import useTodoRepository from "../../hooks/useTodoRepository";
import AddTodoScreen from "./../../screens/Todo/AddTodoScreen";
import * as TodoComponents from "../../components/todo/TodoComponents";
import SettingsButton from "../../components/SettingsButton";

const styles = StyleSheet.create({
  spacer: {
    height: 30,
  },
});

const Stack = createStackNavigator();

const TodoScreen = () => {
  const modalizeRef = React.useRef<Modalize>(null);
  const windowHeight = useWindowDimensions().height;
  const [isOpen, setIsOpen] = React.useState(false);
  const { todos, dispatch, running, selected } = React.useContext(TodoContext);

  return (
    <View style={globalStyles.container}>
      {!isOpen && (
        <Header
          placement="left"
          backgroundColor="transparent"
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
          name="AddTodoScreen"
          component={AddTodoScreen}
          options={{
            title: "Add a task",
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </TodoContext.Provider>
  );
};

export default TodoNavigator;
