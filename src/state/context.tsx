import React from "react";
import { List } from "immutable";
import Todo from "../models/Todo";
import { TodoRepoAction } from "../hooks/useTodoRepository";

export const OnboardContext = React.createContext({
  finishOnboarding: () => {},
});

export const TodoContext = React.createContext<{
  todos: List<Todo>;
  dispatch: React.Dispatch<TodoRepoAction>;
  selected: Todo | undefined,
  running: boolean,
}>({
  todos: List<Todo>(),
  dispatch: () => null,
  selected: undefined,
  running: false,
});
