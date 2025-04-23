import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile } from '../../api/users';
import './ProfilePage.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        phNo: user.phNo,
        city: user.city,
        address: user.address
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(formData);
      updateUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      
      <div className="profile-info">
        <div className="profile-details">
          <h3>Account Information</h3>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          {user.lastDonation && (
            <p><strong>Last Donation:</strong> {new Date(user.lastDonation).toLocaleDateString()}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username || ''}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              disabled
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phNo || ''}
              onChange={(e) => setFormData({...formData, phNo: e.target.value})}
              pattern="[0-9]{11}"
              required
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              value={formData.address || ''}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;