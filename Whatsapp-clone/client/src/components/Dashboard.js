import React from 'react';
import { useConversation } from '../contexts/ConversationProvider';
import OpenConversation from './OpenConversation';
import SideBar from './SideBar';

export default function Dashboard({ number }) {
  const { selectedConversation } = useConversation();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <SideBar number={number} />

      {
        // Trick: operation below --> if selectedConversation is true than OpenConversation
        selectedConversation && <OpenConversation />
      }
    </div>
  );
}
