import { createContext, useState, ReactNode, FC } from 'react';
import { IUser, UserContextType } from '../@types/user';
import useAxios from 'api/useAxios';


export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: FC<ReactNode> = ({ children }) => {
  const [user, setUser] = useState<IUser>({
    loggedIn: false,
    jwtCredential: 'n/a',
    userID: "0",
    name: "Guest User",
    email: "guest@user.com",
    isAdmin: false,
    profilePictureUrl: "https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg",
    bannerPictureUrl: "https://external-preview.redd.it/faJVrie695lRnzYphFLKYYaNIiNpv6ifiQXvkOcHt-c.jpg?width=640&crop=smart&auto=webp&s=cce3284554eea33cceae04abeed6983bc852a928",
    color: "#287485",
    elo: 1120,
    country: "USA",
  })

  const setUserEmail = (newEmail: string) => {
    const newUser: IUser = {
      ...user,
      email: newEmail
    }
    setUser(newUser);
  }

  const setUserProfilePictureUrl = (newUrl: string) => {
    const newUser: IUser = {
      ...user,
      profilePictureUrl: newUrl
    }
    setUser(newUser);
  }

  const setUserBannerPictureUrl = (newUrl: string) => {
    const newUser: IUser = {
      ...user,
      bannerPictureUrl: newUrl
    }
    setUser(newUser);
  }

  const setUserColor = (newColor: string) => {
    const newUser: IUser = {
      ...user,
      color: newColor
    }
    setUser(newUser);
  }

  const setUserElo = (newElo: number) => {
    const newUser: IUser = {
      ...user,
      elo: newElo
    }
    setUser(newUser);
  }

  const setUserCountry = (newCounty: string) => {
    const newUser: IUser = {
      ...user,
      country: newCounty
    }
    setUser(newUser);
  }

  const fetchUser = (userID: number) => {
    if (!user.loggedIn) throw new Error("User not logged in.");

    const { response, loading, error } = useAxios({
      method: 'post',
      url: '/posts',
      headers: JSON.stringify({ accept: '*/*' }),
      body: JSON.stringify({
          userId: 1,
          id: 19392,
          title: 'title',
          body: 'Sample text',
      }),
      });
      const [data, setData] = useState([]);

      useEffect(() => {
          if (response !== null) {
              setData(response);
          }
      }, [response]);

    AxiosInstance.post("login/userInfo", {
      sub: user.userID
    }).then((response) => {
      const fetchedUser = response.data.result[0]
      setUser((user: UserType) => {
        user.name = fetchedUser.name;
        user.email = fetchedUser.email;
        user.profilePictureUrl = fetchedUser.profilePictureUrl;
        return user;
      })
    });
  }
}