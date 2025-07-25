// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";

const Sidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const otherUsers = res.data.users.filter((u) => u._id !== loggedInUserId);
        setUsers(otherUsers);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: "#f5f5f5",
        borderRight: "1px solid #ddd",
        height: "100vh",
        p: 2,
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Users
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : users.length === 0 ? (
        <Typography>No users found</Typography>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem disablePadding key={user._id}>
              <ListItemButton onClick={() => onSelectUser(user)}>
                <ListItemText primary={user.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Sidebar;
