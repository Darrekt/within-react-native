import PushNotification, {
  PushNotificationObject,
} from "react-native-push-notification";

export const WITHIN_CHANNEL_ID = "within-react-native";

export const pushNotification = (props: PushNotificationObject) => {
  PushNotification.channelExists(WITHIN_CHANNEL_ID, function (exists) {
    console.log(
      exists ? `Channel ${WITHIN_CHANNEL_ID} exists` : "Channel doesn't exist"
    );
  });
  PushNotification.channelBlocked(WITHIN_CHANNEL_ID, function (blocked) {
    console.log(
      blocked ? `Channel ${WITHIN_CHANNEL_ID} blocked` : "Channel OK"
    );
  });

  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: WITHIN_CHANNEL_ID, // (required) channelId, if the channel doesn't exist, notification will not trigger.
    ticker: "My Notification Ticker", // (optional)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    smallIcon: "ic_launcher", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigLargeIcon: "ic_launcher", // (optional) default: undefined
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: "some_tag", // (optional) add tag to message
    group: "group", // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "max", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
    when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

    /* iOS only properties */
    category: "Distraction!", // (optional) default: empty string

    /* iOS and Android properties */
    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    ...props,
  });
};
