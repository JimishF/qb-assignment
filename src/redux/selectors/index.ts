import { createSelector } from 'reselect'
import { RootStateType } from '..'


const authStateSelectorFn = (state: RootStateType) => state.auth;
const brandStateSelectorFn = (state: RootStateType) => state.brands;
export const usersSelector = createSelector(authStateSelectorFn, auth => auth.users)
export const authUserSelector = createSelector(authStateSelectorFn, auth => auth.user)
export const brandSelector = (id:string) => createSelector(brandStateSelectorFn, (brands = []) => brands.find(brand => brand.id === id))