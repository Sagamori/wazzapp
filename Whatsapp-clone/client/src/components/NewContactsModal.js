import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

const NewContactsModal = ({ closeModal }) => {
  const numRef = useRef();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(numRef.current.value);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" ref={numRef} required />
          </Form.Group>

          <Button type="submit" className="mt-4">
            Add Contact
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactsModal;
