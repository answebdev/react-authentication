import React from 'react';
import { Container } from 'react-bootstrap';
import Signup from './Signup';

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
        <Signup />
      </div>
    </Container>
  );
}

export default App;
