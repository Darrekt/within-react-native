import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../../styles";
import Todo from "../../models/Todo";

const styles = StyleSheet.create({
  modalHeaderText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  openHeader: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  openHeaderTitle: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  openHeaderButtonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

type Props = {
};

const TodoTimer = ({ }: Props) => {
  return (
    <View style={globalStyles.centered}>
      <View style={styles.openHeaderTitle}>
          <Image source={require("../../../assets/old_mascot/logo.png")} />
          <Text style={styles.modalHeaderText}></Text>
      </View>
    </View>
  );
};

export default TodoTimer;
