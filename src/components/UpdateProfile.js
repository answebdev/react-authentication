import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 'false' by default - we're not loading by default.
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    // Update email and password.
    // Create 'promises' set to an empty array.
    // Check to see if email is NOT equal to current email.
    // So if email has changed, we want to add that promise.
    // So, call that 'updateEmail' function with the current email.
    // And if the email changes, then add it to this array of 'promises'.
    // Because we want to just do all these promises and then wait until they all finish
    // before we throw any errors.
    const promises = [];
    setLoading(true);
    setError('');
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    // Same for the password.
    // If a password is entered, then do the same as with email - add a promise.
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    // As soon as all our promises finish,
    // then our '.then()' will run if they're all successful.
    // And if they're all successful, then redirect back to '/'.
    // Otherwise, if we have an error, then set our error.
    // Finally -> 'finally()' -> this sets our loading back to 'false' (it's set to 'true' above - see above after 'const promises').
    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  );
}
