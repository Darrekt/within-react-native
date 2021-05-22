import {
  Action,
  Actions,
} from "../actions/actionTypes";

const selectedReducer = (state = "", action: Action) => {
  if (action.type === Actions.TodoSelect) {
    return state === action.payload.id ? "" : action.payload.id;
  } else return state;
};

export default selectedReducer;
