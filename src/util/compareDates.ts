import { ProjectEntity } from "../models/Project";
import { TodoEntity } from "../models/Todo";

export function compareDates(dateA: number, dateB: number) {
  if (dateA && dateB) return dateA - dateB;
  else if (dateA === null && dateB !== null) return 1;
  else if (dateB === null && dateA !== null) return -1;
  else return 0;
}

export function compareCompleted(
  itemA: ProjectEntity | TodoEntity,
  itemB: ProjectEntity | TodoEntity
) {
  const completedA = itemA.completed;
  const completedB = itemB.completed;
  if (completedA && completedB) return completedA - completedB;
  else if (completedA === null && completedB !== null) return 1;
  else if (completedB === null && completedA !== null) return -1;
  else return 0;
}
