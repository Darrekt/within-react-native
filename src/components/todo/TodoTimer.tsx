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

const getTimeLeft = (todo: Todo | undefined) => {
  // FIXME: Have a global time setting instead of 00:00
  if (todo?.finishingTime) {
    const now = new Date();
    const difference = (todo.finishingTime.valueOf() - now.valueOf()) / 1000;
    const minutes = Math.floor(difference / 60);
    const seconds = Math.floor(difference % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  } else return "00:00";
};

type Props = {
  selectedTask?: Todo;
  dispatch: React.Dispatch<TodoTimerAction>;
};

const TodoTimer = ({ selectedTask, dispatch }: Props) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(selectedTask));

  // FIXME: Misses the first tick of the timer
  useEffect(() => {
    const timer = setTimeout(
      () => setTimeLeft(getTimeLeft(selectedTask)),
      selectedTask?.finishingTime ? 1000 : 0
    );
    return () => {
      setTimeLeft(getTimeLeft(selectedTask));
      clearTimeout(timer);
    };
  });

  if (selectedTask) {
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
        <Text style={styles.timerFont}>{timeLeft}</Text>
        <CircleButtonGroup actions={timerActions} dispatch={dispatch} />
      </View>
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

export default TodoTimer;
