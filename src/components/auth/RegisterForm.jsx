import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import './AuthForms.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Donor',
    bloodGroup: 'A+',
    phNo: '',
    city: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const d=await registerUser(formData);
      console.log(d);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">I want to</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Donor">Donate Blood</option>
                <option value="Recipient">Request Blood</option>
              </select>
            </div>
          </div>

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
              <label htmlFor="phNo">Phone Number</label>
              <input
                type="tel"
                id="phNo"
                name="phNo"
                value={formData.phNo}
                onChange={handleChange}
                pattern="[0-9]{11}"
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
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;