import { List } from "immutable";
import { NativeModules, Platform } from "react-native";
import { TodoEntity } from "../../models/Todo";
import { getTimeLeft } from "../../util/timer";
import { Actions, DeadlineAction, TodoAction } from "../actions/actionTypes";
import { findTodoInList } from "../selectors";

const { DnDMode } = NativeModules;

/**
 * setTodo attempts to set the todo if it exists, and if not adds it to the end of the list.
 * @param state The current list of Todos for this project.
 * @param payload  The Todo to be added.
 * @returns a new Array which includes the updated or added entry.
 */
const setTodo = (state: TodoEntity[], payload: TodoEntity): TodoEntity[] => {
  return List(state)
    .set(
      state.findIndex((todo) => todo.id === payload.id),
      payload
    )
    .toArray();
};

/**
 * todoReducer is a nested reducer that will be called from the main projectReducer.
It therefore takes as state the list of Todos for this project. We can thus implicitly assume
that all todos in this instance of the reducer call will have the associated project ID. 

 * @param state
 * @param action 
 * @returns 
 */
const todoReducer = (
  state: TodoEntity[],
  action: DeadlineAction | TodoAction
): TodoEntity[] => {
  let target: TodoEntity;
  switch (action.type) {
    case Actions.TodoAdd:
      return List(state).push(action.payload).toArray();
    case Actions.TodoDelete:
      return state.filter((todo) => todo.id !== action.payload.id);
    case Actions.TodoUpdate:
      return setTodo(state, action.payload);
    case Actions.TodoToggleComplete:
      target = findTodoInList(state, action.payload.id);
      return setTodo(state, {
        ...target,
        completed: !target.completed,
      });

    // Timer Actions
    case Actions.TodoStart:
      let finishAt;
      finishAt = new Date(
        new Date().getTime() +
          500 +
          (action.payload.remaining
            ? action.payload.remaining
            : action.interval) *
            1000
      );
      Platform.OS === "android" && DnDMode.setDNDMode(true);
      return setTodo(state, {
        ...action.payload,
        remaining: null,
        finishingTime: finishAt.getTime(),
      });
    case Actions.TodoReset:
      Platform.OS === "android" && DnDMode.setDNDMode(false);
      return setTodo(state, {
        ...action.payload,
        remaining: null,
        finishingTime: null,
      });
    case Actions.TodoPause:
    case Actions.TodoFinish:
      Platform.OS === "android" && DnDMode.setDNDMode(false);
      return setTodo(state, {
        ...action.payload,
        laps:
          action.payload.laps + (action.type === Actions.TodoFinish ? 1 : 0),
        remaining:
          action.type === Actions.TodoPause && action.payload.finishingTime
            ? getTimeLeft(action.payload.finishingTime)
            : null,
        finishingTime: null,
      });

    // Deadline Actions
    case Actions.DeadlineAdd:
      return state.map((todo) => ({
        ...todo,
        deadline: action.payload.todos.find((item) => item === todo.id)
          ? action.payload.id
          : null,
      }));
    case Actions.DeadlineRemove:
      return state.map((todo) => ({
        ...todo,
        deadline: action.payload.todos.find((item) => item === todo.id)
          ? null
          : todo.deadline,
      }));
    case Actions.DeadlineComplete:
      return state.map((todo) => ({
        ...todo,
        completed: action.payload.todos.find((item) => item === todo.id)
          ? true
          : false,
      }));
    case Actions.TodoAssignDeadline:
      return List(state)
        .map(
          (todo) =>
            ({
              ...todo,
              deadline:
                todo.id === action.payload.id
                  ? action.payload.deadline
                  : todo.deadline === action.deadline
                  ? null
                  : todo.deadline,
            } as TodoEntity)
        )
        .toArray();
    case Actions.TodoDeassignDeadline:
      return List(state)
        .map(
          (todo) =>
            ({
              ...todo,
              deadline: todo.id === action.payload.id ? null : todo.deadline,
            } as TodoEntity)
        )
        .toArray();
    default:
      return state;
  }
};

export default todoReducer;
