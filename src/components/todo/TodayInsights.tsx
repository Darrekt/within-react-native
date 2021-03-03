import React from "react";
import { View, Dimensions } from "react-native";
import Card from "../../components/layout/Card";
import { globalStyles } from "../../../styles";

export default function TodayInsights() {
  return (
    <Card
      style={{
        height: Dimensions.get("window").height * 0.2,
        width: Dimensions.get("window").width * 0.7,
        marginHorizontal: 20,
      }}
    >
      <View style={globalStyles.row}>
        <View></View>
      </View>
    </Card>
  );
}
