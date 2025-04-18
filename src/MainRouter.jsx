import { Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './Register';
import Login from './Login';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MainRouter;