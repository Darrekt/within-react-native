import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../../../styles";

const styles = StyleSheet.create({
  positionedLogo: {
    height: "30%",
    position: "absolute",
    top: "8%",
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

type Props = {};

const TodoTimer = ({}: Props) => {
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
};

export default TodoTimer;
