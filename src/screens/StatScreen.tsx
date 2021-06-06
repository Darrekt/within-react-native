import React from "react";
import { NativeModules, View, Text } from "react-native";
import { globalStyles } from "../../styles";

const { DnDMode } = NativeModules;

export const StatScreen = () => (
  <View style={globalStyles.centered}>
    <Text>Visualisations coming soon!</Text>
  </View>
);

export default StatScreen;
