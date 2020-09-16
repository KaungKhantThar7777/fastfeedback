import React, { useState, useEffect, useContext, createContext } from "react";
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

function useProvideAuth() {
  const [user, setUser] = useState(null);

  function handleUser(rawUser) {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, { ...user });
      setUser({ user });
      return user;
    } else {
      setUser(false);
      return false;
    }
  }
  function formatUser(user) {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
    };
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
        setUser(user);
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
