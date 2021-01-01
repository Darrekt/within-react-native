import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TodoTimerAction } from "../../hooks/useTodoRepository";
import Todo from "../../models/Todo";
import CircleButtonGroup from "../CircleButtonGroup";
import { Icon } from "react-native-elements";

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
  selectedTask?: Todo;
  dispatch: React.Dispatch<TodoTimerAction>;
};

const TodoTimerDisplay = ({ selectedTask, dispatch }: DisplayProps) => {
  if (selectedTask) {
    return (
      <TodoTimer selectedTask={selectedTask} dispatch={dispatch}></TodoTimer>
    );
  } else {
    return (
      <View style={styles.positionedLogo}>
        <Image
          style={styles.img}
          source={require("../../../assets/old_mascot/attention.png")}
        />
        <Text style={styles.modalHeaderText}>
          Select a task to get started on!
        </Text>
      </View>
    );
  }
};

const getTimeLeft = (todo: Todo | undefined) => {
  // FIXME: Have a global time setting instead of 25:00
  if (todo?.finishingTime) {
    const now = new Date();
    return Math.max(
      0,
      Math.floor((todo.finishingTime.valueOf() - now.valueOf()) / 1000)
    );
  } else return 25 * 60;
};

const printTimeLeft = (secondsLeft: number) => {
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft / 60) % 60);
  const seconds = Math.floor(secondsLeft % 60);
  return `${hours ? `${hours}:` : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

type TimerProps = {
  selectedTask: Todo;
  dispatch: React.Dispatch<TodoTimerAction>;
};

const TodoTimer = ({ selectedTask, dispatch }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(selectedTask));

  useEffect(() => {
    const timer = setTimeout(
      () =>
        timeLeft === 0
          ? dispatch({ type: "finished", target: selectedTask.id })
          : setTimeLeft(getTimeLeft(selectedTask)),
      selectedTask.finishingTime ? 1000 : 0
    );
    return () => {
      setTimeLeft(getTimeLeft(selectedTask));
      clearTimeout(timer);
    };
  });

  const timerActions: {
    key: string;
    action: TodoTimerAction;
    icon: JSX.Element;
  }[] = [
    {
      key: "timerControl",
      action: {
        type: selectedTask.finishingTime ? "pause" : "start",
        target: selectedTask.id,
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
      action: { type: "reset", target: selectedTask.id },
      icon: <Icon reverse name="ios-refresh" type="ionicon" color="black" />,
    },
  ];
  return (
    <View style={styles.positionedLogo}>
      <Text style={styles.timerFont}>{printTimeLeft(timeLeft)}</Text>
      <CircleButtonGroup actions={timerActions} dispatch={dispatch} />
    </View>
  );
};

export default TodoTimerDisplay;
