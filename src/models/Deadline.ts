import { v4 as uuidv4 } from "uuid";

export type DeadlineEntity = {
  id: string;
  name: string;
  due: number;
  todos: string[];
};

export default class Deadline {
  id: string;
  name: string;
  due: Date;
  todos: string[];

  constructor(data: Pick<Deadline, "name" | "due"> & Partial<Deadline>) {
    this.id = data.id ?? uuidv4();
    this.name = data.name;
    this.due = data.due;
    this.todos = data.todos ?? [];
  }

  // TODO: Might need to JSON serialise
  toEntity(): DeadlineEntity {
    return {
      id: this.id,
      name: this.name,
      due: this.due.getTime(),
      todos: this.todos,
    };
  }

  equals(other: Deadline | undefined) {
    if (this === other) return true;
    if (other === undefined) return false;

    let result = true;
    const thisDeadline = this.toEntity();
    const otherDeadline = other.toEntity();

    const todoKeys = Object.keys(thisDeadline) as (keyof typeof thisDeadline)[];
    const otherKeys = Object.keys(
      otherDeadline
    ) as (keyof typeof otherDeadline)[];

    todoKeys.forEach((key) => {
      if (!otherKeys.includes(key)) result = false;
      if (thisDeadline[key] !== otherDeadline[key]) result = false;
    });

    return result;
  }
}

export const fromEntity = (doc: any) =>
  new Deadline({
    id: doc.id,
    name: doc.name,
    due: new Date(doc.due),
    todos: doc.todos,
  });
