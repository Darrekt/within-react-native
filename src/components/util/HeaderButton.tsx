import React from "react";
import { TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";

type Props = {
  onPress: VoidFunction;
  iconName: string;
  iconType?: string;
};

export default function HeaderButton({ onPress, iconName, iconType }: Props) {
  return (
    <TouchableHighlight onPress={onPress}>
      <Icon name={iconName} type={iconType} size={20} color="black" />
    </TouchableHighlight>
  );
}
