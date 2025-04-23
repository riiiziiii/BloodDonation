import { useState, useEffect } from 'react';
import { getNotifications } from '../api/notifications';
import useAuth from './useAuth';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.seen).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [user]);

  return { notifications, unreadCount, isLoading, refresh: fetchNotifications };
};