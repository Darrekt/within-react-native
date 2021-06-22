import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Alert, useWindowDimensions } from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingContext } from "../../../App";
import { globalStyles } from "../../../styles";
import HeadingDropDown from "../../components/layout/HeadingDropDown";
import AuthStateDisplay from "../../components/settings/AuthStateDisplay";
import SettingsGroup from "../../components/settings/SettingsGroup";
import SubmitButton from "../../components/util/SubmitButton";
import { resetSettings } from "../../redux/actions/settings/thunks";
import { useAppDispatch } from "../../redux/hooks";
import { Screens } from "../navConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_STATUS_KEY } from "../../util/constants";

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const setOnboarding = useContext(OnboardingContext);
  const navigation = useNavigation();
  const windowDimensions = useWindowDimensions();

  const generalSettings = [
    {
      name: "Onboarding",
      subtitle: "Reset your onboarding status",
      icon: <Icon name="handshake-o" type="font-awesome" />,
      action: async () => {
        try {
          await AsyncStorage.setItem(
            ONBOARDING_STATUS_KEY,
            JSON.stringify(false)
          );
        } catch (e) {
          console.log("Issue with Async storage onboarding completion");
        }
        setOnboarding && setOnboarding(false);
      },
    },
    {
      name: "Theme",
      subtitle: "Change or customise your theme",
      icon: <Icon name="palette" type="materialIcon" />,
      action: () => navigation.navigate(Screens.Theme),
    },
  ];

  // TODO: Change to simple modals, or a minimal editing interface with ListItem
  const productivitySettings = [
    {
      name: "Maximum Projects",
      icon: <Icon name="clipboard" type="feather" />,
      action: () => navigation.navigate(Screens.ChangeProductivitySettings),
    },
    {
      name: "Maximum tasks",
      icon: <Icon name="tasks" type="font-awesome-5" />,
      action: () => navigation.navigate(Screens.ChangeProductivitySettings),
    },
    // {
    //   name: "Timer duration",
    //   icon: <Icon name="timer" />,
    //   action: () => navigation.navigate(Screens.ChangeProductivitySettings),
    // },
  ];

  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <ScrollView
        contentContainerStyle={{
          ...globalStyles.column,
          justifyContent: "flex-start",
          paddingHorizontal: 0.075 * windowDimensions.width,
        }}
      >
        <AuthStateDisplay />
        <HeadingDropDown header="Productivity">
          <SettingsGroup items={productivitySettings} />
        </HeadingDropDown>
        <HeadingDropDown header="General">
          <SettingsGroup items={generalSettings} />
        </HeadingDropDown>
        <View style={{ ...globalStyles.bottomButtons, marginTop: "5%" }}>
          <SubmitButton
            text="Reset Settings"
            onPress={() => {
              Alert.alert(
                "Reset Warning!",
                "This action signs you out and restores all settings to default.",
                [
                  {
                    text: "Cancel",
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
