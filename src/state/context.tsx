import React from "react";
import { Action } from "./Actions";
import { GlobalState, DEFAULT_GLOBAL_STATE } from "./Store";

export const GlobalStateContext = React.createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: DEFAULT_GLOBAL_STATE,
  dispatch: () => null,
});
