import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ListItem, Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { ProjectEntity } from "../../models/Project";
import { TodoEntity } from "../../models/Todo";
import { getTheme } from "../../redux/selectors";
import { globalStyles, textStyles } from "../../../styles";
import { useAppSelector } from "../../redux/hooks";

type Props = {
  item: ProjectEntity | TodoEntity;
  disabled: boolean;
  selected: boolean;
  onPress: () => void;
  onLongPress: () => void;
  deleteAction: () => void;
  checkAction: () => void;
  BadgedText?: React.ComponentType<{}>;
};

const TodoItemTile = ({
  item,
  disabled,
  selected,
  onPress,
  onLongPress,
  deleteAction,
  checkAction,
  BadgedText,
}: Props) => {
  const theme = useAppSelector(getTheme);
  return (
    <ListItem.Swipeable
      linearGradientProps={{
        start: { x: 0, y: 0 },
        end: { x: 0.5, y: 0.5 },
        colors: selected
          ? [theme.primary, theme.gradientFade]
          : ["white", "white"],
      }}
      ViewComponent={LinearGradient}
      rightContent={
        <Button
          title="Delete"
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
          onPress={deleteAction}
        />
      }
    >
      <TouchableOpacity
        onPress={() => {
          !disabled && onPress();
        }}
        onLongPress={() => !disabled && onLongPress()}
      >
        <ListItem.Content style={globalStyles.itemTileRow}>
          <ListItem.Title>
            {BadgedText ? (
              <BadgedText style={textStyles.emoji}>{item.emoji}</BadgedText>
            ) : (
              <Text style={textStyles.emoji}>{item.emoji}</Text>
            )}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              ...globalStyles.itemTileTitleTextStyle,
              color: !selected && disabled ? "grey" : "black",
            }}
          >
            {item.name}
          </ListItem.Subtitle>
          {checkAction && (
            <ListItem.CheckBox
              checked={item.completed ? true : false}
              checkedColor={theme.dark}
              disabled={disabled || selected}
              onPress={checkAction}
            />
          )}
        </ListItem.Content>
      </TouchableOpacity>
    </ListItem.Swipeable>
  );
};

export default TodoItemTile;
