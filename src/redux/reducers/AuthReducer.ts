import { createReducer } from "typesafe-actions";
import { actions, ActionsType } from "..";
import { BrandUser, User, UserTypes } from "../models/User";
import fakeUsers from '../../rawData/users.json'

export interface AuthState {
  users?: User[];
  user: User | BrandUser | null;
}
const initialState = {
  users: [],
  user: null,
}

export const authReducer = createReducer<AuthState, ActionsType>(
  initialState
)
  .handleAction(actions.signinAction, (state: AuthState, action: ActionsType) => {
    const user = {
      id: Math.random().toString(32).substr(5),
      ...action.payload
    }

    return ({
      ...state,
      user,
    });
  })
  .handleAction(actions.signupAction, (state: AuthState, action: ActionsType) => {

    const user = {
      id: Math.random().toString(32).substr(5),
      ...action.payload
    }

    if (user.role === UserTypes.Brand) {
      user.followers = fakeUsers.map(u => ({
        ...u,
        role: UserTypes.User,
        credits: Math.floor(Math.random() * user.maxPoints)
      }));
    }

    return ({
      ...state,
      user,
    });

  })
  .handleAction(actions.followBrand, (state: AuthState, action: ActionsType) => {
    let user: User = state.user as User;
    if (!user?.followingBrands?.find(brand => brand.id === action.payload.id)) {
      user = {
        ...user,
        followingBrands: [action.payload, ...(user?.followingBrands ?? [])]
      }
    }
    return ({
      ...state,
      user,
    });
  })
  .handleAction(actions.unfollowBrand, (state: AuthState, action: ActionsType) => {
    let user: User = state.user as User;
    user.followingBrands = user.followingBrands?.filter(brand => brand.id !== action.payload.id) ?? [];
    return ({
      ...state,
      user,
    });
  })
  .handleAction(actions.rewardUsers, (state: AuthState, action: ActionsType) => {
    let user: BrandUser = state.user as BrandUser;
    user.followers = user?.followers?.map((follower) => {
      const selected = action.payload.users.find((u: User) => u.id === follower.id)
      if (selected) {
        selected.credits += action.payload.points
      }
      return follower
    }) ?? [];

    return ({
      ...state,
      user,
    });
  })