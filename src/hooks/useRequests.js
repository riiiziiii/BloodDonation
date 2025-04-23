import { useState, useEffect } from 'react';
import { getRequests, getAllMatchingRequests } from '../api/requests';
import useAuth from './useAuth';

export const useRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const data = user.role === 'Donor' 
          ? await getAllMatchingRequests() 
          : await getRequests();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const refreshRequests = async () => {
    try {
      const data = user.role === 'Donor' 
        ? await getAllMatchingRequests() 
        : await getRequests();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return { requests, isLoading, error, refreshRequests };
};