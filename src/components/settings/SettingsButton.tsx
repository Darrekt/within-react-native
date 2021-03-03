import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const SettingsButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
      <Icon name="settings" type="materialicons" />
    </TouchableOpacity>
  );
};

export default SettingsButton;
