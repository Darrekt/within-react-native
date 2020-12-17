import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Todo from "../../models/Todo";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { TodoRepoAction } from "../../hooks/useTodoRepository";

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
  completedTileTitleTextStyle: {
    flex: 6,
    fontSize: 20,
    fontWeight: "400",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
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

const TodoItemTile = ({
  todo,
  dispatch,
}: {
  todo: Todo;
  dispatch: React.Dispatch<TodoRepoAction>;
}) => {
  return (
    <ListItem topDivider>
      <ListItem.Content style={styles.tileRow}>
        <Text style={styles.tileIconStyle}></Text>
        <ListItem.Title
          style={
            todo.completed
              ? styles.completedTileTitleTextStyle
              : styles.tileTitleTextStyle
          }
        >
          {todo.name}
        </ListItem.Title>
        <View style={styles.tileActions}>
          <Pressable
            onPress={() => {
              dispatch({
                name: "update",
                payload: new Todo({ ...todo, completed: !todo.completed }),
              });
            }}
          >
            {todo.completed
              ? <Ionicons name="ios-refresh" size={20} color="black" />
              : <AntDesign name="check" size={20} color="black" />
            }
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch({ name: "delete", payload: todo });
            }}
          >
            <Entypo name="cross" size={20} color="black" />
          </Pressable>
          <Pressable
            onPress={() => {
              console.log("Implement sort");
            }}
          >
            <FontAwesome name="sort" size={20} color="black" />
          </Pressable>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default TodoItemTile;
