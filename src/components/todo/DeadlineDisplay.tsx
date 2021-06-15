import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import Card from "../layout/Card";
import { globalStyles, textStyles } from "../../../styles";
import { DeadlineEntity } from "../../models/Deadline";
import { useAppSelector } from "../../redux/hooks";
import { getProjects, findProject, getTheme } from "../../redux/selectors";
import { useNavigation } from "@react-navigation/core";
import { Screens } from "../../screens/navConstants";
import { getType } from "@reduxjs/toolkit";

export type Props = {
  deadline: DeadlineEntity;
  selected?: boolean;
  onPress?: () => void;
};
export default function DeadlineDisplay({
  deadline,
  selected = false,
  onPress,
}: Props) {
  const project = findProject(useAppSelector(getProjects), deadline.project);
  const theme = useAppSelector(getTheme);
  const navigation = useNavigation();
  const windowDimensions = useWindowDimensions();
  return (
    <Card
      style={{
        height: windowDimensions.height * 0.07,
        width: "100%",
        borderWidth: selected ? 1.5 : 0,
        borderColor: theme.dark,
      }}
      elevation={4}
      opacity={0.05}
      onPress={onPress}
      onLongPress={() =>
        navigation.navigate(Screens.ViewDeadline, {
          deadlineID: deadline.id,
          projID: undefined,
        })
      }
    >
      <View style={{ ...globalStyles.row, justifyContent: "space-between" }}>
        <Text style={{ color: "black", marginLeft: "4%" }}>
          {project.emoji}
        </Text>
        <Text style={textStyles.infoText}>{deadline.name}</Text>
        <Text
          style={{
            ...textStyles.infoText,
            marginRight: "4%",
            color: deadline.due > new Date().getTime() ? "black" : "red",
          }}
        >
          {new Date(deadline.due).toDateString()}
        </Text>
      </View>
    </Card>
  );
}
