import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { getTimeLeft, printTimeLeft } from "../../util/timer";
import { TodoEntity } from "../../models/Todo";
import CircleButtonGroup from "../util/CircleButtonGroup";
import { Icon } from "react-native-elements";
import { Actions, TodoAction } from "../../redux/actions/actionTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSettings } from "../../redux/selectors";
import {
  pauseFirebaseTodo,
  startFirebaseTodo,
  resetFirebaseTodo,
} from "../../redux/actions/todos/thunks";
import { AppThunk } from "../../redux/store";

const styles = StyleSheet.create({
  positionedLogo: {
    position: "absolute",
    top: "15%",
    height: "40%",
    width: Dimensions.get("window").width,
    alignSelf: "stretch"
  },
  timerTextContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  timerFont: {

    fontSize: 64,
    fontWeight: "400",
    color: "black",
  },
  img: {
    flex: 3,
    margin: 20,
    resizeMode: "contain",
  },
  modalHeaderText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
  },
});

type DisplayProps = {
  selectedTask?: TodoEntity;
};

const TodoTimerDisplay = ({ selectedTask }: DisplayProps) => {
  const dispatch = useAppDispatch();
  if (selectedTask) {
    return (
      <TodoTimer selectedTask={selectedTask} dispatch={dispatch}></TodoTimer>
    );
  } else {
    return <View style={styles.positionedLogo}></View>;
  }
};

type TimerProps = {
  selectedTask: TodoEntity;
  dispatch: React.Dispatch<TodoAction>;
};

const TodoTimer = ({ selectedTask, dispatch }: TimerProps) => {
  const settings = useAppSelector(getSettings);

  let secondsLeft;
  if (selectedTask.finishingTime)
    secondsLeft = getTimeLeft(selectedTask.finishingTime);
  else if (selectedTask.remaining) secondsLeft = selectedTask.remaining;
  else secondsLeft = settings.defaultInterval;

  const [timeLeft, setTimeLeft] = useState(secondsLeft);

  useEffect(() => {
    if (!selectedTask.finishingTime && !selectedTask.remaining)
      setTimeLeft(settings.defaultInterval);
    if (timeLeft === 0 && selectedTask.finishingTime) {
      dispatch({ type: Actions.TodoFinish, payload: selectedTask });
      return;
    }
    // in one second, if the task is running, set the time left on the task.
    const timer = setTimeout(() => {
      if (selectedTask.finishingTime)
        setTimeLeft(getTimeLeft(selectedTask.finishingTime));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  const timerActions: {
    key: string;
    action: TodoAction | AppThunk;
    icon: JSX.Element;
  }[] = [
      {
        key: "timerControl",
        action: selectedTask.finishingTime
          ? pauseFirebaseTodo(selectedTask)
          : startFirebaseTodo(selectedTask),

        icon: (
          <Icon
            reverse
            name={selectedTask.finishingTime ? "pause" : "caretright"}
            type="antdesign"
          />
        ),
      },
      {
        key: "timerReset",
        action: resetFirebaseTodo(selectedTask),
        icon: <Icon reverse name="ios-refresh" type="ionicon" color="black" />,
      },
    ];
  return (
    <View style={styles.positionedLogo}>
      <View style={styles.timerTextContainer}>
        <Text style={styles.timerFont}>{printTimeLeft(timeLeft)}</Text>
      </View>
      <CircleButtonGroup actions={timerActions} active />
    </View>
  );
};

export default TodoTimerDisplay;
