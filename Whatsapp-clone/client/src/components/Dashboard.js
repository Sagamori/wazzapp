import React from 'react';
import { useConversation } from '../contexts/ConversationProvider';
import OpenConversation from './OpenConversation';
import SideBar from './SideBar';

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversation();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <SideBar id={id} />

      {
        // Trick: operation below --> if selectedConversation is true than OpenConversation
        selectedConversation && <OpenConversation />
      }
    </div>
  );
}
