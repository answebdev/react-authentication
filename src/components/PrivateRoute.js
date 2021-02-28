import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// All we want to do here is to create a wrapper for our current route.

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        // Check to see if we have a current user.
        // If we have a current user, then render out the component that we got passed into our class.
        // Otherwise, if we don't have a current user, then do not render a current user (i.e. we don't want to render this component
        // because it's a private component).
        // Instead, we want to redirect our user to the Login page.
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        );
      }}
    ></Route>
  );
}
