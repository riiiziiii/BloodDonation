import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markAsRead = async (notificationId) => {
  const response = await axios.patch(`${API_URL}/notification/${notificationId}/read`, {}, {
    withCredentials: true
  });
  return response.data;
};