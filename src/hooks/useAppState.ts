import { useEffect, useReducer } from "react";
import { List } from "immutable";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Project, {
  fromFirestore,
  findTodoProj,
  findTodoDeadline,
} from "../models/Project";
import Deadline from "../models/Deadline";
import Todo from "../models/Todo";
import {
  GlobalState,
  SageSettings,
  SAGE_DEFAULT_SETTINGS,
  DEFAULT_GLOBAL_STATE,
} from "../redux/store";
import {
  Actions,
  Action,
} from "../redux/actionTypes";
import { getTimeLeft } from "../util/timer";

const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    // Repo Actions
    case Actions.RepoHydrate:
      return action.payload;
    case Actions.RepoFlush:
      return DEFAULT_GLOBAL_STATE;

    // Project Actions
    case Actions.ProjectUpdate:
    case Actions.ProjectAdd:
    case Actions.ProjectDelete:
      return {
        ...state,
        projects: projectsReducer(state.settings, state.projects, action),
      };

    // TODO: Implement the running property
    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
    case Actions.TodoStart:
    case Actions.TodoAdd:
    case Actions.TodoDelete:
    case Actions.TodoUpdate:
    case Actions.TodoToggleComplete:
    case Actions.TodoAssign:
    case Actions.TodoDeassign:
      return {
        ...state,
        projects: todoReducer(state.settings, state.projects, action),
      };

    case Actions.TodoSelect:
      return {
        ...state,
        selectedTodo:
          state.selectedTodo == action.payload.id ? "" : action.payload.id,
      };

    // Settings Actions
    case Actions.SettingsAuth:
    case Actions.SettingsChangeDefaultInterval:
    case Actions.SettingsChangeMaxProjects:
    case Actions.SettingsChangeMaxTasks:
    case Actions.SettingsReset:
    case Actions.SettingsToggleOnboarding:
      return { ...state, settings: settingsReducer(state.settings, action) };

    default:
      throw new Error("Invalid top-level action");
  }
};

const useAppState: () => [GlobalState, React.Dispatch<Action>] = () => {
  const [state, dispatch] = useReducer(globalReducer, DEFAULT_GLOBAL_STATE);

  // Listener for auth state changes
  // Project listener
  useEffect(() => {
    console.log("PROJECT LISTENER SUBSCRIBED");
    if (state.settings.user) {
      return firestore()
        .collection("Users")
        .doc(state.settings.user.uid)
        .collection("projects")
        .onSnapshot((querySnapshot) => {
          const storedData =
            querySnapshot && querySnapshot.empty
              ? List<Project>()
              : List<Project>(
                  querySnapshot.docs.map((doc) => fromFirestore(doc.data()))
                );
          let result = true;
          storedData.forEach((proj, index) => {
            if (!proj.equals(state.projects.get(index))) result = false;
          });
          if (!result) {
            console.log("DISPATCHING HYDRATION");
            dispatch({
              type: Actions.RepoHydrate,
              payload: { ...state, projects: storedData },
            });
          }
        });
    }
  }, []);

  // Write to firestore each a state change causes a re-render
  useEffect(() => {
    console.log("WRITE TO FIREBASE");
    try {
      if (state.settings.user) {
        const projCollection = firestore()
          .collection("Users")
          .doc(state.settings.user.uid)
          .collection("projects");
        state.projects.forEach((proj) =>
          projCollection.doc(proj.id).set(proj.toEntity())
        );
      }
    } catch (error) {
      console.log("Error saving projects:", error);
    }
  }, [state.projects]);

  // useEffect(() => {
  //   if (state.settings.user) {
  //     firestore()
  //       .collection("Users")
  //       .doc(state.settings.user.uid)
  //       .onSnapshot((documentSnapshot) => {
  //         const snapshot = documentSnapshot.data() as Omit<
  //           SageSettings,
  //           "user"
  //         >;
  //         if (snapshot) {
  //           dispatch({
  //             type: Actions.RepoHydrate,
  //             payload: {
  //               ...state,
  //               settings: { ...snapshot, user: state.settings.user },
  //             },
  //           });
  //         }
  //       });
  //   }
  // }, [state.settings]);

  return [state, dispatch];
};

export default useAppState;
