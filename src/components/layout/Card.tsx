import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { Platform, View, StyleSheet, Dimensions } from "react-native";

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
  elevation?: number;
  opacity?: number;
  cornerRadius?: number;
  noShadow?: boolean;
};

const Card = ({
  children,
  style,
  elevation = 2,
  opacity = 0.5,
  cornerRadius = 20,
  noShadow = false,
}: CardProps) => {
  const cardStyle = StyleSheet.create({
    container: {
      minHeight: Dimensions.get("window").height * 0.2,
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
            shadowRadius: elevation + 3,
            shadowOpacity: opacity,
          },
          android: {
            elevation: elevation,
            shadowRadius: 5,
            shadowOpacity: opacity,
          },
        })),
    },
  });

  return <View style={{ ...cardStyle.container, ...style }}>{children}</View>;
};

export default Card;
