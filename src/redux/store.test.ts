import { v4 as uuidv4 } from "uuid";
import Project from "../models/Project";
import Deadline from "../models/Deadline";
import Todo from "../models/Todo";
import { isPlain, isPlainObject } from "@reduxjs/toolkit";

const projID = uuidv4();
const ddlID = uuidv4();
const todoID = uuidv4();
const now = new Date();

const todo1a = new Todo({
  id: todoID,
  name: "A task",
  project: projID,
});
const todo1b = new Todo({
  ...todo1a,
});

const ddlA = new Deadline({
  id: ddlID,
  project: projID,
  name: "Deadline",
  due: now,
});
const ddlB = new Deadline({ ...ddlA });

const project1a = new Project({
  id: projID,
  name: "Project",
  notes: "I am important",
  todos: [todo1a],
  deadlines: [ddlA],
});
const project1b = new Project({
  ...project1a,
  todos: [todo1b],
  deadlines: [ddlB],
});

test("Check value equality of two todos", () => {
  expect(todo1a.equals(todo1b)).toEqual(true);
});

test("Check value equality of two deadlines", () => {
  expect(ddlA.equals(ddlB)).toEqual(true);
});

test("Check value equality of two projects", () => {
  expect(project1a.equals(project1b)).toEqual(true);
});

test("Todo serialisability checks", () => {
  expect(isPlainObject(todo1a.toEntity())).toEqual(true);
  expect(isPlain([todo1a.toEntity()])).toEqual(true);
});

test("Deadline serialisability checks", () => {
  expect(isPlainObject(ddlA.toEntity())).toEqual(true);
  expect(isPlain([ddlA.toEntity()])).toEqual(true);
});

test("Object serialisability checks", () => {
  expect(isPlainObject(project1a.toEntity())).toEqual(true);
  expect(isPlain([project1a.toEntity(), project1b.toEntity()])).toEqual(true);
});
