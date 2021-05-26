import firestore from "@react-native-firebase/firestore";
import { DeadlineEntity } from "../../../models/Deadline";
import deadlineReducer from "../../reducers/deadlines";
import { findProject } from "../../selectors";
import { AppThunk, RootState } from "../../store";
import * as ActionCreators from "./actions";

export const writeDeadlinesInProject =
  (userID: string) => (projID: string) => (deadlines: DeadlineEntity[]) =>
    firestore()
      .collection("Users")
      .doc(userID)
      .collection("projects")
      .doc(projID)
      .set({ deadlines }, { mergeFields: ["deadlines"] });

const genDeadlineWriteFunc = (
  state: RootState,
  deadline: DeadlineEntity
):
  | [DeadlineEntity[], (todos: DeadlineEntity[]) => Promise<void>]
  | [DeadlineEntity[], undefined] => {
  // try {
  const user = state.settings.user;
  const deadlines = findProject(state.projects, deadline.project).deadlines;
  if (user) return [deadlines, writeDeadlinesInProject(user)(deadline.project)];
  else return [deadlines, undefined];
  // } catch (e) {
  //   console.log(e.message);
  // }
};

export const addFirebaseDeadline =
  (deadline: DeadlineEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.addDeadline(deadline);
    const [deadlines, writeDeadlines] = genDeadlineWriteFunc(
      getState(),
      deadline
    );
    if (writeDeadlines) writeDeadlines(deadlineReducer(deadlines, action));
    else dispatch(action);
  };

export const deleteFirebaseDeadline =
  (deadline: DeadlineEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.addDeadline(deadline);
    const [deadlines, writeDeadlines] = genDeadlineWriteFunc(
      getState(),
      deadline
    );
    if (writeDeadlines) writeDeadlines(deadlineReducer(deadlines, action));
    else dispatch(action);
  };

export const updateFirebaseDeadline =
  (deadline: DeadlineEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.addDeadline(deadline);
    const [deadlines, writeDeadlines] = genDeadlineWriteFunc(
      getState(),
      deadline
    );
    if (writeDeadlines) writeDeadlines(deadlineReducer(deadlines, action));
    else dispatch(action);
  };

export const completeFirebaseDeadline =
  (deadline: DeadlineEntity): AppThunk =>
  async (dispatch, getState) => {
    const action = ActionCreators.addDeadline(deadline);
    const [deadlines, writeDeadlines] = genDeadlineWriteFunc(
      getState(),
      deadline
    );
    if (writeDeadlines) writeDeadlines(deadlineReducer(deadlines, action));
    else dispatch(action);
  };
