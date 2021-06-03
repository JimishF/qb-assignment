import { createReducer } from "typesafe-actions";

import { actions, ActionsType } from "..";
import { User } from "../models/User";

export interface AuthState {
  users?: User[];
  user: User | null;
}
const initialState = {
  users: [],
  user: null,
}

export const authReducer = createReducer<AuthState, ActionsType>(
  initialState
)
  .handleAction(actions.userSetAction, (state: AuthState, action: ActionsType) => {
    return ({
      ...state,
      users: action.payload,
    });
  })
  .handleAction(actions.userGetAction, (state: AuthState, action: ActionsType) => {
    return state;
  })
  .handleAction(actions.userErrorAction, (state: AuthState, action: ActionsType) => {
    return state;
  })
  .handleAction(actions.signinAction, (state: AuthState, action: ActionsType) => {
    const user = {
      id: Math.random().toString(32).substr(5),
      ...action.payload
    }
    
    return ({
      ...state,
      user,
    });
  });
