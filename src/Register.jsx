import { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    role: 'donor',
    name: '',
    email: '',
    city: '',
    bloodGroup: '',
    contactNo: '',
    password: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration successful!');
  };

  return (
    <div className="register-container">
      <h2>BLOOD DONATION REGISTRATION</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>I WANT TO REGISTER AS:</label>
          <select 
            name="role" 
            value={formData.role}
            onChange={handleChange}
            className="form-control"
          >
            <option value="donor">Donor (Most Needed)</option>
            <option value="recipient">Recipient</option>
          </select>
        </div>

        <div className="form-group">
          <label>FULL NAME</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>EMAIL</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>CITY</label>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>BLOOD GROUP</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Select your blood group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>CONTACT NUMBER</label>
          <input
            type="tel"
            name="contactNo"
            placeholder="Enter your phone number"
            value={formData.contactNo}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>PASSWORD</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            className="form-control"
          />
        </div>

        <button type="submit" className="register-btn">
          REGISTER
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;