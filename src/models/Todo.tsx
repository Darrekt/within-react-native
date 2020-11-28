export default class Todo {
  id: string;
  name: string;
  due: Date;
  notes: string;
  disableNotifications: boolean;
  isRunning: boolean;

  constructor(
    id: string,
    name: string,
    due: Date,
    notes: string,
    disableNotifications: boolean,
    isRunning: boolean
  ) {
    this.id = id;
    this.name = name;
    this.due = due;
    this.notes = notes;
    this.disableNotifications = disableNotifications;
    this.isRunning = isRunning;
  }

  fromFirestore = (doc: any) =>
    new Todo(
      doc.id,
      doc.name,
      doc.due,
      doc.notes,
      doc.disableNotifications,
      doc.isRunning
    );

  // TODO
  toFirestore() {}
}
