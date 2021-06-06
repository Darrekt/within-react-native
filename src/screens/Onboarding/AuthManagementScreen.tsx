import auth from "@react-native-firebase/auth";
import React from "react";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { globalStyles, textStyles } from "../../../styles";
import SettingsGroup from "../../components/settings/SettingsGroup";
import SubmitButton from "../../components/util/SubmitButton";
import { Screens } from "../navConstants";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useAppSelector } from "../../redux/hooks";
import { getType } from "@reduxjs/toolkit";
import { getTheme } from "../../redux/selectors";

const AuthManagementScreen = () => {
  const user = auth().currentUser;
  const theme = useAppSelector(getTheme);
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...globalStyles.column,
        height: "100%",
        justifyContent: "center",
        margin: 20,
      }}
    >
      <View style={{ ...globalStyles.column, marginVertical: 30 }}>
        <Avatar
          rounded
          size="xlarge"
          title={user?.displayName?.charAt(0) ?? ""}
          overlayContainerStyle={{ backgroundColor: theme.primary }}
          titleStyle={{ color: theme.text.primary }}
        />
        <Text style={textStyles.avatarName}>
          {user?.displayName ?? "Add a display name!"}
        </Text>
      </View>
      <View style={globalStyles.column}>
        <SettingsGroup
          items={[
            {
              name: "Name",
              subtitle: "Change your display name",
              icon: <Icon name="person-outline" />,
              action: () => navigation.navigate(Screens.ChangeDisplayName),
            },
            {
              name: "Password",
              icon: <Icon name="key" type="feather" />,
              subtitle: "Change your password",
              action: () => navigation.navigate(Screens.ChangePassword),
            },
            {
              name: "Email",
              icon: <Icon name="email" type="fontisto" />,
              subtitle: user?.emailVerified ? "Verified!" : "Not yet verified!",
              action: () => navigation.navigate(Screens.ChangeEmail),
            },
          ]}
        />
        <SubmitButton
          onPress={() => {
            auth().signOut();
          }}
          text="Sign Out"
        />
      </View>
    </View>
  );
};

export default AuthManagementScreen;
