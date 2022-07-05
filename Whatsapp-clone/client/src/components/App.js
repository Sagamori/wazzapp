import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import useLocalStorage from '../hooks/localStorage';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationProvider } from '../contexts/ConversationProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import RegistrationForm from './Registration';

function App() {
  const [test, setTest] = useState('login');
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

  // console.log(registration, ' reg');
  console.log(test);

  if (test === 'login') {
    return <Login onIdSubmit={setId} onRegistration={setTest} />;
  }
  if (test === 'registration') {
    return <RegistrationForm onIdSubmit={setId} onRegistration={setTest} />;
  } else {
    return dashboard;
  }
}

export default App;
