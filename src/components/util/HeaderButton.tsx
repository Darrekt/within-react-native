import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";

type Props = {
  route: string;
  iconName: string;
  iconType?: string;
};

export default function HeaderButton({ route, iconName, iconType }: Props) {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(route);
      }}
    >
      <Icon name={iconName} type={iconType} size={20} color="black" />
    </TouchableHighlight>
  );
}
