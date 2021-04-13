import React from "react";
import { StyleSheet, View, TouchableHighlight, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import { ProjContext } from "../../state/context";
import Card from "../layout/Card";
import HeadingDropDown from "../layout/HeadingDropDown";
import ProjectCard from "./ProjectCard";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import {
  LineChart,
  BarChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

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
  const projContext = React.useContext(ProjContext);
  const navigation = useNavigation();

  const addProjButton = (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("AddProjScreen");
      }}
    >
      <Entypo name="plus" size={20} color="black" />
    </TouchableHighlight>
  );

  return (
    <View style={{ ...globalStyles.column }}>
      <HeadingDropDown header="Projects" dropdown={addProjButton}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {projContext.projects
            .sortBy((value) => value.due)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </ScrollView>
      </HeadingDropDown>
      {/* TODO: Hacky fix */}
      <View style={{height:15}}></View>
      <HeadingDropDown header="Today's Progress">
        <LineChart
          data={{
            labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
            datasets: [
              {
                data: [
                  Math.random() * 10,
                  Math.random() * 10,
                  Math.random() * 10,
                  Math.random() * 10,
                  Math.random() * 10,
                  Math.random() * 10,
                ],
              },
            ],
          }}
          width={0.85 * Dimensions.get("window").width} // from react-native
          height={0.2 * Dimensions.get("window").height}
          chartConfig={{
            backgroundGradientFrom: "#01C2EF",
            backgroundGradientTo: "#56DEF1",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 15,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "1",
              stroke: "#FFAE5E",
            },
          }}
          bezier
          style={styles.insightsCard}
        />
      </HeadingDropDown>
    </View>
  );
};

export default HomeDisplay;
