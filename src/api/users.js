

const API_URL = 'http://localhost:3000';

export const getUserProfile = async () => {
  const response = await fetch(`${API_URL}/user/profile`,
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
};

export const updateProfile = async (userData) => {
  const response = await fetch(`${API_URL}/user/update`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  )
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }
  const data = await response.json();
  return data;
};