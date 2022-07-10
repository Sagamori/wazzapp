import React, { useEffect, useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationProvider } from '../contexts/ConversationProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import RegistrationForm from './Registration';
import useLocalStorage from '../hooks/localStorage';

function App() {
  const [redirect, setRedirect] = useState('');
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider id={id}>
        <ConversationProvider id={id}>
          <Dashboard />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  if (redirect === 'login') {
    return <Login onIdSubmit={setId} onRedirection={setRedirect} />;
  }

  if (redirect === 'registration') {
    return <RegistrationForm onRedirection={setRedirect} />;
  }

  if (redirect === 'dashboard') {
    return dashboard;
  }

  return id ? (
    dashboard
  ) : (
    <Login onIdSubmit={setId} onRedirection={setRedirect} />
  );
}

export default App;
