import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Todo from "../../models/Todo";

const styles = StyleSheet.create({
  positionedLogo: {
    height: "30%",
    position: "absolute",
    top: "8%",
    flex: 1,
    justifyContent: "center",
  },
  timerFont: {
    fontSize: 64,
    fontWeight: "400",
  },
  img: {
    flex: 8,
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
};

const TodoTimer = ({ selectedTask }: Props) => {
  return selectedTask ? (
    <View style={styles.positionedLogo}>
      <Text style={styles.timerFont}>
        {/* TODO: Make a proper implementation of the time setting */}
        {selectedTask.finishingTime
          ? selectedTask.finishingTime.getMinutes() - new Date().getMinutes()
          : "25:00"}
      </Text>
    </View>
  ) : (
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
};

export default TodoTimer;
