import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import Login from './Login';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationProvider } from '../contexts/ConversationProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import RegistrationForm from './Registration';
import useLocalStorage from '../hooks/localStorage';
import { decryptText } from '../contexts/crypto';

const App = () => {
  const [redirect, setRedirect] = useState('');
  const [lc_id, set_lc_Id] = useLocalStorage('id');
  const [lc_phoneNumber, set_lc_phone_number] = useLocalStorage('phone-number');
  const [loginId, setLoginId] = useState();
  const [phone_number, setPhoneNumber] = useState();

  if (lc_id && !loginId) {
    const { decryptedText: loginId } = decryptText(lc_id);
    const { decryptedText: number } = decryptText(lc_phoneNumber);
    setPhoneNumber(number);
    return setLoginId(loginId);
  }

  const dashboard = (
    <SocketProvider id={loginId} phone_number={phone_number}>
      <ContactsProvider id={loginId} phone_number={phone_number}>
        <ConversationProvider id={loginId} phone_number={phone_number}>
          <Dashboard />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  if (redirect === 'login') {
    return (
      <Login
        onIdSubmit={set_lc_Id}
        onNumberSubmit={setPhoneNumber}
        onRedirection={setRedirect}
      />
    );
  }

  if (redirect === 'registration') {
    return (
      <RegistrationForm
        onRedirection={setRedirect}
        onId={set_lc_Id}
        onNumber={set_lc_phone_number}
      />
    );
  }

  if (redirect === 'dashboard') {
    return dashboard;
  }

  return loginId ? (
    dashboard
  ) : (
    <Login
      onIdSubmit={set_lc_Id}
      onNumberSubmit={set_lc_phone_number}
      onRedirection={setRedirect}
    />
  );
};

export default App;
