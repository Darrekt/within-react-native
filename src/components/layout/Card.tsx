import React, { ReactNode } from "react";
import {
  ViewStyle,
  TouchableOpacity,
  Platform,
  View,
  useWindowDimensions,
} from "react-native";
import { ShadowHeight } from "../../util/constants";

type CardProps = {
  children?: ReactNode;
  style?: ViewStyle;
  elevation?: ShadowHeight;
  opacity?: number;
  cornerRadius?: number;
  noShadow?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

const Card = ({
  children,
  style,
  elevation = 2,
  opacity = 0.3,
  cornerRadius = 20,
  noShadow = false,
  onPress,
  onLongPress,
}: CardProps) => {
  const windowDimensions = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.6}
    >
      <View
        style={{
          height: windowDimensions.height * 0.2,
          width: windowDimensions.width - 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: cornerRadius,
          marginVertical: 10,
          ...(!noShadow &&
            Platform.select({
              ios: {
                shadowOffset: { width: 1, height: elevation / 3 },
                shadowRadius: (elevation ?? 0) / 3,
                shadowOpacity: opacity,
              },
              android: {
                elevation: elevation,
              },
            })),
          ...style,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
