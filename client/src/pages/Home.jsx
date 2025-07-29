import React from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Quick-Talk</h1>
      <div className="animation-wrapper">
        <div className="person left"></div>
        <FaComments className="chat-icon" />
        <div className="person right"></div>
      </div>

      <h1 className="tagline">Connecting People Through Conversations</h1>

      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>Already Registered? Login</button>
        <button onClick={() => navigate("/register")}>New User? Register</button>
      </div>
    </div>
  );
}

export default Home;
