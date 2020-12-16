import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Todo from "../../models/Todo";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  tileRow: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tileIconStyle: {
    flex: 1,
  },
  tileTitleTextStyle: {
    flex: 6,
    fontSize: 20,
    fontWeight: "400",
  },
  tileActions: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalHeaderText: {
    fontSize: 24,
  },
});

const TodoItemTile = ({ todo }: { todo: Todo }) => {
  return (
    <ListItem topDivider>
      <ListItem.Content style={styles.tileRow}>
        <Text style={styles.tileIconStyle}></Text>
        <ListItem.Title style={styles.tileTitleTextStyle}>
          {todo.name}
        </ListItem.Title>
        <View style={styles.tileActions}>
          <Pressable
            onPress={() => {
              //   addTodo(new Todo({ name: "first task" }));
            }}
          >
            <AntDesign name="check" size={24} color="black" />
          </Pressable>
          <Pressable
            onPress={() => {
              //   addTodo(new Todo({ name: "first task" }));
            }}
          >
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
          <Pressable
            onPress={() => {
              //   addTodo(new Todo({ name: "first task" }));
            }}
          >
            <FontAwesome name="sort" size={24} color="black" />
          </Pressable>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default TodoItemTile;
