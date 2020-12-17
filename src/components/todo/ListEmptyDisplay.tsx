import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../../styles";

const ListEmptyDisplay = () =>
  <View style={globalStyles.centered}>
    <Text>You have no todos!</Text>
  </View>

export default ListEmptyDisplay;
