// src/components/ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import socket from "../socket";

const ChatBox = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");
  const currentUserId = JSON.parse(atob(token.split(".")[1])).id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(res.data.messages);
        scrollToBottom();
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
        "http://localhost:5000/api/messages",
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
      scrollToBottom();
    } catch (err) {
      console.error("Message not sent", err);
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Chat with {selectedUser?.username || "..."}
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          mb: 2,
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          border: "1px solid #ddd",
        }}
      >
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              textAlign: msg.sender === currentUserId ? "right" : "left",
              mb: 1.5,
            }}
          >
            <Paper
              sx={{
                display: "inline-block",
                p: 1.2,
                px: 2,
                bgcolor: msg.sender === currentUserId ? "#d2f8d2" : "#ffffff",
                borderRadius: 2,
                maxWidth: "75%",
              }}
              elevation={2}
            >
              <Typography variant="body1">{msg.text}</Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "#888", mt: 0.5 }}
              >
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ChatBox;
