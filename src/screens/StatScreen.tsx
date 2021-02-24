import React from "react";
import { NativeModules, View, Button } from "react-native";
import { globalStyles } from "../../styles";

const { DnDMode } = NativeModules;

export const StatScreen = () => (
  <View style={globalStyles.centered}>
    <Button
      color={globalStyles.submitButton.backgroundColor}
      onPress={() => DnDMode.turnOnDND()}
      title="Silence Notifications"
    />
  </View>
);

export default StatScreen;
