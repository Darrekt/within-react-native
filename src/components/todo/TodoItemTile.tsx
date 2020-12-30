import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import Todo from "../../models/Todo";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import CircleButtonGroup from "../CircleButtonGroup";
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
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

type Props = {
  todo: Todo;
  dispatch: React.Dispatch<TodoRepoAction>;
};

const TodoItemTile = ({ todo, dispatch }: Props) => {
  const itemTitleTextStyle = todo.completed
    ? { ...styles.tileTitleTextStyle, ...styles.completedTileTitleTextStyle }
    : styles.tileTitleTextStyle ;
  const buttons: { key: string, action: TodoRepoAction; icon: JSX.Element }[] = [
    {
      key: todo.id + "complete",
      action: {
        type: "completed",
        target: todo.id,
      } as TodoRepoAction,
      icon: todo.completed ? (
        <Icon  name="ios-refresh" type="ionicon" color="black" />
      ) : (
        <AntDesign key={todo.id+"complete"} name="check" size={20} color="black" />
      ),
    },
    {
      key: todo.id + "delete",
      action: {
        type: "delete",
        payload: todo,
      },
      icon: <Entypo key={todo.id+"delete"} name="cross" size={20} color="black" />,
    },
    {
      key: todo.id + "rearrange",
      action: {
        type: "completed",
        target: todo.id,
      },
      icon: <FontAwesome key={todo.id+"sort"} name="sort" size={20} color="black" />,
    },
  ];

  return (
    <ListItem topDivider>
      <TouchableOpacity
        onPress={() => {
          dispatch({
            type: "selected",
            target: todo.id,
          });
        }}
      >
        <ListItem.Content style={styles.tileRow}>
          <Text style={styles.tileIconStyle}></Text>
          <ListItem.Title style={itemTitleTextStyle}>
            {todo.name}
          </ListItem.Title>
          <CircleButtonGroup dispatch={dispatch} actions={buttons} />
        </ListItem.Content>
      </TouchableOpacity>
    </ListItem>
  );
};

export default TodoItemTile;
