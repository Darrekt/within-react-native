import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Card from "../layout/Card";
import { globalStyles, textStyles } from "../../../styles";
import { DeadlineEntity } from "../../models/Deadline";

const styles = StyleSheet.create({
  cardStyle: {
    height: Dimensions.get("screen").height * 0.07,
  },
});

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
  return (
    <Card
      style={styles.cardStyle}
      elevation={1}
      opacity={0.05}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={globalStyles.row}>
        <Text style={textStyles.infoText}>{deadline.name}</Text>
        <Text style={textStyles.infoText}>{new Date(deadline.due).toDateString()}</Text>
      </View>
    </Card>
  );
}
