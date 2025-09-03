import React, { useState, useEffect } from "react";
import api from "../api/Api";
import { useNavigate } from "react-router-dom";

function ManageTrips() {
  const [trips, setTrips] = useState([]);
  const [busName, setBusName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // 🎨 Inline CSS styles
  const styles = {
    container: {
      maxWidth: "900px",
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
    btn: {
      borderRadius: "6px",
      padding: "8px 14px",
      border: "none",
      cursor: "pointer",
      marginRight: "8px",
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
    tripList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    tripCard: {
      background: "#ffffff",
      borderRadius: "10px",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
    },
  };

  const fetchTrips = async () => {
    try {
      const res = await api.get("/admin/trips");
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveTrip = async () => {
    try {
      const tripData = {
        busName,
        source,
        destination,
        departureTime,
        arrivalTime,
        price: Number(price),
        date,
      };

      if (editingId) {
        await api.put(`/admin/trips/${editingId}`, tripData);
        setEditingId(null);
      } else {
        await api.post("/admin/trips", tripData);
      }

      fetchTrips();
      // Reset form
      setBusName("");
      setSource("");
      setDestination("");
      setDepartureTime("");
      setArrivalTime("");
      setPrice("");
      setDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to save trip");
    }
  };

  const editTrip = (trip) => {
    setEditingId(trip.id);
    setBusName(trip.busName);
    setSource(trip.source);
    setDestination(trip.destination);
    setDepartureTime(trip.departureTime);
    setArrivalTime(trip.arrivalTime);
    setPrice(trip.price);
    setDate(trip.date ? trip.date.slice(0, 10) : "");
  };

  const deleteTrip = async (id) => {
    try {
      await api.delete(`/admin/trips/${id}`);
      fetchTrips();
    } catch (err) {
      console.error(err);
      alert("Failed to delete trip");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Trips</h2>

      <button style={styles.backBtn} onClick={() => navigate("/admin")}>
        ← Back to Dashboard
      </button>

      <div style={styles.formCard}>
        <h5>{editingId ? "Edit Trip" : "Add Trip"}</h5>

        <input
          style={styles.formControl}
          placeholder="Bus Name"
          value={busName}
          onChange={(e) => setBusName(e.target.value)}
        />
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
          style={styles.formControl}
          placeholder="Departure Time (HH:mm)"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
        />
        <input
          style={styles.formControl}
          placeholder="Arrival Time (HH:mm)"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
        <input
          type="number"
          style={styles.formControl}
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="date"
          style={styles.formControl}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          style={{ ...styles.btn, ...styles.btnPrimary }}
          onClick={saveTrip}
        >
          {editingId ? "Update Trip" : "Add Trip"}
        </button>
        {editingId && (
          <button
            style={{ ...styles.btn, ...styles.btnSecondary }}
            onClick={() => {
              setEditingId(null);
              setBusName("");
              setSource("");
              setDestination("");
              setDepartureTime("");
              setArrivalTime("");
              setPrice("");
              setDate("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div style={styles.tripList}>
        {trips.map((trip) => (
          <div key={trip.id} style={styles.tripCard}>
            <div>
              <strong>{trip.busName}</strong> | {trip.source} →{" "}
              {trip.destination}
              <p>
                🕒 {trip.departureTime} - {trip.arrivalTime} | 💰 ₹{trip.price}{" "}
                | 📅 {trip.date}
              </p>
            </div>
            <div>
              <button
                style={{ ...styles.btn, ...styles.btnWarning }}
                onClick={() => editTrip(trip)}
              >
                Edit
              </button>
              <button
                style={{ ...styles.btn, ...styles.btnDanger }}
                onClick={() => deleteTrip(trip.id)}
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

export default ManageTrips;
