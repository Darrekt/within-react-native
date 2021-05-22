import { v4 as uuidv4 } from "uuid";
import { List } from "immutable";
import Deadline, {
  DeadlineEntity,
  fromEntity as dlFromFireStore,
} from "./Deadline";
import Todo, { fromEntity as todoFromFireStore, TodoEntity } from "./Todo";

export const UNCATEGORISED_TODO_PROJID = "uncategorised";

export type ProjectEntity = {
  id: string;
  emoji: string;
  name: string;
  notes: string;
  completed: boolean;
  deadlines: DeadlineEntity[];
  todos: TodoEntity[];
};

export default class Project {
  id: string = uuidv4();
  emoji: string = "✏️";
  name: string;
  notes: string = "";
  completed: boolean = false;
  deadlines: Deadline[] = [];
  todos: Todo[] = [];

  constructor(data: Pick<Project, "name"> & Partial<Project>) {
    if (!data.id) delete data.id;
    Object.assign(this, data);
    this.name = data.name;
  }

  // Returns the first deadline that has not passed, or the most recently passed one.
  // If no deadlines exist, returns undefined.
  closestDeadline() {
    return this.deadlines.find(
      (deadline) => deadline.due.getTime() < new Date().getTime()
    );
  }

  toEntity(): ProjectEntity {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      notes: this.notes,
      completed: this.completed,
      todos: this.todos.map((todo) => todo.toEntity()),
      deadlines: this.deadlines.map((ddl) => ddl.toEntity()),
    };
  }

  equals(other: Project | undefined) {
    if (this === other) return true;
    if (other === undefined) return false;

    const projA = this.toEntity();
    const projB = other.toEntity();
    const projKeys = Object.keys(projA).filter(
      (key) => key !== "todos" && key !== "deadlines"
    ) as (keyof Omit<typeof projA, "todos" | "deadlines">)[];
    const objKeys = Object.keys(projB).filter(
      (key) => key !== "todos" && key !== "deadlines"
    ) as (keyof Omit<typeof projB, "todos" | "deadlines">)[];

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

export function fromEntity(doc: any) {
  return new Project({
    ...doc,
    todos: List(doc.todos).map((todoStr) => todoFromFireStore(todoStr)),
    deadlines: List(doc.deadlines).map((deadlineStr) =>
      dlFromFireStore(deadlineStr)
    ),
  });
}

export function findTodoProj(
  projects: Project[],
  todo: Todo
): [Project, number, number] {
  const projID = todo.project ?? UNCATEGORISED_TODO_PROJID;
  const project = projects.find((proj) => proj.id == projID) as Project;
  return [
    // TODO: Back this up with a test
    project,
    projects.findIndex((proj) => proj.id == projID),
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

export function compareByDeadline(projA: ProjectEntity, projB: ProjectEntity) {
  // TODO: Implement sorting comparator
  const ddlA = fromEntity(projA).closestDeadline()?.due;
  const ddlB = fromEntity(projB).closestDeadline()?.due;

  if (ddlA === undefined && ddlB === undefined) return 0;
  else if (ddlA === undefined && ddlB !== undefined) return 1;
  else if (ddlB === undefined && ddlA !== undefined) return 0;
  // else if (ddlA < ddlB) return -1;
  else return 1;
}
