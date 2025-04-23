import { useState } from 'react';
import { useRequests } from '../../hooks/useRequests';
import RequestCard from '../../components/requests/RequestCard';
import './DashboardPages.css';

const DonorDashboard = () => {
  const { requests, isLoading, refreshRequests } = useRequests();
  const [activeTab, setActiveTab] = useState('pending');

  const filteredRequests = requests.filter(request => 
    activeTab === 'pending' ? 
    request.status === 'pending' : 
    request.status === 'accepted'
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Donor Dashboard</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'pending' ? 'active' : ''}
            onClick={() => setActiveTab('pending')}
          >
            New Requests
          </button>
          <button 
            className={activeTab === 'accepted' ? 'active' : ''}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted Requests
          </button>
        </div>
      </div>

      <div className="requests-grid">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : filteredRequests.length === 0 ? (
          <p className="no-requests">No {activeTab} requests found</p>
        ) : (
          filteredRequests.map(request => (
            <RequestCard 
              key={request._id} 
              request={request} 
              refreshRequests={refreshRequests} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;