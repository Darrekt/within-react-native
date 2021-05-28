import Project, { ProjectFromEntity } from "../../models/Project";
import * as ActionCreators from "../actions/projects/actions";
import { authStateChanged } from "../actions/settings/actions";
import { defaultProject, projectReducer } from "./projects";

let state = projectReducer(undefined, authStateChanged(null));
let curr: string;
const defaultState = [defaultProject];
test("Project reducer has correct default value", () => {
  state.forEach((project) =>
    expect(
      ProjectFromEntity(project).equals(ProjectFromEntity(defaultProject))
    ).toEqual(true)
  );
});

test("Add Project functionality", () => {
  state = projectReducer(
    state,
    ActionCreators.addProject(new Project({ name: "Project 2" }).toEntity())
  );
  curr = state[0].id;
  expect(state).toHaveLength(2);
});

test("Delete Project functionality", () => {
  state = projectReducer(state, ActionCreators.deleteProject(curr));
  expect(state).toHaveLength(1);
  expect(state.some((project) => project.id === curr)).toEqual(false);
});
