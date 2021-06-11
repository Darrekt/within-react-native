import { compareDeadlines, DeadlineEntity } from "../models/Deadline";
import { ProjectEntity } from "../models/Project";
import { TodoEntity } from "../models/Todo";
import { RootState } from "../redux/store";
import { SAGE_THEME_LIST, Theme } from "../util/constants";

export const getSelected = (state: RootState): string => state.selected;
export const getSettings = (state: RootState) => state.settings;

export const getProjects = (state: RootState) => state.projects;
export const getCompletedProjects = (state: RootState) =>
  state.projects.filter((proj) => proj.completed);

export const getSortedDeadlines = (state: RootState): DeadlineEntity[] =>
  state.projects
    .map((proj) => proj.deadlines)
    .reduce(
      (agg, projDeadlines) => agg.concat(projDeadlines),
      <DeadlineEntity[]>[]
    )
    .sort(compareDeadlines);

export const getSortedCompletedDeadlines = (
  state: RootState
): DeadlineEntity[] =>
  getSortedDeadlines(state).filter((deadline) => !deadline.completed);

export const findDeadline =
  (deadlineID: string | undefined) => (state: RootState) =>
    deadlineID
      ? state.projects
          .find((proj) => proj.deadlines.some((ddl) => ddl.id === deadlineID))
          ?.deadlines.find((ddl) => ddl.id === deadlineID)
      : undefined;

export const getAllTodos = (state: RootState): TodoEntity[] =>
  state.projects
    .map((proj) => proj.todos)
    .reduce((agg, projTodos) => agg.concat(projTodos), <TodoEntity[]>[]);

export const getCompletedTodos = (state: RootState): TodoEntity[] =>
  getAllTodos(state).filter((todo) => todo.completed);

export const getIncompleteTodos = (state: RootState): TodoEntity[] =>
  getAllTodos(state).filter((todo) => !todo.completed);

export const getTheme = (state: RootState): Theme =>
  SAGE_THEME_LIST[state.settings.theme];

export const getRunning = (state: RootState): TodoEntity | undefined =>
  getAllTodos(state).find((todo) => todo.finishingTime);

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
