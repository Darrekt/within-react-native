import React from "react";
import { View, useWindowDimensions } from "react-native";
import { Header } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { globalStyles } from "../../../styles";
import LinearGradient from "react-native-linear-gradient";
import * as TodoComponents from "../../components/todo/TodoComponents";
import SettingsButton from "../../components/settings/SettingsButton";
import Todo from "../../models/Todo";
import { useSelector } from "react-redux";
import { getAllTodos, getSelected, isRunning } from "../../redux/selectors";
import { DeadlineEntity } from "../../models/Deadline";

const TodoScreen = () => {
  const todos = useSelector(getAllTodos);
  const selected = useSelector(getSelected);
  const running = useSelector(isRunning);

  const [isOpen, setIsOpen] = React.useState(false);
  const modalizeRef = React.useRef<Modalize>(null);
  const windowHeight = useWindowDimensions().height;

  const openAndSelectDeadline = (deadline: DeadlineEntity) => () => {
    // dispatch
    modalizeRef.current?.open("top");
  };

  return (
    <View style={globalStyles.container}>
      {!isOpen && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          colors={["#01D1EE", "#96E9F5"]}
          style={{
            position: "absolute",
            height: "37%",
            width: "100%",
            top: 0,
            // borderBottomStartRadius: 20,
            // borderBottomEndRadius: 20,
          }}
        />
      )}
      {!isOpen && (
        <Header
          backgroundColor="transparent"
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
              running={running}
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
