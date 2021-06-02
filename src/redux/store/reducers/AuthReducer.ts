import { createReducer } from "typesafe-actions";

import { actions, ActionsType } from "..";
import {User} from "../../models/User";

export interface AuthState {
  users?: User[];
}

export const initialState = {
  users: []
};

export const authReducer = createReducer<AuthState, ActionsType>(
  initialState
)
  .handleAction(actions.userSetAction, (state:AuthState, action:ActionsType) => {
    return ({
      ...state,
      users: action.payload,
    });
  })
  .handleAction(actions.userGetAction, (state:AuthState, action:ActionsType) => {
    return state;
  })
  .handleAction(actions.userErrorAction, (state:AuthState, action:ActionsType) => {
    console.error(action.payload)
    return state;
  });
