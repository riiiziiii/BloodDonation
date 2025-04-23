import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './HomePage.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Blood Donation Network</h1>
        <p>Connecting donors with recipients to save lives</p>
        
        {user ? (
          <Link 
            to={user.role === 'Donor' ? '/donor-dashboard' : '/recipient-dashboard'} 
            className="primary-button"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="primary-button">
              Login
            </Link>
            <Link to="/register" className="secondary-button">
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>For Donors</h3>
          <p>Make a difference by donating blood and saving lives in your community</p>
        </div>
        <div className="feature-card">
          <h3>For Recipients</h3>
          <p>Find compatible blood donors quickly when you need it most</p>
        </div>
        <div className="feature-card">
          <h3>Real-time Matching</h3>
          <p>Our system automatically notifies matching donors when you need blood</p>
        </div>
      </div>
    </div>
  );
};

export default Home;