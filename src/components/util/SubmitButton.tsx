import React from "react";
import { textStyles } from "../../../styles";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import { addShadow } from "../../util/styleDecorators";

type SubmitButtonProps = {
  text: string;
  onPress: () => void;
  width?: number | string;
  style?: ViewStyle;
};

function SubmitButton({ text, onPress, width, style }: SubmitButtonProps) {
  const theme = useAppSelector(getTheme);
  const windowDimensions = useWindowDimensions();
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
        style={addShadow(4)({
          height: windowDimensions.height * 0.04,
          width: "100%",
          marginVertical: windowDimensions.height * 0.01,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        })}
      >
        <Text style={{ ...textStyles.buttonText, color: theme.text.primary }}>
          {text.toUpperCase()}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default SubmitButton;
