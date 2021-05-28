import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Card from "../layout/Card";
import { globalStyles } from "../../../styles";
import { DeadlineEntity } from "../../models/Deadline";
import { useNavigation } from "@react-navigation/core";
import { Screens } from "../../screens/navConstants";

const styles = StyleSheet.create({
  cardStyle: {
    height: Dimensions.get("screen").height * 0.07,
  },
});

type Props = { deadline: DeadlineEntity };
export default function DeadlineDisplay({ deadline }: Props) {
  const navigation = useNavigation();
  return (
    <Card
      style={styles.cardStyle}
      elevation={1}
      opacity={0.05}
      onLongPress={() =>
        navigation.navigate(Screens.ViewDeadline, { deadlineID: deadline.id })
      }
    >
      <View style={globalStyles.row}>
        <Text>{deadline.name}</Text>
        <Text>{new Date(deadline.due).toDateString()}</Text>
      </View>
    </Card>
  );
}
