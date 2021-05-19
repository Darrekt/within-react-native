import { List } from "immutable";
import Project from "../../models/Project";
import { Actions, ProjectAction } from "../actionTypes";

const defaultProject = new Project({
  id: "uncategorised",
  name: "Uncategorised Tasks",
});

const projectReducer = (
  state: Project[] = [defaultProject],
  action: ProjectAction
) => {
  switch (action.type) {
    // Project Actions
    case Actions.ProjectUpdate:
      return List(state)
        .update(
          state.findIndex((item) => item.id === action.payload.id),
          (proj) => action.payload
        )
        .toArray();
    case Actions.ProjectAdd:
      return List(state).push(action.payload).toArray();
    //   return state.filterNot((project) => project.completed).size <
    //     settings.maxProjects
    //     ? state.push(action.payload)
    //     : state;
    case Actions.ProjectDelete:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      throw Error("Invalid Project Action");
  }
};

export default projectReducer;
