import auth from "@react-native-firebase/auth";
import React, { useContext } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { Avatar, SocialIcon, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { globalStyles, textStyles } from "../../../styles";
import { GlobalStateContext } from "../../state/context";
import SettingsGroup from "../../components/settings/SettingsGroup";
import SubmitButton from "../../components/util/SubmitButton";

const AuthManagementScreen = () => {
  const { state } = useContext(GlobalStateContext);
  const navigation = useNavigation();
  const width = useWindowDimensions().width * 0.7;
  const settings = state.settings

  return (
    <View
      style={{
        ...globalStyles.column,
        justifyContent: "flex-start",
        margin: 20,
      }}
    >
      <View style={{ ...globalStyles.column, marginTop: 30 }}>
        <Avatar
          rounded
          size="xlarge"
          title={settings.user?.displayName?.charAt(0) ?? ""}
          overlayContainerStyle={{ backgroundColor: "#73eeff" }}
        />
        <Text style={textStyles.avatarName}>
          {settings.user?.displayName ?? "Add a display name!"}
        </Text>
      </View>
      {settings.user ? (
        <View style={globalStyles.column}>
          <SettingsGroup
            items={[
              {
                name: "Name",
                subtitle: "Change your display name",
                icon: <Icon name="person-outline" />,
                action: () => navigation.navigate("EditNameScreen"),
              },
              {
                name: "Password",
                icon: <Icon name="key" type="feather" />,
                subtitle: "Change your password",
                action: () => navigation.navigate("EditPasswordScreen"),
              },
              {
                name: "Email",
                icon: <Icon name="email" type="fontisto" />,
                subtitle: settings.user.emailVerified
                  ? "Verified!"
                  : "Not yet verified!",
                action: () => navigation.navigate("EditEmailScreen"),
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
      ) : (
          <View style={globalStyles.column}>
            <SocialIcon
              title="Sign In With Google"
              button
              style={{ width: width }}
              type="google"
              onPress={() => {}}
            />
            <SocialIcon
              title="Sign In With Facebook"
              button
              style={{ width: width }}
              type="facebook"
              onPress={() => {}}
            />
            <SocialIcon
              title="Sign In With Twitter"
              button
              style={{ width: width }}
              type="twitter"
              onPress={() => {}}
            />
            <SubmitButton
              text="Sign in with Email"
              onPress={() => {
                navigation.navigate("EmailSignInScreen");
              }}
              width={width}
            />
          </View>
        )}
    </View>
  );
};

export default AuthManagementScreen;
