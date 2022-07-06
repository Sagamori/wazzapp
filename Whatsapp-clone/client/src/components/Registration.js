import React, { useRef } from "react";
import axios from "axios";

import { Button, Container, Form } from "react-bootstrap";

export default function RegistrationForm({ onNumSubmit, onRedirection }) {
  const numRef = useRef();
  const usernameRef = useRef();

  const sendCode = async (e) => {
    e.preventDefault();
    try {
      console.log("here1");
      const a = await axios.post("http://localhost:5000/sendCode", {
        number: numRef.current.value,
      });

      const b = await axios.post("http://localhost:5000/verify", {
        id,
        token,
      });
      console.log(a);
    } catch (error) {
      console.log(error);
    }
  };

  const login = (e) => {
    e.preventDefault();
    onRedirection("login");
  };

  return (
    <Container
      className="align-items-center d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <Form className="w-50" onSubmit={sendCode}>
        <Form.Group>
          <Form.Label>Phone Number*</Form.Label>
          <Form.Control
            type="text"
            placeholder="+995-123-456-789"
            ref={numRef}
            required
          />
          <Form.Label>Username*</Form.Label>
          <Form.Control type="text" ref={usernameRef} required />
        </Form.Group>
        <Button type="submit" className="mt-3">
          SMS Authentication
        </Button>
        <Button onClick={login} variant="secondary" className="ms-3 mt-3">
          Back to login
        </Button>
      </Form>
    </Container>
  );
}
