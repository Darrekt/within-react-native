import { combineReducers } from "redux";
import projects from "./projects";
import selected from "./selected";
import settings from "./settings";

export default combineReducers({ projects, selected, settings });
