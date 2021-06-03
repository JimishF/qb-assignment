import { createSelector } from 'reselect';
import { RootStateType } from '..';
import { BrandUser, User } from '../models/User';


const authStateSelectorFn = (state: RootStateType) => state.auth;
const brandStateSelectorFn = (state: RootStateType) => state.brands;
export const usersSelector = createSelector(authStateSelectorFn, auth => auth.users)
export const authUserSelector = createSelector(authStateSelectorFn, auth => auth.user)
export const brandSelector = (id: string) => createSelector(brandStateSelectorFn, (brands = []) => brands.find(brand => brand.id === id))
export const isFollowingBrand = (id: string) => createSelector(authStateSelectorFn, (auth) => {
    const user: User = auth?.user ?? {} as User;
    return user.followingBrands?.find(brand => brand.id === id) ?? false
})

export const brandFollowersSelector = createSelector(authStateSelectorFn, auth => {
    const user: BrandUser = auth?.user ?? {} as BrandUser;
    return user.followers ?? []
})
