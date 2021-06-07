import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { ListItem, withBadge } from "react-native-elements";
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
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { ERROR_COLOR } from "../../util/constants";

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
    fontSize: 16,
    fontWeight: "400",
    color: "black"
  },
  unselectedTileText: {
    textDecorationStyle: "solid",
    color: "grey",
  },
  completedTileTitleTextStyle: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  leftAction: {
    width: Dimensions.get("screen").width * 0.25,
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignSelf: "stretch",
    alignContent: "flex-end",
  },
  actionText: {
    color: "white",
    width: "100%",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "transparent",
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

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 1],
    });
    return (
      <RectButton
        style={styles.leftAction}
        onPress={() => {
          console.log("pressed");
          dispatch(deleteFirebaseTodo(todo));
        }}
      >
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          Delete
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable overshootRight={false} renderRightActions={renderRightActions}>
      <ListItem
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
            <ListItem.Title>
              <BadgedText style={styles.tileIconStyle}>{todo.emoji}</BadgedText>
            </ListItem.Title>
            <ListItem.Subtitle style={itemTitleTextStyle}>
              {todo.name}
            </ListItem.Subtitle>
            <ListItem.CheckBox
              checked={todo.completed}
              checkedColor={theme.dark}
              disabled={running || todo.id !== selected}
              onPress={() => dispatch(completeFirebaseTodo(todo))}
            ></ListItem.CheckBox>
          </ListItem.Content>
        </TouchableOpacity>
      </ListItem>
    </Swipeable>
  );
};

export default TodoItemTile;
