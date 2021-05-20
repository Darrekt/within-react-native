import Todo from "../models/Todo";
import { RootState } from "./store";

export const getProjects = (state: RootState) => state.projects;
export const getSettings = (state: RootState) => state.settings;

export const getTodos = (state: RootState): Todo[] =>
  state.projects
    .map((proj) => proj.todos)
    .reduce((agg, projTodos) => agg.concat(projTodos), <Todo[]>[]);

export const isRunning = (state: RootState): boolean =>
  getTodos(state).some((todo) => todo.finishingTime !== undefined);
