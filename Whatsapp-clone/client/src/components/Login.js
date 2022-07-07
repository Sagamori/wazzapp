import axios from "axios";
import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function Login({ onIdSubmit, onNumSubmit, onRedirection }) {
  const numRef = useRef();
  const usernameRef = useRef();

  const handleSubmit = async (e) => {
    console.log(numRef.current.value, usernameRef.current.value);

    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/login", {
        phone_number: numRef.current.value,
        username: usernameRef.current.value,
      });
      console.log(data, " login data, login comp");

      onIdSubmit(data["_id"]);
      onNumSubmit(numRef.current.value);
      onRedirection("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const registerRequest = (e) => {
    e.preventDefault();
    onRedirection("registration");
  };

  return (
    <Container
      className="align-items-center d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter Your Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="+995-123-456-789"
            ref={numRef}
            required
          />
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" ref={usernameRef} required />
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
