import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import HeadingDropDown from "../layout/HeadingDropDown";
import ProjectCard from "./ProjectCard";
import HeaderButton from "../util/HeaderButton";
import { useAppSelector } from "../../redux/hooks";
import { getProjects } from "../../redux/selectors";
import { List } from "immutable";

const styles = StyleSheet.create({
  wellnessCard: {
    height: "100%",
    width: 0.4 * Dimensions.get("window").width,
    marginVertical: 10,
  },
  // TODO:  This card is floating above the two above it for some reason...
  insightsCard: {
    height: 0.2 * Dimensions.get("window").height,
    marginVertical: 10,
    borderRadius: 16,
  },
});

// TODO: Make height and alignments responsive; all heights are hard coded currently.
const HomeDisplay = () => {
  const projects = useAppSelector(getProjects);
  const headerButton = (
    <HeaderButton route="AddProjScreen" iconName="plus" iconType="entypo" />
  );

  return (
    <View style={{ ...globalStyles.column }}>
      <HeadingDropDown header="Projects" dropdown={headerButton}>
        <ScrollView
          style={{ width: "100%" }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {List(projects)
            .filter((value) => !value.completed)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </ScrollView>
      </HeadingDropDown>
      {/* TODO: Hacky fix */}
      <View style={{ height: 15 }}></View>
      <HeadingDropDown header="Deadlines">
        <Text>Hi</Text>
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
