import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { globalStyles } from "../../../styles";
import { List } from "immutable";
import Todo from "../../models/Todo";

type IProps = {
  todos: Array<Todo>;
  addTodo: (item: Todo) => void;
  isOpen: boolean;
  taskIsRunning?: boolean;
};

const TodoListHeader = ({ todos, addTodo, isOpen, taskIsRunning }: IProps) => {
  return (
    <View style={isOpen ? styles.headerRow : globalStyles.centered}>
      <Text style={styles.modalHeaderText}>
        {isOpen ? "Your Todos" : `${todos.length} tasks remaining`}
      </Text>
      {isOpen && (
        <Pressable
          onPress={() => {
            console.log("pressed once");
            addTodo(new Todo({ name: "first task" }));
          }}
        >
          <Entypo name="add-to-list" size={20} color="black" />
        </Pressable>
      )}
    </View>
  );

  // <View>
  //   <Text>Task List</Text>
  //   <TextInput
  //     style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
  //     onChangeText={text => { }}
  //     placeholder="Create a task"
  //     clearTextOnFocus
  //     // onSubmitEditing
  //     onFocus={openModal}
  //     onBlur={closeModal}
  //   />
  // </View>
};

const styles = StyleSheet.create({
  headerRow: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalHeaderText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
});

export default TodoListHeader;
