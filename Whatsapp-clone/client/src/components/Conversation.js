import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversation } from "../contexts/ConversationProvider";

const Conversation = () => {
  const { conversations, selectedConversationIndex } = useConversation();
  console.log(conversations, "aha conversationshiiiii");
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
            .map((r) =>
              !r.username
                ? conversation.messages.map((g) => g.senderPhoneNumber)
                : r.username
            )
            .join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversation;
