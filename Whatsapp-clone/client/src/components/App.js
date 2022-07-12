import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import RegistrationForm from "./Registration";
import useLocalStorage from "../hooks/localStorage";

const decryptText = (encryptedText) => {
<<<<<<< HEAD
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    process.env.REACT_APP_SECRET_KEY
  );
=======
  console.log(process.env.REACT_APP_SECRET_KEY);
  const bytes = CryptoJS.AES.decrypt(encryptedText, "process.env.SECRET_KEY");
>>>>>>> 2c9c33da0eb8d381931de5f63738442d110d3d5c
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(decryptedText, ' decryptedText');
  return { decryptedText };
};

function App() {
<<<<<<< HEAD
  const [redirect, setRedirect] = useState('');
  const [id, setId] = useLocalStorage('id');
=======
  const [redirect, setRedirect] = useState("");
  const [id, setId] = useLocalStorage("id");
>>>>>>> 2c9c33da0eb8d381931de5f63738442d110d3d5c
  const [loginId, setLoginId] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  console.log({ phoneNumber });

  if (id && !loginId) {
    const { decryptedText: loginId } = decryptText(id);
    setLoginId(loginId);
  }

  const dashboard = (
    <SocketProvider id={loginId} phone_number={phoneNumber}>
      <ContactsProvider id={loginId}>
        <ConversationProvider id={loginId} phone_number={phoneNumber}>
          <Dashboard />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  if (redirect === "login") {
    return (
      <Login
        onIdSubmit={setId}
        onNumberSubmit={setPhoneNumber}
        onRedirection={setRedirect}
      />
    );
  }

  if (redirect === "registration") {
    return <RegistrationForm onRedirection={setRedirect} onId={setId}/>;
  }

  if (redirect === "dashboard") {
    return dashboard;
  }
  return loginId ? (
    dashboard
  ) : (
    <Login
      onIdSubmit={setId}
      onNumberSubmit={setPhoneNumber}
      onRedirection={setRedirect}
    />
  );
}

export default App;
