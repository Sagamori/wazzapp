import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversation } from '../contexts/ConversationProvider';

export default function Conversation() {
  const { conversations, selectedConversationIndex } = useConversation();
  console.log(conversations, ' conversations in sidbar');
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectedConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients
            .map((r) => {
              console.log(r, 'user name in sidebar');
              return r.username;
            })
            .join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
