export default class Todo {
  id: string = "";
  name: string = "";
  notes: string = "";
  disableNotifications: boolean = false;
  isRunning: boolean = false;
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
      due: this.due,
    };
  };

  fromFirestore = (doc: any) => new Todo({ ...doc });

  // TODO
  toFirestore() {}
}
