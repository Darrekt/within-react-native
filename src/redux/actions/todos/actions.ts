import Todo from "../../../models/Todo";
import { Actions, TodoAction } from "../actionTypes";

export const addTodo = (todo: Todo): TodoAction => ({
  type: Actions.TodoAdd,
  payload: todo.toEntity(),
});

export const updateTodo = (todo: Todo): TodoAction => ({
  type: Actions.TodoUpdate,
  payload: todo.toEntity(),
});

export const deleteTodo = (todoID: string): TodoAction => ({
  type: Actions.TodoDelete,
  target: todoID,
});

export const selectTodo = (todoID: string): TodoAction => ({
  type: Actions.TodoSelect,
  target: todoID,
});

export const completeTodo = (todoID: string): TodoAction => ({
  type: Actions.TodoToggleComplete,
  target: todoID,
});
