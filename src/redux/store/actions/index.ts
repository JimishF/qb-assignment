import { createAction } from "typesafe-actions";
import { User } from "../../models/User";
import {
  USER_ERROR,
  USER_FETCH, USER_GET,
  USER_SET
} from "../constants";

export const userGetAction = createAction(USER_GET)();
export const userFetchAction = createAction(USER_FETCH)();

export const userSetAction = createAction(USER_SET, (users: User[]) =>  users)();

export const userErrorAction = createAction(
  USER_ERROR,(error: Error) => error
)();

