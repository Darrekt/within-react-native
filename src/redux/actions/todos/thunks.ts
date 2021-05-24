import firestore from "@react-native-firebase/firestore";
import { List } from "immutable";
import Todo, { TodoEntity } from "../../../models/Todo";
import { AppThunk } from "../../store";
import { Actions, TodoAction } from "../actionTypes";
import * as ActionCreators from "./actions";

export const writeTodosInProject =
  (userID: string) => (projID: string) => (todos: TodoEntity[]) =>
    firestore()
      .collection("Users")
      .doc(userID)
      .collection("projects")
      .doc(projID)
      .set(todos, { mergeFields: ["todos"] });

export const addFirebaseTodo =
  (todo: Todo): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().settings.user;
    const todos = getState().projects.find(
      (proj) => proj.id === todo.project
    )?.todos;

    if (!todos) throw new Error("Invalid project ID");

    if (user)
      await writeTodosInProject(user)(todo.project)(
        List(todos).push(todo.toEntity()).toArray()
      );
    else dispatch(ActionCreators.addTodo(todo));
  };

export const deleteFirebaseTodo = (todoID: string): TodoAction => ({
  type: Actions.TodoSelect,
  target: todoID,
});

export const updateFirebaseTodo = (todoID: string): TodoAction => ({
  type: Actions.TodoSelect,
  target: todoID,
});
