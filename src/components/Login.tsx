import { SetStateAction, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import {defaultUser, useUser} from "context/userContext";
import {UserType} from "types/UserType"

import AxiosInstance from "../api/AxiosInstance";

/**
 * * FC for login button, the prompt also pops up if not currently logged in.
 * TODO: let prompt pop up in other places (ex: main page)
 */
const Login: React.FunctionComponent = ()  => {
  const [user, updateUser, fetchUser] = useUser()
  const navigate = useNavigate();
  
  /**
   * * Takes in credential String from google after logging in, pass to backed for decode, then
   * * use update user. Finally, navigate to main page and call fetchUser to fetch user from db.
   * ! No idea how to write the typescript stuff for this
   */
  const handleCredentialResponse = (response: { credential: string; }) => {
    const credential: string  = response.credential
    AxiosInstance({
      method: 'post',
      url: "login",
      data: {token: credential},
    }).then((response) => {
      updateUser!((user: UserType) => {
        user.loggedIn = true;
        user.userID = response.data.sub
        user.jwtCredential = credential
        return user;
      })
      navigate('/', {replace: true});
      fetchUser!();
    }).catch((err) => {
      throw new Error(err)
    })
  }

  /**
   * * reset user to default (defined in UserContext)
   */
  const signOut = () => {
    window.google.accounts.id.disableAutoSelect();
    updateUser!((user: UserType) => defaultUser())
    navigate('/', {replace: true});
  }
  
  /**
   * * If not logged in, renders the login button and pops the prompt out.
   * ? useEffect seems to run twice because of strictmode, doesn't affect anything for now.
   */
  useEffect( () => {
    let google = window.google;
    google.accounts.id.initialize({
      client_id:
        "830413447287-hjqll1sr9jeasrp0k4tele329bsumpep.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    if (!user!.loggedIn) {
      // Render the button using google's library
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv")!,
        {
          theme: "outline", size: "small",
          type: "standard"
        }
      );
      google.accounts.id.prompt();
    }
  },[])

  /**
   * * Show Login button if not logged in, else shows logout button.
   * TODO Make logout look better! as well as the whole page!!
   */
  return (
    <></>
  );
}

export default Login;