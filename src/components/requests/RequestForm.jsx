import { useState } from 'react';
import { createRequest } from '../../api/requests';
import './RequestForm.css';

const RequestForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    bloodGroup: 'A+',
    bloodQty: 1,
    city: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await createRequest(formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="request-form-container">
      <h2>Create Blood Request</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group</label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bloodQty">Quantity (units)</label>
            <input
              type="number"
              id="bloodQty"
              name="bloodQty"
              min="1"
              value={formData.bloodQty}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Full Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;