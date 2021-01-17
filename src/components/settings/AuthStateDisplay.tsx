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

const styles = StyleSheet.create({
  linearGradient: {
    minHeight: 150,
    marginVertical: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "justify",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});

const AuthStateDisplay = () => {
  const width = useWindowDimensions().width * 0.85;

  return (
    <TouchableOpacity onPress={() => {}}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{ ...styles.linearGradient, width: width }}
      >
        <View style={{...globalStyles.row, flex: 1}}>
          <Avatar rounded source={{ uri: "https://i.pravatar.cc/500" }} />
          <Text style={styles.buttonText}>Sign in with Facebook</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AuthStateDisplay;
