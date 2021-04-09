import { v4 as uuidv4 } from "uuid";
import { List } from "immutable";
import Todo from "./Todo";

export default class Project {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string = "";
  notes: string = "";
  completed: boolean = false;
  todos: List<Todo> = List([]);
  due?: Date;

  constructor(data: Partial<Project>) {
    Object.assign(this, data);
  }

  // WARNING: Make sure you update toEntity if you change the shape of the Project object!
  toEntity() {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      notes: this.notes,
      completed: this.completed,
      due: this.due?.getTime(),
    };
  }

  toFirestore() {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      notes: this.notes,
      completed: this.completed,
      due: this.due?.getTime(),
    };
  }
}

export function fromFirestore(doc: any) {
  return new Project({
    ...doc,
    due: doc.due ? new Date(doc.due) : undefined,
  });
}
