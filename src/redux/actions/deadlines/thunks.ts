import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { DeadlineEntity } from "../../../models/Deadline";
import { TodoEntity } from "../../../models/Todo";
import deadlineReducer from "../../reducers/deadlines";
import todoReducer from "../../reducers/todos";
import { findProject } from "../../selectors";
import { AppThunk, RootState } from "../../store";
import * as ActionCreators from "./actions";

export const writeDeadlineChanges =
  (userID: string) =>
  (projID: string) =>
  (deadlines: DeadlineEntity[], todos: TodoEntity[]) =>
    firestore()
      .collection("Users")
      .doc(userID)
      .collection("projects")
      .doc(projID)
      .set({ deadlines, todos }, { mergeFields: ["deadlines", "todos"] });

const genDeadlineWriteFunc = (
  state: RootState,
  deadline: DeadlineEntity
):
  | [
      DeadlineEntity[],
      TodoEntity[],
      (deadlines: DeadlineEntity[], todos: TodoEntity[]) => Promise<void>
    ]
  | [DeadlineEntity[], TodoEntity[], undefined] => {
  // try {
  const user = state.settings.user;
  const project = findProject(state.projects, deadline.project);
  if (user)
    return [
      project.deadlines,
      project.todos,
      writeDeadlineChanges(user)(deadline.project),
    ];
  else return [project.deadlines, project.todos, undefined];
  // } catch (e) {
  //   console.log(e.message);
  // }
};

export const addFirebaseDeadline =
  (deadline: DeadlineEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.addDeadline(deadline);
    const [deadlines, todos, writeDeadlines] = genDeadlineWriteFunc(
      getState(),
      deadline
    );
    if (writeDeadlines)
      writeDeadlines(
        deadlineReducer(deadlines, action),
        todoReducer(todos, action)
      );
    else dispatch(action);
    Toast.show({
      type: "success",
      position: "bottom",
      text1: `${deadline ? "Updated" : "Added"} Deadline:`,
      text2: deadline.name,
    });
  };

export const deleteFirebaseDeadline =
  (deadline: DeadlineEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.deleteDeadline(deadline);
    const [deadlines, todos, writeDeadlines] = genDeadlineWriteFunc(
      getState(),
      deadline
    );
    if (writeDeadlines)
      writeDeadlines(
        deadlineReducer(deadlines, action),
        todoReducer(todos, action)
      );
    else dispatch(action);
    Toast.show({
      type: "error",
      position: "bottom",
      text1: `Deleted deadline:`,
      text2: deadline.name,
    });
  };

export const updateFirebaseDeadline =
  (deadline: DeadlineEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.updateDeadline(deadline);
    const [deadlines, todos, writeDeadlines] = genDeadlineWriteFunc(
      getState(),
      deadline
    );
    if (writeDeadlines)
      writeDeadlines(
        deadlineReducer(deadlines, action),
        todoReducer(todos, action)
      );
    else dispatch(action);
  };

export const completeFirebaseDeadline =
  (deadline: DeadlineEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.completeDeadline(deadline);
    const [deadlines, todos, writeDeadlines] = genDeadlineWriteFunc(
      getState(),
      deadline
    );
    if (writeDeadlines)
      writeDeadlines(
        deadlineReducer(deadlines, action),
        todoReducer(todos, action)
      );
    else dispatch(action);
  };
