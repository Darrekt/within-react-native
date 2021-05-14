import React from "react";
import { List } from "immutable";
import Project from "../models/Project";
import Todo from "../models/Todo";
import {
  SageSettings,
  sageDefaultSettings,
  SettingsAction,
} from "../hooks/useSettingsRepository";
import { TodoRepoAction } from "../hooks/useTodoRepository";
import { Action } from "../hooks/useProjectRepository";

export const SettingsContext = React.createContext<{
  settings: SageSettings;
  dispatch: React.Dispatch<SettingsAction>;
}>({
  settings: sageDefaultSettings,
  dispatch: () => null,
});

export const ProjContext = React.createContext<{
  projects: List<Project>;
  dispatch: React.Dispatch<Action>;
}>({
  projects: List<Project>(),
  dispatch: () => null,
});

export const TodoContext = React.createContext<{
  todos: List<Todo>;
  dispatch: React.Dispatch<TodoRepoAction>;
  selected: string;
  running: boolean;
}>({
  todos: List<Todo>(),
  dispatch: () => null,
  selected: "",
  running: false,
});
