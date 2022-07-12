import React from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversation } from "../contexts/ConversationProvider";
import OpenConversation from "./OpenConversation";
import SideBar from "./SideBar";

const Dashboard = () => {
  const { selectedConversation } = useConversation();
  const { number } = useContacts();

  return (
    <div className="d-flex bg-secondary" style={{ height: "100vh" }}>
      <SideBar number={number} />

      {
        // Trick: operation below --> if selectedConversation is true than OpenConversation
        selectedConversation && <OpenConversation />
      }
    </div>
  );
};

export default Dashboard;