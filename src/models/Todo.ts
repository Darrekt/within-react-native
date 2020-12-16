import { v4 as uuidv4 } from "uuid";

export default class Todo {
  id: string = uuidv4();
  name: string = "";
  notes: string = "";
  disableNotifications: boolean = false;
  isRunning: boolean = false;
  completed: boolean = false;
  due?: Date;

  constructor(data: Partial<Todo>) {
    Object.assign(this, data);
  }

  toEntity = () => {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
      disableNotifications: this.disableNotifications,
      isRunning: this.isRunning,
      completed: this.completed,
      due: this.due,
    };
  };

  fromFirestore = (doc: any) => new Todo({ ...doc });

  // TODO
  toFirestore() {}
}
