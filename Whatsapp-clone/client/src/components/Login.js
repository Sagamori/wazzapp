import React, { useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';
import RegistrationForm from './Registration';

export default function Login({ onIdSubmit }) {
  const [registration, setRegistration] = useState(false);
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  const createNewId = (e) => {
    e.preventDefault();
    onIdSubmit(uuidV4());
  };

  const registerRequest = (e) => {
    e.preventDefault();
    return <RegistrationForm />;
  };
  console.log(registration, ' reg');
  return registration ? (
    <RegistrationForm />
  ) : (
    <Container
      className="align-items-center d-flex"
      style={{ height: '100vh' }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="me-2 my-2">
          Login
        </Button>

        <Button onClick={() => setRegistration(true)} variant="secondary">
          Registration
        </Button>
      </Form>
    </Container>
  );
}

// <Button onClick={createNewId} variant="secondary">
//   Registration
// </Button>
