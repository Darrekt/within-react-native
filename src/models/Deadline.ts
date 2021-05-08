import { List } from "immutable";
import { v4 as uuidv4 } from "uuid";

export default class Deadline {
  id: string;
  name: string;
  due: Date;
  todos: List<string> = List<string>();

  constructor(name: string, due: Date, id?: string) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.due = due;
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
  new Deadline(doc.name, new Date(doc.due));
