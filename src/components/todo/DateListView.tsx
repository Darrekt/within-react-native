import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View } from 'react-native'
import { ListItem, Button } from "react-native-elements";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalStyles, textStyles } from '../../../styles'
import { ProjectEntity } from '../../models/Project'
import { TodoEntity } from '../../models/Todo'
import { completeFirebaseProject, deleteFirebaseProject } from '../../redux/actions/projects/thunks'
import { completeFirebaseTodo, deleteFirebaseTodo } from '../../redux/actions/todos/thunks'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getCompletedProjects, getCompletedTodos, getTheme } from '../../redux/selectors'
import { Screens } from '../../screens/navConstants'

interface Props {
  mode: "projects" | "todos",
}

// TODO: Sort by completed date
export default function DateListView({ mode }: Props) {
  const items: ProjectEntity[] | TodoEntity[] = mode === "projects"
    ? useAppSelector(getCompletedProjects)
    : useAppSelector(getCompletedTodos);
  const theme = useAppSelector(getTheme)
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  return <View style={{ height: "100%" }} >
    {items.map((item: ProjectEntity | TodoEntity) =>
      <ListItem.Swipeable
        key={item.id}
        rightContent={
          <Button
            title="Delete"
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: "100%", backgroundColor: 'red' }}
            onPress={() => dispatch(mode === "projects"
              ? deleteFirebaseProject(item.id)
              : deleteFirebaseTodo(item as TodoEntity))}
          />}
      >
        <TouchableOpacity
          style={{ minHeight: 24, }}
          onPress={() => mode === "projects"
            ? navigation.navigate(Screens.ViewProject, { projID: item.id })
            : navigation.navigate(Screens.ViewTodo, { todoID: item.id })}
        >
          <ListItem.Content style={globalStyles.itemTileRow}>
            <ListItem.Title style={textStyles.emoji}>
              {item.emoji}
            </ListItem.Title>
            <ListItem.Subtitle style={globalStyles.itemTileTitleTextStyle}>
              {item.name}
            </ListItem.Subtitle>
            <ListItem.CheckBox
              checked={item.completed ? true : false}
              checkedColor={theme.dark}
              onPress={() => dispatch(mode === "projects"
                ? completeFirebaseProject(item.id)
                : completeFirebaseTodo(item as TodoEntity))}
            />
          </ListItem.Content>
        </TouchableOpacity>
      </ListItem.Swipeable>
    )
    }
  </View >
}