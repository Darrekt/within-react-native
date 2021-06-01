import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon, ListItem, withBadge } from "react-native-elements";
import { TodoEntity } from "../../models/Todo";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CircleButtonGroup from "../util/CircleButtonGroup";
import { useNavigation } from "@react-navigation/core";
import { TodoAction } from "../../redux/actions/actionTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectTodo } from "../../redux/actions/todos/actions";
import {
  completeFirebaseTodo,
  deleteFirebaseTodo,
} from "../../redux/actions/todos/thunks";
import { AppThunk } from "../../redux/store";
import { Screens } from "../../screens/navConstants";
import LinearGradient from "react-native-linear-gradient";
import { getTheme } from "../../redux/selectors";

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
    marginRight: 20,
    fontSize: 20,
  },
  tileTitleTextStyle: {
    flex: 6,
    fontSize: 20,
    fontWeight: "400",
  },
  unselectedTileText: {
    textDecorationStyle: "solid",
    color: "grey",
  },
  completedTileTitleTextStyle: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

type Props = {
  todo: TodoEntity;
  selected: string;
  running: boolean;
};

const TodoItemTile = ({ todo, selected, running }: Props) => {
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  let itemTitleTextStyle = todo.completed
    ? { ...styles.tileTitleTextStyle, ...styles.completedTileTitleTextStyle }
    : styles.tileTitleTextStyle;

  itemTitleTextStyle =
    todo.id !== selected && running
      ? { ...itemTitleTextStyle, ...styles.unselectedTileText }
      : itemTitleTextStyle;

  const buttons: {
    key: string;
    action: TodoAction | AppThunk;
    icon: JSX.Element;
  }[] = [
    {
      key: todo.id + "complete",
      action: completeFirebaseTodo(todo),
      icon: todo.completed ? (
        <Icon name="ios-refresh" type="ionicon" color="black" />
      ) : (
        <AntDesign
          key={todo.id + "complete"}
          name="check"
          size={20}
          color="black"
        />
      ),
    },
    {
      key: todo.id + "delete",
      action: deleteFirebaseTodo(todo),
      icon: (
        <Entypo key={todo.id + "delete"} name="cross" size={20} color="black" />
      ),
    },
  ];

  const BadgedText = withBadge(todo.laps, {
    badgeStyle: {
      backgroundColor: "#00C0DA",
      position: "absolute",
      top: -8,
      right: 8,
    },
    right: 10,
    hidden: todo.laps === 0,
  })(Text);

  return (
    <ListItem
      topDivider
      linearGradientProps={{
        start: { x: 0, y: 0 },
        end: { x: 0.5, y: 0.5 },
        colors: selected
          ? [theme.primary, theme.gradientFade]
          : ["white", "white"],
      }}
      ViewComponent={LinearGradient}
    >
      <TouchableOpacity
        onPress={() => {
          if (!running) dispatch(selectTodo(todo));
        }}
        onLongPress={() => {
          navigation.navigate(Screens.ViewTodo, { id: todo.id });
        }}
      >
        <ListItem.Content style={styles.tileRow}>
          <BadgedText>{todo.emoji}</BadgedText>
          <ListItem.Title style={itemTitleTextStyle}>
            {todo.name}
          </ListItem.Title>
          <CircleButtonGroup
            actions={buttons}
            active={!running || todo.id == selected}
          />
        </ListItem.Content>
      </TouchableOpacity>
    </ListItem>
  );
};

export default TodoItemTile;
