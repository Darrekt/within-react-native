import { v4 as uuidv4 } from "uuid";
import { List } from "immutable";

export default class Project {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string = "";
  notes: string = "";
  completed: boolean = false;
  todos: List<string> = List([]);
  deadlines: List<Date> = List([]);
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
      todos: this.todos.toArray(),
      deadlines: this.deadlines.map((deadline) => deadline.getTime()).toArray(),
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
      todos: this.todos.toArray(),
      deadlines: this.deadlines.map((deadline) => deadline.getTime()).toArray(),
      due: this.due?.getTime(),
    };
  }
}

export function fromFirestore(doc: any) {
  const deadlines: string[] = doc.deadlines;
  return new Project({
    ...doc,
    todos: List(doc.todos),
    deadlines: List(deadlines).map((deadline) => new Date(deadline)),
    due: doc.due ? new Date(doc.due) : undefined,
  });
}
