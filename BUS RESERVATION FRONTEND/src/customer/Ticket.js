import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { QRCodeCanvas } from "qrcode.react";

export default function Ticket() {
  const { id } = useParams();
  const location = useLocation();
  const componentRef = useRef();

  const [ticket, setTicket] = useState(location.state?.ticket || null);
  const [loading, setLoading] = useState(!location.state?.ticket);
  const [error, setError] = useState("");

  const bookingId = id || location.state?.ticket?.bookingId;

  useEffect(() => {
    if (ticket) return;

    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must login to view the ticket.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:8080/api/v1/bookings/${bookingId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTicket(res.data);
      } catch (err) {
        console.error("Error fetching ticket:", err);
        setError("Could not fetch ticket. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [bookingId, ticket]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Ticket_${ticket?.bookingId || ticket?.id}`,
  });

  if (loading) return <p className="text-center mt-3">Loading ticket...</p>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;
  if (!ticket) return <p className="text-center mt-3">No ticket data found.</p>;

  // Booking info
  const bookingDate = ticket.bookingDate || "2025-09-05";
  const bookingIdDisplay = ticket.bookingId || ticket.id || "12";

  // Trip info
  const trip = ticket.trip || {};
  const busName = trip.busName || "SUPERFAST LUXURY";
  const source = trip.source || "Hyderabad";
  const destination = trip.destination || "Bangalore";

  // Passengers
  const passengers =
    ticket.passengers || [
      { name: "Sahithi", age: "22", sex: "Female", seat_number: "20" },
    ];

  // Payment info
  const payment = ticket.payment || {};
  const paymentMethod = payment.mode || "UPI";
  const totalAmount = payment.amount || 500;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* Ticket Card */}
      <div
        ref={componentRef}
        style={{
          width: "800px",
          background: "linear-gradient(135deg, #ffffff, #f9fafb)",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          overflow: "hidden",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
            color: "white",
            padding: "20px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>🚌 Bus Ticket</h2>
          <span style={{ fontWeight: "600", fontSize: "18px" }}>
            ID: {bookingIdDisplay}
          </span>
        </div>

        {/* Ticket Body */}
        <div style={{ padding: "30px" }}>
          {/* Trip Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px dashed #d1d5db",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h4 style={{ color: "#374151", marginBottom: "5px" }}>From</h4>
              <p style={{ fontSize: "20px", fontWeight: "600" }}>{source}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "18px", fontWeight: "500", margin: "0" }}>
                {busName}
              </p>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>
                Luxury Coach
              </p>
            </div>
            <div>
              <h4 style={{ color: "#374151", marginBottom: "5px" }}>To</h4>
              <p style={{ fontSize: "20px", fontWeight: "600" }}>
                {destination}
              </p>
            </div>
          </div>

          {/* Booking Info */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ marginBottom: "8px", color: "#1e3a8a" }}>
              📅 Booking Info
            </h5>
            <p>
              <strong>Date:</strong> {new Date(bookingDate).toLocaleString()}
            </p>
          </div>

          {/* Passenger Info */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ marginBottom: "8px", color: "#1e3a8a" }}>
              👥 Passengers
            </h5>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #e5e7eb",
              }}
            >
              <thead style={{ background: "#f3f4f6" }}>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Age</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Seat No</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((p, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}>{p.name}</td>
                    <td style={tdStyle}>{p.age}</td>
                    <td style={tdStyle}>{p.sex}</td>
                    <td style={tdStyle}>{p.seat_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Info */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ marginBottom: "8px", color: "#1e3a8a" }}>Payment</h5>
            <p>
              <strong>Method:</strong> {paymentMethod}
            </p>
            <p>
              <strong>Total Paid:</strong> ₹{totalAmount}
            </p>
          </div>

          {/* QR Code Section */}
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "2px dashed #d1d5db",
            }}
          >
            <QRCodeCanvas value={`BookingID:${bookingIdDisplay}`} size={128} />
            <p style={{ marginTop: "10px", color: "#6b7280" }}>
              Scan for booking verification
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handlePrint}
        style={{
          marginTop: "25px",
          background: "linear-gradient(90deg, #2563eb, #3b82f6)",
          border: "none",
          padding: "14px 36px",
          borderRadius: "12px",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          transition: "0.3s",
        }}
        onMouseOver={(e) =>
          (e.target.style.background =
            "linear-gradient(90deg, #1d4ed8, #2563eb)")
        }
        onMouseOut={(e) =>
          (e.target.style.background =
            "linear-gradient(90deg, #2563eb, #3b82f6)")
        }
      >
        ⬇️ Download Ticket
      </button>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  border: "1px solid #e5e7eb",
  textAlign: "center",
  fontWeight: "600",
  color: "#374151",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #e5e7eb",
  textAlign: "center",
  fontSize: "14px",
};
