import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles";
import DateListView from "../components/todo/DateListView";
import ProjectProgressGraph from "../components/todo/ProjectProgressGraph";
import ProjectProgressBarChart from "../components/todo/ProjectProgressBarChart";

export const StatScreen = () => (
  <View style={globalStyles.centered}>
    <ProjectProgressBarChart></ProjectProgressBarChart>
  </View>
);

export default StatScreen;
