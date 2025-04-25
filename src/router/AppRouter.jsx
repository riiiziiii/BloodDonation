// src/router/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import DonorDashboard from '../pages/donor/Dashboard';
import RecipientDashboard from '../pages/recipient/Dashboard';
import Notifications from '../pages/shared/Notifications';
import Profile from '../pages/shared/Profile';
import { UserRole } from '../utils/constants';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route 
          path="/donor-dashboard" 
          element={
            <ProtectedRoute roles={[UserRole.DONOR]}>
              <DonorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recipient-dashboard" 
          element={
            <ProtectedRoute roles={[UserRole.RECIPIENT]}>
              <RecipientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;