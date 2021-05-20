import "react-native-get-random-values";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";
import StackScreens from "./src/screens/StackScreens";

export default function App() {
  return (
    <Provider store={store}>
      <StackScreens />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
}
