import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer, useContext } from "react";
import { List } from "immutable";
import Project, { fromFirestore } from "../models/Project";
import firestore from "@react-native-firebase/firestore";
import { SettingsContext } from "../state/context";

export type ProjectRepoAction = ProjectAsyncStorageAction | ProjectCRUDAction;

export type ProjectAsyncStorageAction = {
  type: "hydrate" | "flush";
  payload?: List<Project>;
};

export type ProjectCRUDAction = {
  type: "add" | "update" | "delete";
  payload: Project;
};

async function writeItems(state: List<Project>, uid?: string | null) {
  try {
    await AsyncStorage.setItem(
      "projects",
      JSON.stringify(state.map((item) => item.toEntity()).toJSON())
    );
    if (uid) {
      const tempLstStr = await AsyncStorage.getItem("projects");
      if (tempLstStr !== null) {
        const projCollection = firestore()
          .collection("Users")
          .doc(uid)
          .collection("projects");

        state.forEach(
          async (proj) => await projCollection.doc(proj.id).set(proj.toEntity())
        );
      }
    }
  } catch (error) {
    console.log("Error saving projects:", error);
  }
}

const useProjectRepository: () => [
  List<Project>,
  React.Dispatch<ProjectRepoAction>
] = () => {
  const { settings } = useContext(SettingsContext);
  const projectReducer = (state: List<Project>, action: ProjectRepoAction) => {
    let newState: List<Project>;
    switch (action.type) {
      // ProjectCRUDActions
      case "update":
        newState = state.update(
          state.findIndex((item) => item.id === action.payload.id),
          (proj) => action.payload
        );
        break;
      case "add":
        newState = state.push(action.payload);
        break;
      case "delete":
        newState = state.filter((item) => item.id !== action.payload.id);
        break;

      // ProjectAsyncStorageActions
      case "hydrate":
        newState = action.payload ?? List<Project>();
        break;
      case "flush":
        newState = List<Project>();
        break;
      default:
        throw new Error("Invalid Project Action");
    }
    if (action.type !== "hydrate") writeItems(newState, settings.user?.uid);
    return newState;
  };

  const [projects, dispatch] = useReducer(projectReducer, List<Project>());

  // If user is signed in, use Firebase as the source of truth and update AsyncStorage
  // Otherwise, use only AsyncStorage and update FireStore once you're signed in.
  useEffect(() => {
    if (settings.user) {
      return firestore()
        .collection("Users")
        .doc(settings.user.uid)
        .collection("projects")
        .onSnapshot((querySnapshot) => {
          const storedData = querySnapshot.empty
            ? List<Project>()
            : List<Project>(
                querySnapshot.docs.map((doc) => fromFirestore(doc.data()))
              );
          dispatch({ type: "hydrate", payload: storedData });
        });
    } else {
      AsyncStorage.getItem("projects")
        .then((tempLstStr) => {
          if (tempLstStr) {
            const asyncProjects = List(
              (JSON.parse(tempLstStr) as Array<Object>).map(
                (item) => new Project(item)
              )
            );
            dispatch({ type: "hydrate", payload: asyncProjects });
          }
        })
        .catch((error) => {
          console.log("Error reading todos:", error);
        });
    }
  }, [settings.user]);

  return [projects, dispatch];
};

export default useProjectRepository;
