import { useNavigation } from "@react-navigation/core";
import { DefaultTheme } from "@react-navigation/native";
import { List } from "immutable";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCompletedProjects, getCompletedTodos } from "../../redux/selectors";
import { Screens } from "../../screens/navConstants";
import { compareCompleted } from "../../util/compareDates";
import TodoItemTile from "./TodoItemTile";
import { v5 as uuidv5 } from "uuid";

interface Props {
  mode: "projects" | "todos";
}

const DATELIST_UUID_NAMESPACE = "f17ffb01-995d-4af8-929b-50a512c93a7f";
// TODO: Sort by completed date
export default function DateListView({ mode }: Props) {
  const items: ProjectEntity[] | TodoEntity[] =
    mode === "projects"
      ? useAppSelector(getCompletedProjects)
      : useAppSelector(getCompletedTodos);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const groupedItems =
    mode === "projects"
      ? List(items as ProjectEntity[])
          .sort(compareCompleted)
          .reverse()
          .groupBy((item) =>
            item.completed ? new Date(item.completed).toDateString() : null
          )
          .toArray()
      : List(items as TodoEntity[])
          .sort(compareCompleted)
          .reverse()
          .groupBy((item) =>
            item.completed ? new Date(item.completed).toDateString() : null
          )
          .toArray();

  return (
    <ScrollView style={{ height: "100%" }}>
      {groupedItems.map((datedGroup: any) => (
        <View key={uuidv5(datedGroup[0], DATELIST_UUID_NAMESPACE)}>
          <Text style={{ marginVertical: "1%", marginHorizontal: "5%" }}>
            {datedGroup[0]}
          </Text>
          {datedGroup[1].map((item: ProjectEntity | TodoEntity) => (
            <TodoItemTile
              key={item.id}
              backgroundColor={DefaultTheme.colors.background}
              item={item}
              onPress={() =>
                mode === "projects"
                  ? navigation.navigate(Screens.ViewProject, {
                      projID: item.id,
                    })
                  : navigation.navigate(Screens.ViewTodo, { id: item.id })
              }
              deleteAction={() =>
                dispatch(
                  mode === "projects"
                    ? deleteFirebaseProject(item.id)
                    : deleteFirebaseTodo(item as TodoEntity)
                )
              }
              checkAction={() =>
                dispatch(
                  mode === "projects"
                    ? completeFirebaseProject(item.id)
                    : completeFirebaseTodo(item as TodoEntity)
                )
              }
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
