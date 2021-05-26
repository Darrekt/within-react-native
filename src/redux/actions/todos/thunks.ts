import firestore from "@react-native-firebase/firestore";
import { ProjectFromEntity, ProjectEntity } from "../../../models/Project";
import { TodoEntity } from "../../../models/Todo";
import projectReducer from "../../reducers/projects";
import todoReducer from "../../reducers/todos";
import { findProject, findTodoInState } from "../../selectors";
import { AppThunk, RootState } from "../../store";
import { Actions, TodoAction } from "../actionTypes";
import { writeToProjectsCollection } from "../projects/thunks";
import * as ActionCreators from "./actions";

export const writeTodosInProject =
  (userID: string) => (projID: string) => (todos: TodoEntity[]) =>
    firestore()
      .collection("Users")
      .doc(userID)
      .collection("projects")
      .doc(projID)
      .set({ todos: todos }, { mergeFields: ["todos"] });

/**
 * This function is ONLY used for two project states of the same size. It should NOT be used for adding or deleting projects.
 * @param prevState
 * @param newState
 */
export const diffAndWriteProjects = (
  userID: string,
  prevState: ProjectEntity[],
  newState: ProjectEntity[]
) => {
  console.log(prevState);
  console.log(newState);
  newState.forEach((project) => {
    const otherProj = prevState.find((item) => item.id === project.id);

    if (!otherProj || !ProjectFromEntity(project).equals(ProjectFromEntity(otherProj))) {
      writeToProjectsCollection(userID)(project);
    }
  });
};

const genTodoWriteFunc = (
  state: RootState,
  todo: TodoEntity
):
  | [TodoEntity[], (todos: TodoEntity[]) => Promise<void>]
  | [TodoEntity[], undefined] => {
  // try {
  const user = state.settings.user;
  const todos = findProject(state.projects, todo.project).todos;
  if (user) return [todos, writeTodosInProject(user)(todo.project)];
  else return [todos, undefined];
  // } catch (e) {
  //   console.log(e.message);
  // }
};

export const addFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.addTodo(todo);
    const [todos, writeTodos] = genTodoWriteFunc(getState(), todo);
    if (writeTodos) writeTodos(todoReducer(todos, action));
    else dispatch(action);
  };

export const deleteFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.deleteTodo(todo);
    const [todos, writeTodos] = genTodoWriteFunc(getState(), todo);
    if (writeTodos) writeTodos(todoReducer(todos, action));
    else dispatch(action);
  };

export const updateFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const action = ActionCreators.updateTodo(todo);

    if (state.settings.user) {
      const newState = projectReducer(state.projects, action);
      diffAndWriteProjects(state.settings.user, state.projects, newState);
    } else dispatch(action);
  };

export const completeFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.completeTodo(todo);
    const [todos, writeTodos] = genTodoWriteFunc(getState(), todo);
    if (writeTodos) writeTodos(todoReducer(todos, action));
    else dispatch(action);
  };

export const startFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const selected = findTodoInState(getState().projects, getState().selected);
    if (selected.id !== todo.id) throw new Error("Incorrectly selected todo!");
    const action: TodoAction = {
      type: Actions.TodoStart,
      payload: selected,
      interval: state.settings.defaultInterval,
    };
    const [todos, writeTodos] = genTodoWriteFunc(state, todo);

    if (writeTodos) writeTodos(todoReducer(todos, action));
    else dispatch(action);
  };

export const pauseFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const selected = findTodoInState(getState().projects, getState().selected);
    if (selected.id !== todo.id) throw new Error("Incorrectly selected todo!");
    const action: TodoAction = ActionCreators.pauseTodo(selected);
    const [todos, writeTodos] = genTodoWriteFunc(state, todo);
    if (writeTodos) writeTodos(todoReducer(todos, action));
    else dispatch(action);
  };

export const resetFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const selected = findTodoInState(getState().projects, getState().selected);
    if (selected.id !== todo.id) throw new Error("Incorrectly selected todo!");
    const action: TodoAction = ActionCreators.resetTodo(selected);
    const [todos, writeTodos] = genTodoWriteFunc(state, todo);
    if (writeTodos) writeTodos(todoReducer(todos, action));
    else dispatch(action);
  };

export const finishFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const selected = findTodoInState(getState().projects, getState().selected);
    if (selected.id !== todo.id) throw new Error("Incorrectly selected todo!");
    const action: TodoAction = ActionCreators.finishTodoInterval(selected);
    const [todos, writeTodos] = genTodoWriteFunc(state, todo);
    if (writeTodos) writeTodos(todoReducer(todos, action));
    else dispatch(action);
  };
