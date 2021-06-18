import React from "react";
import { View, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import HeadingDropDown from "../layout/HeadingDropDown";
import ProjectCard from "./ProjectCard";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getProjects, getSortedDeadlines } from "../../redux/selectors";
import { List } from "immutable";
import { useNavigation } from "@react-navigation/core";
import { Screens } from "../../screens/navConstants";
import DeadlineDisplay from "./DeadlineDisplay";
import { compareDeadlines } from "../../models/Deadline";
import { compareProjectsByDeadline } from "../../models/Project";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { toggleFilterFirebase } from "../../redux/actions/workSettings/thunks";

export type Props = {
  openModal: () => void | undefined;
};

const HomeDisplay = ({ openModal }: Props) => {
  const projects = useAppSelector(getProjects);
  const deadlines = useAppSelector(getSortedDeadlines);
  const windowDimensions = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const headerButton = (
    <Icon
      name={"plus"}
      type={"entypo"}
      size={20}
      color="black"
      onPress={() => {
        navigation.navigate(Screens.AddProject);
      }}
    />
  );

  return (
    <View style={globalStyles.column}>
      <HeadingDropDown
        header="Projects"
        headerStyle={{ marginLeft: windowDimensions.width * 0.04 }}
        dropdown={headerButton}
      >
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
      <HeadingDropDown
        header="Deadlines"
        headerStyle={{ marginLeft: windowDimensions.width * 0.04 }}
      >
        <ScrollView style={{ width: windowDimensions.width }}>
          {deadlines
            .filter((ddl) => !ddl.completed)
            .map((deadline) => (
              <DeadlineDisplay
                key={deadline.id}
                deadline={deadline}
                onPress={() => {
                  openModal();
                  dispatch(toggleFilterFirebase(deadline.id));
                }}
              />
            ))}
        </ScrollView>
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
