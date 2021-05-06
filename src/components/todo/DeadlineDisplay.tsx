import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Card from "../layout/Card";
import { globalStyles } from "../../../styles";
import Project from "../../models/Project";
import { AntDesign } from "@expo/vector-icons";
import TodoTimerDisplay from "./TodoTimer";

const styles = StyleSheet.create({
  cardStyle: {
    height: Dimensions.get("screen").height * 0.07,
  },
});

export default function DeadlineDisplay() {
  return (
    <Card style={styles.cardStyle} elevation={1} opacity={0.05}>
      <View style={globalStyles.row}>
        <Text>Emoji</Text>
        <Text>Name</Text>
        <Text>Date</Text>
      </View>
    </Card>
  );
}
