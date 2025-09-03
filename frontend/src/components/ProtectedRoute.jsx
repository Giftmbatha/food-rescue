import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

export default function ProtectedRoute({ children }) {
  const auth = isAuthenticated();
  
  return auth ? children : <Navigate to="/login" replace />;
}