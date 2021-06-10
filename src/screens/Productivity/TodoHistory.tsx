import React from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { useAppSelector } from '../../redux/hooks';
import { getCompletedTodos, getTheme } from '../../redux/selectors';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const styles = StyleSheet.create({
  whiteBg: { backgroundColor: "white" },
  tabTxt: { fontSize: 16, color: "black" }
})

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

export default function TodoHistory() {
  const todos = useAppSelector(getCompletedTodos)
  const theme = useAppSelector(getTheme)
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'project', title: 'Projects' },
    { key: 'todos', title: 'Todos' },
  ]);


  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={styles.whiteBg}
      indicatorStyle={{ backgroundColor: theme.dark }}
      labelStyle={styles.tabTxt}
      renderLabel={({ route, focused }) => <Text style={{ ...styles.tabTxt, opacity: focused ? 1 : 0.5 }}>{route.title}</Text>}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderScene={SceneMap({
        project: FirstRoute,
        todos: SecondRoute,
      })}
    />
  )
}
