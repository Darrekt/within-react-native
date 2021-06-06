import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { globalStyles, textStyles } from "../../../styles";

type HeadingDropDownProps = {
  header: string;
  dropdown?: ReactNode;
  children: ReactNode;
};

export default function HeadingDropDown({
  header,
  dropdown,
  children,
}: HeadingDropDownProps) {
  return (
    <View style={{ ...globalStyles.column, justifyContent: "flex-start" }}>
      <View
        style={{
          ...globalStyles.row,
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        <Text style={textStyles.header}>{header}</Text>
        <View style={{ marginRight: 15 }}>{dropdown}</View>
      </View>
      {children}
    </View>
  );
}
