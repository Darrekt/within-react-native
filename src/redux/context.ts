import React from "react";
import { Action } from "./actionTypes";
import { GlobalState, DEFAULT_GLOBAL_STATE } from "./store";

export const GlobalStateContext = React.createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: DEFAULT_GLOBAL_STATE,
  dispatch: () => null,
});
