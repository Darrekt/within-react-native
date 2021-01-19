import auth from "@react-native-firebase/auth";
import React, { useContext } from "react";
import { View, Text, Button, useWindowDimensions } from "react-native";
import { Avatar, SocialIcon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../../styles";
import { SettingsContext } from "../../state/context";

const AuthManagementScreen = () => {
  const { settings, dispatch } = useContext(SettingsContext);
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
      <Avatar></Avatar>
      <Text></Text>
      {settings.signedIn ? (
        <Button
          color={globalStyles.submitButton.backgroundColor}
          onPress={() => {auth().signOut()}}
          title="Sign Out"
        />
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
