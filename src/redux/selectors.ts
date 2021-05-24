import Project, {
  ProjectEntity,
  UNCATEGORISED_TODO_PROJID,
} from "../models/Project";
import { TodoEntity } from "../models/Todo";
import { RootState } from "../redux/store";

export const getProjects = (state: RootState) => state.projects;
export const getSelected = (state: RootState): string => state.selected;
export const getSettings = (state: RootState) => state.settings;
export const getAllTodos = (state: RootState): TodoEntity[] =>
  state.projects
    .map((proj) => proj.todos)
    .reduce((agg, projTodos) => agg.concat(projTodos), <TodoEntity[]>[]);

export const isRunning = (state: RootState): boolean =>
  getAllTodos(state).some((todo) => todo.finishingTime !== undefined);

export const findProject = (projects: ProjectEntity[], projectID: string) => {
  const project = projects.find(
    (proj) => proj.id === projectID
  ) as ProjectEntity;
  if (project) return project;
  else throw new Error(`Project ID not found: ${projectID}`);
};

/**
 * Returns a specified todo in a list of todos.
 * @param todos The list of todos (within a project)
 * @param todoID The ID of the Todo to be found.
 */
export function findTodoInList(
  todos: TodoEntity[],
  todoID: string
): TodoEntity {
  const searchResult = todos.find((todo) => todo.id === todoID);
  if (searchResult) return searchResult;
  else throw new Error(`Todo not found: ${todoID}`);
}

/**
 * Returns the specified TodoEntity from the entire app state. Throws an exception if not found.
 * @param state The entire app state.
 * @param target The ID of the Todo to be found.
 */
export function findTodoInState(
  state: ProjectEntity[],
  target: string
): TodoEntity {
  const targetTodo = state
    .find((proj) => proj.todos.some((todo) => todo.id === target))
    ?.todos.find((todo) => todo.id === target);
  if (targetTodo) return targetTodo;
  else throw new Error(`Todo ID not found: ${target}`);
}