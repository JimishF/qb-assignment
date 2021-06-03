export enum UserTypes {
  Brand = "Brand",
  User = "User",
  Unavaliable = "Unavaliable",
}
export interface BaseUser {
  id: string,
  email?: string,
  password?: string,
  role?: UserTypes,
  avatar?: string,
}

export interface User extends BaseUser {
  firstName?: string,
  lastName?: string,
  followingBrands?: BrandUser[],
}

export interface BrandUser extends BaseUser {
  name?: string,
  symbol?: string,
}
export const fakeUser = {
  id: "111",
  firstName: "Jimish",
  lastName: "Fotariya",
  role: UserTypes.User,
  avatar: "/avatar.svg"
};