import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// Customer
import SearchTrips from "./customer/SearchTrips";
import SeatSelection from "./customer/SeatSelection";
import PassengerDetails from "./customer/PassengerDetails";
import Payment from "./customer/Payment";
import Ticket from "./customer/Ticket";
import Booking from "./customer/Booking";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import ManageBuses from "./admin/ManageBuses";
import ManageTrips from "./admin/ManageTrips";
import ManageRoutes from "./admin/ManageRoutes";
import Reports from "./admin/Reports";

// Common
// import Navbar from "./components/Navbar"; // ❌ Removed this import
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/buses"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ManageBuses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/routes"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ManageRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trips"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ManageTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Customer */}
        <Route
          path="/customer/search"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <SearchTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/seats/:tripId"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <SeatSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/passengers"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <PassengerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/payment"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/ticket/:id"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Ticket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Booking />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
