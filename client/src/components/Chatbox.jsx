import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import socket from "../socket";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import "./chatbox.css";

const ChatBox = ({ selectedUser, darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const token = localStorage.getItem("token");
  const currentUserId = JSON.parse(atob(token.split(".")[1])).id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        !e.target.closest(".emoji-toggle")
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `https://mern-chat-app-a1xe.onrender.com/api/messages/${selectedUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data.messages);
        scrollToBottom();
        setShowEmoji(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser) return;

    socket.emit("addUser", currentUserId);

    const handleIncomingMessage = (msg) => {
      if (msg.sender === selectedUser._id) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    };

    socket.on("getMessage", handleIncomingMessage);
    return () => socket.off("getMessage", handleIncomingMessage);
  }, [selectedUser, currentUserId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const newMsg = {
      receiver: selectedUser._id,
      text,
    };

    try {
      const res = await axios.post(
        "https://mern-chat-app-a1xe.onrender.com/api/messages",
        newMsg,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const savedMsg = res.data.data;

      socket.emit("sendMessage", {
        sender: currentUserId,
        receiver: selectedUser._id,
        text: savedMsg.text,
        _id: savedMsg._id,
        createdAt: savedMsg.createdAt,
      });

      setMessages((prev) => [...prev, savedMsg]);
      setText("");
      setShowEmoji(false);
      scrollToBottom();
    } catch (err) {
      console.error("Message not sent", err);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className={`chatbox ${darkMode ? "dark" : ""}`}>
      <div className="chatbox-header">
        Chat with <strong>{selectedUser?.username || "..."}</strong>
      </div>

      <div className="chatbox-body">
        {messages.map((msg, idx) => {
          const isSender = msg.sender === currentUserId;
          return (
            <div
              key={idx}
              className={`message-row ${isSender ? "sent" : "received"}`}
            >
              <div className="message-content">
                <div className="message-bubble">
                  {msg.text}
                  <div className="timestamp">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbox-input">
        <button
          className="emoji-toggle"
          onClick={() => setShowEmoji((prev) => !prev)}
        >
          <BsEmojiSmile size={20} />
        </button>

        {showEmoji && (
          <div ref={emojiPickerRef} className="emoji-picker-wrapper">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;