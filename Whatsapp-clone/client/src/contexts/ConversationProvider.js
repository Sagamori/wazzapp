import axios from 'axios';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
const ConversationContexts = React.createContext();
export function useConversation() {
  return useContext(ConversationContexts);
}

export function ConversationProvider({ id, children }) {
  const [conversations, setConversations] = useState([]);

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket = useSocket();
  const { contacts, number } = useContacts();

  const createConversation = async (recipients) => {
    console.log(recipients, ' reci[ients');
    try {
      const { data } = await axios.post(
        'http://localhost:5000/dashboard/conversation',
        {
          id,
          recipients,
        }
      );

      setConversations((prevConversations) => {
        return [
          ...prevConversations,
          {
            recipients,
            messages: [],
          },
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        let senderNumb;

        axios
          .post('http://localhost:5000/profiles', {
            id: sender,
          })
          .then(({ data }) =>
            console.log(data.phone_number, ' data.phone_number')
          );

        console.log(senderNumb, ' senderNumb senderNumb senderNumb');

        const newConversations = prevConversations.map((conversation) => {
          console.log(conversation, '  conversation in action');
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
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
    socket.on('receive-message', addMessageToConversation);

    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients, text) {
    socket.emit('send-message', { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    console.log(conversation, '  conversation');
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.contactId === recipient;
      });

      const username = (contact && contact.username) || recipient;

      return { contactId: recipient, username };
    });
    console.log(recipients, ' recipients after find');

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.contactId === message.sender;
      });

      console.log(message.sender, '; 923052950283');

      // console.log(data.phone_number, ' data.phone_number');
      console.log(message);
      const username = (contact && contact.username) || message.sender;
      console.log(username, ' username after expression');
      const fromMe = id === message.sender;

      return { ...message, senderName: username, fromMe };
    });

    console.log(messages, ' messages after everything');

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
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((e, i) => {
    return e === b[i];
  });
}
