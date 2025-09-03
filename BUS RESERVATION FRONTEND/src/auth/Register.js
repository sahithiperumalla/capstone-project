import React, { useState } from "react";
import API from "../api/Api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [profilePic, setProfilePic] = useState(null); // file state
  const [preview, setPreview] = useState(null); // preview URL
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (profilePic) formData.append("profilePic", profilePic);

      await API.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  // handle file change + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(120deg, #f6d365, #fda085)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "950px",
          background: "#fff",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        {/* Left Side Banner */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "40px",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "15px" }}>Welcome 🎉</h1>
          <p style={{ textAlign: "center", fontSize: "1.1rem" }}>
            Join us today and explore our platform with ease.
          </p>
        </div>

        {/* Right Side Form */}
        <div style={{ flex: 1.2, padding: "40px" }}>
          <h2 style={{ marginBottom: "25px", color: "#333" }}>Create Account</h2>
          <form onSubmit={handleRegister}>
            {/* Profile Picture Upload */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <label htmlFor="profilePic" style={{ cursor: "pointer" }}>
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #667eea",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #ccc",
                      margin: "auto",
                    }}
                  >
                    📷
                  </div>
                )}
              </label>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "8px" }}>
                Upload Profile Picture
              </p>
            </div>

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
            />
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.transform = "translateY(-3px)")
              }
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Register
            </button>
          </form>

          <p style={{ marginTop: "20px", fontSize: "0.9rem", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#667eea", fontWeight: "bold" }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
