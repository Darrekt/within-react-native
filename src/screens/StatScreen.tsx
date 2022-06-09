import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles";
import DateListView from "../components/todo/DateListView";
import ProjectProgressGraph from "../components/todo/ProjectProgressGraph";

export const StatScreen = () => (
  <View style={globalStyles.centered}>
    <ProjectProgressGraph></ProjectProgressGraph>
  </View>
);

export default StatScreen;
