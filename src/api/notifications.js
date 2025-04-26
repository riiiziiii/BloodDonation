

const API_URL = 'http://localhost:3000';

export const getNotifications = async () => {
  try {
    const response = await fetch(`${API_URL}/notification`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(data.message || 'Login failed. Please check your credentials.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markAsRead = async (notificationId) => {
  const response = await fetch(`${API_URL}/notification/${notificationId}/read`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }
  const data = await response.json();
  return data;
};