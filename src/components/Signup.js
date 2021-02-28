import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 'false' by default - we're not loading by default.
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation checks.
    // Check if passwords are the same.
    // If they are not equal, return an error.
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // And we return here because we don't want to continue with the signup -
      // we want to exit out of the function immediately because there's an error.
      return setError('Passwords do not match');
    }

    // Set up a try/catch because 'signup' is an asynchronous event.
    // And if we 'await', then it will wait for the signup to finish.
    // And if there's a failure, it will go into the 'catch' block,
    // where we can set our error.
    try {
      // Set error back to an empty string before we 'try' anything, so that we have no error.
      setError('');
      // We also want to set up a loading state so that when we're actually signing up the user,
      // we disable the 'Sign Up' button so they don't automatically keep clicking the button (see button below)
      // and accidentally create multiple accounts at the same time.
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }
    // Set loading back to false when everything is done - after it's done waiting for the signup.
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {/* If we have an error, render out a Bootstrap alert. */}
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              {/* Use 'ref' so that we can actually get the value when we actually need to submit the form.
              See: https://www.youtube.com/watch?v=t2ypzz6gJm0 */}

              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='login'>Log In</Link>
      </div>
    </>
  );
}
