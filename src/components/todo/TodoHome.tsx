import React from "react";
import { StyleSheet, View, Pressable, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import { ProjContext } from "../../state/context";
import Card from "../layout/Card";
import HeadingDropDown from "../layout/HeadingDropDown";
import ProjectCard from "./ProjectCard";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const styles = StyleSheet.create({
  wellnessCard: {
    height: "100%",
    width: 0.4 * Dimensions.get("window").width,
    marginVertical: 10,
  },
  // TODO:  This card is floating above the two above it for some reason...
  insightsCard: {
    height: 0.2 * Dimensions.get("window").height,
    marginVertical: 30,
  },
});

// TODO: Make height and alignments responsive; all heights are hard coded currently.
const HomeDisplay = () => {
  const projContext = React.useContext(ProjContext);
  const navigation = useNavigation();

  const addProjButton = (
    <Pressable
      onPress={() => {
        navigation.navigate("AddProjScreen");
      }}
    >
      <Entypo name="plus" size={20} color="black" />
    </Pressable>
  );

  return (
    <View style={{ ...globalStyles.column }}>
      <HeadingDropDown header="Projects" dropdown={addProjButton}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* TODO: Add unique keys */}
          {projContext.projects.map((project) => (
            <ProjectCard project={project} />
          ))}
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
