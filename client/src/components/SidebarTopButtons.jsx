// src/components/SidebarTopButtons.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarTopButtons.css";

const SidebarTopButtons = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="top-buttons">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`icon-btn ${darkMode ? "dark" : "light"}`}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      <button
        onClick={handleLogout}
        className={`icon-btn ${darkMode ? "dark" : "light"}`}
        title="Logout"
      >
        {/* SVG logout icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
          <path d="M20 3H12v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0‑1.1‑.9‑2‑2‑2z"/>
        </svg>
      </button>
    </div>
  );
};

export default SidebarTopButtons;
