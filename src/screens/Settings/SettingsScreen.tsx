import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Button } from "react-native";
import { Icon } from "react-native-elements";
import { globalStyles } from "../../../styles";
import AuthStateDisplay from "../../components/settings/AuthStateDisplay";
import SettingsGroup from "../../components/settings/SettingsGroup";
import { SettingsContext } from "../../state/context";

const SettingsScreen = () => {
  const { settings, dispatch } = useContext(SettingsContext);
  const navigation = useNavigation();

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
      name: "Max tasks",
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
        margin: 20,
      }}
    >
      <AuthStateDisplay settings={settings} dispatch={dispatch} />
      <SettingsGroup name="General" items={generalSettings} />
      <SettingsGroup name="Productivity" items={productivitySettings} />
      <Button
        color={globalStyles.submitButton.backgroundColor}
        onPress={() => dispatch({ type: "reset", value: settings })}
        title="Reset Settings"
      />
    </View>
  );
};

export default SettingsScreen;
