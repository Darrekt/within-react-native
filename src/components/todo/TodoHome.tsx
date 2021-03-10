import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import Card from "../layout/Card";
import HeadingDropDown from "../layout/HeadingDropDown";
import ProjectCard from "./ProjectCard";

const styles = StyleSheet.create({
  wellnessCard: {
    height: "100%",
    width: "40%",
    marginVertical: 10,
  },
  // TODO:  This card is floating above the two above it for some reason...
  insightsCard: {
    height: "33%",
    marginVertical: 30,
  },
});

// TODO: Make height and alignments responsive; all heights are hard coded currently.
const HomeDisplay = () => {
  return (
    <View style={{ ...globalStyles.column }}>
      <HeadingDropDown header="Projects">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
        </ScrollView>
      </HeadingDropDown>
      <HeadingDropDown header="Insights">
        <View
          style={{
            ...globalStyles.row,
            height: "20%",
          }}
        >
          <Card elevation={1} opacity={0.3} style={styles.wellnessCard}></Card>
          <Card elevation={1} opacity={0.3} style={styles.wellnessCard}></Card>
        </View>
        <Card elevation={1} style={styles.insightsCard}></Card>
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
