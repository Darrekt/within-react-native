import { Platform, ViewStyle } from "react-native";

export const addShadow = (elevation: number) => (style: ViewStyle) => ({
  ...style,
  ...Platform.select({
    ios: {
      shadowOffset: { width: 1, height: elevation / 2 },
      shadowRadius: elevation * 2,
    },
    android: {
      elevation: elevation,
    },
  }),
});
