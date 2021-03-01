import { StyleSheet } from "react-native";

// https://paletton.com/#uid=13l0u0kl1Wx1x+IcEXDsUWkWEVB

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
    margin: 8,
    height: 45,
    width: "70%",
    padding: 10,
    borderColor: "#56DEF1",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#01D1EE",
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
  avatarName: { fontSize: 25, fontWeight: "400", marginVertical: 20 },
  groupHeader: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "400",
  },
  validationMessage: {
    width: "70%",
    color: "red"
  },
});
