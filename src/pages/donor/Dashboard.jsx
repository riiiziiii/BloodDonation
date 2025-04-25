import { useState, useEffect, useMemo } from 'react';
import { getRequests, getAllMatchingRequests } from '../../api/requests';
import RequestCard from '../../components/requests/RequestCard';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [currentView, setCurrentView] = useState('pending'); // Changed from activeTab to currentView

  const fetchRequests = async (viewType) => {
    try {
      setIsLoading(true);
      const data = viewType === 'pending' 
        ? await getAllMatchingRequests()
        : await getRequests();
      setRequests(data);
      setCurrentView(viewType);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests('pending');
  }, []);

  // Filter requests based on current view and user data
  const filteredRequests = useMemo(() => {
    if (!user || !user.bloodGroup) return [];
    
    return requests.filter(request => {
      if (currentView === 'pending') {
        return (
          request.status === 'pending' && 
          request.bloodGroup === user.bloodGroup &&
          request.city === user.city
        );
      } else {
        return (
          request.status === 'accepted' &&
          request.acceptedBy === user._id
        );
      }
    });
  }, [requests, currentView, user, lastRefresh]);

  // Calculate counts for views
  const requestCounts = useMemo(() => {
    if (!user) return { pending: 0, accepted: 0 };
    
    const pendingCount = requests.filter(r => 
      r.status === 'pending' && 
      r.bloodGroup === user.bloodGroup &&
      r.city === user.city
    ).length;

    const acceptedCount = requests.filter(r => 
      r.status === 'accepted' &&
      r.acceptedBy === user._id
    ).length;

    return { pending: pendingCount, accepted: acceptedCount };
  }, [requests, user]);

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>Error Loading Requests</h2>
          <p>{error.message || 'Failed to load requests'}</p>
          <button 
            className="retry-button"
            onClick={() => {
              fetchRequests(currentView);
              setLastRefresh(Date.now());
            }}
          >
            Retry
          </button>
          {!user?.bloodGroup && (
            <div className="profile-warning">
              <p>Your profile is missing blood group information.</p>
              <a href="/profile">Update Profile</a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Donor Dashboard</h1>
        <div className="tabs">
          <button 
            className={currentView === 'pending' ? 'active' : ''}
            onClick={() => fetchRequests('pending')}
          >
            New Requests ({requestCounts.pending})
          </button>
          <button 
            className={currentView === 'accepted' ? 'active' : ''} 
            onClick={() => fetchRequests('accepted')}
          >
            Accepted Requests ({requestCounts.accepted})
          </button>
        </div>
      </div>

      <div className="requests-grid">
        {isLoading ? (
          <div className="loading-spinner">Loading requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="no-requests-message">
            <p>No {currentView} requests found</p>
            {currentView === 'pending' ? (
              <p className="info-text">
                {user?.bloodGroup 
                  ? `No pending requests for blood group ${user.bloodGroup} in ${user.city}`
                  : 'Please complete your profile to see requests'}
              </p>
            ) : (
              <p className="info-text">
                You haven't accepted any requests yet
              </p>
            )}
          </div>
        ) : (
          filteredRequests.map(request => (
            <RequestCard 
              key={request._id} 
              request={request} 
              refreshRequests={() => {
                fetchRequests(currentView);
                setLastRefresh(Date.now());
              }}
              showActions={currentView === 'pending'}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;