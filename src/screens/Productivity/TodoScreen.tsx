import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { Header } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import LinearGradient from "react-native-linear-gradient";
import * as TodoComponents from "../../components/todo/TodoComponents";
import Todo, { TodoEntity } from "../../models/Todo";
import {
  getSelected,
  getRunning,
  getTheme,
  getIncompleteTodos,
} from "../../redux/selectors";
import { DeadlineEntity } from "../../models/Deadline";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectTodo } from "../../redux/actions/todos/actions";
import SurveyButton from "../../components/settings/SurveyButton";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Screens } from "../navConstants";
import { completeFirebaseTodo, deleteFirebaseTodo } from "../../redux/actions/todos/thunks";
import { withBadge } from "react-native-elements";

const TodoScreen = () => {
  const todos = useAppSelector(getIncompleteTodos);
  const selected = useAppSelector(getSelected);
  const running = useAppSelector(getRunning);
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [isOpen, setIsOpen] = React.useState(false);
  const modalizeRef = React.useRef<Modalize>(null);
  const windowHeight = useWindowDimensions().height;

  React.useEffect(() => {
    if (running) {
      dispatch(selectTodo(running));
    }
  }, []);

  const openAndSelectDeadline = (deadline: DeadlineEntity) => () => {
    modalizeRef.current?.open("top");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {!isOpen && (
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
      )}
      {!isOpen && (
        <Header
          backgroundColor="transparent"
          leftComponent={SurveyButton()}
          rightComponent={
            <View style={globalStyles.row}>
              <Icon name="history" type="fontawesome5" onPress={() => navigation.navigate(Screens.TodoHistory)} />
              <Icon name="settings" type="materialicons" onPress={() => navigation.navigate(Screens.Settings)} />
            </View>
          }

          containerStyle={{ borderBottomWidth: 0 }}
        />
      )}
      {isOpen ? (
        <TodoComponents.TimerDisplay
          selectedTask={todos.find((todo) => todo.id === selected)}
        />
      ) : (
        <TodoComponents.HomeDisplay focusDeadline={openAndSelectDeadline} />
      )}
      <Modalize
        ref={modalizeRef}
        modalHeight={windowHeight * 0.45}
        alwaysOpen={80}
        handlePosition="inside"
        withOverlay={false}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onPositionChange={(position) => {
          position == "top" ? setIsOpen(true) : setIsOpen(false);
        }}
        panGestureEnabled={!running || !isOpen}
        HeaderComponent={<View style={globalStyles.spacer}></View>}
        flatListProps={{
          ListHeaderComponent: (
            <TodoComponents.ListHeader todos={todos} isOpen={isOpen} />
          ),
          data: isOpen ? todos.filter((todo) => !todo.completed) : [],
          keyExtractor: (item: Todo) => item.id,
          renderItem: ({ item }: { item: TodoEntity }) => <TodoComponents.ItemTile
            item={item}
            selected={item.id === selected}
            disabled={running ? true : false}
            onPress={() => dispatch(selectTodo(item))}
            onLongPress={() => navigation.navigate(Screens.ViewTodo, { id: item.id })}
            deleteAction={() => dispatch(deleteFirebaseTodo(item))}
            checkAction={() => dispatch(completeFirebaseTodo(item))}
            BadgedText={
              withBadge(item.laps, {
                badgeStyle: {
                  backgroundColor: theme.dark,
                  position: "absolute",
                  top: -4,
                },
                right: 6,
                hidden: !item.laps
              })(Text)
            }
          />
          ,
          ListEmptyComponent: isOpen
            ? TodoComponents.ListEmptyDisplay
            : undefined,
        }}
      />
    </View>
  );
};

export default TodoScreen;
