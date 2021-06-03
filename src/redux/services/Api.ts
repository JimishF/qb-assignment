import { User, UserTypes } from "../models/User";

const getUsers = async () => {
  const data:Array<User> = [{
      id: "1111",
      firstName: "Jhon",
      lastName: "Doe",
      avatar: "https://i.pravatar.cc/300",
      role: UserTypes.User,
    }]
  return data;
};

export { getUsers };
