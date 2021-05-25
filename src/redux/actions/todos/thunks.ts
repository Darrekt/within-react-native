import firestore from "@react-native-firebase/firestore";
import Todo, { TodoEntity } from "../../../models/Todo";
import todoReducer from "../../reducers/todos";
import { findProject, findTodoInState } from "../../selectors";
import { AppThunk, RootState } from "../../store";
import { Actions } from "../actionTypes";
import * as ActionCreators from "./actions";

export const writeTodosInProject =
  (userID: string) => (projID: string) => (todos: TodoEntity[]) =>
    firestore()
      .collection("Users")
      .doc(userID)
      .collection("projects")
      .doc(projID)
      .set({ todos: todos }, { mergeFields: ["todos"] });

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

//FIXME: Currently doesn't write to both projects if you change it.
export const updateFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    const action = ActionCreators.updateTodo(todo);
    const todos = getState().projects.find(
      (proj) => proj.id === todo.project
    )?.todos;
    if (!todos) throw new Error("Invalid project ID");
    if (user)
      await writeTodosInProject(user)(todo.project)(todoReducer(todos, action));
    else dispatch(action);
  };

export const completeFirebaseTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.completeTodo(todo);
    const [todos, writeTodos] = genTodoWriteFunc(getState(), todo);
    if (writeTodos) writeTodos(todoReducer(todos, action));
    else dispatch(action);
  };

export const startTodo =
  (todo: TodoEntity): AppThunk =>
  async (dispatch, getState) => {
    const selected = findTodoInState(getState().projects, getState().selected);
    if (selected.id !== todo.id) throw new Error("Incorrectly selected todo!");
    dispatch({
      type: Actions.TodoStart,
      payload: selected,
      interval: getState().settings.defaultInterval,
    });
  };
