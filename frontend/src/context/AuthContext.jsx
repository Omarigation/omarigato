import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, googleLogin, getCurrentUser, logout } from '../services/auth';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in on app startup
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Clear invalid token
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login user
  const loginUser = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await login(username, password);
      
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        
        // Get user details
        const userData = await getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
        navigate('/');
        
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await register(userData);
      
      if (data) {
        // Auto login after registration
        return await loginUser(userData.username, userData.password);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const googleLoginUser = async (token) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await googleLogin(token);
      
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        
        // Get user details
        const userData = await getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
        navigate('/');
        
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Google login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        loginUser,
        registerUser,
        googleLoginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};