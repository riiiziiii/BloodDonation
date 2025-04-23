import LoginForm from '../../components/auth/LoginForm';
import './AuthPages.css';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-hero">
        <h1>Save Lives Through Blood Donation</h1>
        <p>Every drop counts. Join our community of donors and recipients today.</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;