import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversation } from "../contexts/ConversationProvider";

const NewConversationModal = ({ closeModal }) => {
  const [selectedContactId, setSelectedContactId] = useState([]);

  const { contacts } = useContacts();
  const { createConversation } = useConversation();
  console.log(contacts, " wesit");
  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactId);
    closeModal();
  };

  const handleCheckboxChange = (contactId) => {
    console.log(contactId, " id first");
    setSelectedContactId((prevSelectedContactId) => {
      if (prevSelectedContactId.includes(contactId)) {
        return prevSelectedContactId.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactId, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => {
            console.log(contact, " in map modal conversation");
            return (
              <Form.Group controlId={contact._id} key={contact._id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactId.includes(contact.contactId)}
                  label={contact.username}
                  onChange={() => handleCheckboxChange(contact.contactId)}
                />
              </Form.Group>
            );
          })}

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
