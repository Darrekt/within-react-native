import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  spacer: {
    height: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
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
  inputBox: {
    margin: 15,
    height: 40,
    width: "70%",
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
});

export const textStyles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "400",
  },
  avatarCaption: { fontSize: 18, fontWeight: "500", marginVertical: 20 },
  groupHeader: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "400",
  },
});
