import { createAction } from "typesafe-actions";
import { BrandUser, User } from "../models/User";
import {
  SIGNIN,
  USER_ERROR,
  USER_FETCH, USER_GET,
  BRAND_SIGNUP_SUCCESS,
  USER_SIGNUP_SUCCESS,
  SIGNUP,
  UNFOLLOW_BRAND,
  BRANDS_GET,
  FOLLOW_BRAND,
  USER_SET,
  REWARD_USERS,
} from "../constants";

export const userGetAction = createAction(USER_GET)();
export const brandsGetAction = createAction(BRANDS_GET)();
export const userFetchAction = createAction(USER_FETCH)();

export const userSetAction = createAction(USER_SET, (users: User[]) => users)();
export const signinAction = createAction(SIGNIN, (credentials: any) => credentials)();
export const signupAction = createAction(SIGNUP, (credentials: any) => credentials)();
export const brandSignupSuccessAction = createAction(BRAND_SIGNUP_SUCCESS, (credentials: any) => credentials)();
export const userSignupSuccessAction = createAction(USER_SIGNUP_SUCCESS, (credentials: any) => credentials)();

export const followBrand = createAction(FOLLOW_BRAND, (brand: BrandUser) => brand)();
export const unfollowBrand = createAction(UNFOLLOW_BRAND, (brand: BrandUser) => brand)();
export const userErrorAction = createAction(
  USER_ERROR, (error: Error) => error
)();

export const rewardUsers = createAction(REWARD_USERS, (users: User[], points: number) => ({users, points}))();

