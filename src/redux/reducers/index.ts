import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import { authReducer, AuthState } from "./AuthReducer";
import { brandReducer } from './BrandReducer'
import { History } from 'history'
export type RootState = {
  auth: AuthState;
};

const reducers = (history: History<any>) => combineReducers({
  auth: authReducer,
  brands: brandReducer,
  router: connectRouter(history),
});

export default reducers;
