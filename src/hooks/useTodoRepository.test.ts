
import { List } from "immutable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useTodoRepository from "./useTodoRepository";
import Todo from "../models/Todo";
import renderer from "react-test-renderer";

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
it

test("Repository should read from AsyncStore on initialisation", () => {

});

// Turn this into a snapshot test
test("Serialisation should restore original shape of data", async () => {
  // const result = await testRepo.readTodos();
  // expect(0).toEqual(result?.size);
});
