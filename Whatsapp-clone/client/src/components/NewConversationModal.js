import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversation } from '../contexts/ConversationProvider';

export default function NewConversationModal({ closeModal }) {
  const [selectedContact, setSelectedContact] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversation();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedContact, ' egiaaaa');
    createConversation(selectedContact);
    closeModal();
  }

  function handleCheckboxChange(contactId, phone_number) {
    setSelectedContact((prevSelectedContact) => {
      if (prevSelectedContact.includes(contactId)) {
        return prevSelectedContact.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContact, { contactId, phone_number }];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => {
            console.log(contact, ' contacts in conv modal');
            return (
              <Form.Group controlId={contact._id} key={contact._id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContact.includes(contact._id)}
                  label={contact.username}
                  onChange={() =>
                    handleCheckboxChange(contact._id, contact.phone_number)
                  }
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
