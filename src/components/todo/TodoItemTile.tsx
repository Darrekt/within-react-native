import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ListItem, withBadge, Button } from "react-native-elements";
import { TodoEntity } from "../../models/Todo";
import { useNavigation } from "@react-navigation/core";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectTodo } from "../../redux/actions/todos/actions";
import {
  completeFirebaseTodo,
  deleteFirebaseTodo,
} from "../../redux/actions/todos/thunks";
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
    flex: 5,
    fontSize: 17,
    fontWeight: "400",
    color: "black",
  },
  unselectedTileText: {
    textDecorationStyle: "solid",
    color: "grey",
  },
});

type Props = {
  todo: TodoEntity;
  selected: boolean;
  running: boolean;
};

const TodoItemTile = ({ todo, selected, running }: Props) => {
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const BadgedText = withBadge(todo.laps, {
    badgeStyle: {
      backgroundColor: theme.dark,
      position: "absolute",
      top: -4,
      right: 8,
    },
    right: 10,
    hidden: todo.laps === 0,
  })(Text);

  return (
    <ListItem.Swipeable
      linearGradientProps={{
        start: { x: 0, y: 0 },
        end: { x: 0.5, y: 0.5 },
        colors: selected
          ? [theme.primary, theme.gradientFade]
          : ["white", "white"],
      }}
      ViewComponent={LinearGradient}
      rightContent={
        <Button
          title="Delete"
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: "100%", backgroundColor: 'red' }}
          onPress={() => deleteFirebaseTodo(todo)}
        />
      }
    >
      <TouchableOpacity
        onPress={() => { !running && dispatch(selectTodo(todo)) }}
        onLongPress={() => navigation.navigate(Screens.ViewTodo, { id: todo.id })}
      >
        <ListItem.Content style={styles.tileRow}>
          <ListItem.Title>
            <BadgedText style={styles.tileIconStyle}>{todo.emoji}</BadgedText>
          </ListItem.Title>
          <ListItem.Subtitle style={!selected && running
            ? { ...styles.tileTitleTextStyle, ...styles.unselectedTileText }
            : styles.tileTitleTextStyle
          }>
            {todo.name}
          </ListItem.Subtitle>
          <ListItem.CheckBox
            checked={todo.completed}
            checkedColor={theme.dark}
            disabled={running || selected}
            onPress={() => dispatch(completeFirebaseTodo(todo))}
          ></ListItem.CheckBox>
        </ListItem.Content>
      </TouchableOpacity>
    </ListItem.Swipeable>
  );
};

export default TodoItemTile;
