import { List } from "immutable";
import { DeadlineEntity } from "../../models/Deadline";
import { Actions, DeadlineAction, TodoAction } from "../actions/actionTypes";

const deadlineReducer = (
  state: DeadlineEntity[] = [],
  action: DeadlineAction | TodoAction
): DeadlineEntity[] => {
  switch (action.type) {
    case Actions.DeadlineAdd:
      return List(state).push(action.payload).toArray();
    case Actions.DeadlineRemove:
      return state.filter((item) => item.id !== action.payload.id);
    case Actions.DeadlineUpdate:
      return List(state)
        .set(
          state.findIndex((item) => item.id === action.payload.id),
          action.payload
        )
        .toArray();
    case Actions.DeadlineComplete:
      return List(state)
        .update(
          state.findIndex((item) => item.id === action.payload.id),
          (ddl) => ({
            ...ddl,
            completed: ddl.completed ? null : new Date().getTime(),
          })
        )
        .toArray();
    default:
      return state;
  }
};

export default deadlineReducer;
