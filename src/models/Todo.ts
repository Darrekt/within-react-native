import { v4 as uuidv4 } from "uuid";

export default class Todo {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string = "";
  project?: string;
  deadline?: string;
  laps: number = 0;
  completed: boolean = false;
  remaining?: number;

  /// finishingTime is a Date that specifies the end of the current interval. If the task is not running, this is undefined. There should only be one globally running task.
  finishingTime?: Date;

  constructor(data: Partial<Todo>) {
    if (!data.id) delete data.id;
    Object.assign(this, data);
  }

  // WARNING: Make sure you update toFireStore if you change the shape of the Todo object!
  toFirestore() {
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
}

export function fromFirestore(doc: any) {
  return new Todo({
    ...doc,
    finishingTime: doc.finishingTime ? new Date(doc.finishingTime) : undefined,
  });
}
