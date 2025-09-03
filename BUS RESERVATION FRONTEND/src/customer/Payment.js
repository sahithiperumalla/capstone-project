import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripId, selectedSeats, totalAmount, passengers } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setError("");

    if (!tripId || !selectedSeats?.length) {
      alert("Invalid booking details.");
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }

    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert("Please fill all card details.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const payload = {
        tripId,
        seats: selectedSeats,
        amount: totalAmount,
        passengers,
        paymentMethod,
        ...(paymentMethod === "upi" ? { upiId } : {}),
        ...(paymentMethod === "card" ? { cardNumber, cardExpiry, cardCvv } : {}),
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/customer/payments/checkout",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Payment successful!");
        navigate(`/customer/ticket/${response.data.bookingId}`, {
          state: { ticket: response.data },
        });
      } else {
        setError(response.data.message || "Payment failed.");
      }
    } catch (err) {
      console.error("Payment error:", err.response || err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Secure Payment
        </h2>

        <div
          style={{
            background: "#f3f4f6",
            padding: "12px",
            borderRadius: "10px",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "18px",
          }}
        >
          Total: ₹{totalAmount}
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label" style={{ fontWeight: "600" }}>
            Select Payment Method:
          </label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{
              borderRadius: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>
        </div>

        {paymentMethod === "upi" && (
          <div className="mb-3">
            <label className="form-label">UPI ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "12px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}

        {paymentMethod === "card" && (
          <>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{
                  borderRadius: "10px",
                  padding: "12px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Expiry (MM/YY)</label>
              <input
                type="text"
                className="form-control"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                style={{
                  borderRadius: "10px",
                  padding: "12px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">CVV</label>
              <input
                type="password"
                className="form-control"
                placeholder="CVV"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                style={{
                  borderRadius: "10px",
                  padding: "12px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </>
        )}

        <button
          className="btn btn-success w-100"
          onClick={handlePayment}
          disabled={loading}
          style={{
            padding: "12px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            background: "linear-gradient(90deg, #16a34a, #22c55e)",
            border: "none",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "linear-gradient(90deg, #15803d, #16a34a)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "linear-gradient(90deg, #16a34a, #22c55e)")
          }
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
