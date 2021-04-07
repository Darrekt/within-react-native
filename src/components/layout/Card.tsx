import React, { ReactNode } from "react";
import { ViewStyle, TouchableOpacity } from "react-native";
import { Platform, View, StyleSheet, Dimensions } from "react-native";

type CardProps = {
  children?: ReactNode;
  style?: ViewStyle;
  elevation?: number;
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
  opacity = 0.5,
  cornerRadius = 20,
  noShadow = false,
  onPress,
  onLongPress,
}: CardProps) => {
  const cardStyle = StyleSheet.create({
    container: {
      height: Dimensions.get("window").height * 0.2,
      width: Dimensions.get("window").width - 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: cornerRadius,
      marginVertical: 10,
      ...(!noShadow &&
        Platform.select({
          ios: {
            shadowOffset: { width: 1, height: elevation },
            shadowRadius: elevation ? elevation + 2 : 0,
            shadowOpacity: opacity,
          },
          android: {
            elevation: elevation,
            shadowRadius: elevation ? elevation + 2 : 0,
            shadowOpacity: opacity,
          },
        })),
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.6}
    >
      <View style={{ ...cardStyle.container, ...style }}>{children}</View>
    </TouchableOpacity>
  );
};

export default Card;
