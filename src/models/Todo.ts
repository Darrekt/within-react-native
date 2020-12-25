import { v4 as uuidv4 } from "uuid";

export default class Todo {
  id: string = uuidv4();
  name: string = "";
  notes: string = "";
  disableNotifications: boolean = false;
  laps: number = 0;
  completed: boolean = false;
  selected: boolean = false;
  finishingTime?: Date;

  constructor(data: Partial<Todo>) {
    Object.assign(this, data);
  }

  // WARNING: Make sure you update toEntity if you change the shape of the Todo object!
  toEntity = () => {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
      disableNotifications: this.disableNotifications,
      laps: this.laps,
      completed: this.completed,
      selected: this.selected,
      finishingTime: this.finishingTime,
    };
  };

  fromFirestore = (doc: any) => new Todo({ ...doc });

  // TODO
  toFirestore() {}
}
