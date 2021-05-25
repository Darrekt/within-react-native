import { TodoEntity } from "../../../models/Todo";
import { Actions, TodoAction } from "../actionTypes";

export const addTodo = (todo: TodoEntity): TodoAction => ({
  type: Actions.TodoAdd,
  payload: todo,
});

export const updateTodo = (todo: TodoEntity): TodoAction => ({
  type: Actions.TodoUpdate,
  payload: todo,
});

export const deleteTodo = (todo: TodoEntity): TodoAction => ({
  type: Actions.TodoDelete,
  payload: todo,
});

export const selectTodo = (todo: TodoEntity): TodoAction => ({
  type: Actions.TodoSelect,
  payload: todo,
});

export const completeTodo = (todo: TodoEntity): TodoAction => ({
  type: Actions.TodoToggleComplete,
  payload: todo,
});

export const pauseTodo = (todo: TodoEntity): TodoAction => ({
  type: Actions.TodoPause,
  payload: todo,
});

export const resetTodo = (todo: TodoEntity): TodoAction => ({
  type: Actions.TodoReset,
  payload: todo,
});

export const finishTodoInterval = (todo: TodoEntity): TodoAction => ({
  type: Actions.TodoFinish,
  payload: todo,
});
