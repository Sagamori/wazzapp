import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const ContactsContexts = React.createContext();

export function useContacts() {
  return useContext(ContactsContexts);
}

export function ContactsProvider({ id, children }) {
  const [contacts, setContacts] = useState([]);
  const [stop, setStop] = useState(false);

  console.log(contacts, ' well done son');

  useEffect(() => {
    console.log(id, ' id effect');
    axios
      .post('http://localhost:5000/dashboard/myContacts', { id })
      .then(({ data }) => {
        setContacts(data);
      });
  }, [stop]);

  const createContact = async (phone_number) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/dashboard/contacts',
        { id, phone_number }
      );
      console.log(data, 'createcontect');
      setContacts((prevContacts) => {
        return [
          ...prevContacts,
          { phone_number, username: data[0].username, _id: data[0]._id },
        ];
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
