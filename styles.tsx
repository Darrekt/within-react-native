import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  centered: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const textStyles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "400"
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  centered: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});