import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

export default function Login({ onNumSubmit, onRedirection }) {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onNumSubmit(idRef.current.value);
    onRedirection('dashboard');
  };

  const registerRequest = (e) => {
    e.preventDefault();
    onRedirection('registration');
  };

  return (
    <Container
      className="align-items-center d-flex justify-content-center"
      style={{ height: '100vh' }}
    >
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter Your Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="+995-123-456-789"
            ref={idRef}
            required
          />
        </Form.Group>
        <Button type="submit" className="me-2 my-2">
          Login
        </Button>
        <Button onClick={registerRequest} variant="secondary">
          Registration
        </Button>
      </Form>
    </Container>
  );
}
