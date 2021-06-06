import React from "react";
import { View, useWindowDimensions, Dimensions } from "react-native";
import { Header } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import LinearGradient from "react-native-linear-gradient";
import * as TodoComponents from "../../components/todo/TodoComponents";
import SettingsButton from "../../components/settings/SettingsButton";
import Todo from "../../models/Todo";
import {
  getAllTodos,
  getSelected,
  getRunning,
  getTheme,
} from "../../redux/selectors";
import { DeadlineEntity } from "../../models/Deadline";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectTodo } from "../../redux/actions/todos/actions";
import SurveyButton from "../../components/settings/SurveyButton";

const TodoScreen = () => {
  const todos = useAppSelector(getAllTodos);
  const selected = useAppSelector(getSelected);
  const running = useAppSelector(getRunning);
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = React.useState(false);
  const modalizeRef = React.useRef<Modalize>(null);
  const windowHeight = useWindowDimensions().height;

  React.useEffect(() => {
    if (running) {
      dispatch(selectTodo(running));
    }
  }, []);

  const openAndSelectDeadline = (deadline: DeadlineEntity) => () => {
    // dispatch
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
          rightComponent={SettingsButton()}
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
          data: isOpen ? todos : [],
          keyExtractor: (item: Todo) => item.id,
          renderItem: ({ item }) => (
            <TodoComponents.ItemTile
              todo={item}
              selected={selected}
              running={running ? true : false}
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
