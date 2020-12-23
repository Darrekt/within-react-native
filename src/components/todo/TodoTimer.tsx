import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../../../styles";

const styles = StyleSheet.create({
  positionedLogo: {
    height: "30%",
    position: "absolute",
    top: "10%",
  },
  img: {
    resizeMode: "contain",
  },
  modalHeaderText: {
    textAlign: "center",
    fontSize: 18,
  },
});

type Props = {};

const TodoTimer = ({}: Props) => {
  return (
    <View style={styles.positionedLogo}>
      <View style={globalStyles.column}>
        <Image
          style={styles.img}
          source={require("../../../assets/old_mascot/attention.png")}
        />
        <Text style={styles.modalHeaderText}>
          Select a task to get started on!
        </Text>
      </View>
    </View>
  );
};

export default TodoTimer;
