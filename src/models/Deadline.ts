import { v4 as uuidv4 } from "uuid";

export interface DeadlineEntity {
  id: string;
  project: string;
  name: string;
  completed: boolean;
  due: number;
  todos: string[];
}

export default class Deadline {
  id: string;
  project: string;
  name: string;
  completed: boolean;
  due: Date;
  todos: string[];

  constructor(
    data: Pick<Deadline, "project" | "name" | "due"> & Partial<Deadline>
  ) {
    this.id = data.id ?? uuidv4();
    this.project = data.project;
    this.name = data.name;
    this.completed = data.completed ?? false;
    this.due = data.due;
    this.todos = data.todos ?? [];
  }

  toEntity(): DeadlineEntity {
    return {
      id: this.id,
      project: this.project,
      name: this.name,
      completed: this.completed,
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

export const DeadlineFromEntity = (doc: any) =>
  new Deadline({
    id: doc.id,
    project: doc.project,
    name: doc.name,
    completed: doc.completed,
    due: new Date(doc.due),
    todos: doc.todos,
  });

export function compareDeadlines(ddlA?: DeadlineEntity, ddlB?: DeadlineEntity) {
  if (ddlA && ddlB) return ddlA.due - ddlB.due;
  else if (ddlA === undefined && ddlB !== undefined) return 1;
  else if (ddlB === undefined && ddlA !== undefined) return -1;
  else return 0;
}
