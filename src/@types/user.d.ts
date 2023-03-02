export interface IUser {
  loggedIn: boolean,
  jwtCredential: string;
  //*
  userID: string,
  name: string,
  email: string,
  isAdmin: boolean,
  profilePictureUrl: string,
  bannerPictureUrl: string,
  color: string,
  elo: number,
  country: string,
}

export type UserContextType = {
  user: User,
  saveUser: (user: User) => void,
  fetchUser: (userID: number) => User
}