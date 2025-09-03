import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
        role,
      });

      const { token } = res.data;

      if (!token) {
        alert("Invalid login response from server.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role.toUpperCase());

      if (role.toUpperCase() === "ADMIN") navigate("/admin");
      else navigate("/customer/search");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || "Login failed. Check email and password.");
      } else if (err.request) {
        alert("Server did not respond. Try again later.");
      } else {
        alert("An error occurred. Try again.");
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          width: "320px",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🔐 Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "15px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <option value="USER" style={{ color: "#000" }}>USER</option>
          <option value="ADMIN" style={{ color: "#000" }}>ADMIN</option>
        </select>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{
            marginBottom: "15px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{
            marginBottom: "20px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
            color: "#fff",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Login
        </button>
      </form>
    </div>
  );
}
