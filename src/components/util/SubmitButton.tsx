import React from "react";
import { globalStyles, textStyles } from "../../../styles";
import { Dimensions, Text, TouchableOpacity, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";

type SubmitButtonProps = {
  text: string;
  onPress: () => void;
  width?: number | string;
  style?: ViewStyle;
};

function SubmitButton({ text, onPress, width, style }: SubmitButtonProps) {
  const theme = useAppSelector(getTheme);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        ...style,
        width: width ?? Dimensions.get("screen").width * 0.8,
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={[theme.primary, theme.light]}
        style={{
          ...globalStyles.submitButton,
          width: "100%",
        }}
      >
        <Text style={{ ...textStyles.buttonText, color: theme.text.primary }}>
          {text.toUpperCase()}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default SubmitButton;
