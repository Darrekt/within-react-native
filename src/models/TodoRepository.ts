import AsyncStorage from "@react-native-async-storage/async-storage";
import { List } from "immutable";
import Repository from "./Repository";
import Todo from "./Todo";

export default class TodoRepository implements Repository<Todo> {
  private _todos: List<Todo>;

  constructor() {
    this._todos = List<Todo>();
    this.readItems();
  }

  get todos() {
    return this._todos.toArray();
  }

  readItems = async () => {
    try {
      const tempLstStr = await AsyncStorage.getItem("todos");
      if (tempLstStr !== null)
        this._todos = List(
          (JSON.parse(tempLstStr) as Array<Object>).map(
            (item) => new Todo(item)
          )
        );
      else this._todos = List<Todo>();
    } catch (error) {
      console.log("Error reading todos");
    }
  };

  writeItems = async () => {
    try {
      await AsyncStorage.setItem(
        "todos",
        JSON.stringify(this._todos.map((item) => item.toEntity()).toJSON())
      );
    } catch (error) {
      console.log("Error in saving todos");
    }
  };

  addItem = async (curr: Todo) => {
    console.log("Before:", this.todos.length)
    this._todos = this._todos.concat(curr);
    console.log("After:", this.todos.length)
    await this.writeItems();
  };

  updateItem = async (curr: Todo) => {
    this._todos = this._todos.update(
      this.todos.findIndex((item) => item.id == curr.id),
      (item) => (item = curr)
    );
    await this.writeItems();
  };

  deleteItem = async (curr: Todo) => {
    this._todos = this._todos.filter((item) => item.id !== curr.id);
    await this.writeItems();
  };
}
