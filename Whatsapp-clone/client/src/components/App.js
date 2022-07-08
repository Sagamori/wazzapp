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
  const [number, setNumber] = useState('');
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider id={id}>
        <ConversationProvider id={id} phone_number={number}>
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
  return id ? (
    dashboard
  ) : (
    <Login
      onNumSubmit={setNumber}
      onIdSubmit={setId}
      onRedirection={setRedirect}
    />
  );
}

export default App;
