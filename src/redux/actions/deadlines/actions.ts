import { DeadlineEntity } from "../../../models/Deadline";
import { Actions, DeadlineAction } from "../actionTypes";

export const addDeadline = (deadline: DeadlineEntity): DeadlineAction => ({
  type: Actions.DeadlineAdd,
  payload: deadline,
});

export const deleteDeadline = (deadline: DeadlineEntity): DeadlineAction => ({
  type: Actions.DeadlineRemove,
  payload: deadline,
});

export const updateDeadline = (deadline: DeadlineEntity): DeadlineAction => ({
  type: Actions.DeadlineUpdate,
  payload: deadline,
});

export const completeDeadline = (deadline: DeadlineEntity): DeadlineAction => ({
  type: Actions.DeadlineComplete,
  payload: deadline,
});
