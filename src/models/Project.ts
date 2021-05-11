import { v4 as uuidv4 } from "uuid";
import { List } from "immutable";
import Deadline, { fromFirestore as dlFromFireStore } from "./Deadline";
import Todo, { fromFirestore as todoFromFireStore } from "./Todo";

export default class Project {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string;
  notes: string = "";
  completed: boolean = false;
  deadlines: List<Deadline> = List([]);
  todos: List<Todo> = List([]);

  constructor(data: Pick<Project, "name"> & Partial<Project>) {
    if (!data.id) delete data.id;
    Object.assign(this, data);
    this.name = data.name;
  }

  // Returns the first deadline that has not passed, or the most recently passed one.
  // If no deadlines exist, returns undefined.
  closestDeadline() {
    return this.deadlines.find(
      (deadline) => deadline.due.getTime() < new Date().getTime()
    );
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
      deadlines: this.deadlines
        .map((deadline) => deadline.due.getTime())
        .toArray(),
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
      deadlines: this.deadlines
        .map((deadline) => deadline.toEntity())
        .toArray(),
    };
  }
}

export function fromFirestore(doc: any) {
  console.log("Todos:", doc.todos);
  console.log("Deadlines:", doc.deadlines);
  return new Project({
    ...doc,
    todos: List(doc.todos).map((todoStr) => todoFromFireStore(todoStr)),
    deadlines: List(doc.deadlines).map((deadlineStr) =>
      dlFromFireStore(deadlineStr)
    ),
  });
}
