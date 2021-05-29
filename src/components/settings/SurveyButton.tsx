import React from "react";
import { TouchableOpacity } from "react-native";
import { Foundation } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../screens/navConstants";

const SurveyButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginLeft: 10 }}
      onPress={() => navigation.navigate(Screens.Survey)}
    >
      <Foundation name="clipboard-pencil" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default SurveyButton;
