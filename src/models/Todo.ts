import { v4 as uuidv4 } from "uuid";

export interface TodoEntity {
  id: string;
  emoji: string;
  name: string;
  completed: number | null;
  project: string;
  deadline: string | null;
  laps: number;
  remaining: number | null;
  finishingTime: number | null;
}

export default class Todo {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string = "";
  completed: Date | null = null;
  project: string;
  deadline: string | null;
  laps: number = 0;
  remaining: number | null;
  /// finishingTime is a Date that specifies the end of the current interval. If the task is not running, this is undefined. There should only be one globally running task.
  finishingTime: Date | null;

  constructor(data: Partial<Todo>) {
    if (!data.id) delete data.id;
    if (!data.emoji) delete data.emoji;
    Object.assign(this, data);
    this.project = data.project ?? "uncategorised";
    this.deadline = data.deadline ?? null;
    this.remaining = data.remaining ?? null;
    this.finishingTime = data.finishingTime ?? null;
  }

  // WARNING: Make sure you update toFireStore if you change the shape of the Todo object!
  toEntity(): TodoEntity {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      completed: this.completed?.getTime() ?? null,
      project: this.project,
      deadline: this.deadline,
      laps: this.laps,
      remaining: this.remaining,
      finishingTime: this.finishingTime?.getTime() ?? null,
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

    todoKeys.forEach((key) => {
      if (!otherKeys.includes(key)) result = false;
      if (thisTodo[key] !== otherTodo[key]) result = false;
    });
    return result;
  }
}

export function TodoFromEntity(doc: any) {
  return new Todo({
    ...doc,
    completed: doc.completed ? new Date(doc.completed) : null,
    finishingTime: doc.finishingTime ? new Date(doc.finishingTime) : null,
  });
}
