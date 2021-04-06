import React from "react";
import { View, Text, Dimensions } from "react-native";
import Card from "../layout/Card";
import { globalStyles } from "../../../styles";
import Project from "../../models/Project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      style={{
        height: Dimensions.get("window").height * 0.2,
        width: Dimensions.get("window").width * 0.7,
        marginHorizontal: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
      }}
    >
      <View style={globalStyles.column}>
        <Text
          style={{
            height: "50%",
            alignSelf: "stretch",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          {project.name}
        </Text>
        <View
          style={{ ...globalStyles.row, alignContent: "center", height: "50%" }}
        >
          <Text>Due in N days</Text>
          <View>
            <Text>Subtasks</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
