import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { getTheme } from "../redux/selectors";

export default function ThemedTextInput(props: TextInputProps) {
  const theme = useAppSelector(getTheme);
  return <TextInput style={{ ...props.style, borderColor: theme.dark }} />;
}
