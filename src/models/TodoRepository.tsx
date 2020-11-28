import { List } from "immutable";
import Todo from "./Todo";

export default class TodoRepository {
  todos: List<Todo>;

  constructor(todos: List<Todo> = List()) {
    this.todos = todos;
  }

  addTodo = (curr: Todo) => (this.todos = this.todos.concat([curr]));
  updateTodo = (curr: Todo) =>
    (this.todos = this.todos.update(
      this.todos.findIndex((item) => item.id == curr.id),
      (item) => (item = curr)
    ));
  deleteTodo = (curr: Todo) =>
    (this.todos = this.todos.filter((item) => item.id !== curr.id));
}
