import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Card from "../layout/Card";
import { globalStyles } from "../../../styles";
import Project, { fromEntity, ProjectEntity } from "../../models/Project";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { List } from "immutable";

const styles = StyleSheet.create({
  blackFont: {
    color: "black",
  },
  redFont: {
    color: "red",
  },
});

export default function ProjectCard({ project }: { project: ProjectEntity }) {
  const navigation = useNavigation();
  const now = new Date().valueOf();
  const dueDateFont =
    List(project.deadlines).first(0).valueOf() > now
      ? styles.blackFont
      : styles.redFont;

  return (
    <Card
      style={{
        width: Dimensions.get("window").width * 0.7,
        marginHorizontal: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
      }}
      onPress={() => navigation.navigate("ViewProjScreen", { id: project.id })}
    >
      <View style={globalStyles.column}>
        <View
          style={{
            ...globalStyles.row,
            justifyContent: "flex-start",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 25, margin: 5 }}>{project.emoji}</Text>
          <View style={globalStyles.column}>
            <Text
              style={{
                alignSelf: "stretch",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
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
            <Text style={dueDateFont}>
              {fromEntity(project).closestDeadline()?.due.toDateString() ?? "No due date!"}
            </Text>
            <Text>
              {List(project.todos).isEmpty()
                ? "Done for today!"
                : `${project.todos.length} tasks left`}
            </Text>
          </View>
          {/* TODO: Project TAG HERE */}
        </View>
      </View>
    </Card>
  );
}
