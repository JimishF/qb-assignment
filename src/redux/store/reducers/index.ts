import { combineReducers } from "redux";

import { authReducer, AuthState } from "./AuthReducer";

export type RootState = {
  auth: AuthState;
};

const reducers = combineReducers({
  auth: authReducer,
});

export default reducers;
