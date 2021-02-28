import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

// In order to set up all of the authentication for our app,
// we're going to use Context, because we want to be able to access our current user
// anywhere in our application.

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Sign up function
  // If you don't want to use another backend instead of Firebase, all you would need to do
  // is to get rid of this 'return' statement and use the one for your backend of choice.
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // Log in function
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // Log out function
  function logout() {
    return auth.signOut();
  }

  // Reset Password function
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
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

  // Firebase actually sets local storage for you, sets tokens,
  // so that way, it can verify that if you have a user already signed in,
  // it will connect that user for you.
  // And it will use 'onAuthStateChanged'.
  // But that means that you have an initial loading state that you have to worry about.
  // So, we're going to set 'setLoading' to 'false' (which will initially be set to 'true' see above).
  // Whenever we actually have a user, when this changes, it means we're done loading.
  // So by default, we're loading.
  // And as soon as we get this first 'useEffect' that runs,
  // that means it did the verification to see that there is a user,
  // and then we're going to set our loading to 'false'.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Our context:
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  };
  // Check to see if we're loading.
  // Otherwise, we don't want to run this.
  // So, if we're not loading, we want to render out the children.
  // Otherwise, we don't want to render the children.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
