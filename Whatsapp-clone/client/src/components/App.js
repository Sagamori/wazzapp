import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useLocalStorage from "../hooks/localStorage";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import RegistrationForm from "./Registration";
import VerifyNumber from "./VerifyNumberModal";

function App() {
  const [redirect, setRedirect] = useState("login");
  const [number, setNumber] = useState("");
  console.log(number, "In app line 14");
  console.log(redirect, " redirect in app");
  const dashboard = (
    // <SocketProvider id={id}>
    //   <ContactsProvider>
    //     <ConversationProvider id={id}>
    //       <Dashboard id={id} />
    //     </ConversationProvider>
    //   </ContactsProvider>
    <>dashboard</>
    // </SocketProvider>
  );

  // console.log(id, ' id');
  if (redirect === "login") {
    return <Login onNumSubmit={setNumber} onRedirection={setRedirect} />;
  }
  if (redirect === "registration") {
    return (
      <RegistrationForm
        // onNumSubmit={setId}
        onRedirection={setRedirect}
      />
    );
  }
  if (redirect === "verify_number") {
    return <VerifyNumber />;
  }
  if (
    redirect === "dashboard"
    // && id
  ) {
    return dashboard;
  }
}

export default App;
