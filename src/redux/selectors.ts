import Project from "../models/Project";
import Todo from "../models/Todo";
import { RootState } from "../redux/store";

export const getProjects = (state: RootState) => state.projects;
export const getSelected = (state: RootState): string => state.selected;
export const getSettings = (state: RootState) => state.settings;

export const getTodos = (state: RootState): Todo[] =>
  state.projects
    .map((proj) => proj.todos)
    .reduce((agg, projTodos) => agg.concat(projTodos), <Todo[]>[]);

export const isRunning = (state: RootState): boolean =>
  getTodos(state).some((todo) => todo.finishingTime !== undefined);

export const findTodoByID = (state: Project[], target: string): Todo => {
  const targetTodo = state
    .find((proj) => proj.todos.some((todo) => todo.id === target))
    ?.todos.find((todo) => todo.id === target);

  if (targetTodo === undefined) throw new Error("Todo ID not found");
  else return targetTodo;
};
