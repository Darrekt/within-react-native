import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../../styles";
import Todo, { TodoEntity } from "../../models/Todo";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../screens/navConstants";

const styles = StyleSheet.create({
  modalHeaderText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
    color: "black",
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
    justifyContent: "flex-end",
  },
});

type IProps = {
  todos: TodoEntity[];
  isOpen: boolean;
};

const TodoListHeader = ({ todos, isOpen }: IProps) => {
  const navigation = useNavigation();
  return (
    <View style={isOpen ? styles.openHeader : globalStyles.centered}>
      <View style={styles.openHeaderTitle}>
        <Text style={styles.modalHeaderText}>
          {isOpen
            ? "Your Todos"
            : `${todos.length ? todos.length : "No"} task${
                !todos.length || todos.length > 1 ? "s" : ""
              } remaining`}
        </Text>
      </View>
      {isOpen && (
        <View style={styles.openHeaderButtonRow}>
          <Pressable
            onPress={() => {
              navigation.navigate(Screens.AddTodo);
            }}
          >
            <Entypo name="add-to-list" size={20} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default TodoListHeader;
