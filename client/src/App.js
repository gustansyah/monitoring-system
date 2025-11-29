import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }

  // Protected Route Component
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user role
      const roleRoutes = {
        'user': '/dashboard',
        'manager': '/manager-dashboard',
        'admin': '/admin-dashboard'
      };
      return <Navigate to={roleRoutes[user.role]} replace />;
    }

    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to={user.role === 'user' ? '/dashboard' : `/${user.role}-dashboard`} replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/manager-dashboard"
            element={
              <ProtectedRoute requiredRole="manager">
                <ManagerDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/"
            element={
              user ? (
                <Navigate to={user.role === 'user' ? '/dashboard' : `/${user.role}-dashboard`} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route 
            path="*" 
            element={
              <div className="not-found">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                {user ? (
                  <button onClick={() => window.history.back()}>
                    Go Back
                  </button>
                ) : (
                  <button onClick={() => window.location.href = '/login'}>
                    Go to Login
                  </button>
                )}
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;