import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidV4 } from "uuid";
import * as axios from "axios";

import { Button, Container, Form } from "react-bootstrap";

export default function RegistrationForm({ onIdSubmit, onRegistration }) {
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [username, setUsername] = useState("second");

  const numRef = useRef();
  const usernameRef = useRef();
  // const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/registration", {
        phone_number: numRef.current.value,
        username: usernameRef.current.value,
      });
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(numRef.current.value, ' numRef');
  // console.log(usernameRef.current.value, ' username ref');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onIdSubmit(uuidV4());
  // };

  const login = (e) => {
    e.preventDefault();
    console.log("login");
    onRegistration(false);
  };

  return (
    <Container
      className="align-items-center d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <Form className="w-50" onSubmit={register}>
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
