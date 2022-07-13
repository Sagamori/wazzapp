import axios from "axios";
import React, { useCallback, useContext, useState, useEffect } from "react";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
const ConversationContexts = React.createContext();
export const useConversation = () => {
  return useContext(ConversationContexts);
};

export const ConversationProvider = ({ id, phone_number, children }) => {
  const [conversations, setConversations] = useState([]);

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket = useSocket();
  const { contacts, number } = useContacts();
  console.log(conversations, "mtavari gate");

  const createConversation = async (recipients) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/dashboard/conversation",
        {
          id,
          recipients,
        }
      );
      console.log(data, "herejhgfdfghj");

      setConversations((prevConversations) => {
        return [
          ...prevConversations,
          { recipients, messages: [], phone_number: data[0].phone_number },
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender, senderPhoneNumber }) => {
      console.log(sender, "shead jad i h");
      console.log(senderPhoneNumber, " midi raaa telefoni");
      console.log();
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text, senderPhoneNumber };

        const newConversations = prevConversations.map((conversation) => {
          console.log(conversation, "  conversation in action");
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          console.log(conversation, " ai awandakkkk");
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  console.log(id, " id vvvvv");

  const sendMessage = (recipients, text) => {
    console.log(recipients, " recipient in socket emit");
    console.log(text, " text in socket emit");
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({
      recipients,
      text,
      sender: id,
      senderPhoneNumber: phone_number,
    });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    console.log(conversation, "  conversation");

    const messages = conversation.messages.map((message) => {
      console.log();
      const contact = contacts.find((contact) => {
        return contact.contactId === message.sender;
      });
      console.log(message, "mtliani message");
      console.log(contact, "contact");
      const username =
        (contact && contact.username) || message.senderPhoneNumber;
      console.log(username, "username");

      const fromMe = id === message.sender;
      return { ...message, senderName: username, fromMe };
    });
    console.log(messages, "esaaa axla");

    const recipients = conversation.recipients.map((recipient, i) => {
      const contact = contacts.find((contact) => {
        return contact.contactId === recipient;
      });

      let guest;

      conversation.messages.map((g) => {
        guest = g.senderPhoneNumber;
      });

      const username = (contact && contact.username) || guest;
      console.log(username, "meorshi");
      return { contactId: recipient, username };
    });
    console.log(recipients, " recipients after find");

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectedConversationIndex: setSelectedConversationIndex,
    createConversation,
    sendMessage,
  };

  return (
    <ConversationContexts.Provider value={value}>
      {children}
    </ConversationContexts.Provider>
  );
};

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((e, i) => {
    return e === b[i];
  });
};
