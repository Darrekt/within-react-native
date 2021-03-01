import auth from "@react-native-firebase/auth";
import React, { useContext } from "react";
import { View, Text, Button, useWindowDimensions } from "react-native";
import { Avatar, SocialIcon, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { globalStyles, textStyles } from "../../../styles";
import { SettingsContext } from "../../state/context";
import SettingsGroup from "../../components/settings/SettingsGroup";

const AuthManagementScreen = () => {
  const { settings } = useContext(SettingsContext);
  const navigation = useNavigation();
  const width = useWindowDimensions().width * 0.7;

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
          title="D"
          overlayContainerStyle={{ backgroundColor: "#73eeff" }}
        />
        <Text style={textStyles.avatarName}>
          {settings.user?.displayName ?? "Add a display name!"}
        </Text>
      </View>
      {settings.user ? (
        <View>
          <SettingsGroup
            name=""
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
          <Button
            color={globalStyles.submitButton.backgroundColor}
            onPress={() => {
              auth().signOut();
            }}
            title="Sign Out"
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
          <Button
            color={globalStyles.submitButton.backgroundColor}
            onPress={() => {
              navigation.navigate("EmailSignInScreen");
            }}
            title="Sign in with Email"
          />
        </View>
      )}
    </View>
  );
};

export default AuthManagementScreen;
