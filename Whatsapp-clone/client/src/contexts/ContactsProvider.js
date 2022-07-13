import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const ContactsContexts = React.createContext();

export const useContacts = () => {
  return useContext(ContactsContexts);
};

export const ContactsProvider = ({ id, children, phone_number }) => {
  const [number, setNumber] = useState();
  const [contacts, setContacts] = useState([]);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/login/profile", { id })
      .then(({ data }) => {
        setNumber(data.phone_number);
      });
  }, [stop]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/dashboard/myContacts", { id })
      .then(({ data }) => {
        setContacts(data);
      });
  }, [stop]);

  const createContact = async (phone_number) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/dashboard/contacts",
        { id, phone_number }
      );

      setContacts((prevContacts) => {
        return [
          ...prevContacts,
          {
            phone_number,
            username: data[0].username,
            _id: data[0]._id,
            contactId: data.contactId,
          },
        ];
      });
      setStop(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContactsContexts.Provider value={{ number, contacts, createContact }}>
      {children}
    </ContactsContexts.Provider>
  );
};
