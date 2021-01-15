import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const textStyles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "400"
  },
});