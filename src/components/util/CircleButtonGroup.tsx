import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "../../redux/actions/actionTypes";
import { useAppDispatch } from "../../redux/hooks";
import { AppThunk } from "../../redux/store";

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

type Props = {
  actions: { key: string; action: any; icon: JSX.Element }[];
  active: boolean;
};

export default function CircleButtonGroup({ actions, active }: Props) {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.tileActions}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.key}
          style={styles.actionButtons}
          onPress={() => active && dispatch(action.action)}
        >
          {action.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
}
