import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationProvider } from '../contexts/ConversationProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import RegistrationForm from './Registration';

function App() {
  const [redirect, setRedirect] = useState('login');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider id={id}>
        <ConversationProvider id={id} number={number}>
          <Dashboard number={number} />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  if (redirect === 'login') {
    return (
      <Login
        onNumSubmit={setNumber}
        onIdSubmit={setId}
        onRedirection={setRedirect}
      />
    );
  }
  if (redirect === 'registration') {
    return (
      <RegistrationForm onRedirection={setRedirect} onNumber={setNumber} />
    );
  }
  if (redirect === 'dashboard') {
    return dashboard;
  }
}

export default App;
