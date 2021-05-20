import { List } from "immutable";
import Todo from "../../models/Todo";
import { getTimeLeft } from "../../util/timer";
import { Actions, TodoAction } from "../actionTypes";

const setTodo = (state: Todo[], payload: Todo): Todo[] =>
  List(state)
    .set(
      state.findIndex((todo) => todo.id === payload.id),
      payload
    )
    .toArray();

// todoReducer is a nested reducer that will be called from the main projectReducer.
// It therefore takes as state the list of Todos for this project. We can thus implicitly assume
// that all todos in this instance of the reducer call will have the associated project ID.
const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case Actions.TodoAdd:
      return List(state).push(action.payload).toArray();
    case Actions.TodoDelete:
      return state.filter((todo) => todo.id !== action.payload.id);
    case Actions.TodoUpdate:
      return setTodo(state, action.payload);

    // TodoProductivityActions
    case Actions.TodoToggleComplete:
      return setTodo(
        state,
        new Todo({ ...action.payload, completed: !action.payload.completed })
      );

    // TodoTimerActions
    case Actions.TodoStart:
      const finishAt = new Date();
      if (action.payload.remaining) {
        finishAt.setSeconds(finishAt.getSeconds() + action.payload.remaining);
      } else {
        finishAt.setMinutes(finishAt.getMinutes() + action.interval / 60);
      }
      finishAt.setMilliseconds(finishAt.getMilliseconds() + 500);

      return setTodo(
        state,
        new Todo({
          ...action.payload,
          remaining: undefined,
          finishingTime: finishAt,
        })
      );

    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
      return setTodo(
        state,
        new Todo({
          ...action.payload,
          remaining:
            action.type == Actions.TodoPause
              ? getTimeLeft(action.payload)
              : undefined,
          laps:
            action.payload.laps + (action.type === Actions.TodoFinish ? 1 : 0),
          finishingTime: undefined,
        })
      );

    default:
      throw Error("Invalid todo action");
  }
};

export default todoReducer;
