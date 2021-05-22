import { List } from "immutable";
import { TodoEntity } from "../../models/Todo";
import { getTimeLeft } from "../../util/timer";
import { Actions, TodoAction } from "../actions/actionTypes";

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
const todoReducer = (state: TodoEntity[], action: TodoAction): TodoEntity[] => {
  switch (action.type) {
    case Actions.TodoAdd:
      return List(state).push(action.payload).toArray();
    case Actions.TodoDelete:
      return state.filter((todo) => todo.id !== action.payload.id);
    case Actions.TodoUpdate:
      return setTodo(state, action.payload);

    // TodoProductivityActions
    case Actions.TodoToggleComplete:
      return setTodo(state, {
        ...action.payload,
        completed: !action.payload.completed,
      });

    // TodoTimerActions
    case Actions.TodoStart:
      const finishAt = new Date();
      if (action.payload.remaining) {
        finishAt.setSeconds(finishAt.getSeconds() + action.payload.remaining);
      } else {
        finishAt.setMinutes(finishAt.getMinutes() + action.interval / 60);
      }
      finishAt.setMilliseconds(finishAt.getMilliseconds() + 500);

      return setTodo(state, {
        ...action.payload,
        remaining: undefined,
        finishingTime: finishAt.getTime(),
      });

    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
      return setTodo(state, {
        ...action.payload,
        remaining:
          action.type == Actions.TodoPause && action.payload.finishingTime
            ? getTimeLeft(action.payload.finishingTime)
            : undefined,
        laps:
          action.payload.laps + (action.type === Actions.TodoFinish ? 1 : 0),
        finishingTime: undefined,
      });

    default:
      console.log(`Invalid todo action: ${action.type}`);
      return state;
  }
};

export default todoReducer;
