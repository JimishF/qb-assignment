// NOTE
// DO NOT USE dynamic string operations(like template string) as action type property.
// see more details: https://github.com/piotrwitek/typesafe-actions#--the-actions
export const USER_GET = "@@user/GET";
export const USER_SET = "@@user/SET";
export const USER_ERROR = "@@user/ERROR";
export const USER_FETCH = "@@user/FETCH";
export const SIGNIN = "@@auth/SIGNIN"
export const SIGNUP = "@@auth/SIGNUP"
export const BRAND_SIGNUP_SUCCESS = "@@auth/SIGNUP_SUCCESS/BRAND"
export const USER_SIGNUP_SUCCESS = "@@auth/SIGNUP_SUCCESS/USER"
export const BRANDS_GET = "@@brands/GET"
export const FOLLOW_BRAND = "@@brands/FOLLOW"
export const UNFOLLOW_BRAND = "@@brands/UNFOLLOW"
export const REWARD_USERS = "@@brands/REWARD_USERS"

