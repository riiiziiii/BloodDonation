import { Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default MainRouter;