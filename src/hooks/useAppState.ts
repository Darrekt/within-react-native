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
} from "../state/State";
import {
  Actions,
  Action,
  ProjectAction,
  TodoAction,
  SettingsAction,
} from "../state/Actions";
import { getTimeLeft } from "../util/timer";

const projectsReducer = (
  settings: SageSettings,
  state: List<Project>,
  action: ProjectAction
) => {
  switch (action.type) {
    // Project Actions
    case Actions.ProjectUpdate:
      return state.update(
        state.findIndex((item) => item.id === action.payload.id),
        (proj) => action.payload
      );
    case Actions.ProjectAdd:
      return state.filterNot((project) => project.completed).size <
        settings.maxProjects
        ? state.push(action.payload)
        : state;
    case Actions.ProjectDelete:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      throw Error("Invalid Project Action");
  }
};
const todoReducer = (
  settings: SageSettings,
  state: List<Project>,
  action: TodoAction
) => {
  // Find the project containing this Todo, or uncategorised
  const [project, projIndex, todoIndex] = findTodoProj(state, action.payload);
  const [deadline, deadlineIndex] = findTodoDeadline(project, action.payload);

  let updatedTodo: Todo;
  let updatedDeadline: Deadline;

  function writeToProject(proj: Project, todo: Todo, ddl?: Deadline) {
    return new Project({
      ...proj,
      deadlines: ddl ? proj.deadlines.set(deadlineIndex, ddl) : proj.deadlines,
      todos: proj?.todos.set(todoIndex, todo),
    });
  }

  switch (action.type) {
    case Actions.TodoAdd:
      updatedDeadline = action.payload.deadline
        ? new Deadline({
            ...deadline,
            todos: deadline.todos.push(action.payload.id),
          })
        : deadline;
      return state.set(
        projIndex,
        new Project({
          ...project,
          deadlines: action.payload.deadline
            ? project.deadlines.set(deadlineIndex, updatedDeadline)
            : project.deadlines,
          todos: project.todos.push(action.payload),
        })
      );
    case Actions.TodoDelete:
      updatedDeadline = action.payload.deadline
        ? new Deadline({
            ...deadline,
            todos: deadline.todos.remove(deadlineIndex),
          })
        : deadline;
      return state.set(
        projIndex,
        new Project({
          ...project,
          deadlines: action.payload.deadline
            ? project.deadlines.set(deadlineIndex, updatedDeadline)
            : project.deadlines,
          todos: project.todos.delete(todoIndex),
        })
      );
    case Actions.TodoUpdate:
      updatedDeadline = action.payload.deadline
        ? new Deadline({
            ...deadline,
            todos: deadline.todos.contains(action.payload.id)
              ? deadline.todos
              : deadline.todos.push(action.payload.id),
          })
        : new Deadline({
            ...deadline,
            todos: deadline.todos.filterNot(
              (todoID) => todoID == action.payload.id
            ),
          });
      return state.set(
        projIndex,
        writeToProject(project, action.payload, updatedDeadline)
      );

    // TodoProductivityActions
    case Actions.TodoToggleComplete:
      return state.set(
        projIndex,
        writeToProject(
          project,
          new Todo({ ...action.payload, completed: !action.payload.completed })
        )
      );

    // TodoTimerActions
    case Actions.TodoStart:
      const finishAt = new Date();
      if (action.payload.remaining) {
        finishAt.setSeconds(finishAt.getSeconds() + action.payload.remaining);
      } else {
        finishAt.setMinutes(
          finishAt.getMinutes() + settings.defaultInterval / 60
        );
      }
      finishAt.setMilliseconds(finishAt.getMilliseconds() + 500);
      return state.set(
        projIndex,
        writeToProject(
          project,
          new Todo({
            ...action.payload,
            remaining: undefined,
            finishingTime: finishAt,
          })
        )
      );

    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
      return state.set(
        projIndex,
        writeToProject(
          project,
          new Todo({
            ...action.payload,
            remaining:
              action.type == Actions.TodoPause
                ? getTimeLeft(action.payload)
                : undefined,
            laps:
              action.payload.laps +
              (action.type === Actions.TodoFinish ? 1 : 0),
            finishingTime: undefined,
          })
        )
      );

    default:
      throw Error("Invalid todo action");
  }
};

const settingsReducer = (state: SageSettings, action: SettingsAction) => {
  switch (action.type) {
    case Actions.SettingsAuth:
      console.log("LOGGED IN USER: ", action.user?.email);
      return { ...state, user: action.user };
    case Actions.SettingsReset:
      return SAGE_DEFAULT_SETTINGS;
    case Actions.SettingsToggleOnboarding:
      return { ...state, onboarding: !state.onboarding };
    case Actions.SettingsChangeMaxProjects:
      return { ...state, maxProjects: action.value };
    case Actions.SettingsChangeMaxTasks:
      return { ...state, maxTasks: action.value };
    case Actions.SettingsChangeDefaultInterval:
      return { ...state, defaultInterval: action.value };
    default:
      throw Error("Invalid settings action");
  }
};

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
  useEffect(
    () =>
      auth().onAuthStateChanged((user) =>
        dispatch({ type: Actions.SettingsAuth, user: user })
      ),
    []
  );

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
