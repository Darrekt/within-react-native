import { isPlain, isPlainObject } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import Todo, { TodoFromEntity } from "./Todo";

const todo1 = new Todo({ name: "First task" });
const todo2 = new Todo({
  id: undefined,
  name: "Second task",
  project: uuidv4(),
  finishingTime: new Date(),
});
const todo3 = TodoFromEntity(todo2.toEntity());

test("All todos should have IDs made", () => {
  expect(todo1.id).toBeDefined();
  expect(todo2.id).toBeDefined();
});

test("toEntity should have all properties of Todo", () => {
  const properties = Object.keys(todo2);
  const entity = todo2.toEntity();
  properties.forEach((property) => {
    expect(entity).toHaveProperty(property);
  });
});

test("Check value equality of two todos", () => {
  expect(todo1.equals(todo2)).toEqual(false);
  expect(todo2.equals(todo3)).toEqual(true);
});

test("Todo serialisability checks", () => {
  expect(isPlainObject(todo2.toEntity())).toEqual(true);
  expect(isPlain([todo2.toEntity()])).toEqual(true);
});
