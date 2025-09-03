import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchTrips() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const places = ["Hyderabad", "Bangalore", "Delhi"];

  const search = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/trips/search?source=${encodeURIComponent(
          source
        )}&destination=${encodeURIComponent(
          destination
        )}&date=${encodeURIComponent(date)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTrips(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching trips:", err.response || err);
      if (err.response && err.response.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("An error occurred while fetching trips.");
      }
    }
  };

  const handleSelectSeats = (tripId) => {
    navigate(`/customer/seats/${tripId}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(120deg, #84fab0, #8fd3f4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          width: "600px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
          🚌 Search Trips
        </h3>

        {error && (
          <div
            style={{
              background: "#ffe6e6",
              color: "#d9534f",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}

        {/* Source Dropdown */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "0.3s",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #84fab0")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        >
          <option value="">Select Source</option>
          {places.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>

        {/* Destination Dropdown */}
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "0.3s",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #84fab0")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        >
          <option value="">Select Destination</option>
          {places.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>

        {/* Date Input */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #84fab0")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <button
          onClick={search}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
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
          Search
        </button>

        {/* Trip List */}
        <div style={{ marginTop: "25px" }}>
          {trips.length === 0 ? (
            <div
              style={{
                padding: "15px",
                textAlign: "center",
                background: "#f9f9f9",
                borderRadius: "10px",
                color: "#777",
              }}
            >
              No trips found.
            </div>
          ) : (
            trips.map((trip, index) => (
              <div
                key={trip.id}
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(120deg, #e0c3fc, #8ec5fc)"
                      : "linear-gradient(120deg, #fbc2eb, #a6c1ee)",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  color: "#333",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <strong>{trip.busName}</strong> | {trip.source} →{" "}
                {trip.destination}
                <br />
                <small>
                  Date: {trip.date} | Departure: {trip.departureTime} | Arrival:{" "}
                  {trip.arrivalTime} | Price: ₹{trip.price}
                </small>
                <br />
                <button
                  onClick={() => handleSelectSeats(trip.id)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.background = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = "#007bff")
                  }
                >
                  Select Seats
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchTrips;
