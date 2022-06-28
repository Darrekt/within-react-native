import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../screens/navConstants";
import { Header } from "react-native-elements/dist/header/Header";
import { Icon } from "react-native-elements";
import { globalStyles } from "../../../styles";

const AppHeader = () => {
  const navigation = useNavigation();
  return (
    <Header
      backgroundColor="transparent"
      leftComponent={
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.navigate(Screens.Survey)}
        >
          <Foundation name="clipboard-pencil" size={24} color="black" />
        </TouchableOpacity>
      }
      rightComponent={
        <View style={globalStyles.row}>
          <Icon
            name="history"
            type="fontawesome5"
            onPress={() => navigation.navigate(Screens.TodoHistory)}
          />
          <Icon
            name="grading"
            type="materialicons"
            onPress={() => navigation.navigate(Screens.RateDay)}
          />
          <Icon
          name="segment"
          type="materialicons"
          onPress={() => navigation.navigate(Screens.SeeDay)}
          />
        </View>
      }
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );
};

export default AppHeader;
