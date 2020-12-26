import React from "react";
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

type Props = {
  selectedTask?: Todo;
  dispatch: React.Dispatch<TodoTimerAction>;
};

const TodoTimer = ({ selectedTask, dispatch }: Props) => {
  if (selectedTask) {
    const timerActions: { action: TodoTimerAction; icon: JSX.Element }[] = [
      {
        action: {
          type: selectedTask.finishingTime ? "pause" : "start",
          target: selectedTask.id,
        },
        icon: (
          <Icon
            reverse
            name={selectedTask.finishingTime ? "caretright" : "pause"}
            type="antdesign"
          />
        ),
      },
      {
        action: { type: "reset", target: selectedTask.id },
        icon: <Icon reverse name="ios-refresh" type="ionicon" color="black" />,
      },
    ];
    return (
      <View style={styles.positionedLogo}>
        <Text style={styles.timerFont}>
          {/* TODO: Make a proper implementation of the time setting */}
          {selectedTask.finishingTime
            ? selectedTask.finishingTime.getMinutes() - new Date().getMinutes()
            : "25:00"}
        </Text>
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
