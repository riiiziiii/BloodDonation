import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import './AuthForms.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      const userData = await loginUser(email, password);
      console.log(userData)
      if(userData){
        navigate(userData.role === 'Donor' ? '/donor-dashboard' : '/recipient-dashboard');
      }
    } catch (err) {
      const serverError = err.response?.data?.message;
      const status = err.response?.status;
      
      if (status === 401) {
        setError('Invalid email or password');
      } else if (serverError) {
        setError(serverError);
      } else {
        setError('Login failed. Please try again later.');
      }
      
      console.error('Login failed:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to BloodDonation</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;