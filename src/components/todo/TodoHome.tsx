import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { globalStyles } from "../../../styles";

const HomeDisplay = () => {
  return (
    <View style={globalStyles.centered}>
      <Image source={require("../../../assets/old_mascot/logo.png")} />
    </View>
  );
};

export default HomeDisplay;
