import AsyncStorage from "@react-native-async-storage/async-storage";
import { useReducer } from "react";
import { List } from "immutable";
import Todo from "../models/Todo";

export type TodoRepoAction = {
  name: "add" | "update" | "delete";
  payload: Todo;
};

async function readItems() {
  try {
    const tempLstStr = await AsyncStorage.getItem("todos");
    if (tempLstStr !== null)
      return List(
        (JSON.parse(tempLstStr) as Array<Object>).map((item) => new Todo(item))
      );
  } catch (error) {
    console.log("Error reading todos");
  }
}

async function writeItems(state: List<Todo>) {
  try {
    await AsyncStorage.setItem(
      "todos",
      JSON.stringify(state.map((item) => item.toEntity()).toJSON())
    );
  } catch (error) {
    console.log("Error in saving todos");
  }
}

const todoReducer = (state: List<Todo>, action: TodoRepoAction) => {
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

const useTodoRepository = () => {
  // TODO: Add the async storage effect into here
  return useReducer(todoReducer, List<Todo>());
};

export default useTodoRepository;
