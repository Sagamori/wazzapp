import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversation } from '../contexts/ConversationProvider';

export default function NewConversationModal({ closeModal }) {
  const [selectedContactUsernames, setSelectedContactUsernames] = useState([]);
  console.log(selectedContactUsernames, 'moda con');

  const { contacts } = useContacts();
  const { createConversation } = useConversation();

  function handleSubmit(e) {
    e.preventDefault();

    createConversation(selectedContactUsernames);
    closeModal();
  }

  function handleCheckboxChange(contactUsername) {
    setSelectedContactUsernames((prevSelectedContactUsernames) => {
      if (prevSelectedContactUsernames.includes(contactUsername)) {
        return prevSelectedContactUsernames.filter((prevUsername) => {
          return contactUsername !== prevUsername;
        });
      } else {
        return [...prevSelectedContactUsernames, contactUsername];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => {
            return (
              <Form.Group controlId={contact._id} key={contact._id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactUsernames.includes(contact.username)}
                  label={contact.username}
                  onChange={() => handleCheckboxChange(contact.username)}
                />
              </Form.Group>
            );
          })}

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
