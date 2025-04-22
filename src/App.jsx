import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Register';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="app-container">
          <header className="app-header">
            <h1 className="app-title">BLOODDONATION</h1>
          </header>
          
          <main className="app-main">
            <div className="auth-options">
              <button 
                onClick={() => router.navigate('/register')} 
                className="auth-button primary"
              >
                Register
              </button>
              <button 
                onClick={() => router.navigate('/login')} 
                className="auth-button secondary"
              >
                Login
              </button>
            </div>

            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">120</div>
                  <div className="stat-label">Requests Fulfilled</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">56</div>
                  <div className="stat-label">Active Donors</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">18</div>
                  <div className="stat-label">Urgent Requests</div>
                </div>
              </div>
            </div>

            {/* Add a direct link to donor dashboard for testing */}
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => router.navigate('/donor-dashboard')}
                className="auth-button primary"
              >
                View Donor Dashboard (Test)
              </button>
            </div>
          </main>
        </div>
      )
    },
    {
      path: "/register",
      element: <Register/>
    }
    // Add more routes as needed
  ]);

  return <RouterProvider router={router} />;
}

export default App;