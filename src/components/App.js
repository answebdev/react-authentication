import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import { AuthProvider } from '../contexts/AuthContext';

// Source: https://www.youtube.com/watch?v=PKwu15ldZ7k
// Code: https://github.com/WebDevSimplified/React-Firebase-Auth

// 'align-items-center' is for vertical centering.
// 'justify-content-center' is for horizontal centering.
// We don't want it to be any wider than 400px: maxWidth:'400px'

function App() {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
