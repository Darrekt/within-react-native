import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer, useContext } from "react";
import { List } from "immutable";
import Todo from "../models/Todo";
import firestore from "@react-native-firebase/firestore";
import { getTimeLeft } from "../util/timer";
import { SettingsContext } from "../state/context";

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

async function writeItems(state: List<Todo>, uid?: string) {
  try {
    if (uid) {
      const tempLstStr = await AsyncStorage.getItem("todos");
      if (tempLstStr !== null) {
        await firestore()
          .collection("Users")
          .doc(uid)
          .collection("todos")
          .doc("current")
          .set({
            current: JSON.stringify(
              state.map((item) => item.toEntity()).toJSON()
            ),
          });
      }
    } else {
      await AsyncStorage.setItem(
        "todos",
        JSON.stringify(state.map((item) => item.toEntity()).toJSON())
      );
    }
  } catch (error) {
    console.log("Error saving todos:", error);
  }
}

const useTodoRepository: () => [
  List<Todo>,
  React.Dispatch<TodoRepoAction>,
  Todo | undefined,
  boolean
] = () => {
  const { settings } = useContext(SettingsContext);

  const todoReducer = (state: List<Todo>, action: TodoRepoAction) => {
    let newState: List<Todo>;
    switch (action.type) {
      // TodoTimerActions
      case "start":
        newState = state.update(
          state.findIndex((item) => item.id == action.target),
          (item) => {
            const finishAt = new Date();
            if (item.remaining) {
              finishAt.setSeconds(finishAt.getSeconds() + item.remaining);
            } else {
              finishAt.setMinutes(
                finishAt.getMinutes() + settings.defaultInterval / 60
              );
            }
            // Padding to offset re-render delays
            finishAt.setMilliseconds(finishAt.getMilliseconds() + 500);
            return new Todo({
              ...item,
              remaining: undefined,
              finishingTime: finishAt,
            });
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
              remaining:
                action.type === "pause" ? getTimeLeft(item) : undefined,
              finishingTime: undefined,
            });
          }
        );
        break;

      // TodoProductivityActions
      case "selected":
        newState = state.map(
          (item) =>
            new Todo({
              ...item,
              selected: item.id == action.target ? !item.selected : false,
            })
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
    if (action.type !== "hydrate") writeItems(newState, settings.user?.uid);
    return newState;
  };

  const [todos, dispatch] = useReducer(todoReducer, List<Todo>());
  const selected = todos.find((todo) => todo.selected);
  const running = selected?.finishingTime ? true : false;

  // If user is signed in, use Firebase as the source of truth and update AsyncStorage
  // Otherwise, use only AsyncStorage and update FireStore once you're signed in.
  useEffect(() => {
    if (settings.user) {
      return firestore()
        .collection("Users")
        .doc(settings.user.uid)
        .collection("todos")
        .doc("current")
        .onSnapshot((documentSnapshot) => {
          const storedData = JSON.parse(
            documentSnapshot.get("current")
          ) as Array<Object>;
          const storedTodos = List(storedData).map((item) => new Todo(item));
          dispatch({ type: "hydrate", payload: storedTodos });
        });
    } else {
      AsyncStorage.getItem("todos")
        .then((tempLstStr) => {
          if (tempLstStr) {
            const asyncTodos = List(
              (JSON.parse(tempLstStr) as Array<Object>).map(
                (item) => new Todo(item)
              )
            );
            dispatch({ type: "hydrate", payload: asyncTodos });
          }
        })
        .catch((error) => {
          console.log("Error reading todos:", error);
        });
    }
  }, [settings.user]);

  return [todos, dispatch, selected, running];
};

export default useTodoRepository;
