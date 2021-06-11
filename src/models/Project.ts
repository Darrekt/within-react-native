import { v4 as uuidv4 } from "uuid";
import { List } from "immutable";
import Deadline, {
  DeadlineEntity,
  DeadlineFromEntity,
  compareDeadlines,
} from "./Deadline";
import Todo, { TodoFromEntity, TodoEntity } from "./Todo";
import { UNCATEGORISED_TODO_PROJID } from "../util/constants";

export interface ProjectEntity {
  id: string;
  emoji: string;
  name: string;
  notes: string;
  completed: number | null;
  deadlines: DeadlineEntity[];
  todos: TodoEntity[];
}

export default class Project {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string;
  notes: string = "";
  completed: Date | null = null;
  deadlines: Deadline[] = [];
  todos: Todo[] = [];

  constructor(data: Pick<Project, "name"> & Partial<Project>) {
    if (!data.id) delete data.id;
    if (!data.emoji) delete data.emoji;
    Object.assign(this, data);
    this.name = data.name;
  }

  // Returns the first deadline that has not passed, or the most recently passed one.
  // If no deadlines exist, returns undefined.
  closestDeadline() {
    return this.deadlines
      .map((ddl) => ddl.toEntity())
      .sort(compareDeadlines)
      .find((deadline) => deadline.due > new Date().getTime());
  }

  toEntity(): ProjectEntity {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      notes: this.notes,
      completed: this.completed?.getTime() ?? null,
      todos: this.todos.map((todo) => todo.toEntity()),
      deadlines: this.deadlines
        .map((ddl) => ddl.toEntity())
        .sort(compareDeadlines),
    };
  }

  equals(other: Project | undefined) {
    if (this === other) return true;
    if (other === undefined) return false;
    if (this.deadlines.length !== other.deadlines.length) return false;
    if (this.todos.length !== other.todos.length) return false;

    const projA = this.toEntity();
    const projB = other.toEntity();
    const projKeys = Object.keys(projA).filter(
      (key) => key !== "todos" && key !== "deadlines"
    ) as (keyof Omit<typeof projA, "todos" | "deadlines">)[];
    const objKeys = Object.keys(projB).filter(
      (key) => key !== "todos" && key !== "deadlines"
    ) as (keyof Omit<typeof projB, "todos" | "deadlines">)[];

    // Value equality checks
    let result = true;
    projKeys.forEach((key) => {
      if (!objKeys.includes(key)) result = false;
      if (projA[key] !== projB[key]) result = false;
    });

    this.deadlines.forEach((ddl, index) => {
      if (!ddl.equals(other.deadlines[index])) result = false;
    });

    this.todos.forEach((todo, index) => {
      if (!todo.equals(other.todos[index])) result = false;
    });

    return result;
  }
}

export function ProjectFromEntity(doc: any) {
  return new Project({
    ...doc,
    completed: doc.completed ? new Date(doc.completed) : null,
    todos: List(doc.todos)
      .map((todoStr) => TodoFromEntity(todoStr))
      .toArray(),
    deadlines: List(doc.deadlines)
      .map((deadlineStr) => DeadlineFromEntity(deadlineStr))
      .toArray(),
  });
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

export function compareProjectsByDeadline(
  projA: ProjectEntity,
  projB: ProjectEntity
) {
  const ddlA = ProjectFromEntity(projA).closestDeadline();
  const ddlB = ProjectFromEntity(projB).closestDeadline();
  return compareDeadlines(ddlA, ddlB);
}
