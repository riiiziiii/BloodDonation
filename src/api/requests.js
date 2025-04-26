

const API_URL = 'http://localhost:3000';

export const createRequest = async (requestData) => {
  const response = await fetch(`${API_URL}/request`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    }
  )
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }
  const data = await response.json();
  return data;
};

const handleResponse = async (response) => {
  const text = await response.text();
  try {
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  } catch (e) {
    throw new Error(text || 'Request failed');
  }
};

export const getRequests = async () => {
  const response = await fetch(`${API_URL}/request/getRequest`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return handleResponse(response);
};

export const getAllMatchingRequests = async () => {
  const response = await fetch(`${API_URL}/request`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  const data = await response.json();
  if (response.ok) {
    
    return data;
  }
  return data.message
 
};


export const acceptRequest = async (requestId) => {
  try {
    const response = await fetch(`${API_URL}/request/${requestId}/accept`,
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
  } catch (error) {
    console.error('Error accepting request:', error.response?.data);
    throw error;
  }
};

export const getSingleRequest = async (requestId) => {
  const response = await fetch(`${API_URL}/request/${requestId}`,
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