import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { getTimeLeft, printTimeLeft } from "../../util/timer";
import { TodoEntity } from "../../models/Todo";
import CircleButtonGroup from "../util/CircleButtonGroup";
import { Icon } from "react-native-elements";
import { Actions, TodoAction } from "../../redux/actions/actionTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getFilters,
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

type DisplayProps = {
  selectedTask?: TodoEntity;
};

const TodoTimerDisplay = ({ selectedTask }: DisplayProps) => {
  const deadlines = useAppSelector(getSortedDeadlines);
  const filters = useAppSelector(getFilters);
  const windowDimensions = useWindowDimensions();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.positionedLogo}>
      <View style={{ flex: 1 }} />
      {selectedTask ? (
        <TodoTimer selectedTask={selectedTask} dispatch={dispatch} />
      ) : (
        <ScrollView style={{ width: windowDimensions.width }}>
          {deadlines.slice(0, 3).map((deadline) => (
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

  let secondsLeft;
  if (selectedTask.finishingTime)
    secondsLeft = getTimeLeft(selectedTask.finishingTime);
  else if (selectedTask.remaining) secondsLeft = selectedTask.remaining;
  else secondsLeft = settings.defaultInterval;

  const [timeLeft, setTimeLeft] = useState(secondsLeft);

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
