import { Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import DonorDashboard from './DonorDashboard';
import DonorHistory from './DonorHistory';


const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/donor-history" element={<DonorHistory />} />
    </Routes>
  );
};

export default MainRouter;