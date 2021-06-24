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
import PushNotification from "react-native-push-notification";

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
        // TODO: Push a notification telling the user to come back
        console.log(`Going from ${appState.current} to ${nextState}`);

        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: "your-channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
          ticker: "My Notification Ticker", // (optional)
          showWhen: true, // (optional) default: true
          autoCancel: true, // (optional) default: true
          largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
          largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
          smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
          bigText:
            "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
          subText: "This is a subText", // (optional) default: none
          bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
          bigLargeIcon: "ic_launcher", // (optional) default: undefined
          bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
          color: "red", // (optional) default: system default
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          tag: "some_tag", // (optional) add tag to message
          group: "group", // (optional) add group to message
          groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
          ongoing: false, // (optional) set whether this is an "ongoing" notification
          priority: "high", // (optional) set notification priority, default: high
          visibility: "private", // (optional) set notification visibility, default: private
          ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
          shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
          onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

          when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
          usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
          timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

          messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

          actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
          invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

          /* iOS only properties */
          category: "Distraction!", // (optional) default: empty string

          /* iOS and Android properties */
          id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          title: "Don't leave the app!", // (optional)
          message: "Come back and stay focused!", // (required)
          userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
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
