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
import { globalStyles } from "../../../styles";

const styles = StyleSheet.create({
  tileIconStyle: {
    marginRight: 20,
    fontSize: 20,
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
        <ListItem.Content style={globalStyles.itemTileRow}>
          <ListItem.Title>
            <BadgedText style={styles.tileIconStyle}>{todo.emoji}</BadgedText>
          </ListItem.Title>
          <ListItem.Subtitle style={!selected && running
            ? { ...globalStyles.itemTileTitleTextStyle, ...styles.unselectedTileText }
            : globalStyles.itemTileTitleTextStyle
          }>
            {todo.name}
          </ListItem.Subtitle>
          <ListItem.CheckBox
            checked={todo.completed ? true : false}
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
