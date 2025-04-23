import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    withCredentials: true
  });
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/users/update`, userData, {
    withCredentials: true
  });
  return response.data;
};