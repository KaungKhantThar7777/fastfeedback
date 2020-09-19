import React, { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";
import { createUser } from "./db";
import firebase from "./firebase";
const authContext = createContext();

const provider = new firebase.auth.GithubAuthProvider();
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function formatUser(user) {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  function handleUser(rawUser) {
    if (rawUser) {
      const formattedUser = formatUser(rawUser);

      const { token, ...restData } = formatUser;
      createUser(formattedUser.uid, { ...restData });
      Cookies.set("fast-feedback-auth", true, { expires: 1 });
      setUser(formattedUser);
      return user;
    } else {
      setUser(false);
      Cookies.remove("fast-feedback-auth");
      return false;
    }
  }

  const signInWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser();
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(formatUser(user));
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGithub,
    signout,
  };
}
