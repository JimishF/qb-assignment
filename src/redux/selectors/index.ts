import { createSelector } from 'reselect'
import { RootStateType } from '..'


const authStateSelectorFn  = (state: RootStateType) => state.auth;
export const usersSelector = createSelector(authStateSelectorFn, auth => auth.users)