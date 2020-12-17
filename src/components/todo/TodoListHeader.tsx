import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../../styles";
import Todo from "../../models/Todo";
import { TodoRepoAction } from "../../hooks/useTodoRepository";
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  modalHeaderText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  openHeader: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  openHeaderTitle: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  openHeaderButtonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

type IProps = {
  todos: Array<Todo>;
  dispatch: React.Dispatch<TodoRepoAction>;
  isOpen: boolean;
  taskIsRunning?: boolean;
};

const TodoListHeader = ({ todos, dispatch, isOpen, taskIsRunning }: IProps) => {
  const navigation = useNavigation();
  return (
    <View style={isOpen ? styles.openHeader : globalStyles.centered}>
      <View style={styles.openHeaderTitle}>
        <Text style={styles.modalHeaderText}>
          {isOpen ? "Your Todos" : `${todos.length} tasks remaining`}
        </Text>
      </View>
      {isOpen && (
        <View style={styles.openHeaderButtonRow}>
          <Pressable
            onPress={() => {
              dispatch({
                name: "flush",
              });
            }}
          >
            <MaterialIcons name="clear-all" size={24} color="black" />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("AddTodoScreen")
            }}
          >
            <Entypo name="add-to-list" size={20} color="black" />
          </Pressable>
        </View>
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

export default TodoListHeader;
