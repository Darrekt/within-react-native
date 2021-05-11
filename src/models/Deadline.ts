import { List } from "immutable";
import { v4 as uuidv4 } from "uuid";

export default class Deadline {
  id: string;
  name: string;
  due: Date;
  todos: List<string>;

  constructor(data: Pick<Deadline, "name" | "due"> & Partial<Deadline>) {
    this.id = data.id ?? uuidv4();
    this.name = data.name;
    this.due = data.due;
    this.todos = data.todos ?? List([]);
  }

  // TODO: Might need to JSON serialise
  toEntity() {
    return {
      id: this.id,
      name: this.name,
      due: this.due.getTime(),
    };
  }
}

export const fromFirestore = (doc: any) =>
  new Deadline({
    id: doc.id,
    name: doc.name,
    due: new Date(doc.due),
    todos: doc.todos,
  });
