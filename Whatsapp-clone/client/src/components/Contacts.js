import React, { useRef, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => {
        return (
          <ListGroup.Item key={contact._id}>{contact.username}</ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
