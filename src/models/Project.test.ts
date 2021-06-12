import { v4 as uuidv4 } from "uuid";
import Project, { ProjectFromEntity } from "./Project";
import Todo from "./Todo";
import { isPlain, isPlainObject } from "@reduxjs/toolkit";

const testID = uuidv4();
const todo1 = new Todo({ name: "First task" });
const todo2 = new Todo({
  id: undefined,
  name: "Second task",
  project: uuidv4(),
  finishingTime: new Date(),
});

const project1 = new Project({ id: testID, name: "First project" });
const project2 = new Project({
  id: undefined,
  name: "Second task",
  notes: "I am important",
  todos: [todo1, todo2],
});
const project3 = ProjectFromEntity(project2.toEntity());

test("Correct constructor handling of IDs", () => {
  expect(project1.id).toEqual(testID);
  expect(project2.id).toBeDefined();
});

test("All fields should be defined", () => {
  const keys = Object.keys(project2) as (keyof Project)[];
  keys.forEach((key) => expect(project2[key]).toBeDefined());
});

test("ToEntity should have all properties of Project", () => {
  const properties = Object.keys(project2);
  const entity = project2.toEntity();
  properties.forEach((property) => {
    expect(entity).toHaveProperty(property);
  });
});

test("Check value equality of two projects", () => {
  expect(project1.equals(project2)).toEqual(false);
  expect(project2.equals(project3)).toEqual(true);
});

test("Project serialisability checks", () => {
  expect(isPlainObject(project1.toEntity())).toEqual(true);
  expect(isPlain([project1.toEntity(), project2.toEntity()])).toEqual(true);
});
