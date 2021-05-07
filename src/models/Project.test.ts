import { List } from "immutable";
import { v4 as uuidv4 } from "uuid";
import Project from "./Project";

const testID = uuidv4();
const project1 = new Project({ id: testID, name: "First project" });
const project2 = new Project({
  id: undefined,
  name: "Second task",
  notes: "I am important",
  todos: List([uuidv4()]),
  deadlines: List([new Date()]),
});

test("Correct constructor handling of IDs", () => {
  // console.log(project2.id)
  expect(project1.id).toEqual(testID);
  expect(project2.id).toBeDefined();
});

test("ToEntity should have all properties of Project", () => {
  const properties = Object.keys(project2);
  const entity = project2.toEntity();
  properties.forEach((property) => {
    expect(entity).toHaveProperty(property);
  });
});

test("toFirestore should have all properties of Project", () => {
  const properties = Object.keys(project2);
  const entity = project2.toFirestore();
  properties.forEach((property) => {
    expect(entity).toHaveProperty(property);
  });
});

// test("Entity conversions should serialise dates", () => {
//   const properties = Object.keys(project2);
//   const entity = project2.toFirestore();
//   properties.forEach((property) => {
//     expect(entity).toHaveProperty(property);
//   });
// });

// test("Entity conversions should serialise Immutable Lists", () => {
//   const properties = Object.keys(project2);
//   const entity = project2.toFirestore();
//   properties.forEach((property) => {
//     expect(entity).toHaveProperty(property);
//   });
// });
