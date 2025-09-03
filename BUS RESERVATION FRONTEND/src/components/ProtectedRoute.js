import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the role is not allowed, redirect to home (or another page)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the children (the protected route component)
  return children;
}

export default ProtectedRoute;
