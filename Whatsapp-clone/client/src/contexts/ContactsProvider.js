import axios from 'axios';
import React, { useContext, useState } from 'react';

const ContactsContexts = React.createContext();

export function useContacts() {
  return useContext(ContactsContexts);
}

export function ContactsProvider({ id, children }) {
  const [contacts, setContacts] = useState([]);

  const createContact = async (phone_number) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/dashboard/client',
        { id, contacts }
      );
      console.log(data);
      setContacts((prevContacts) => {
        return [...prevContacts, { phone_number, username: data.username }];
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContactsContexts.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContexts.Provider>
  );
}
