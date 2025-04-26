import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRequests } from '../../hooks/useRequests';
import RequestCard from '../../components/requests/RequestCard';
<<<<<<< Updated upstream
import RequestForm from '../../components/requests/RequestCard';
=======
import RequestForm from '../../components/requests/RequestForm';
>>>>>>> Stashed changes
import './Dashboard.css';

const RecipientDashboard = () => {
  const { requests, isLoading, error, refreshRequests } = useRequests();
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleRequestSuccess = () => {
    setShowForm(false);
    setSuccessMessage('Request created successfully!');
    refreshRequests();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Recipient Dashboard</h1>
        <button 
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
          disabled={isLoading}
        >
          {showForm ? 'Cancel' : 'Create New Request'}
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <button 
            className="retry-button"
            onClick={refreshRequests}
            disabled={isLoading}
          >
            {isLoading ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      )}

      {/* Request Form */}
      {showForm && (
        <div className="request-form-container">
          <RequestForm 
            onSuccess={handleRequestSuccess}
            onCancel={() => setShowForm(false)} 
          />
        </div>
      )}

      {/* Requests List */}
      <div className="requests-list">
        <h2>Your Requests</h2>
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your requests...</p>
          </div>
        ) : (
          <>
            {requests?.length === 0 ? (
              <div className="no-requests">
                <p>You haven't created any requests yet.</p>
                <button 
                  className="text-button"
                  onClick={() => setShowForm(true)}
                >
                  Create your first request
                </button>
              </div>
            ) : (
              <div className="requests-grid">
                {requests.map(request => (
                  <RequestCard 
                    key={request._id} 
                    request={request} 
                    showStatus={true}
                    onActionSuccess={refreshRequests}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipientDashboard;