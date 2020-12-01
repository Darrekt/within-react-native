import AsyncStorage from "@react-native-async-storage/async-storage";
import { List } from "immutable";
import Repository from "./Repository";
import Todo from "./Todo";

export default class TodoRepository implements Repository<Todo> {
  private _todos: List<Todo>;

  constructor() {
    this._todos = List<Todo>();
    // this.readItems();
  }

  get todos() {
    return this._todos.toArray();
  }

  async readItems() {
    try {
      const tempLstStr = await AsyncStorage.getItem("todos");
      if (tempLstStr !== null)
        this._todos = List(
          (JSON.parse(tempLstStr) as Array<Object>).map(
            (item) => new Todo(item)
          )
        );
    } catch (error) {
      console.log("Error reading todos");

    }
  }

  async writeItems() {
    try {
      await AsyncStorage.setItem(
        "todos",
        JSON.stringify(this._todos.map((item) => item.toEntity()).toJSON())
      );
    } catch (error) {
      console.log("Error in saving todos");
    }
  }

  addItem(curr: Todo) {
    this._todos = this._todos.push(curr);
    this.writeItems();
  }

  updateItem(curr: Todo) {
    this._todos = this._todos.update(
      this.todos.findIndex((item) => item.id == curr.id),
      (item) => (item = curr)
    );
    this.writeItems();
  }

  deleteItem(curr: Todo) {
    this._todos = this._todos.filter((item) => item.id !== curr.id);
    this.writeItems();
  }
}
