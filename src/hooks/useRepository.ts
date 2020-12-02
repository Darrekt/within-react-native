import { useReducer } from "react";
import { List } from "immutable";
import Todo from "../models/Todo";

export type TodoRepoAction = {
  name: "add" | "update" | "delete";
  payload: Todo;
};

const useTodoReducer = () => {
  const reducer = (state: List<Todo>, action: TodoRepoAction) => {
    switch (action.name) {
      case "add":
        return state.push(action.payload);
        break;
      case "update":
        return state.update(
          state.findIndex((item) => item.id == action.payload.id),
          (item) => (item = action.payload)
        );
        break;
      case "delete":
        return state.filter((item) => item.id !== action.payload.id);
        break;
      default:
        throw new Error("Invalid Todo Action");
        break;
    }
  };
  return useReducer(reducer, List<Todo>());
};

export default useTodoReducer;
