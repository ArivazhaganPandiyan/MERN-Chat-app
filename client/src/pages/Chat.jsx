// src/pages/Chat.jsx
import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";


const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onSelectUser={setSelectedUser} />
      <Chatbox selectedUser={selectedUser} />
    </div>
  );
};

export default Chat;
