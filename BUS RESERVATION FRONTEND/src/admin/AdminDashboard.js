import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBus, FaRoute, FaCalendarAlt } from "react-icons/fa";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>🛠 Admin Dashboard</h2>
        <p>Manage your buses, routes, and trips efficiently</p>
      </div>

      <div className="dashboard-cards">
        <div className="card-item" onClick={() => navigate("/admin/buses")}>
          <FaBus className="card-icon" />
          <h4>Manage Buses</h4>
          <p>Add, update, or remove buses</p>
        </div>

        <div className="card-item" onClick={() => navigate("/admin/routes")}>
          <FaRoute className="card-icon" />
          <h4>Manage Routes</h4>
          <p>Define and update travel routes</p>
        </div>

        <div className="card-item" onClick={() => navigate("/admin/trips")}>
          <FaCalendarAlt className="card-icon" />
          <h4>Manage Trips</h4>
          <p>Schedule and monitor trips</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
