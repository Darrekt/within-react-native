import { useReducer } from "react";
import Todo from "../models/Todo";
import TodoRepository from "../models/TodoRepository";

export type TodoRepoAction = {
  name: "add" | "update" | "delete";
  payload: Todo;
};

const useAsyncTodoRepository = () => {
  const repo = new TodoRepository();
  const reducer = (state: TodoRepository, action: TodoRepoAction) => {
    switch (action.name) {
      case "add":
        state.addItem(action.payload);
        break;
      case "update":
        state.updateItem(action.payload);
        break;
      case "delete":
        state.deleteItem(action.payload);
        break;
      default:
        throw new Error("Invalid TodoRepoAction");
        break;
    }
    return state;
  };
  return useReducer(reducer, repo);
};

export default useAsyncTodoRepository;
