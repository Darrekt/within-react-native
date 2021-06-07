import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import Card from "../layout/Card";
import { globalStyles, textStyles } from "../../../styles";
import { DeadlineEntity } from "../../models/Deadline";
import { useAppSelector } from "../../redux/hooks";
import { getProjects, findProject } from "../../redux/selectors";

export type Props = {
  deadline: DeadlineEntity;
  onPress?: () => void;
  onLongPress?: () => void;
};
export default function DeadlineDisplay({
  deadline,
  onPress,
  onLongPress,
}: Props) {
  const project = findProject(useAppSelector(getProjects), deadline.project)
  const windowDimensions = useWindowDimensions()
  return (
    <Card
      style={
        { height: windowDimensions.height * 0.07, width: "100%" }
      }
      elevation={2}
      opacity={0.05}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={globalStyles.row}>
        <Text style={{ fontWeight: "bold", color: "black" }}>{project.emoji}</Text>
        <Text style={textStyles.infoText}>{deadline.name}</Text>
        <Text style={{ ...textStyles.infoText, color: deadline.due > new Date().getTime() ? "black" : "red" }}>
          {new Date(deadline.due).toDateString()}
        </Text>
      </View>
    </Card>
  );
}
