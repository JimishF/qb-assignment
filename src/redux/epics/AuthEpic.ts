import { push } from 'connected-react-router';
import { Epic } from "redux-observable";
import { from, iif, of } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { actions, ActionsType } from "..";
import { brandSignupSuccessAction, userSignupSuccessAction } from '../actions/index';
import { UserTypes } from '../models/User';
import { RootState } from "../reducers";
import * as API from "../services/Api";

export type EpicType = Epic<
  ActionsType,
  ActionsType,
  RootState,
  typeof API>

export const userFetchEpic: EpicType = (action$, store$, { getUsers }) => (
  action$.pipe(
    filter(isActionOf(actions.userFetchAction)),
    switchMap(() =>
      from(getUsers())
        .pipe(
          switchMap((users) => of(actions.userSetAction(users)))
        )
    )
  )
)

export const signinEpic: EpicType = (action$, store$) => (
  action$.pipe(
    filter(isActionOf(actions.signinAction)),
    switchMap((action) => {
      return iif(() => action.payload.role === UserTypes.Brand,
        of(push('/followers')),
        of(push('/brands')),
      )
    })
  )
)


export const signupEpic: EpicType = (action$, store$) => (
  action$.pipe(
    filter(isActionOf(actions.signupAction)),
    switchMap((action) => {
      return iif(() => action.payload.role === UserTypes.Brand,
        of(brandSignupSuccessAction(action.payload)),
        of(userSignupSuccessAction(action.payload)),
      )
    })
  )
)


export const userSignupSuccessActionEpic: EpicType = (action$, store$) => (
  action$.pipe(
    filter(isActionOf(actions.userSignupSuccessAction)),
    switchMap((action) => of(push('/brands')))
  )
)

export const brandSignupSuccessActionEpic: EpicType = (action$, store$) => (
  action$.pipe(
    filter(isActionOf(actions.brandSignupSuccessAction)),
    switchMap((action) => of(push('/followers')))
  )
)


// eslint-disable-next-line import/no-anonymous-default-export
export default [userFetchEpic, signinEpic, signupEpic, brandSignupSuccessActionEpic, userSignupSuccessActionEpic];
