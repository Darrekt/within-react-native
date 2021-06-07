import React, { ReactNode } from "react";
import { View, Text, TextStyle, useWindowDimensions } from "react-native";
import { globalStyles, textStyles } from "../../../styles";

type HeadingDropDownProps = {
  header: string;
  headerStyle?: TextStyle;
  topMargin?: string | number;
  dropdown?: ReactNode;
  children: ReactNode;
};

export default function HeadingDropDown({
  header,
  headerStyle,
  topMargin,
  dropdown,
  children,
}: HeadingDropDownProps) {
  const windowDimensions = useWindowDimensions()
  return (
    <View style={{ ...globalStyles.column, justifyContent: "flex-start", marginTop: topMargin }}>
      <View
        style={{
          ...globalStyles.row,
          alignItems: "center",
          alignSelf: "stretch",
          marginBottom: 10,
        }}
      >
        <Text style={{ ...textStyles.header, ...headerStyle }}>{header}</Text>
        <View style={{ marginRight: 15 }}>{dropdown}</View>
      </View>
      {children}
    </View>
  );
}
