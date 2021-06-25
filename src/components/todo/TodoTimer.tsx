import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
  AppState,
  AppStateStatus,
} from "react-native";
import { getTimeLeft, printTimeLeft } from "../../util/timer";
import { TodoEntity } from "../../models/Todo";
import CircleButtonGroup from "../util/CircleButtonGroup";
import { Icon } from "react-native-elements";
import { Actions, TodoAction } from "../../redux/actions/actionTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getFilters,
  getSelectedTodo,
  getSettings,
  getSortedDeadlines,
} from "../../redux/selectors";
import {
  pauseFirebaseTodo,
  startFirebaseTodo,
  resetFirebaseTodo,
} from "../../redux/actions/todos/thunks";
import { AppThunk } from "../../redux/store";
import { ScrollView } from "react-native-gesture-handler";
import DeadlineDisplay from "./DeadlineDisplay";
import { toggleFilterFirebase } from "../../redux/actions/workSettings/thunks";
import { globalStyles } from "../../../styles";
import { pushNotification } from "../../util/pushNotification";

const styles = StyleSheet.create({
  positionedLogo: {
    position: "absolute",
    top: 0,
    height: "45%",
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    alignItems: "center",
  },
  timerFont: {
    fontSize: 64,
    fontWeight: "400",
    color: "black",
  },
});

const TodoTimerDisplay = () => {
  const deadlines = useAppSelector(getSortedDeadlines);
  const selectedTodo = useAppSelector(getSelectedTodo);
  const filters = useAppSelector(getFilters);
  const windowDimensions = useWindowDimensions();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.positionedLogo}>
      <View style={{ flex: 1 }} />
      {selectedTodo ? (
        <TodoTimer selectedTask={selectedTodo} dispatch={dispatch} />
      ) : (
        <ScrollView style={{ width: windowDimensions.width }}>
          {deadlines
            .filter((ddl) => !ddl.completed)
            .slice(0, 3)
            .map((deadline) => (
              <DeadlineDisplay
                key={deadline.id}
                selected={filters.some((filterID) => filterID === deadline.id)}
                deadline={deadline}
                onPress={() => dispatch(toggleFilterFirebase(deadline.id))}
              />
            ))}
        </ScrollView>
      )}
      <View style={{ flex: 1 }} />
    </View>
  );
};

type TimerProps = {
  selectedTask: TodoEntity;
  dispatch: React.Dispatch<TodoAction>;
};

const TodoTimer = ({ selectedTask, dispatch }: TimerProps) => {
  const settings = useAppSelector(getSettings);
  const appState = useRef(AppState.currentState);

  let secondsLeft;
  if (selectedTask.finishingTime)
    secondsLeft = getTimeLeft(selectedTask.finishingTime);
  else if (selectedTask.remaining) secondsLeft = selectedTask.remaining;
  else secondsLeft = settings.defaultInterval;

  const [timeLeft, setTimeLeft] = useState(secondsLeft);

  // App state monitor, send a push note when outside app and timer is ticking.
  useEffect(() => {
    const _handleAppStateChange = (nextState: AppStateStatus) => {
      if (selectedTask.finishingTime && appState.current === "active") {
        pushNotification({
          message: "Come back and stay focused!", // (required)
          title: "Don't leave the app!",
          bigText:
            "It seems that you've left the app. Hang in there and finish this interval before taking a break!",
          subText: "Distraction detected!",
        });
      } else if (selectedTask.finishingTime && nextState === "active") {
        // TODO: Replace this with confetti or a heart flood after 500ms
        console.log("Congrats on coming back!");
      }
      appState.current = nextState;
    };
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, [selectedTask]);

  // Timer side-effect: run every time the component re-renders
  useEffect(() => {
    if (!selectedTask.finishingTime && !selectedTask.remaining)
      setTimeLeft(settings.defaultInterval);
    if (timeLeft === 0 && selectedTask.finishingTime) {
      dispatch({ type: Actions.TodoFinish, payload: selectedTask });
      return;
    }
    // in one second, if the task is running, set the time left on the task.
    const timer = setTimeout(() => {
      if (selectedTask.finishingTime)
        setTimeLeft(getTimeLeft(selectedTask.finishingTime));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  const timerActions: {
    key: string;
    action: TodoAction | AppThunk;
    icon: JSX.Element;
  }[] = [
    {
      key: "timerControl",
      action: selectedTask.finishingTime
        ? pauseFirebaseTodo(selectedTask)
        : startFirebaseTodo(selectedTask),

      icon: (
        <Icon
          reverse
          name={selectedTask.finishingTime ? "pause" : "caretright"}
          type="antdesign"
        />
      ),
    },
    {
      key: "timerReset",
      action: resetFirebaseTodo(selectedTask),
      icon: <Icon reverse name="ios-refresh" type="ionicon" color="black" />,
    },
  ];
  return (
    <View style={globalStyles.column}>
      <Text style={styles.timerFont}>{printTimeLeft(timeLeft)}</Text>
      <CircleButtonGroup actions={timerActions} active />
    </View>
  );
};

export default TodoTimerDisplay;
