import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for token in localStorage

  // If not authenticated, redirect to login; otherwise, render the element (Dashboard)
  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
