// https://paletton.com/#uid=13l0u0kl1Wx1x+IcEXDsUWkWEVB
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
  centerInCol: {
    width: "30%",
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-around",
  },
  column: {
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
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
  lightInput: {
    margin: 4,
    height: 45,
    padding: 6,
    borderColor: "#56DEF1",
    borderBottomWidth: 2,
  },
  submitButton: {
    height: 40,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#01D1EE",
  },
  bottomButtons: {
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 20,
  },
});

export const textStyles = StyleSheet.create({
  header: {
    flex: 4,
    marginVertical: 5,
    marginHorizontal: 18,
    fontSize: 22,
    fontWeight: "500",
  },
  avatarName: { fontSize: 25, fontWeight: "400", marginVertical: 20 },
  groupHeader: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "400",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  validationMessage: {
    width: "70%",
    color: "red",
  },
});
