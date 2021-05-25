import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { globalStyles } from "../../../styles";
import HeadingDropDown from "../../components/layout/HeadingDropDown";
import AuthStateDisplay from "../../components/settings/AuthStateDisplay";
import SettingsGroup from "../../components/settings/SettingsGroup";
import SubmitButton from "../../components/util/SubmitButton";
import { sanitiseFirebaseProjects } from "../../redux/actions/projects/thunks";
import {
  resetSettings,
  toggleOnboarding,
} from "../../redux/actions/settings/thunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSettings } from "../../redux/selectors";

const SettingsScreen = () => {
  const settings = useAppSelector(getSettings);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const generalSettings = [
    {
      name: "Onboarding",
      subtitle: "Reset your onboarding status",
      icon: <Icon name="handshake-o" type="font-awesome" />,
      action: () => dispatch(toggleOnboarding()),
    },
    {
      name: "Theme",
      subtitle: "Change or customise your theme",
      icon: <Icon name="palette" type="materialIcon" />,
      action: () => dispatch(toggleOnboarding()),
    },
  ];

  // TODO: Change to simple modals, or a minimal editing interface with ListItem
  const productivitySettings = [
    {
      name: "Maximum Projects",
      icon: <Icon name="clipboard" type="feather" />,
      action: () => navigation.navigate("EditProductivitySettingScreen"),
    },
    {
      name: "Maximum tasks",
      icon: <Icon name="tasks" type="font-awesome-5" />,
      action: () => navigation.navigate("EditProductivitySettingScreen"),
    },
    {
      name: "Timer duration",
      icon: <Icon name="timer" />,
      action: () => navigation.navigate("EditProductivitySettingScreen"),
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
      <AuthStateDisplay />
      <HeadingDropDown header="Productivity">
        <SettingsGroup items={productivitySettings} />
      </HeadingDropDown>
      <HeadingDropDown header="General">
        <SettingsGroup items={generalSettings} />
      </HeadingDropDown>
      <SubmitButton
        text="Sanitise Projects"
        onPress={() => {
          dispatch(sanitiseFirebaseProjects());
        }}
      />
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
                onPress: () => dispatch(resetSettings()),
              },
            ]
          );
        }}
      />
    </View>
  );
};

export default SettingsScreen;
