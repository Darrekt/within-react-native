import React from "react";
import { globalStyles, textStyles } from "../../../styles";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type SubmitButtonProps = {
  text: string;
  onPress: () => void;
  width?: number | string;
};

function SubmitButton({ text, onPress, width }: SubmitButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        width: width ?? Dimensions.get("screen").width * 0.8,
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#01D1EE", "#96E9F5"]}
        style={{
          ...globalStyles.submitButton,
          width: "100%",
        }}
      >
        <Text style={textStyles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default SubmitButton;
