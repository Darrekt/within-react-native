export default class Todo {
  id: string;
  name: string;
  notes: string;
  disableNotifications: boolean;
  isRunning: boolean;
  due?: Date;

  constructor(
    id: string,
    name: string,
    notes: string,
    disableNotifications: boolean,
    isRunning: boolean,
    due?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.due = due;
    this.notes = notes;
    this.disableNotifications = disableNotifications;
    this.isRunning = isRunning;
  }

  public fromFirestore = (doc: any) =>
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
