// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import SidebarTopButtons from "./SidebarTopButtons";

const Sidebar = ({ onSelectUser, darkMode, setDarkMode }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://mern-chat-app-a1xe.onrender.com/api/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const otherUsers = res.data.users.filter(
          (u) => u._id !== loggedInUserId
        );
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

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();

const handleLogout = () => {
  // Clear localStorage or auth cookies if needed
  localStorage.removeItem("token"); // if you're storing JWT
  navigate("/login");
};

  return (
    <div className={`sidebar ${darkMode ? "dark" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Friends</h2>
        
        <SidebarTopButtons darkMode={darkMode} setDarkMode={setDarkMode} />


      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search a friend by name ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : filteredUsers.length === 0 ? (
        <div className="empty">No users found</div>
      ) : (
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className="user-item"
              onClick={() => onSelectUser(user)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
