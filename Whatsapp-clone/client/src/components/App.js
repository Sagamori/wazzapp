import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import useLocalStorage from '../hooks/localStorage';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationProvider } from '../contexts/ConversationProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import RegistrationForm from './Registration';

function App() {
  const [redirect, setRedirect] = useState('login');
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

  console.log(id, ' id');
  if (redirect === 'login') {
    return <Login onNumSubmit={setId} onRedirection={setRedirect} />;
  }
  if (redirect === 'registration') {
    return <RegistrationForm onNumSubmit={setId} onRedirection={setRedirect} />;
  }
  if (redirect === 'dashboard' && id) {
    return dashboard;
  }
}

export default App;
