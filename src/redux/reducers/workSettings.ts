import { List } from "immutable";
import { Action, Actions } from "../actions/actionTypes";

export type WorkSettings = { selected: string; filters: string[] };
export type FirestoreWorkSettings = Omit<WorkSettings, "selected">;
const defaultState: WorkSettings = {
  selected: "",
  filters: [],
};

const workSettingsReducer = (
  state = defaultState,
  action: Action
): WorkSettings => {
  switch (action.type) {
    case Actions.ProjectHydrate:
      return {
        ...state,
        selected: state.selected
          ? state.selected
          : action.payload
              .find((project) =>
                project.todos.some((todo) => todo.finishingTime)
              )
              ?.todos.find((todo) => todo.finishingTime)?.id ?? "",
      };
    case Actions.SettingsHydrate:
      return { ...state, ...action.payload.workSettings };
    case Actions.SelectTodo:
      return {
        ...state,
        selected: state.selected === action.payload ? "" : action.payload,
      };
    case Actions.ToggleFilter:
      return {
        ...state,
        filters: state.filters.some((value) => value === action.payload)
          ? state.filters.filter((value) => value !== action.payload)
          : List(state.filters).push(action.payload).toArray(),
      };
    default:
      return state;
  }
};

export default workSettingsReducer;
