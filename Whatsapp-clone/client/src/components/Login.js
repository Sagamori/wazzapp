import axios from "axios";
import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { encryptText } from "../contexts/crypto";

const Login = ({ onIdSubmit, onNumberSubmit, onRedirection }) => {
  const numRef = useRef();
  const usernameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/login", {
        phone_number: numRef.current.value,
        username: usernameRef.current.value,
      });

      if (
        data.message !== "User doesn't exists!!!" &&
        data.message !== "Invalid Credentials!!!"
      ) {
        const { encryptedText: loginId } = encryptText(data["_id"]);
        onIdSubmit(loginId);
        onNumberSubmit(numRef.current.value);
        return onRedirection("dashboard");
      }

      throw new Error(data.message);
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
      className="bg-success align-items-center d-flex justify-content-center"
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
};

export default Login;
