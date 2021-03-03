import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { globalStyles } from "../../../styles";
import HeadingDropDown from "../../components/layout/HeadingDropDown";
import AuthStateDisplay from "../../components/settings/AuthStateDisplay";
import SettingsGroup from "../../components/settings/SettingsGroup";
import SubmitButton from "../../components/util/SubmitButton";
import { SettingsContext } from "../../state/context";

const SettingsScreen = () => {
  const { settings, dispatch } = useContext(SettingsContext);

  const generalSettings = [
    {
      name: "Onboarding",
      subtitle: "Reset your onboarding status",
      icon: <Icon name="handshake-o" type="font-awesome" />,
      action: () => dispatch({ type: "onboarding" }),
    },
    {
      name: "Theme",
      subtitle: "Change or customise your theme",
      icon: <Icon name="palette" type="materialIcon" />,
      action: () => dispatch({ type: "theme" }),
    },
  ];

  const productivitySettings = [
    {
      name: "Maximum tasks",
      icon: <Icon name="list" />,
      action: () => dispatch({ type: "onboarding" }),
    },
    {
      name: "Timer duration",
      icon: <Icon name="timer" />,
      action: () => dispatch({ type: "theme" }),
    },
  ];

  return (
    <View
      style={{
        ...globalStyles.column,
        justifyContent: "flex-start",
        marginVertical: 20,
        marginHorizontal: 5,
      }}
    >
      <AuthStateDisplay settings={settings} dispatch={dispatch} />
      <HeadingDropDown header="Productivity">
        <SettingsGroup items={productivitySettings} />
      </HeadingDropDown>
      <HeadingDropDown header="General">
        <SettingsGroup items={generalSettings} />
      </HeadingDropDown>
      <SubmitButton
        text="Reset Settings"
        onPress={() => {
          Alert.alert(
            "Reset Warning!",
            "This action signs you out and restores all settings to default.",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => dispatch({ type: "reset", value: settings }),
              },
            ]
          );
        }}
      />
    </View>
  );
};

export default SettingsScreen;
