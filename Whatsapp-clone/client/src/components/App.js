import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import useLocalStorage from '../hooks/localStorage';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationProvider } from '../contexts/ConversationProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import RegistrationForm from './Registration';

function App() {
  const [registration, setRegistration] = useState(false);
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  console.log(registration, ' reg');

  if (registration)
    return (
      <RegistrationForm onIdSubmit={setId} onRegistration={setRegistration} />
    );

  return id ? (
    dashboard
  ) : (
    <Login onIdSubmit={setId} onRegistration={setRegistration} />
  );
}

export default App;
