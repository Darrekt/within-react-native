import React, { useState } from "react";
import { View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { SageTheme, SAGE_THEME_LIST } from "../../util/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFirebaseTheme } from "../../redux/actions/settings/thunks";
import { globalStyles } from "../../../styles";
import { getSettings } from "../../redux/selectors";

export default function ChangeThemeScreen() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(getSettings)
  return (
    <View style={globalStyles.centered}>
      <ModalSelector
        style={{ width: "80%" }}
        initValueTextStyle={{
          color: SAGE_THEME_LIST[settings.theme].dark
        }}
        data={Object.entries(SAGE_THEME_LIST).map(([name, theme]) => ({
          key: name,
          label: name,
        }))}
        initValue={settings.theme}
        onChange={(option) => {
          dispatch(changeFirebaseTheme(option.label as SageTheme));
        }}
        cancelText="Cancel"
      />
    </View>
  );
}
