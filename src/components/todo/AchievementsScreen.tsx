import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  ScaledSize,
} from "react-native";
import PropTypes from "prop-types";
import { ProjectEntity } from "../../models/Project";
import { TodoEntity } from "../../models/Todo";
import {
  completeFirebaseProject,
  deleteFirebaseProject,
} from "../../redux/actions/projects/thunks";
import {
  completeFirebaseTodo,
  deleteFirebaseTodo,
} from "../../redux/actions/todos/thunks";
import {
  getCompletedProjects,
  getCompletedTodos,
  getAllTodos,
} from "../../redux/selectors";
import { Screens } from "../../screens/navConstants";
import { compareCompleted } from "../../util/compareDates";
import TodoItemTile from "./TodoItemTile";
import DateListView from "./DateListView";
import { getActiveElement } from "formik";
import ProjectCard from "./ProjectCard";
import ProjectList from "./AchievementsList";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getProjects, getSortedDeadlines } from "../../redux/selectors";
import { List } from "immutable";
import { globalStyles } from "../../../styles";
import { compareProjectsByDeadline } from "../../models/Project";

import * as TodoComponents from "../../components/todo/TodoComponents";
import {getTaskStatus} from "../../models/AchievenmentsList";

const NAV_BAR_HEIGHT_IOS = 40;
const NAV_BAR_HEIGHT = Platform.OS === "ios" ? NAV_BAR_HEIGHT_IOS : 50;
const STATUS_BAR_HEIGHT = Platform.OS != "ios" || !isIphoneX() ? 0 : 20;
export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

const FirstRoute = () => <DateListView mode="projects" />;
const SecondRoute = () => <DateListView mode="todos" />;

export type Props = {
  openModal: () => void | undefined;
};

export const AchievementsScreen = ({ openModal }: Props) => {
  const projects = useAppSelector(getCompletedProjects); //projects
  const todoItems: TodoEntity[] = useAppSelector(getAllTodos); //所有的todo
  const completedTodoItems: TodoEntity[] = useAppSelector(getCompletedTodos); //完成todo
  const deadlines = useAppSelector(getSortedDeadlines);
  const dispatch = useAppDispatch();

  let statusData = false;

  if (projects.length || completedTodoItems.length) {
    //当项目为空的时候显示占位页面
    statusData = true;
  }
  const dateCompleteItems = getTaskStatus()

  var totalCount = 0;
  for (let index = 0; index < dateCompleteItems.length; index++) {
    const compelete = dateCompleteItems[index]['compelete'];
    const count = dateCompleteItems[index]['count'];
    if (compelete) {
        totalCount += count
    }
  }
 
//   if (!statusData) {
//     return (

//         <SafeAreaView style={styles.container}>
//         <View style={styles.navigation}>
//         <Text style={styles.navigationTitle}>Achievements</Text>
        
//       </View>
//       <View style={globalStyles.centered}>
//         <Text style={{ color: "black" }}>You have no Achievements!</Text>
//       </View>
//       </SafeAreaView>

     
//     );
//   }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <Text style={styles.navigationTitle}>Achievements</Text>
      </View>
      <Text style={styles.text}>{totalCount}</Text>
      <Text style={styles.totalText}>Total Points</Text>
      <ScrollView style={styles.scrollView}>
        <ProjectList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 0,
  },
  navigationTitle: {
    fontSize: 28,
    color: "black",
  },
  navigation: {
    textAlign: "center",
    width: "100%",
    paddingTop: 0,
    height: NAVIGATION_BAR_HEIGHT,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(216,216,216,0.3)",
    // backgroundColor:'red'
  },
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
    backgroundColor: "red",
    borderRadius: 25,
  },
  btnImage: {
    height: 50,
    width: 50,
    backgroundColor: "yellow",
    borderRadius: 25,
  },
  title: {
    fontSize: 16,
    marginLeft: 20,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // marginVertical: 8,
    // marginHorizontal: 16,
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
    // borderWidth: 1,
    // alignSelf:'auto'
  },
  buttonItem: {
    width: 50,
    height: 50,
    backgroundColor: "#f8c4ef",
  },
});

export function isIphoneX() {
  const dim = Dimensions.get("window");

  return (
    // This has to be iOS
    Platform.OS === "ios" &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dim: ScaledSize) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim: ScaledSize) {
  return dim.height == 896 || dim.width == 896;
}

export default AchievementsScreen;
