import React from "react";
import { Dimensions, useWindowDimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import HeadingDropDown from "../layout/HeadingDropDown";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import { ScrollView } from "react-native-gesture-handler";
import { TodoEntity } from "../../models/Todo";
import { getCompletedProjects, getCompletedTodos } from "../../redux/selectors";
import { compareCompleted } from "../../util/compareDates";
import TodoItemTile from "./TodoItemTile";
import { Collection, List } from "immutable";
import { compose } from "redux";

export default function ProjectProgressGraph() {
  const windowDimensions = useWindowDimensions();
  const theme = useAppSelector(getTheme);
  const iitems: TodoEntity[] = useAppSelector(getCompletedTodos);
  const groupItems = List(iitems as TodoEntity[])
    .sort(compareCompleted)
    .groupBy((iitem) =>
      iitem.completed ? new Date(iitem.completed).toDateString() : null
    )
    .toArray();
   const Moment = require('moment');
   const MomentRange = require('moment-range');
   const moment = MomentRange.extendMoment(Moment);
   var now = new Date(); 
   var days = 6;
   let start = (now.getTime()- days*24*60*60*1000), end = (now.getTime())
   let date = []
   date.push(moment(start).toDate().toDateString());
while(moment(start) <= moment(end).subtract(1, 'days')){
  start = moment(start).add(1, 'days').toDate().toDateString();
  date.push(start);
  
}
var tododay ={};
date.forEach((item) => {if(item){(tododay as any)[item] = 0}})
groupItems.forEach((item) =>{ if(item[0] != null){(tododay as any)[item[0]] = item[1].count()}})



    return (
   <HeadingDropDown 
    header="Todos Finished Per Day"
    topMargin={-50}
    headerStyle={{ marginLeft: windowDimensions.width * 0.22 }}
    >
      <BarChart
        data={{
          labels: Object.keys(tododay),
          datasets: [
            {
              data: 
              Object.values(tododay)
            },
          ],
        }}
        width={1 * windowDimensions.width} // from react-native
        height={0.72 * windowDimensions.height}
        yAxisLabel = ""
        yAxisSuffix=""
        showBarTops={true}
        showValuesOnTopOfBars={true}
        fromZero={true}
        verticalLabelRotation= {90}
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
