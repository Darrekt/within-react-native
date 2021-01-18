import React, { useContext } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { globalStyles } from "../../styles";
import AuthStateDisplay from "../components/settings/AuthStateDisplay";
import SettingsGroup from "../components/settings/SettingsGroup";
import { SettingsContext } from "../state/context";

const SettingsScreen = () => {
  const { settings, dispatch } = useContext(SettingsContext);

  const generalSettings = [
    {
      name: "Onboarding",
      subtitle: "Reset your onboarding status",
      icon: <Icon name="handshake-o" type="font-awesome" />,
      action: () => dispatch({ key: "onboarding" }),
    },
    {
      name: "Theme",
      subtitle: "Change or customise your theme",
      icon: <Icon name="palette" type="materialIcon" />,
      action: () => dispatch({ key: "theme" }),
    },
  ];

  const productivitySettings = [
    {
      name: "Max tasks",
      icon: <Icon name="list" />,
      action: () => dispatch({ key: "onboarding" }),
    },
    {
      name: "Timer duration",
      icon: <Icon name="timer" />,
      action: () => dispatch({ key: "theme" }),
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
      <AuthStateDisplay settings={settings} dispatch={dispatch}/>
      <SettingsGroup name="General" items={generalSettings} />
      <SettingsGroup name="Todo" items={productivitySettings} />
    </View>
  );
};

export default SettingsScreen;
