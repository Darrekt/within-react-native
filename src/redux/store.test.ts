import { List } from "immutable";
import { v4 as uuidv4 } from "uuid";
import Project from "../models/Project";
import Deadline from "../models/Deadline";
import Todo from "../models/Todo";
import { GlobalState, SAGE_DEFAULT_SETTINGS } from "./store";

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
  name: "Deadline",
  due: now,
});
const ddlB = new Deadline({ ...ddlA });

const project1a = new Project({
  id: projID,
  name: "Project",
  notes: "I am important",
  todos: List([todo1a]),
  deadlines: List([ddlA]),
});
const project1b = new Project({
  ...project1a,
  todos: List([todo1b]),
  deadlines: List([ddlB]),
});

const state1: GlobalState = {
  projects: List([project1a]),
  settings: SAGE_DEFAULT_SETTINGS,
  selectedTodo: "",
  running: false,
};

const state2: GlobalState = {
  projects: List([project1b]),
  settings: SAGE_DEFAULT_SETTINGS,
  selectedTodo: "",
  running: false,
};

test("Check value equality of two todos", () => {
  expect(todo1a.equals(todo1b)).toEqual(true);
});

test("Check value equality of two deadlines", () => {
  expect(ddlA.equals(ddlB)).toEqual(true);
});

test("Check value equality of two projects", () => {
  expect(project1a.equals(project1b)).toEqual(true);
});
