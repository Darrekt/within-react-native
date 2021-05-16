import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";

const todo1 = new Todo({ name: "First task" });
const todo2 = new Todo({
  id: undefined,
  name: "Second task",
  project: uuidv4(),
  finishingTime: new Date(),
});

test("All todos should have IDs made", () => {
  // console.log(todo2.id)
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
