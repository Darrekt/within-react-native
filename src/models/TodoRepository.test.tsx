import TodoRepository from "./TodoRepository";
import Immutable, { List } from "immutable";
import Todo from "./Todo";

/**
 * TodoRepository uses AsyncStorage and cannot run alone in a test. For more information,
 * see https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/
 */

const exampleTodoList = List<Todo>([
  new Todo("0", "first task", "", false, false),
  new Todo("1", "second task", "I am important", true, false),
  new Todo("2", "third task", "I got some notes", false, false),
]);

test("Repository should be initialised empty", () => {
  const testRepo = new TodoRepository();
  expect(testRepo.todos.size).toBe(0);
});

test("Serialisation should restore original shape of data", () => {
  const testRepo = new TodoRepository(exampleTodoList);
});
