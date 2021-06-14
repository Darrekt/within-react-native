import { v4 as uuidv4 } from "uuid";
import Todo, { TodoFromEntity } from "../../models/Todo";
import todoReducer from "./todos";
import * as TodoActions from "../actions/todos/actions";
import { Actions } from "../actions/actionTypes";

const projID = uuidv4();
const deadlineID = uuidv4();
const todoID = uuidv4();

const todo1a = new Todo({
  id: todoID,
  name: "A task",
  project: projID,
}).toEntity();

const todo1b = TodoFromEntity({ ...todo1a, deadline: deadlineID }).toEntity();

test("Add Todo", () => {
  expect(todoReducer([], TodoActions.addTodo(todo1a))).toEqual([todo1a]);
});

test("Delete Todo", () => {
  expect(todoReducer([todo1a], TodoActions.deleteTodo(todo1a))).toEqual([]);
});

// TODO: Cover all cases
test("Update Todo", () => {
  expect(todoReducer([todo1a], TodoActions.updateTodo({ ...todo1b }))).toEqual([
    todo1b,
  ]);
});

test("Complete Todo", () => {
  expect(
    todoReducer([todo1a], TodoActions.completeTodo(todo1a))[0].completed
  ).toBeDefined();
});

test("Start Todo", () => {
  expect(
    todoReducer([todo1a], {
      type: Actions.TodoStart,
      payload: { todo: todo1a, interval: 5 },
    })[0].finishingTime
  ).toBeDefined();
});

test("Pause Todo", () => {
  // expect(todoReducer([todo1a], TodoActions.deleteTodo(todo1a))).toEqual([]);
});

test("Reset Todo", () => {
  // expect(todoReducer([todo1a], TodoActions.deleteTodo(todo1a))).toEqual([]);
});

test("Finish Todo", () => {
  // expect(todoReducer([todo1a], TodoActions.deleteTodo(todo1a))).toEqual([]);
});
