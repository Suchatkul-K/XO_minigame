import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { authUser } = useAuth();

  return authUser ? children : <Navigate to="/" />;
}
