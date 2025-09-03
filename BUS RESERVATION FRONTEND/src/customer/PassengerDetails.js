import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PassengerDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripId, selectedSeats, totalAmount } = location.state || {};

  const [passengers, setPassengers] = useState(
    selectedSeats?.map((seat) => ({
      seatNumber: seat,
      name: "",
      age: "",
      sex: "",
    })) || []
  );
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleNext = () => {
    for (let p of passengers) {
      if (!p.name || !p.age || !p.sex) {
        setError("⚠️ Please fill all passenger details");
        return;
      }
    }
    navigate("/customer/payment", {
      state: { tripId, selectedSeats, totalAmount, passengers },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #06beb6, #48b1bf)",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontWeight: "700",
            color: "#333",
          }}
        >
          🧾 Passenger Details
        </h2>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {error}
          </div>
        )}

        {passengers.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h5 style={{ marginBottom: "15px", color: "#2563eb" }}>
              Seat {p.seatNumber}
            </h5>

            <input
              type="text"
              placeholder="Full Name"
              value={p.name}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "12px",
              }}
            />

            <input
              type="number"
              placeholder="Age"
              value={p.age}
              onChange={(e) => handleChange(idx, "age", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "12px",
              }}
            />

            <select
              value={p.sex}
              onChange={(e) => handleChange(idx, "sex", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "5px",
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male </option>
              <option value="Female">Female </option>
              <option value="Other">Other </option>
            </select>
          </div>
        ))}

        <button
          onClick={handleNext}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            background: "linear-gradient(90deg, #3b82f6, #2563eb)",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(90deg, #1e40af, #1d4ed8)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(90deg, #3b82f6, #2563eb)")
          }
        >
          Proceed to Payment 
        </button>
      </div>
    </div>
  );
}
