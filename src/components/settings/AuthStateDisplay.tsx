import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { Avatar } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { globalStyles } from "../../../styles";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import { Screens } from "../../screens/navConstants";
import Card from "../layout/Card";

const AuthStateDisplay = () => {
  const user = firebase.auth().currentUser;
  const theme = useAppSelector(getTheme);
  const navigation = useNavigation();
  const nameString = () => {
    if (user && !user.displayName) return "Configure your profile here!";
    else if (user) return `Signed in as ${user.displayName}`;
    else if (!user) return "Not signed in.";
  };

  return (
    <Card
      style={{ width: "100%", marginVertical: "10%" }}
      elevation={16}
      onPress={() => navigation.navigate(Screens.AuthManagement)}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={[theme.primary, theme.gradientFade]}
        style={{
          ...globalStyles.row,
          height: "100%",
          justifyContent: "center",
          paddingHorizontal: "10%",
          borderRadius: 15,
        }}
      >
        <Avatar
          rounded
          size="large"
          title={user?.displayName?.charAt(0) ?? ""}
          titleStyle={{ color: theme.text.dark }}
          overlayContainerStyle={{ backgroundColor: theme.dark }}
        />
        <Text
          style={{
            flexShrink: 150,
            fontSize: 18,
            marginLeft: 25,
            color: theme.text.primary,
            backgroundColor: "transparent",
          }}
        >
          {nameString()}
        </Text>
      </LinearGradient>
    </Card>
  );
};

export default AuthStateDisplay;
