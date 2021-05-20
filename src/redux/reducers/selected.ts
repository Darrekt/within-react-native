import { Actions, TodoAction } from "../actions/actionTypes";

const selectedReducer = (state = "", action: TodoAction) => {
  if (action.type === Actions.TodoSelect) {
    return state === action.payload.id ? "" : action.payload.id;
  } else return state;
};

export default selectedReducer;
