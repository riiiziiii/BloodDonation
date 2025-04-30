import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRequests } from '../../hooks/useRequests';
import RequestCard from '../../components/requests/RequestCard';
import RequestForm from '../../components/requests/RequestCard';
import './Dashboard.css';

const RecipientDashboard = () => {
  const { requests, isLoading, refreshRequests } = useRequests();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Recipient Dashboard</h1>
        <button 
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create New Request'}
        </button>
      </div>

      {showForm && (
        <div className="request-form-container">
          <RequestForm 
            onSuccess={() => {
              setShowForm(false);
              refreshRequests();
            }} 
          />
        </div>
      )}

      <div className="requests-grid">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : requests.length === 0 ? (
          <p className="no-requests">
            No requests yet. <Link to="#" onClick={() => setShowForm(true)}>Create your first request</Link>
          </p>
        ) : (
          requests.map(request => (
            <RequestCard 
              key={request._id} 
              request={request} 
              showActions={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecipientDashboard;