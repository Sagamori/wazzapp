import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import RegistrationForm from "./Registration";
import useLocalStorage from "../hooks/localStorage";
import { decryptText } from "../contexts/crypto";

const App = () => {
  const [redirect, setRedirect] = useState("");
  const [id, setId] = useLocalStorage("id");
  const [loginId, setLoginId] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [number, setOnNumber] = useState("");

  console.log({ phoneNumber });
  console.log({ id });

  if (id && !loginId) {
    console.log(id);
    const { decryptedText: loginId } = decryptText(id);
    console.log(loginId, id);
    return setLoginId(loginId);
  }

  const dashboard = (
    <SocketProvider id={loginId} phone_number={phoneNumber}>
      <ContactsProvider id={loginId} phone_number={phoneNumber}>
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
    return (
      <RegistrationForm
        onRedirection={setRedirect}
        onId={setId}
        onNumber={setPhoneNumber}
      />
    );
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
};

export default App;
