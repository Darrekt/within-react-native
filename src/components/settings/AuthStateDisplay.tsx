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
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});

const AuthStateDisplay = () => {
  const user = firebase.auth().currentUser;
  const width = useWindowDimensions().width * 0.85;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(Screens.AuthManagement)}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#01D1EE", "#96E9F5"]}
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
            overlayContainerStyle={{ backgroundColor: "#73EEFF" }}
          />
          {user ? (
            <Text style={styles.buttonText}>
              {`Signed in as ${
                user.displayName ??
                "a mysterious entity. Set a display name here!"
              }`}
            </Text>
          ) : (
            <Text style={styles.buttonText}>
              Not signed in. Your data isn't synced!
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AuthStateDisplay;
