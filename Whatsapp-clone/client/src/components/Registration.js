import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Container, Form, Modal } from "react-bootstrap";
import VerifyNumberModal from "./VerifyNumberModal";

export default function RegistrationForm({ onRedirection, onNumber }) {
  const [id, setId] = useState();
  const numRef = useRef();
  const usernameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/sendCode", {
        number: numRef.current.value,
      });
      setId(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const login = (e) => {
    e.preventDefault();
    onRedirection("login");
  };

  return id ? (
    <VerifyNumberModal
      id={id}
      username={usernameRef.current.value}
      phone_number={numRef.current.value}
      onRedirection={onRedirection}
      onNumber={onNumber}
    />
  ) : (
    <>
      <Container
        className="align-items-center d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <Form className="w-50" onSubmit={handleSubmit}>
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
    </>
  );
}
