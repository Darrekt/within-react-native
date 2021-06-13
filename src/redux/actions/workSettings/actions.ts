import { TodoEntity } from "../../../models/Todo";
import { Actions, FilterAction } from "../actionTypes";

export const toggleFilter = (filter: string): FilterAction => ({
  type: Actions.ToggleFilter,
  payload: filter,
});

export const selectTodo = (todo: TodoEntity): FilterAction => ({
  type: Actions.SelectTodo,
  payload: todo.id,
});
