import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/Api";

function SeatSelection() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrice, setSeatPrice] = useState(500);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await api.get(`/trips/${tripId}/seats`);
        setBookedSeats(res.data || []);
      } catch (err) {
        console.error("Error fetching booked seats:", err);
      }
    };

    const fetchTripDetails = async () => {
      try {
        const res = await api.get(`/trips/${tripId}`);
        if (res.data?.seatPrice) setSeatPrice(res.data.seatPrice);
      } catch {
        console.warn("Using default seat price ₹500");
      }
    };

    fetchSeats();
    fetchTripDetails();
  }, [tripId]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const proceedToPassengerDetails = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const totalAmount = selectedSeats.length * seatPrice;

    navigate("/customer/passengers", {
      state: { tripId: parseInt(tripId), selectedSeats, totalAmount },
    });
  };

  const renderSeats = () => {
    const rows = [];
    let seatNumber = 1;

    // Driver + Conductor Row
    rows.push(
      <div
        key="driverRow"
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
          width: "250px",
        }}
      >
        <div
          style={{
            width: "55px",
            height: "55px",
            backgroundColor: "#333",
            borderRadius: "50%",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
          }}
        >
          D
        </div>
        <div
          style={{
            width: "55px",
            height: "55px",
            backgroundColor: "#666",
            borderRadius: "12px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          }}
        >
          C
        </div>
      </div>
    );

    // Passenger Seats
    for (let row = 0; row < 10; row++) {
      const leftSeats = [];
      const rightSeats = [];

      for (let i = 0; i < 2; i++) {
        const seat = seatNumber++;
        const isBooked = bookedSeats.includes(seat);
        const isSelected = selectedSeats.includes(seat);

        leftSeats.push(
          <div
            key={seat}
            onClick={() => handleSeatClick(seat)}
            style={{
              width: "55px",
              height: "55px",
              margin: "6px",
              borderRadius: "12px",
              cursor: isBooked ? "not-allowed" : "pointer",
              background: isBooked
                ? "linear-gradient(145deg, #ff5252, #d32f2f)" // red bright
                : isSelected
                ? "linear-gradient(145deg, #43a047, #2e7d32)" // green bright
                : "linear-gradient(145deg, #42a5f5, #1e88e5)", // blue bright
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isBooked
                ? "inset 2px 2px 6px rgba(0,0,0,0.4)"
                : "2px 2px 6px rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isBooked) e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {seat}
          </div>
        );
      }

      for (let i = 0; i < 2; i++) {
        const seat = seatNumber++;
        const isBooked = bookedSeats.includes(seat);
        const isSelected = selectedSeats.includes(seat);

        rightSeats.push(
          <div
            key={seat}
            onClick={() => handleSeatClick(seat)}
            style={{
              width: "55px",
              height: "55px",
              margin: "6px",
              borderRadius: "12px",
              cursor: isBooked ? "not-allowed" : "pointer",
              background: isBooked
                ? "linear-gradient(145deg, #ff5252, #d32f2f)"
                : isSelected
                ? "linear-gradient(145deg, #43a047, #2e7d32)"
                : "linear-gradient(145deg, #42a5f5, #1e88e5)",
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isBooked
                ? "inset 2px 2px 6px rgba(0,0,0,0.4)"
                : "2px 2px 6px rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isBooked) e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {seat}
          </div>
        );
      }

      rows.push(
        <div
          key={row}
          style={{
            display: "flex",
            marginBottom: "12px",
            justifyContent: "center",
          }}
        >
          {leftSeats}
          <div style={{ width: "80px" }}></div>
          {rightSeats}
        </div>
      );
    }

    return rows;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 30%, #fbc2eb 60%, #a6c1ee 100%)", // 🌈 bright gradient
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          maxWidth: "850px",
          width: "100%",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#1e88e5" }}>
          🚌 Seat Selection for Trip {tripId}
        </h3>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>{renderSeats()}</div>
        </div>

        {selectedSeats.length > 0 && (
          <div
            className="mt-4 p-3"
            style={{
              background: "#f1f8e9",
              borderRadius: "12px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            }}
          >
            <p>
              <strong>Selected Seats:</strong> {selectedSeats.join(", ")}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{selectedSeats.length * seatPrice}
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            className="btn btn-lg mt-4"
            style={{
              background: selectedSeats.length === 0 ? "#ccc" : "#ff4081",
              color: "white",
              border: "none",
              borderRadius: "30px",
              padding: "12px 25px",
              fontWeight: "bold",
              cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
              transition: "0.3s",
            }}
            onClick={proceedToPassengerDetails}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Passenger Details ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
