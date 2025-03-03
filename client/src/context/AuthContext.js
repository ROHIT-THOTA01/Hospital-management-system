import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { STORAGE_KEYS } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      const { token, user: userData } = response.data;
      
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      const { token, user: newUser } = response.data;
      
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser));
      
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      setUser(null);
    }
  };

  const updateProfile = async (data) => {
    try {
      setError(null);
      const response = await authAPI.updateProfile(data);
      const updatedUser = response.data;
      
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 