import { createReducer } from "typesafe-actions";

import { actions, ActionsType } from "..";
import { initialState } from "../initialState";

type BrandsState = any[];
const initState = initialState.brands;
export const brandReducer = createReducer<BrandsState, ActionsType>(
    initState
)
    .handleAction(actions.userSetAction, (state: BrandsState, action: ActionsType) => {
        return ({
            ...state,
            users: action.payload,
        });
    })
    .handleAction(actions.userGetAction, (state: BrandsState, action: ActionsType) => {
        return state;
    })