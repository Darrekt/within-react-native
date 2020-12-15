import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer } from "react";
import { List } from "immutable";
import Todo from "../models/Todo";

export type TodoRepoAction = TodoRepoCRUDAction | TodoRepoAsyncAction;

export type TodoRepoAsyncAction = {
  name: "hydrate" | "flush";
  payload: List<Todo>;
};

export type TodoRepoCRUDAction = {
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
  let newState: List<Todo>;
  switch (action.name) {
    case "add":
      newState = state.push(action.payload);
      break;
    case "update":
      newState = state.update(
        state.findIndex((item) => item.id == action.payload.id),
        (item) => (item = action.payload)
      );
      break;
    case "delete":
      newState = state.filter((item) => item.id !== action.payload.id);
      break;
    case "hydrate":
      newState = action.payload;
      break;
    case "flush":
      newState = List<Todo>();
    default:
      throw new Error("Invalid Todo Action");
      break;
  }
  writeItems(newState);
  return newState;
};

const useTodoRepository: () => [
  List<Todo>,
  React.Dispatch<TodoRepoAction>
] = () => {
  const [todos, dispatch] = useReducer(todoReducer, List<Todo>());
  // TODO: Add the async storage effect into here
  useEffect(() => {
    const asyncTodos = readItems().then((asyncStorageTodos) => {
      if (asyncStorageTodos && asyncStorageTodos != todos)
        dispatch({ name: "hydrate", payload: asyncStorageTodos });
    });
  }, []);

  return [todos, dispatch];
};

export default useTodoRepository;
