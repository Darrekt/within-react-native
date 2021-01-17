import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";

type SettingModel = {
  name: string;
  subtitle?: string;
  icon: JSX.Element;
  action: () => void;
};

type Props = {
  name: string;
  items: SettingModel[];
};

const SettingsGroup = ({ name, items }: Props) => {
  const width = useWindowDimensions().width * 0.85;

  return (
    <View style={{ ...globalStyles.column, marginVertical: 15 }}>
      <View style={globalStyles.row}>
        <Text style={textStyles.groupHeader}>{name}</Text>
        <View style={{ flex: 3 }}></View>
      </View>
      <View>
        {items.map((item, index) => {
          let roundedCornerStyle;
          if (!index)
            roundedCornerStyle = {
              borderTopStartRadius: 15,
              borderTopEndRadius: 15,
            };
          else if (index == items.length - 1)
            roundedCornerStyle = {
              borderBottomStartRadius: 15,
              borderBottomEndRadius: 15,
            };
          else roundedCornerStyle = {};
          return (
            // TODO: Make unique keys
            <TouchableOpacity key={item.subtitle} onPress={item.action}>
              <ListItem
                bottomDivider={index !== items.length - 1}
                containerStyle={roundedCornerStyle}
                style={{ width: width, borderRadius: 20 }}
              >
                {item.icon}
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                  {item.subtitle && (
                    <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                  )}
                </ListItem.Content>
                <ListItem.Chevron color="black" />
              </ListItem>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SettingsGroup;
