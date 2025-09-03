import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const { state } = useLocation(); // state contains bus info, seats, totalAmount
  const navigate = useNavigate();

  const confirmBooking = () => {
    // Fetch logged-in user info
    const userName = localStorage.getItem("userName") || "Passenger";
    const userEmail = localStorage.getItem("userEmail") || "N/A";

    const ticketData = {
      bookingId: "BK" + Math.floor(Math.random() * 1000000),
      bookingDate: new Date(),
      tripId: state.tripId,
      busName: state.busName,
      from: state.from,
      to: state.to,
      departureTime: state.departureTime,
      arrivalTime: state.arrivalTime,
      passengers: state.seats.map((seat, index) => ({
        name: userName,
        email: userEmail,
        seatNumber: seat,
      })),
      seats: state.seats,
      paymentMethod: "Credit Card", // can be dynamic
      totalAmount: state.totalAmount,
    };

    // Navigate to Ticket page and pass ticket data
    navigate("/customer/ticket", { state: { ticket: ticketData } });
  };

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <p>Trip: {state.busName} ({state.from} → {state.to})</p>
      <p>Seats: {state.seats.join(", ")}</p>
      <p>Total Amount: ₹{state.totalAmount}</p>
      <button className="btn btn-success" onClick={confirmBooking}>
        Confirm & Download Ticket
      </button>
    </div>
  );
}

export default Checkout;
