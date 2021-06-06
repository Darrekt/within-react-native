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
import { compareDeadlines, DeadlineEntity } from "../../models/Deadline";
import { compareProjectsByDeadline } from "../../models/Project";

export type Props = {
  focusDeadline: (ddl: DeadlineEntity) => () => void;
};

// TODO: Make height and alignments responsive; all heights are hard coded currently.
const HomeDisplay = ({ focusDeadline }: Props) => {
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
    <View style={globalStyles.column}>
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
          <DeadlineDisplay
            key={deadline.id}
            deadline={deadline}
            onPress={focusDeadline(deadline)}
          />
        ))}
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
