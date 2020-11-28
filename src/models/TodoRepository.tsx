import AsyncStorage from "@react-native-async-storage/async-storage";
import Immutable, { List } from "immutable";
import Todo from "./Todo";

export default class TodoRepository {
  todos: List<Todo>;

  constructor(todos: List<Todo> = List()) {
    this.todos = todos;
  }

  private readTodos = async () => {
    try {
      const tempLstStr = await AsyncStorage.getItem("todos");
      if (tempLstStr !== null)
        // TODO: Will the types on this work out?
        // Write tests
        this.todos = Immutable.fromJS(tempLstStr);
    } catch (error) {
      console.log("Error reading todos");
    }
  };

  private writeTodos = async () => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(this.todos.toJSON()));
    } catch (error) {
      console.log("Error in saving todos");
    }
  };

  addTodo = (curr: Todo) => (this.todos = this.todos.concat([curr]));

  updateTodo = (curr: Todo) =>
    (this.todos = this.todos.update(
      this.todos.findIndex((item) => item.id == curr.id),
      (item) => (item = curr)
    ));

  deleteTodo = (curr: Todo) =>
    (this.todos = this.todos.filter((item) => item.id !== curr.id));
}
