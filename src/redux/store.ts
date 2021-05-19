import Project from "../models/Project";
import Todo from "../models/Todo";
import { SageSettings, SAGE_DEFAULT_SETTINGS } from "./reducers/settings";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

export type GlobalState = {
  projects: Project[];
  todos: Todo[];
  settings: SageSettings;
};

export default createStore(rootReducer);
