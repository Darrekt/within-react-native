import React from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import Card from "../layout/Card";
import { globalStyles, textStyles } from "../../../styles";
import { ProjectEntity, ProjectFromEntity } from "../../models/Project";
import { useNavigation } from "@react-navigation/native";
import { List } from "immutable";
import { Screens } from "../../screens/navConstants";
import { AntDesign, Foundation } from "@expo/vector-icons";
import { UNCATEGORISED_TODO_PROJID } from "../../util/constants";
import { compareDeadlines } from "../../models/Deadline";

const styles = StyleSheet.create({
  emojiFont: { fontSize: 25, margin: 5, color: "black" },
  redFont: {
    color: "red",
  },
});

export default function ProjectCard({ project }: { project: ProjectEntity }) {
  const navigation = useNavigation();
  const windowDimensions = useWindowDimensions();
  const now = new Date().valueOf();

  const deadlineNumber = ProjectFromEntity(project).closestDeadline()?.due;
  const ddlString = deadlineNumber
    ? new Date(deadlineNumber).toDateString().slice(0, -4)
    : undefined;

  const remainingTodos = project.todos.filter((todo) => !todo.completed).length;
  const dueDateFont =
    List(project.deadlines).sort(compareDeadlines).first(0).valueOf() < now
      ? textStyles.infoText
      : styles.redFont;

  return project.id === UNCATEGORISED_TODO_PROJID ? (
    <Card
      style={{
        width: windowDimensions.width * 0.6,
        marginHorizontal: 15,
        paddingVertical: windowDimensions.width * 0.02,
        paddingHorizontal: 25,
      }}
      onPress={() => navigation.navigate(Screens.AddProject)}
    >
      <Text style={{ fontSize: 16 }}>Add a project!</Text>
      <Foundation name="pencil" size={35} color="grey" />
    </Card>
  ) : (
    <Card
      elevation={16}
      style={{
        width: windowDimensions.width * 0.6,
        marginBottom: windowDimensions.height * 0.03,
        paddingVertical: windowDimensions.height * 0.02,
        marginHorizontal: windowDimensions.width * 0.04,
        paddingHorizontal: windowDimensions.width * 0.05,
      }}
      onPress={() =>
        navigation.navigate(Screens.ViewProject, { projID: project.id })
      }
    >
      <View style={globalStyles.column}>
        <View
          style={{
            ...globalStyles.row,
            justifyContent: "flex-start",
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.emojiFont}>{project.emoji}</Text>
          <View style={globalStyles.column}>
            <Text
              style={{
                alignSelf: "stretch",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
                color: "black",
              }}
            >
              {project.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            alignSelf: "stretch",
          }}
        />
        <View
          style={{
            ...globalStyles.row,
            justifyContent: "center",
            alignContent: "center",
            height: "35%",
          }}
        >
          <AntDesign name="calendar" size={30} color="black" />
          <View style={{ ...globalStyles.column, marginHorizontal: 20 }}>
            <Text style={dueDateFont}>{ddlString ?? "No deadlines"}</Text>
            <Text style={textStyles.infoText}>
              {`${remainingTodos} task` +
                (remainingTodos !== 1 ? "s" : "") +
                " left"}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
