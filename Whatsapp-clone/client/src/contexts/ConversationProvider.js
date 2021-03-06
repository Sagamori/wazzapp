import React, { useCallback, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/localStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
const ConversationContexts = React.createContext();
export function useConversation() {
  return useContext(ConversationContexts);
}

export function ConversationProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket = useSocket();
  const { contacts } = useContacts();

  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };

        const newConversations = prevConversations.map((conversation) => {
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
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;

      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  // Object will be Passed as data into ConversationContext
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
