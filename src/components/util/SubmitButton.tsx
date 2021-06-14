import React, { useEffect, useState } from "react";
import { textStyles } from "../../../styles";
import {
  Keyboard,
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
  alwaysShow?: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

function SubmitButton({
  text,
  alwaysShow = false,
  onPress,
  style,
}: SubmitButtonProps) {
  const theme = useAppSelector(getTheme);
  const windowDimensions = useWindowDimensions();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return alwaysShow || !isKeyboardVisible ? (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        width: windowDimensions.width * 0.8,
        ...style,
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={[theme.primary, theme.light]}
        style={addShadow(4)({
          height: windowDimensions.height * 0.04,
          minHeight: 30,
          width: "100%",
          marginBottom: windowDimensions.height * 0.02,
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
  ) : null;
}

export default SubmitButton;
