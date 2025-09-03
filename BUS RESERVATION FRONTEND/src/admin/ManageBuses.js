import React, { useState, useEffect } from "react";
import api from "../api/Api";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

function ManageBuses() {
  const [buses, setBuses] = useState([]);
  const [busNumber, setBusNumber] = useState("");
  const [type, setType] = useState("AC");
  const [totalSeats, setTotalSeats] = useState(40);
  const [editingId, setEditingId] = useState(null);

  const fetchBuses = async () => {
    try {
      const res = await api.get("/admin/buses");
      setBuses(res.data);
    } catch (err) {
      console.error("Failed to fetch buses:", err.response || err);
    }
  };

  const saveBus = async () => {
    try {
      if (editingId) {
        await api.put(`/admin/buses/${editingId}`, {
          busNumber,
          type,
          totalSeats,
        });
        setEditingId(null);
      } else {
        await api.post("/admin/buses", { busNumber, type, totalSeats });
      }
      fetchBuses();
      setBusNumber("");
      setType("AC");
      setTotalSeats(40);
    } catch (err) {
      console.error("Failed to save bus:", err.response || err);
      alert("Failed to save bus.");
    }
  };

  const editBus = (bus) => {
    setEditingId(bus.id);
    setBusNumber(bus.busNumber);
    setType(bus.type);
    setTotalSeats(bus.totalSeats);
  };

  const deleteBus = async (id) => {
    try {
      await api.delete(`/admin/buses/${id}`);
      fetchBuses();
    } catch (err) {
      console.error("Delete failed:", err.response || err);
      alert("Failed to delete bus.");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className="manage-buses">
      {/* Inline CSS */}
      <style>{`
        .manage-buses {
          min-height: 100vh;
          padding: 30px;
          background: linear-gradient(135deg, #74ebd5, #acb6e5);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .form-card {
          background: #fff;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
        }
        .form-card h3 {
          margin-bottom: 20px;
          color: #333;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 5px;
          color: #444;
        }
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccd;
          border-radius: 8px;
          font-size: 1rem;
        }
        .btn-save {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2563eb;
          color: white;
          padding: 10px 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: 0.3s;
        }
        .btn-save:hover {
          background: #1d4ed8;
        }
        .table-card {
          background: #fff;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
        }
        .table-card h3 {
          margin-bottom: 20px;
          color: #333;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        thead {
          background: #2563eb;
          color: #fff;
        }
        th, td {
          padding: 12px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }
        tr:hover {
          background: #f9fafb;
        }
        .no-data {
          text-align: center;
          padding: 20px;
          color: #666;
        }
        .btn-edit {
          background: #facc15;
          color: #333;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          margin-right: 8px;
          cursor: pointer;
          transition: 0.3s;
          font-weight: 500;
        }
        .btn-edit:hover {
          background: #eab308;
        }
        .btn-delete {
          background: #ef4444;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
          font-weight: 500;
        }
        .btn-delete:hover {
          background: #dc2626;
        }
      `}</style>

      {/* Form Section */}
      <div className="form-card">
        <h3>{editingId ? "✏️ Edit Bus" : "🚌 Add Bus"}</h3>
        <div className="form-group">
          <label>Bus Number</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            placeholder="Enter bus number"
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="AC / Non-AC"
          />
        </div>
        <div className="form-group">
          <label>Total Seats</label>
          <input
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            placeholder="Enter total seats"
          />
        </div>
        <button className="btn-save" onClick={saveBus}>
          {editingId ? "Update Bus" : "Add Bus"} <FaPlus />
        </button>
      </div>

      {/* Bus Table Section */}
      <div className="table-card">
        <h3>🚍 Bus List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Bus Number</th>
              <th>Type</th>
              <th>Total Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.id}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.type}</td>
                <td>{bus.totalSeats}</td>
                <td>
                  <button className="btn-edit" onClick={() => editBus(bus)}>
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteBus(bus.id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {buses.length === 0 && (
              <tr>
                <td colSpan="5" className="no-data">
                  No buses found. Add one above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageBuses;
