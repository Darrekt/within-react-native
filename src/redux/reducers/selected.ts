import { Action, Actions } from "../actions/actionTypes";

const selectedReducer = (state = "", action: Action) => {
  switch (action.type) {
    case Actions.ProjectHydrate:
      return (
        action.payload
          .find((project) => project.todos.some((todo) => todo.finishingTime))
          ?.todos.find((todo) => todo.finishingTime)?.id ?? ""
      );
    case Actions.TodoSelect:
      return state === action.payload.id ? "" : action.payload.id;
    default:
      return state;
  }
};

export default selectedReducer;
