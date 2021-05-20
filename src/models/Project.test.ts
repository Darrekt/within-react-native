import { List } from "immutable";
import { v4 as uuidv4 } from "uuid";
import Project from "./Project";
import Todo from "./Todo";

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

const project3 = new Project({ ...project2 });

test("Correct constructor handling of IDs", () => {
  // console.log(project2.id)
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
