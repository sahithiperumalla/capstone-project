import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="welcome-message">🚍 BusReservation</div>
        <div className="nav-buttons">
          <button className="nav-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="nav-btn register" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>

      {/* Background */}
      <div className="background"></div>
      <div className="overlay"></div>

      {/* Center content */}
      <div className="content">
        <h1 className="title">HAVE A SAFE JOURNEY WITH US</h1>
        <p className="subtitle">
          Book your tickets easily, travel comfortably, and enjoy every ride 🚎
        </p>
      </div>
    </div>
  );
}

export default Home;
