import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createRequest = async (requestData) => {
  const response = await axios.post(`${API_URL}/request`, requestData, {
    withCredentials: true
  });
  return response.data;
};

export const getRequests = async () => {
  const response = await axios.get(`${API_URL}/request/getRequest`, {
    withCredentials: true
  });
  return response.data;
};

export const getAllMatchingRequests = async () => {
  const response = await axios.get(`${API_URL}/request`, {
    withCredentials: true
  });
  return response.data;
};

export const acceptRequest = async (requestId) => {
  const response = await axios.patch(`${API_URL}/request/${requestId}/accept`, {}, {
    withCredentials: true
  });
  return response.data;
};

export const getSingleRequest = async (requestId) => {
  const response = await axios.get(`${API_URL}/request/${requestId}`, {
    withCredentials: true
  });
  return response.data;
};