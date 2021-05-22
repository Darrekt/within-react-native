import { ProjectEntity } from "../models/Project";
import { TodoEntity } from "../models/Todo";
import { RootState } from "../redux/store";

export const getProjects = (state: RootState) => state.projects;
export const getSelected = (state: RootState): string => state.selected;
export const getSettings = (state: RootState) => state.settings;

export const getTodos = (state: RootState): TodoEntity[] =>
  state.projects
    .map((proj) => proj.todos)
    .reduce((agg, projTodos) => agg.concat(projTodos), <TodoEntity[]>[]);

export const isRunning = (state: RootState): boolean =>
  getTodos(state).some((todo) => todo.finishingTime !== undefined);

export const findTodoByID = (
  state: ProjectEntity[],
  target: string
): TodoEntity => {
  const targetTodo = state
    .find((proj) => proj.todos.some((todo) => todo.id === target))
    ?.todos.find((todo) => todo.id === target);

  if (targetTodo === undefined) throw new Error("Todo ID not found");
  else return targetTodo;
};
