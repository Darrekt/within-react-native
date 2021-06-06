import React, { ReactNode } from "react";
import { useWindowDimensions, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../../styles";
export type Props = {
  children: ReactNode;
  button: ReactNode;
  nakedPage?: boolean;
  centerFields?: boolean;
};

export default function OneButtonForm({
  children,
  button,
  nakedPage = false,
  centerFields = true,
}: Props) {
  const windowDimensions = useWindowDimensions();
  const edges: readonly Edge[] = nakedPage
    ? ["bottom", "left", "right"]
    : ["left", "right"];
  return (
    <SafeAreaView edges={edges}>
      <View
        style={{
          ...globalStyles.form,
          justifyContent: centerFields ? "center" : "flex-start",
        }}
      >
        {children}
        <View
          style={{
            position: "absolute",
            width: windowDimensions.width,
            bottom: windowDimensions.width * 0.05,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {button}
        </View>
      </View>
    </SafeAreaView>
  );
}
