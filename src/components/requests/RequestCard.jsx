import { useState } from 'react';
import { acceptRequest } from '../../api/requests';
import useAuth from '../../hooks/useAuth';
import './RequestCard.css';

const RequestCard = ({ request, refreshRequests, showActions }) => {
  const { user } = useAuth();
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async () => {
    try {
      setIsAccepting(true);
      await acceptRequest(request._id);
      refreshRequests(); // Trigger parent component refresh
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className={`request-card ${request.status}`}>
      <div className="request-header">
        <h3>{request.bloodGroup} Blood Needed</h3>
        <span className={`status-badge ${request.status}`}>
          {request.status}
        </span>
      </div>
      
      <div className="request-details">
        <p><strong>Quantity:</strong> {request.bloodQty} units</p>
        <p><strong>Location:</strong> {request.city}, {request.address}</p>
        <p><strong>Requested on:</strong> {new Date(request.createdAt).toLocaleString()}</p>
      </div>

      {showActions && user?.role === 'Donor' && request.status === 'pending' && (
        <button 
          onClick={handleAccept} 
          className="accept-button"
          disabled={isAccepting}
        >
          {isAccepting ? 'Accepting...' : 'Accept Request'}
        </button>
      )}
    </div>
  );
};

export default RequestCard;