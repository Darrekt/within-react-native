import React from "react";
import { Dimensions, useWindowDimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import HeadingDropDown from "../layout/HeadingDropDown";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import { ScrollView } from "react-native-gesture-handler";

export default function ProjectProgressGraph() {
  const windowDimensions = useWindowDimensions();
  const theme = useAppSelector(getTheme);
  return (
   <HeadingDropDown 
    header="Focus Sessions Finished Per Day"
    topMargin={-300}
    headerStyle={{ marginLeft: windowDimensions.width * 0.12 }}
    >
      <BarChart
        data={{
          labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
          datasets: [
            {
              data: [
                6,
                12,
                9,
                5,
                2,
                6,
                5,
              ],
            },
          ],
        }}
        width={1 * windowDimensions.width} // from react-native
        height={0.4 * windowDimensions.height}
        yAxisLabel = ""
        yAxisSuffix=""
        showBarTops={true}
        showValuesOnTopOfBars={true}
        fromZero={true}
        chartConfig={{
          backgroundGradientFrom: theme.primary,
          decimalPlaces: 0, // optional, defaults to 2dp
          barPercentage: 0.7,
          fillShadowGradient: "#ffffff",
          fillShadowGradientOpacity: 1,
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
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </HeadingDropDown>

  );
}
