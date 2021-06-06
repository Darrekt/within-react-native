import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../../styles";
export type Props = {
  children: ReactNode;
  button: ReactNode;
};

export default function OneButtonForm({ children, button }: Props) {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <View style={globalStyles.form}>
        {children}
        <View style={globalStyles.anchoredBottomButtons}>{button}</View>
      </View>
    </SafeAreaView>
  );
}
