
const API_URL = 'http://localhost:3000';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  )
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  const data = await response.json();
  return data;
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      }
    )

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(data.message || 'Login failed. Please check your credentials.');
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Login error:', error.response?.data);
    throw error;
  }
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`,
   {
    method:"POST",
    credentials:"include",
    headers: {
      "Content-Type": "application/json"
    }
   });
   if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Logout failed');
  }

  return response.status === 204 ? {} : await response.json();
};

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method:"GET",
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Not authenticated');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication check failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};