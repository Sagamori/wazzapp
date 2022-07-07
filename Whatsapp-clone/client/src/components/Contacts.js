import React, { useRef, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const { contacts } = useContacts();
  console.log(contacts, 'sdfghjkl');
  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => {
        console.log(contact, ' in map');
        return (
          <ListGroup.Item key={contact._id}>{contact.username}</ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
