import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('spree_api_key') !== null; // Check if the user is authenticated

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;