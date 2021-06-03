import { createReducer } from "typesafe-actions";

import { actions, ActionsType } from "..";
import { initialState } from "../initialState";
import { BrandUser} from '../models/User';

type BrandsState = BrandUser[];
const initState = initialState.brands;
export const brandReducer = createReducer<BrandsState, ActionsType>(
    initState
)
    .handleAction(actions.brandsGetAction, (state: BrandsState, action: ActionsType) => {
        return state;
    })