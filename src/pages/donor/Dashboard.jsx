import { useState, useEffect, useMemo } from 'react';
import { useRequests } from '../../hooks/useRequests';
import RequestCard from '../../components/requests/RequestCard';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

const DonorDashboard = () => {
  const { user } = useAuth();
  const { requests, isLoading, error, refreshRequests } = useRequests();
  const [activeTab, setActiveTab] = useState('pending');
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Filter requests based on active tab and user data
  const filteredRequests = useMemo(() => {
    if (!user || !user.bloodGroup) return [];
    
    return requests.filter(request => {
      if (activeTab === 'pending') {
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
  }, [requests, activeTab, user, lastRefresh]);

  // Force refresh when tab changes
  useEffect(() => {
    refreshRequests();
  }, [activeTab]);

  // Calculate counts for tabs
  const requestCounts = useMemo(() => {
    if (!user) return { pending: 0, accepted: 0 };
    
    return {
      pending: requests.filter(r => 
        r.status === 'pending' && 
        r.bloodGroup === user.bloodGroup &&
        r.city === user.city
      ).length,
      accepted: requests.filter(r => 
        r.status === 'accepted' && 
        r.acceptedBy === user._id
      ).length
    };
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
              refreshRequests();
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
            className={activeTab === 'pending' ? 'active' : ''}
            onClick={() => setActiveTab('pending')}
          >
            New Requests ({requestCounts.pending})
          </button>
          <button 
            className={activeTab === 'accepted' ? 'active' : ''}
            onClick={() => setActiveTab('accepted')}
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
            <p>No {activeTab} requests found</p>
            {activeTab === 'pending' && user?.bloodGroup && (
              <p className="info-text">
                There are currently no pending requests matching your blood group ({user.bloodGroup}) in {user.city}.
              </p>
            )}
          </div>
        ) : (
          filteredRequests.map(request => (
            <RequestCard 
              key={request._id} 
              request={request} 
              refreshRequests={() => {
                refreshRequests();
                setLastRefresh(Date.now());
              }}
              showActions={activeTab === 'pending'}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;