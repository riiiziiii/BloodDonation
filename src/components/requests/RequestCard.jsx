import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { acceptRequest } from '../../api/requests';
import './RequestCard.css';

const RequestCard = ({ request, refreshRequests }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAccept = async () => {
    try {
      await acceptRequest(request._id);
      refreshRequests();
      navigate('/donor-dashboard');
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  return (
    <div className="request-card">
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

      {user?.role === 'Donor' && request.status === 'pending' && (
        <button onClick={handleAccept} className="accept-button">
          Accept Request
        </button>
      )}
    </div>
  );
};

export default RequestCard;