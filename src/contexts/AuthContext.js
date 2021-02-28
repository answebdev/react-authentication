import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // This allows us to set the current user.
  // So, whenever we call 'createUserWithEmailAndPassword' (this comes from Firebae),
  // it's going to call 'setCurrentUser' and set that user for us.
  // And we don't want this inside of our 'render'.
  // We want this in a 'useEffect', because we only want to run this when we mount our component.
  // So, we put in inside 'useEffect' so that it only runs once,
  // and we'll make sure to do that by putting an empty array at the end.

  // And we also want to make sure we 'unsubscribe' from this whenever we're done.
  // And the reason we get 'unsubsribe' is because this function actually returns a method that when we call this method,
  // it will unsubscribe this 'auth.onAuthStateChanged' event.
  // So, we can then return 'unsubscribe', and this is going to unsubscribe us from the 'onAuthStateChanged' listener
  // whenever we unmount this component, which is exactly what we want.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
