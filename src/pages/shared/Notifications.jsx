import { useNotifications } from '../../hooks/useNotifications';
import './NotificationPage.css';

const Notifications = () => {
  const { notifications, isLoading } = useNotifications();

  return (
    <div className="notifications-container">
      <h1>Your Notifications</h1>
      
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : notifications.length === 0 ? (
        <p className="no-notifications">No notifications yet</p>
      ) : (
        <div className="notifications-list">
          {notifications.map(notification => (
            <div 
              key={notification._id} 
              className={`notification-item ${!notification.seen ? 'unread' : ''}`}
            >
              <p>{notification.message}</p>
              <small>
                {new Date(notification.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;