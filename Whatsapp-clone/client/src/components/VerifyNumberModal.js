import axios from "axios";
import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import CryptoJS from "crypto-js";
import { encryptText } from "../contexts/crypto";

const VerifyNumberModal = ({
  onId,
  tokenId,
  phone_number,
  username,
  onRedirection,
  onNumber,
}) => {
  const codeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/verify", {
        id: tokenId,
        token: codeRef.current.value,
      });

      const { data } = await axios.post("http://localhost:5000/registration", {
        phone_number,
        username,
      });
      const { encryptedText } = encryptText(data.id);

      onId(encryptedText);
      onNumber(phone_number);
      return onRedirection("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center  w-50"
      style={{ height: "100vh" }}
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
};

export default VerifyNumberModal;
