// src/components/ThemeToggleButton.jsx
import React from "react";

const ThemeToggleButton = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        padding: "6px 10px",
        borderRadius: "50px",
        border: "none",
        cursor: "pointer",
        backgroundColor: darkMode ? "#444" : "#ddd",
        color: darkMode ? "#fff" : "#333",
        fontSize: "14px",
        margin: "10px auto",
        display: "block",
        width: "fit-content",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
      }}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggleButton;
