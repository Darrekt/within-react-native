import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../screens/navConstants";

const SettingsButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(Screens.Settings)}>
      <Icon name="settings" type="materialicons" />
    </TouchableOpacity>
  );
};

export default SettingsButton;
