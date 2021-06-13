import { combineReducers } from "redux";
import projects from "./projects";
import workSettings from "./workSettings";
import appSettings from "./appSettings";

export default combineReducers({ projects, workSettings, appSettings });
