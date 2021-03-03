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
    <View style={globalStyles.column}>
      <View
        style={{
          ...globalStyles.row,
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <Text style={textStyles.header}>{header}</Text>
        <View style={{ flex: 1 }}>{dropdown}</View>
      </View>
      {children}
    </View>
  );
}
