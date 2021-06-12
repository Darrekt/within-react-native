import { v4 as uuidv4 } from "uuid";
import Deadline from "./Deadline";
import { isPlain, isPlainObject } from "@reduxjs/toolkit";

const projID = uuidv4();
const todoID = uuidv4();
const now = new Date();

const ddlA = new Deadline({
  project: projID,
  name: "Deadline",
  due: now,
  todos: [todoID],
});
const ddlB = new Deadline({ ...ddlA });

test("Proper construction handling", () => {
  expect(ddlA.completed).toEqual(null);
  expect(ddlA.id).toBeDefined();
});

test("Check value equality of two deadlines", () => {
  expect(ddlA.equals(ddlB)).toEqual(true);
});

test("Deadline serialisability checks", () => {
  expect(isPlainObject(ddlA.toEntity())).toEqual(true);
  expect(isPlain([ddlA.toEntity()])).toEqual(true);
});
