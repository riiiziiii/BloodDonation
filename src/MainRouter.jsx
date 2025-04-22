import { Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import DonorDashboard from './DonorDashboard';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRouter;