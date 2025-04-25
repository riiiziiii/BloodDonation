import { useState, useEffect } from 'react';
import { getRequests, getAllMatchingRequests } from '../api/requests';
import useAuth from './useAuth';

export const useRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const data = user.role === 'Donor' 
        ? await getAllMatchingRequests()
        : await getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
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
    refreshRequests: fetchRequests
  };
};