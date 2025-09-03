import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Bus Reservation</Link>
      <div className="ms-auto">
        {location.pathname !== "/" && (
          <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)}>Back</button>
        )}

        {!token && location.pathname === "/" && (
          <>
            <Link className="btn btn-outline-light mx-2" to="/login">Login</Link>
            <Link className="btn btn-outline-light mx-2" to="/register">Register</Link>
          </>
        )}

        {token && (
          <button className="btn btn-danger mx-2" onClick={logout}>Logout</button>
        )}

        {token && role === "USER" && (
          <Link className="btn btn-outline-light mx-2" to="/customer/search">Search Trips</Link>
        )}
        {token && role === "ADMIN" && (
          <Link className="btn btn-outline-light mx-2" to="/admin/buses">Admin</Link>
        )}
      </div>
    </nav>
  );
}
