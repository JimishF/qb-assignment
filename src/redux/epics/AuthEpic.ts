import { push } from 'connected-react-router';
import { Epic } from "redux-observable";
import { from, iif, of } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { actions, ActionsType } from "..";
import { UserTypes } from '../models/User';
import { RootState } from "../reducers";
import * as API from "../services/Api";

export const userFetchEpic: Epic<
  ActionsType,
  ActionsType,
  RootState,
  typeof API
> = (action$, store$, { getUsers }) => (
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

export const signinEpic: Epic<
  ActionsType,
  ActionsType,
  RootState,
  typeof API
> = (action$, store$, { getUsers }) => (
  action$.pipe(
    filter(isActionOf(actions.signinAction)),
    switchMap((action) => {
      return iif(() => action.payload.userType === UserTypes.Brand,
        of(push('/brand/followers')),
        of(push('/')),
      )
    })
  )
)


// eslint-disable-next-line import/no-anonymous-default-export
export default [userFetchEpic, signinEpic];
