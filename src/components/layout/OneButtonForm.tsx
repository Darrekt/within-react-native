import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, useWindowDimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../../styles";
export type Props = {
  children: ReactNode;
  button?: ReactNode;
  nakedPage?: boolean;
  centerFields?: boolean;
  behaviour?: "position" | "height" | "padding";
};

export default function OneButtonForm({
  children,
  button,
  nakedPage = false,
  centerFields = true,
  behaviour
}: Props) {
  const windowDimensions = useWindowDimensions();
  const edges: readonly Edge[] = nakedPage
    ? ["bottom", "left", "right"]
    : ["left", "right"];
  return (
    <SafeAreaView edges={edges}>
      <KeyboardAvoidingView behavior={behaviour ?? Platform.OS === 'ios' ? "position" : "height"}>
        <ScrollView
          contentContainerStyle={{
            ...globalStyles.form,
            justifyContent: centerFields ? "center" : "flex-start",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {children}
          {button && <View
            style={{
              position: "absolute",
              width: windowDimensions.width,
              bottom: windowDimensions.width * 0.05,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {button}
          </View>}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}