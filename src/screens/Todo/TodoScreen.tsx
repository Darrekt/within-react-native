import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import ListEmptyDisplay from "../../components/todo/ListEmptyDisplay";
import TodoListHeader from "../../components/todo/TodoListHeader";
import TodoItemTile from "../../components/todo/TodoItemTile"
import useTodoRepository from "../../hooks/useTodoRepository";
import AddTodoScreen from "./AddTodoScreen";

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    height: 30,
  },
  modalHeaderText: {
    fontSize: 24,
  },
});

const Stack = createStackNavigator();

const TodoScreen = () =>
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="TodoScreenHome"
      component={TodoScreenContents}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} options={{ title: "Add a task" }} />
  </Stack.Navigator>

const TodoScreenContents = () => {
  const [repo, dispatch] = useTodoRepository();
  const [taskIsRunning, setTaskIsRunning] = React.useState(false);
  const modalizeRef = React.useRef<Modalize>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  // const openModal = () => modalizeRef.current?.open("top");
  // const closeModal = () => modalizeRef.current?.close("alwaysOpen");

  return (
    <View style={globalStyles.container}>
      <Image source={require("../../../assets/old_mascot/logo.png")} />
      <View>
        <Image source={require("../../../assets/old_mascot/attention.png")} />
      </View>
      <Modalize
        ref={modalizeRef}
        modalHeight={400}
        alwaysOpen={100}
        handlePosition={"inside"}
        withOverlay={false}
        onPositionChange={(position) => {
          position == "top" ? setIsOpen(true) : setIsOpen(false);
        }}
        panGestureEnabled={!taskIsRunning}
        HeaderComponent={<View style={styles.spacer}></View>}
        flatListProps={{
          ListHeaderComponent: (
            <TodoListHeader todos={repo.toArray()} dispatch={dispatch} isOpen={isOpen} />
          ),
          data: isOpen ? repo.toArray() : [],
          keyExtractor: (item) => item.id,
          renderItem: ({ item }) => <TodoItemTile todo={item} dispatch={dispatch} />,
          ListEmptyComponent: isOpen ? ListEmptyDisplay : undefined,
        }}
      />
    </View>
  );
};

export default TodoScreen;
