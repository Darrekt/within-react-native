import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";
import { Avatar } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { globalStyles } from "../../../styles";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import { Screens } from "../../screens/navConstants";

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
  },
  buttonText: {
    flexShrink: 150,
    fontSize: 22,
    marginLeft: 25,
    fontFamily: "Gill Sans",
    backgroundColor: "transparent",
  },
});

const AuthStateDisplay = () => {
  const user = firebase.auth().currentUser;
  const width = useWindowDimensions().width * 0.85;
  const theme = useAppSelector(getTheme);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(Screens.AuthManagement)}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={[theme.primary, theme.gradientFade]}
        style={{ ...styles.linearGradient, width: width }}
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
          <Text style={{ ...styles.buttonText, color: theme.text.primary }}>
            {user
              ? `Signed in as ${
                  user.displayName ??
                  "a mysterious entity. Set a display name here!"
                }`
              : "Not signed in. Your data isn't synced!"}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AuthStateDisplay;
