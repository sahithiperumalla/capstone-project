import React, { useState } from "react";
import axios from "axios";

export default function Booking() {
  const [userId, setUserId] = useState("");
  const [tripId, setTripId] = useState("");
  const [amount, setAmount] = useState("");
  const [seats, setSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState("");

  const handleBookTrip = async () => {
    try {
      const body = {
        userId: userId,
        tripId: tripId,
        amount: amount,
        seats: seats,
        passengers: passengers
      };

      const res = await axios.post("http://localhost:8080/api/v1/bookings", body);
      setBookingResult(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      setBookingResult(null);
    }
  };

  return (
    <div>
      <h1>Book a Trip</h1>
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="text" placeholder="Trip ID" value={tripId} onChange={(e) => setTripId(e.target.value)} />
      <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <button onClick={handleBookTrip}>Book Trip</button>

      {bookingResult && (
        <div>
          <h2>Booking Successful!</h2>
          <pre>{JSON.stringify(bookingResult, null, 2)}</pre>
        </div>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
