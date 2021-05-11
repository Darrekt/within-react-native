import { List } from "immutable";
import { v4 as uuidv4 } from "uuid";
import Deadline from "./Deadline";
import Project from "./Project";

export const UNCATEGORISED_TODO_PROJID = "uncategorised";

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

  // WARNING: Make sure you update toEntity if you change the shape of the Todo object!
  toEntity() {
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

export function findTodoProj(
  projects: List<Project>,
  todo: Todo
): [Project, number] {
  const projID = todo.project ?? UNCATEGORISED_TODO_PROJID;
  const project = projects.find((proj) => proj.id == projID) as Project;
  return [
    // TODO: Back this up with a test
    project,
    project.todos.findIndex((item) => item.id == todo.id),
  ];
}

export function findTodoDeadline(
  project: Project,
  todo: Todo
): [Deadline, number] {
  const ddlID = todo.deadline ?? UNCATEGORISED_TODO_PROJID;
  return [
    // TODO: Back this up with a test
    project.deadlines.find((ddl) => ddl.id == ddlID) as Deadline,
    project.deadlines.findIndex((ddl) => ddl.id == ddlID),
  ];
}
