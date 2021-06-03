import { createAction } from "typesafe-actions";
import { User } from "../models/User";
import {
  SIGNIN,
  USER_ERROR,
  USER_FETCH, USER_GET,
  BRAND_SIGNUP_SUCCESS,
  USER_SIGNUP_SUCCESS,
  SIGNUP,
  BRANDS_GET,
  USER_SET
} from "../constants";

export const userGetAction = createAction(USER_GET)();
export const brandsGetAction = createAction(BRANDS_GET)();
export const userFetchAction = createAction(USER_FETCH)();

export const userSetAction = createAction(USER_SET, (users: User[]) => users)();
export const signinAction = createAction(SIGNIN, (credentials: any) => credentials)();
export const signupAction = createAction(SIGNUP, (credentials: any) => credentials)();
export const brandSignupSuccessAction = createAction(BRAND_SIGNUP_SUCCESS, (credentials: any) => credentials)();
export const userSignupSuccessAction = createAction(USER_SIGNUP_SUCCESS, (credentials: any) => credentials)();

export const userErrorAction = createAction(
  USER_ERROR, (error: Error) => error
)();

