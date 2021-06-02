import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { actions, ActionsType } from "..";
import * as API from "../../services/Api";
import { RootState } from "../reducers";

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

// eslint-disable-next-line import/no-anonymous-default-export
export default [userFetchEpic];
