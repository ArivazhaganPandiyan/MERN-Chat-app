// src/pages/Chat.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/ChatBox";
import "./chat.css";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBack = () => setSelectedUser(null);

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      {(!isMobile || !selectedUser) && (
        <Sidebar
          onSelectUser={setSelectedUser}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      {(!isMobile || selectedUser) && (
        <Chatbox
          selectedUser={selectedUser}
          onBack={isMobile ? handleBack : null}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Chat;
