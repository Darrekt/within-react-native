import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
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

  return (
    <Card
      style={{ width: "100%" }}
      elevation={16}
      onPress={() => navigation.navigate(Screens.AuthManagement)}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={[theme.primary, theme.gradientFade]}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          borderRadius: 15,
        }}
      >
        <View
          style={{
            ...globalStyles.row,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
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
              fontFamily: "Gill Sans",
              color: theme.text.primary,
              backgroundColor: "transparent",
            }}
          >
            {user
              ? `Signed in as ${
                  user.displayName ??
                  "a mysterious entity. Set a display name here!"
                }`
              : "Not signed in. Your data isn't synced!"}
          </Text>
        </View>
      </LinearGradient>
    </Card>
  );
};

export default AuthStateDisplay;
