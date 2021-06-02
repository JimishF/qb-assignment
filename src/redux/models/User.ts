export enum UserTypes {
  Brand="Brand",
  User="User",
}

export interface ClientData {
  following: Pick<User, 'id' | 'name' | 'avatar'>[];
  cerdits : number,
}

export interface BrandData {
  followers: Pick<User, 'id' | 'name' | 'avatar'>[];
  cerdits : number,
}

export interface User {
  id: string,
  name:string,
  avatar?: string,
  email?: string,
  password?: string,
  role?: UserTypes,
}

export const fakeUser = { 
  id:"111",
  name: "Jimish",
  role: UserTypes.User,
  avatar: "/avatar.svg"
};