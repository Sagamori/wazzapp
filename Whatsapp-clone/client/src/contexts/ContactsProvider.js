import React, { useContext } from 'react';
import useLocalStorage from '../hooks/localStorage';

const ContactsContexts = React.createContext();

export function useContacts() {
  return useContext(ContactsContexts);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContexts.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContexts.Provider>
  );
}
