import { Actions, WorkAction } from "../actionTypes";

export const clearWorkSession = (): WorkAction => ({
  type: Actions.ClearWorkSession,
});

export const toggleFilter = (filter: string): WorkAction => ({
  type: Actions.ToggleFilter,
  payload: filter,
});

export const selectTodo = (todoID: string): WorkAction => ({
  type: Actions.SelectTodo,
  payload: todoID,
});
