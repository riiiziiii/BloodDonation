import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getNotifications = async () => {
  const response = await axios.get(`${API_URL}/notification`, {
    withCredentials: true
  });
  return response.data;
};

export const markAsRead = async (notificationId) => {
  const response = await axios.patch(`${API_URL}/notification/${notificationId}/read`, {}, {
    withCredentials: true
  });
  return response.data;
};