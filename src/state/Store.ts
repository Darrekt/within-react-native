import { List } from "immutable";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import Project from "../models/Project";
import Todo from "../models/Todo";

export type SageSettings = {
  onboarding: boolean;
  user: FirebaseAuthTypes.User | null;
  theme: boolean;
  maxProjects: number;
  maxTasks: number;
  defaultInterval: number;
};

export type GlobalState = {
  projects: List<Project>;
  settings: SageSettings;
  selectedTodo: string;
  running: boolean;
};

export const SAGE_DEFAULT_SETTINGS: SageSettings = {
  onboarding: false,
  user: null,
  theme: true,
  maxProjects: 4,
  maxTasks: 3,
  defaultInterval: 25 * 60,
};

export const DEFAULT_GLOBAL_STATE: GlobalState = {
  projects: List<Project>(),
  settings: SAGE_DEFAULT_SETTINGS,
  selectedTodo: "",
  running: false,
};

export const getAllTodos = (projects: List<Project>): List<Todo> =>
  projects
    .map((proj) => proj.todos)
    .reduce((agg, projTodos) => agg.concat(projTodos), List<Todo>([]));

export const isRunning = (todos: List<Todo>): boolean =>
  todos.some((todo) => todo.finishingTime !== undefined);
