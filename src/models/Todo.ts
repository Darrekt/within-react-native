import { v4 as uuidv4 } from "uuid";

export default class Todo {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string = "";
  notes: string = "";
  disableNotifications: boolean = false;
  project?: string;
  deadline?: string;
  laps: number = 0;
  completed: boolean = false;
  selected: boolean = false;
  remaining?: number;
  finishingTime?: Date;

  constructor(data: Partial<Todo>) {
    if (!data.id) delete data.id;
    Object.assign(this, data);
  }

  // WARNING: Make sure you update toEntity if you change the shape of the Todo object!
  toEntity() {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      notes: this.notes,
      disableNotifications: this.disableNotifications,
      laps: this.laps,
      completed: this.completed,
      selected: this.selected,
      project: this.project,
      remaining: this.remaining,
      finishingTime: this.finishingTime?.getTime(),
    };
  }

  toFirestore() {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      notes: this.notes,
      disableNotifications: this.disableNotifications,
      laps: this.laps,
      completed: this.completed,
      selected: this.selected,
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
