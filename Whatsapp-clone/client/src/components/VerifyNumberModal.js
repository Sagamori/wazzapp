import axios from 'axios';
import React, { useRef } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';

export default function VerifyNumberModal({
  id,
  phone_number,
  username,
  onRedirection,
}) {
  const codeRef = useRef();
  console.log(id);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(id, codeRef);
      console.log(id, ' sjdksdgbjk');
      const a = await axios.post('http://localhost:5000/verify', {
        id,
        token: codeRef.current.value,
      });

      console.log(a);

      const b = await axios.post('http://localhost:5000/registration', {
        phone_number,
        username,
      });
      console.log(b);
      onRedirection('dashboard');
    } catch (error) {
      console.log('error');
      console.log(error);
      console.log('till here');
    }
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center  w-50"
      style={{ height: '100vh' }}
    >
      <h1>Enter Code Here</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            placeholder="Enter verification code"
            ref={codeRef}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-4">
          Verify and register
        </Button>
      </Form>
    </Container>
  );
}
