import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    withCredentials: true
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`, 
      { email, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data; // This will now include user.role
  } catch (error) {
    console.error('Login error:', error.response?.data);
    throw error;
  }
};

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, {
    withCredentials: true
  });
  return response.data;
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};