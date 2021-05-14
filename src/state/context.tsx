import React from "react";
import { Action } from "../hooks/Actions";
import { GlobalState, DEFAULT_GLOBAL_STATE } from "../hooks/State";

export const GlobalStateContext = React.createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: DEFAULT_GLOBAL_STATE,
  dispatch: () => null,
});
