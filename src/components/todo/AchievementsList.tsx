import React from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
  FlatList,
} from "react-native";

import { globalStyles, textStyles } from "../../../styles";
import { ProjectEntity, ProjectFromEntity } from "../../models/Project";
import { useNavigation } from "@react-navigation/native";
import { List } from "immutable";
import { Screens } from "../../screens/navConstants";
import { AntDesign, Foundation } from "@expo/vector-icons";
import { UNCATEGORISED_TODO_PROJID } from "../../util/constants";
import { compareDeadlines } from "../../models/Deadline";
import { compareCompleted } from "../../util/compareDates";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getProjects, getSortedDeadlines } from "../../redux/selectors";
import {
  getCompletedProjects,
  getCompletedTodos,
  getAllTodos,
} from "../../redux/selectors";
import { TodoEntity } from "../../models/Todo";
import { Dictionary } from "@reduxjs/toolkit";
import { ItemTile } from "./TodoComponents";
import { compareProjectsByDeadline } from "../../models/Project";
import { getTaskStatus } from "../../models/AchievenmentsList";


const Item = ({ title, count, status }) => (
  <View style={styles.item}>
    <View style={styles.imageItem}>
      <Image style={styles.image} source={imageMap[count]}></Image>
    </View>
    <View style={styles.textItem}>
      <Text style={styles.title}>{title}</Text>

      <Image
        style={styles.btnImage}
        source={comleteStatusImgMap[status ? "completed" : "incomplete"]}
      ></Image>
    </View>
  </View>
);

export default function ProjectList() {
  const contentItems = getTaskStatus();

  const renderItem = ({ item }) => (
    <Item title={item.title} count={item.count} status={item.compelete} />
  );

  return (
    <FlatList
      data={contentItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
    />
  );
}
const AchievementsData = [
  {
    title: "Complete the survey!",
    count: 10,
  },
  {
    title: "Complete 1 to do",
    count: 10,
  },
  {
    title: "Complete 3 to do",
    count: 10,
  },
  {
    title: "Complete 5 to do",
    count: 25,
  },
  {
    title: "Complete 10 to do",
    count: 50,
  },
  {
    title: "Complete 1 project",
    count: 10,
  },
  {
    title: "Complete 3 projects",
    count: 25,
  },
  {
    title: "Complete 5 projects",
    count: 50,
  },
  {
    title: "Complete 10 projects",
    count: 100,
  },
];

const imageMap = {
  1: require("../../../assets/1.png"),
  10: require("../../../assets/10.png"),
  25: require("../../../assets/25.png"),
  50: require("../../../assets/50.png"),
  100: require("../../../assets/100.png"),
};
const comleteStatusImgMap = {
  incomplete: require("../../../assets/incomplete.png"),
  completed: require("../../../assets/compelte.png"),
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "black",
    // fontWeight: 'bold',
    textAlign: "center",

    paddingTop: 15,
  },
  totalText: {
    fontSize: 18,
    color: "black",
    // fontWeight: 'bold',
    textAlign: "center",
    paddingTop: 5,
  },
  image: {
    height: 50,
    width: 50,
    // backgroundColor: 'red',
    borderRadius: 25,
  },
  btnImage: {
    height: 50,
    width: 50,
    // backgroundColor: 'yellow',
    borderRadius: 25,
  },
  title: {
    fontSize: 16,
    marginLeft: 20,
  },
  item: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  imageItem: {
    width: 50,
    height: 50,
  },
  textItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexGrow: 1,
  },
  buttonItem: {
    width: 50,
    height: 50,
    backgroundColor: "#f8c4ef",
  },
});
