import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getTimeLeft, printTimeLeft } from "../../util/timer";
import { TodoEntity } from "../../models/Todo";
import CircleButtonGroup from "../util/CircleButtonGroup";
import { Icon } from "react-native-elements";
import { Actions, TodoAction } from "../../redux/actions/actionTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSettings } from "../../redux/selectors";

const styles = StyleSheet.create({
  positionedLogo: {
    height: "40%",
    position: "absolute",
    top: "15%",
    justifyContent: "flex-start",
  },
  timerFont: {
    fontSize: 64,
    fontWeight: "400",
    padding: "5%",
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

  let displayVal;
  if (selectedTask.finishingTime)
    displayVal = getTimeLeft(selectedTask.finishingTime);
  else if (selectedTask.remaining) displayVal = selectedTask.remaining;
  else displayVal = settings.defaultInterval;

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(displayVal));

  // FIXME: This implementation completes a task twice.
  // Every time the component re-renders, check if the todo is running (finishingTime).
  // If running, setTimeLeft in one second.
  // If paused, display the remaining time
  // If not running, display defaultInterval
  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (timeLeft === 0)
          dispatch({ type: Actions.TodoFinish, payload: selectedTask });
        else if (selectedTask.finishingTime)
          setTimeLeft(getTimeLeft(selectedTask.finishingTime));
      },
      selectedTask.finishingTime ? 1000 : 0
    );

    return () => {
      clearTimeout(timer);
    };
  });

  const timerActions: {
    key: string;
    action: TodoAction;
    icon: JSX.Element;
  }[] = [
    {
      key: "timerControl",
      action: {
        type: selectedTask.finishingTime
          ? Actions.TodoPause
          : Actions.TodoStart,
        payload: selectedTask,
        interval: settings.defaultInterval,
      },
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
      action: { type: Actions.TodoReset, payload: selectedTask },
      icon: <Icon reverse name="ios-refresh" type="ionicon" color="black" />,
    },
  ];
  return (
    <View style={styles.positionedLogo}>
      <Text style={styles.timerFont}>{printTimeLeft(timeLeft)}</Text>
      <CircleButtonGroup actions={timerActions} dispatch={dispatch} active />
    </View>
  );
};

export default TodoTimerDisplay;
