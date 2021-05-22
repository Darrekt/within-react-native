import { v4 as uuidv4 } from "uuid";

export type TodoEntity = {
  id: string;
  emoji: string;
  name: string;
  project: string;
  deadline?: string;
  laps: number;
  completed: boolean;
  remaining?: number;
  finishingTime?: number;
};

export default class Todo {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string = "";
  project: string;
  deadline?: string;
  laps: number = 0;
  completed: boolean = false;
  remaining?: number;
  /// finishingTime is a Date that specifies the end of the current interval. If the task is not running, this is undefined. There should only be one globally running task.
  finishingTime?: Date;

  constructor(data: Partial<Todo>) {
    if (!data.id) delete data.id;
    Object.assign(this, data);
    this.project = data.project ?? "uncategorised";
  }

  // WARNING: Make sure you update toFireStore if you change the shape of the Todo object!
  toEntity(): TodoEntity {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      laps: this.laps,
      completed: this.completed,
      project: this.project,
      remaining: this.remaining,
      finishingTime: this.finishingTime?.getTime(),
    };
  }

  equals(other: Todo | undefined) {
    if (this === other) return true;
    if (other === undefined) return false;

    let result = true;
    const thisTodo = this.toEntity();
    const otherTodo = other.toEntity();

    const todoKeys = Object.keys(thisTodo) as (keyof typeof thisTodo)[];
    const otherKeys = Object.keys(otherTodo) as (keyof typeof otherTodo)[];

    todoKeys.forEach((key, index) => {
      if (!otherKeys.includes(key)) result = false;
      if (thisTodo[key] !== otherTodo[key]) result = false;
    });
    return result;
  }
}

export function fromFirestore(doc: any) {
  return new Todo({
    ...doc,
    finishingTime: doc.finishingTime ? new Date(doc.finishingTime) : undefined,
  });
}
