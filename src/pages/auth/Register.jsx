import RegisterForm from '../../components/auth/RegisterForm.jsx';
//import './AuthPages.css';

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-hero">
        <h1>Become a Life Saver</h1>
        <p>Register now to join our network of blood donors and recipients.</p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;