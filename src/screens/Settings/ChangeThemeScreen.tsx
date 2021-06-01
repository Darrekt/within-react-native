import React from "react";
import { View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { SageTheme, SAGE_THEME_LIST } from "../../util/constants";
import { useAppDispatch } from "../../redux/hooks";
import { changeFirebaseTheme } from "../../redux/actions/settings/thunks";
import { globalStyles } from "../../../styles";

export default function ChangeThemeScreen() {
  const dispatch = useAppDispatch();
  return (
    <View style={globalStyles.centered}>
      <ModalSelector
        data={Object.entries(SAGE_THEME_LIST).map(([name, theme]) => ({
          key: name,
          label: name,
        }))}
        initValue={"Mint"}
        onChange={(option) => {
          dispatch(changeFirebaseTheme(option.label as SageTheme));
        }}
        cancelText="Cancel"
      />
    </View>
  );
}
