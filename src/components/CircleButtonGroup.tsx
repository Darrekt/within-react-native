import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  tileActions: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

type Props<A> = {
  actions: {action: A, icon: JSX.Element}[];
  dispatch: React.Dispatch<A>;
};

const CircleButtonGroup = <A,>({
  actions,
  dispatch
}: Props<A>) => {
  return (
    <View style={styles.tileActions}>
      {actions.map((action) => (
        <TouchableOpacity
          onPress={() => {
            dispatch(action.action);
          }}
        >
          {action.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CircleButtonGroup;
