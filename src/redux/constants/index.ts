// NOTE
// DO NOT USE dynamic string operations(like template string) as action type property.
// see more details: https://github.com/piotrwitek/typesafe-actions#--the-actions
export const USER_GET = "@@user/GET";
export const USER_SET = "@@user/SET";
export const USER_ERROR = "@@user/ERROR";
export const USER_FETCH = "@@user/FETCH";
export const SIGNIN = "@@auth/SIGNIN"