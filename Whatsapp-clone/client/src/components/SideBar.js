import React, { useState } from 'react';
import { Button, Modal, Nav, Tab } from 'react-bootstrap';
import Conversation from './Conversation';
import Contacts from './Contacts';
import NewConversationModal from './NewConversationModal';
import NewContactsModal from './NewContactsModal';

const Conversation_Key = 'conversations';
const Contacts_Key = 'contacts';

export default function SideBar({ id }) {
  const [activeKey, setActiveKey] = useState(Conversation_Key);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === Conversation_Key;

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={Conversation_Key}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={Contacts_Key}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey={Conversation_Key}>
            <Conversation />
          </Tab.Pane>
          <Tab.Pane eventKey={Contacts_Key}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-end small">
          Your Id: <span className="text-muted">{id}</span>
          <Button
            onClick={() => setModalOpen(true)}
            className="rounded-0 w-100"
          >
            New {conversationsOpen ? 'Conversation' : 'Contact'}
          </Button>
        </div>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactsModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
