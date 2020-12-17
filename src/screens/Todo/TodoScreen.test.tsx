import React from "react";
import { View, StyleSheet } from "react-native"
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import TodoScreen from "./TodoScreen";

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    height: 30,
  },
  modalHeaderText: {
    fontSize: 24,
  },
});


test("Renders TodoScreen", () => {
  const { getByTestId, getByText, queryByTestId, toJSON } = render(
    <View style={styles.modalContainer}/>
  );
});
