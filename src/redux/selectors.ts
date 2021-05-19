import Project from "../models/Project";
import Todo from "../models/Todo";

export const getAllTodos = (projects: Project[]): Todo[] =>
  projects
    .map((proj) => proj.todos)
    .reduce((agg, projTodos) => agg.concat(projTodos.toArray()), <Todo[]>[]);

export const isRunning = (todos: Todo[]): boolean =>
  todos.some((todo) => todo.finishingTime !== undefined);
