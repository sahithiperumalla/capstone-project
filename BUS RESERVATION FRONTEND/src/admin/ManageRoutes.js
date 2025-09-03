import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api";

function ManageRoutes() {
  const [routes, setRoutes] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // 🎨 Inline CSS styles
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "auto",
      padding: "20px",
      background: "#f9fbfd",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    backBtn: {
      background: "#6c757d",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      marginBottom: "20px",
      cursor: "pointer",
    },
    formCard: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "25px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    },
    formControl: {
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #ced4da",
      padding: "10px",
      width: "100%",
    },
    btnGroup: {
      marginTop: "10px",
    },
    routesList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    routeCard: {
      background: "#ffffff",
      borderRadius: "10px",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
    },
    btn: {
      borderRadius: "6px",
      padding: "6px 12px",
      border: "none",
      cursor: "pointer",
      marginRight: "6px",
    },
    btnPrimary: {
      background: "#007bff",
      color: "white",
    },
    btnSecondary: {
      background: "#6c757d",
      color: "white",
    },
    btnWarning: {
      background: "#ffc107",
      color: "black",
    },
    btnDanger: {
      background: "#dc3545",
      color: "white",
    },
  };

  // Fetch all routes
  const fetchRoutes = async () => {
    try {
      const res = await api.get("/admin/routes");
      setRoutes(res.data);
    } catch (err) {
      console.error("Error fetching routes:", err);
      alert("Failed to fetch routes");
    }
  };

  // Save or update route
  const saveRoute = async () => {
    if (!source.trim() || !destination.trim()) {
      alert("Source and Destination cannot be empty");
      return;
    }

    const routeData = { source, destination, distance, duration };

    try {
      if (editingId) {
        await api.put(`/admin/routes/${editingId}`, routeData);
        setEditingId(null);
      } else {
        await api.post("/admin/routes", routeData);
      }
      fetchRoutes();
      resetForm();
    } catch (err) {
      console.error("Error saving route:", err);
      alert("Failed to save route");
    }
  };

  const editRoute = (route) => {
    setEditingId(route.id);
    setSource(route.source);
    setDestination(route.destination);
    setDistance(route.distance);
    setDuration(route.duration);
  };

  const deleteRoute = async (id) => {
    if (!window.confirm("Are you sure you want to delete this route?")) return;

    try {
      await api.delete(`/admin/routes/${id}`);
      fetchRoutes();
    } catch (err) {
      console.error("Error deleting route:", err);
      alert("Failed to delete route");
    }
  };

  const resetForm = () => {
    setSource("");
    setDestination("");
    setDistance(0);
    setDuration("");
    setEditingId(null);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Routes</h2>

      <button style={styles.backBtn} onClick={() => navigate("/admin")}>
        ← Back to Dashboard
      </button>

      <div style={styles.formCard}>
        <h5>{editingId ? "Edit Route" : "Add Route"}</h5>
        <div>
          <input
            style={styles.formControl}
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            style={styles.formControl}
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="number"
            style={styles.formControl}
            placeholder="Distance (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <input
            style={styles.formControl}
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div style={styles.btnGroup}>
          <button
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onClick={saveRoute}
          >
            {editingId ? "Update Route" : "Add Route"}
          </button>
          {editingId && (
            <button
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div style={styles.routesList}>
        {routes.map((route) => (
          <div style={styles.routeCard} key={route.id}>
            <div>
              <strong>
                {route.source} → {route.destination}
              </strong>
              <p>
                {route.distance} km | {route.duration}
              </p>
            </div>
            <div>
              <button
                style={{ ...styles.btn, ...styles.btnWarning }}
                onClick={() => editRoute(route)}
              >
                Edit
              </button>
              <button
                style={{ ...styles.btn, ...styles.btnDanger }}
                onClick={() => deleteRoute(route.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageRoutes;
