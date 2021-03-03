import React from "react";
import { View, useWindowDimensions } from "react-native";
import { ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import { v5 as uuidv5 } from "uuid";

type SettingModel = {
  name: string;
  subtitle?: string;
  icon: JSX.Element;
  action: () => void;
};

type Props = {
  items: SettingModel[];
};

const SETTINGS_UUID_NAMESPACE = "f17ffb01-995d-4af8-929b-50a512c93a7f";

const SettingsGroup = ({ items }: Props) => {
  const width = useWindowDimensions().width * 0.85;

  return (
    <View style={{ ...globalStyles.column, marginTop: 10, marginBottom: 20 }}>
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
          <TouchableOpacity
            key={uuidv5(item.name, SETTINGS_UUID_NAMESPACE)}
            onPress={item.action}
          >
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
  );
};

export default SettingsGroup;
