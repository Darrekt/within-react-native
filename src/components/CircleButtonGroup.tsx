import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  tileActions: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtons: {
    paddingHorizontal: 5,
  },
});

type Props<A> = {
  actions: { action: A; icon: JSX.Element }[];
  dispatch: React.Dispatch<A>;
};

export default function CircleButtonGroup<A>({ actions, dispatch }: Props<A>) {
  return (
    <View style={styles.tileActions}>
      {actions.map((action, i) => (
        <TouchableOpacity
          style={styles.actionButtons}
          onPress={() => {
            dispatch(action.action);
          }}
        >
          {action.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
}
