import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          };

          const res = await axios.get(`${API_BASE_URL}/auth/me`, config);

          setUser(res.data.data);
          setLoading(false);
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
          setLoading(false);
          setError('Authentication failed. Please log in again.');
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);

      if (res.data.success) {
        localStorage.setItem('token', res.data.data.token);
        setUser(res.data.data);
        setError(null);
        return true;
      }
    } catch (err) {
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : 'Registration failed. Please try again.'
      );
      return false;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, userData);

      if (res.data.success) {
        localStorage.setItem('token', res.data.data.token);
        setUser(res.data.data);
        setError(null);
        return true;
      }
    } catch (err) {
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : 'Login failed. Please check your credentials.'
      );
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Clear errors
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 