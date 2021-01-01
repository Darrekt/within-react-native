import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer } from "react";
import { List } from "immutable";
import Todo from "../models/Todo";

export type TodoRepoAction =
  | TodoAsyncStorageAction
  | TodoCRUDAction
  | TodoProductivityAction
  | TodoTimerAction;

export type TodoAsyncStorageAction = {
  type: "hydrate" | "flush";
  payload?: List<Todo>;
};

export type TodoCRUDAction = {
  type: "add" | "update" | "delete";
  payload: Todo;
};

export type TodoProductivityAction = {
  type: "selected" | "completed";
  target: Todo["id"];
};

export type TodoTimerAction = {
  type: "start" | "pause" | "reset" | "finished";
  target: Todo["id"];
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
  switch (action.type) {
    // TodoTimerActions
    case "start":
      newState = state.update(
        state.findIndex((item) => item.id == action.target),
        (item) => {
          // TODO: Let this be a setting variable.
          let in25mins = new Date();
          in25mins.setMinutes(in25mins.getMinutes() + 25);
          // Padding to offset re-render delays
          in25mins.setMilliseconds(in25mins.getMilliseconds() + 500);
          return new Todo({ ...item, finishingTime: in25mins });
        }
      );
      break;
    case "pause":
    case "reset":
    case "finished":
      newState = state.update(
        state.findIndex((item) => item.id == action.target),
        (item) => {
          return new Todo({
            ...item,
            laps: item.laps + (action.type === "finished" ? 1 : 0),
            finishingTime: undefined,
          });
        }
      );
      break;

    // TodoProductivityActions
    case "selected":
      newState = state.update(
        state.findIndex((item) => item.id == action.target),
        (item) => new Todo({ ...item, selected: !item.selected })
      );
      break;
    case "completed":
      newState = state.update(
        state.findIndex((item) => item.id == action.target),
        (item) => new Todo({ ...item, completed: !item.completed })
      );
      break;

    // TodoCRUDActions
    case "update":
      newState = state.update(
        state.findIndex((item) => item.id == action.payload.id),
        (item) => (item = action.payload)
      );
      break;
    case "add":
      newState = state.push(action.payload);
      break;
    case "delete":
      newState = state.filter((item) => item.id !== action.payload.id);
      break;

    // TodoAsyncStorageActions
    case "hydrate":
      newState = action.payload ?? List<Todo>();
      break;
    case "flush":
      newState = List<Todo>();
      break;
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
        dispatch({ type: "hydrate", payload: asyncStorageTodos });
    });
  }, []);

  return [todos, dispatch];
};

export default useTodoRepository;
