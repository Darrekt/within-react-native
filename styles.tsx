import { Dimensions, StyleSheet } from "react-native";
import { ERROR_COLOR } from "./src/util/constants";

export const globalStyles = StyleSheet.create({
  spacer: {
    height: 30,
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
    width: "100%",
    paddingVertical: Dimensions.get("window").height * 0.02,
    paddingHorizontal: Dimensions.get("window").width * 0.1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputBox: {
    height: 45,
    width: Dimensions.get("window").width * 0.8,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
  },
  largeInputBox: {
    height: Dimensions.get("window").height * 0.15,
    width: "90%",
    margin: 8,
    padding: 10,
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
  bottomButtons: {
    width: Dimensions.get("window").width,
    marginBottom: Dimensions.get("window").width * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTileRow: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  itemTileTitleTextStyle: {
    flex: 5,
    fontSize: 17,
    fontWeight: "400",
    color: "black",
  },
});

export const textStyles = StyleSheet.create({
  header: {
    flex: 4,
    marginVertical: 5,
    fontSize: 22,
    fontWeight: "500",
    color: "black",
  },
  groupHeader: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },
  avatarName: { fontSize: 24, fontWeight: "400", marginVertical: 15, color: "black" },
  infoText: {
    color: "black",
  },
  questionText: {
    marginTop: 15,
    marginBottom: 8,
    alignSelf: "stretch",
    color: "black",
    fontSize: 16,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
  },
  validationMessage: {
    marginVertical: 3,
    textAlign: "left",
    alignSelf: "flex-start",
    color: ERROR_COLOR,
  },
});
