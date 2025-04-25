import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          BloodDonation
        </Link>
        
        <nav className="nav-links">
          {user ? (
            <>
              <NavLink to={user.role === 'Donor' ? '/donor-dashboard' : '/recipient-dashboard'}>
                Dashboard
              </NavLink>
              <NavLink to="/notifications">
                Notifications
              </NavLink>
              <NavLink to="/profile">
                Profile
              </NavLink>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;