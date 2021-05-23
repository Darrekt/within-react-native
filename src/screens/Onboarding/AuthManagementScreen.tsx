import auth from "@react-native-firebase/auth";
import React from "react";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { globalStyles, textStyles } from "../../../styles";
import SettingsGroup from "../../components/settings/SettingsGroup";
import SubmitButton from "../../components/util/SubmitButton";

const AuthManagementScreen = () => {
  const user = auth().currentUser;
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
          overlayContainerStyle={{ backgroundColor: "#73eeff" }}
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
              subtitle: user?.emailVerified
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
    </View>
  );
};

export default AuthManagementScreen;
