import { Actions, FilterAction } from "../actionTypes";

export const toggleFilter = (filter: string): FilterAction => ({
  type: Actions.ToggleFilter,
  payload: filter,
});

export const selectTodo = (todoID: string): FilterAction => ({
  type: Actions.SelectTodo,
  payload: todoID,
});
