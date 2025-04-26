import { useState, useEffect } from 'react';
import { getRequests, getAllMatchingRequests } from '../api/requests';
import useAuth from './useAuth';

export const useRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data= await getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError(error.message);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  return {
    requests,
    isLoading,
    error,
    refreshRequests: fetchRequests
  };
};