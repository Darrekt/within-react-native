import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import Card from "../layout/Card";
import HeadingDropDown from "../layout/HeadingDropDown";
import LongTermInsights from "./LongTermInsights";
import ShortTermInsights from "./ShortTermInsights";
import TodayInsights from "./TodayInsights";

// TODO: Add a nice gradient top-fill
const HomeDisplay = () => {
  return (
    <View style={{ ...globalStyles.column }}>
      <HeadingDropDown header="Projects">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TodayInsights></TodayInsights>
          <ShortTermInsights></ShortTermInsights>
          <LongTermInsights></LongTermInsights>
        </ScrollView>
      </HeadingDropDown>
      <HeadingDropDown header="Insights">
        <Card elevation={0}>
          <View></View>
        </Card>
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
