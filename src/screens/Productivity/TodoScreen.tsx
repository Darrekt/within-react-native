import React, { useEffect } from "react";
import { View, Text, useWindowDimensions, BackHandler } from "react-native";
import { withBadge } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import LinearGradient from "react-native-linear-gradient";
import * as TodoComponents from "../../components/todo/TodoComponents";
import Todo, { TodoEntity } from "../../models/Todo";
import * as AppSelectors from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/core";
import { Screens } from "../navConstants";
import * as TodoThunks from "../../redux/actions/todos/thunks";
import { selectTodo } from "../../redux/actions/workSettings/actions";
import AppHeader from "../../components/settings/AppHeader";

const TodoScreen = () => {
  const todos = useAppSelector(AppSelectors.getIncompleteTodos);
  const selected = useAppSelector(AppSelectors.getSelected);
  const filters = useAppSelector(AppSelectors.getFilters);
  const running = useAppSelector(AppSelectors.getRunning);
  const theme = useAppSelector(AppSelectors.getTheme);
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const modalizeRef = React.useRef<Modalize>(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isOpen && !running) {
          modalizeRef.current?.open("default");
          setIsOpen(false);
          return true;
        } else return false;
      }
    );
    return backHandler.remove;
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {!isOpen ? (
        <>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.5 }}
            colors={[theme.primary, theme.gradientFade]}
            style={{
              position: "absolute",
              height: "35%",
              width: "100%",
              top: 0,
            }}
          />
          <AppHeader />
          <TodoComponents.HomeDisplay
            openModal={() => modalizeRef.current?.open("top")}
          />
        </>
      ) : (
        <TodoComponents.TimerDisplay
          selectedTask={todos.find((todo) => todo.id === selected)}
        />
      )}
      <Modalize
        ref={modalizeRef}
        modalHeight={windowHeight * 0.5}
        alwaysOpen={80}
        handlePosition="inside"
        withOverlay={false}
        onOpen={() => setIsOpen(true)}
        onPositionChange={(position) => {
          if (position === "top") {
            setIsOpen(true);
            running && dispatch(selectTodo(running.id));
          } else {
            setIsOpen(false);
            dispatch(selectTodo(selected));
          }
        }}
        panGestureEnabled={!running || !isOpen}
        HeaderComponent={<View style={globalStyles.spacer}></View>}
        flatListProps={{
          ListHeaderComponent: (
            <TodoComponents.ListHeader
              todos={todos}
              isOpen={isOpen}
              running={running ? true : false}
            />
          ),
          data: isOpen
            ? todos.filter((todo) =>
                filters.length
                  ? filters.some((filter) => filter === todo.deadline)
                  : true
              )
            : [],
          keyExtractor: (item: Todo) => item.id,
          renderItem: ({ item }: { item: TodoEntity }) => (
            <TodoComponents.ItemTile
              key={item.id}
              item={item}
              selected={item.id === selected}
              disabled={running ? true : false}
              onPress={() => dispatch(selectTodo(item.id))}
              onLongPress={() =>
                navigation.navigate(Screens.ViewTodo, { todoID: item.id })
              }
              deleteAction={() => dispatch(TodoThunks.deleteFirebaseTodo(item))}
              checkAction={() =>
                dispatch(TodoThunks.completeFirebaseTodo(item))
              }
              BadgedText={withBadge(item.laps, {
                badgeStyle: {
                  backgroundColor: theme.dark,
                  position: "absolute",
                  top: -4,
                },
                right: 6,
                hidden: !item.laps,
              })(Text)}
            />
          ),
          ListEmptyComponent: isOpen
            ? TodoComponents.ListEmptyDisplay
            : undefined,
        }}
      />
    </View>
  );
};

export default TodoScreen;
