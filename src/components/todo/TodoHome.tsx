import React from "react";
import { View, Dimensions } from "react-native";
import { globalStyles } from "../../../styles";
import Card from "../layout/Card";
import HeadingDropDown from "../layout/HeadingDropDown";
import SettingsButton from "../settings/SettingsButton";

// TODO: Add a nice gradient top-fill
const HomeDisplay = () => {
  return (
    <View style={{ ...globalStyles.column }}>
      <HeadingDropDown header="Today's Insights" dropdown={SettingsButton()}>
        <Card style={{ height: Dimensions.get("window").height * 0.25 }}>
          <View style={globalStyles.row}>
            <View></View>
          </View>
        </Card>
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
