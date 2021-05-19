import { combineReducers } from "redux";
import projectReducer from "./projects"
import todoReducer from "./todos"
import settingsReducer from "./settings"

export default combineReducers({ projectReducer, todoReducer, settingsReducer })