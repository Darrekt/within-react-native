import { List } from "immutable";
import { renderHook } from "@testing-library/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useTodoRepository from "./useTodoRepository";
import Todo from "../models/Todo";

// test('should use counter', () =>
//   const { result } = renderHook(() => useCounter())
//   expect(result.current.count).toBe(0)
//   expect(typeof result.current.increment).toBe('function')
// })

/**
 * TodoRepository uses AsyncStorage and cannot run alone in a test. For more information,
 * see https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/
 */

const exampleTodoList = List<Todo>([
  new Todo({ id: "0", name: "first task" }),
  new Todo({
    id: "1",
    name: "second task",
    notes: "I am important",
    disableNotifications: true,
  }),
  new Todo({ id: "2", name: "third task", notes: "I got some notes" }),
  new Todo({ id: "3", name: "fourth task" }),
]);

test("Repository should be empty on init", () => {
  const { result } = renderHook(() => useTodoRepository());
  expect(result.current[0].size).toBe(0);
});

test("Repository should read from AsyncStore on initialisation", async () => {
  AsyncStorage.setItem(
    "todos",
    JSON.stringify(exampleTodoList.map((item) => item.toEntity()).toJSON())
  );
  const { result, waitForNextUpdate } = renderHook(() => useTodoRepository());
  expect(result.current[0].size).toBe(0);
  await waitForNextUpdate();
  expect(result.current[0].size).toBe(exampleTodoList.size);
});

// Turn this into a snapshot test
test("Consistent type check of recovered data from AsyncStore", async () => {
  // const result = await testRepo.readTodos();
  // expect(0).toEqual(result?.size);
});
