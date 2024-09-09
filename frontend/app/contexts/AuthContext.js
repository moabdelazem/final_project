// app/contexts/AuthContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context to store the authentication state
const AuthContext = createContext();

// Create a provider to manage the authentication state
export function AuthProvider({ children }) {
  // Initialize the authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is already authenticated
  useEffect(() => {
    // Get the token from the local storage
    const token = localStorage.getItem("token");
    // If the token exists, the user is authenticated
    if (token) {
      // Update the authentication state
      setIsAuthenticated(true);
    }
  }, []);

  // Define the login and logout functions
  const login = (token, id) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Define the logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to access the authentication state
export function useAuth() {
  // Get the authentication context
  const context = useContext(AuthContext);
  // If the context is undefined, the hook is used outside of the provider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
