import { useReducer } from "react";
import { List } from "immutable";
import Todo from "../models/Todo";
import TodoRepository from "../models/TodoRepository";

export type TodoRepoAction = {
  name: "add" | "update" | "delete";
  payload: Todo;
};

const useAsyncTodoRepository = () => {
  const repo = new TodoRepository();
  const reducer = (state: Array<Todo>, action: TodoRepoAction) => {
    switch (action.name) {
      case "add":
        repo.addItem(action.payload);
        break;
      case "update":
        repo.updateItem(action.payload);
        break;
      case "delete":
        repo.deleteItem(action.payload);
        break;
      default:
        throw new Error("Invalid TodoRepoAction");
        break;
    }
    return repo.todos;
  };
  return useReducer(reducer, repo.todos);
};

export default useAsyncTodoRepository;
