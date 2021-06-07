import React from "react";
import { View, useWindowDimensions } from "react-native";
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

const HomeDisplay = ({ focusDeadline }: Props) => {
  const projects = useAppSelector(getProjects);
  const deadlines = useAppSelector(getSortedDeadlines);
  const windowDimensions = useWindowDimensions()
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
      <HeadingDropDown header="Projects"
        headerStyle={{ marginLeft: windowDimensions.width * 0.04 }}
        dropdown={headerButton}>
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
      <HeadingDropDown header="Deadlines"
        headerStyle={{ marginLeft: windowDimensions.width * 0.04 }}
      >
        <ScrollView style={{ width: windowDimensions.width * 0.9 }}>
          {deadlines.sort(compareDeadlines).map((deadline) => (
            <DeadlineDisplay
              key={deadline.id}
              deadline={deadline}
              onPress={focusDeadline(deadline)}
            />
          ))}
        </ScrollView>
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
