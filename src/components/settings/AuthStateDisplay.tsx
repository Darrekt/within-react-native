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
import {
  SageSettings,
  SettingsAction,
} from "../../hooks/useSettingsRepository";

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
    marginVertical: 10,
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

const AuthStateDisplay = ({
  settings,
  dispatch,
}: {
  settings: SageSettings;
  dispatch: React.Dispatch<SettingsAction>;
}) => {
  const width = useWindowDimensions().width * 0.85;
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("AuthScreen")}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#01D1EE", "#96E9F5"]}
        style={{ ...styles.linearGradient, width: width }}
      >
        <View
          style={{
            ...globalStyles.row,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Avatar
            rounded
            size="large"
            title={settings.user?.displayName?.charAt(0) ?? ""}
            overlayContainerStyle={{ backgroundColor: "#73EEFF" }}
          />
          {settings.user ? (
            <Text style={styles.buttonText}>
              {`Signed in as ${
                settings.user.displayName ??
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
