import api from './api';

/**
 * Login a user with username and password
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise} - Promise with login data
 */
export const login = async (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Promise with user data
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

/**
 * Login with Google OAuth token
 * @param {string} token - Google OAuth token
 * @returns {Promise} - Promise with login data
 */
export const googleLogin = async (token) => {
  const response = await api.post('/auth/google', { token });
  return response.data;
};

/**
 * Get current user information
 * @returns {Promise} - Promise with user data
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Update user profile
 * @param {Object} userData - User data to update
 * @returns {Promise} - Promise with updated user data
 */
export const updateUser = async (userData) => {
  const response = await api.put('/users/me', userData);
  return response.data;
};

/**
 * Logout (client-side only since we're using JWT)
 */
export const logout = () => {
  // JWT is stateless, so we just remove the token
  localStorage.removeItem('token');
};