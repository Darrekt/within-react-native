import React from 'react'
import { StyleSheet, Text, useWindowDimensions } from 'react-native'
import { useAppSelector } from '../../redux/hooks';
import { getTheme } from '../../redux/selectors';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DateListView from '../../components/todo/DateListView';

const styles = StyleSheet.create({
  whiteBg: { backgroundColor: "white" },
  tabTxt: { fontSize: 16, color: "black" }
})

const FirstRoute = () => <DateListView mode="projects" />
const SecondRoute = () => <DateListView mode="todos" />;

export default function TodoHistory() {
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
      swipeEnabled={false}
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
