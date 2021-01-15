import React from "react";
import { List } from "immutable";
import Todo from "../models/Todo";
import {
  SageSettings,
  sageDefaultSettings,
  SettingsAction,
} from "../hooks/useSettingsRepository";
import { TodoRepoAction } from "../hooks/useTodoRepository";

// TODO: Change to a generic dispatch
export const SettingsContext = React.createContext<{
  settings: SageSettings;
  dispatch: React.Dispatch<SettingsAction>,
}>({
  settings: sageDefaultSettings,
  dispatch: () => null,
});

export const TodoContext = React.createContext<{
  todos: List<Todo>;
  dispatch: React.Dispatch<TodoRepoAction>;
  selected: Todo | undefined;
  running: boolean;
}>({
  todos: List<Todo>(),
  dispatch: () => null,
  selected: undefined,
  running: false,
});
