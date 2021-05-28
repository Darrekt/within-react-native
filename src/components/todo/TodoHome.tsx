import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import HeadingDropDown from "../layout/HeadingDropDown";
import ProjectCard from "./ProjectCard";
import HeaderButton from "../util/HeaderButton";
import { useAppSelector } from "../../redux/hooks";
import { getProjects, getSortedDeadlines } from "../../redux/selectors";
import { List } from "immutable";
import { useNavigation } from "@react-navigation/core";
import { Screens } from "../../screens/navConstants";
import DeadlineDisplay from "./DeadlineDisplay";
import { compareDeadlines } from "../../models/Deadline";
import { compareProjectsByDeadline } from "../../models/Project";

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
  const deadlines = useAppSelector(getSortedDeadlines);
  const navigation = useNavigation();
  const headerButton = (
    <HeaderButton
      onPress={() => {
        navigation.navigate(Screens.AddProject);
      }}
      iconName="plus"
      iconType="entypo"
    />
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
            .sort(compareProjectsByDeadline)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </ScrollView>
      </HeadingDropDown>
      {/* TODO: Hacky fix */}
      <View style={{ height: 15 }}></View>
      <HeadingDropDown header="Deadlines">
        {deadlines.sort(compareDeadlines).map((deadline) => (
          <DeadlineDisplay key={deadline.id} deadline={deadline} />
        ))}
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
