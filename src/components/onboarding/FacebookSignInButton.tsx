import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SocialIcon } from "react-native-elements";

const FacebookSignInButton = () => {
  return (
    <SocialIcon
      type="facebook"
      title="Sign in with Facebook"
      button
      onPress={() => console.log("Facebook!")}
    />
  );
};

export default FacebookSignInButton;
