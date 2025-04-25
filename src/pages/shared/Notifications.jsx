import { useNotifications } from "../../hooks/useNotifications";
import './NotificationPage.css';

const Notifications = () => {
  const { notifications, unreadCount, isLoading, error, refresh } = useNotifications();

  if (isLoading) return <div className="loading">Loading notifications...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <button onClick={refresh} className="refresh-button">
          Refresh
        </button>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount} unread</span>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications yet</p>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification._id} 
              className={`notification-item ${!notification.seen ? 'unread' : ''}`}
            >
              <p>{notification.message}</p>
              <small>
                {new Date(notification.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;