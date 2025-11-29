import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = ({ user, onLogout }) => {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServerStatus();
    // Refresh server status every 30 seconds
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchServerStatus = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${API_URL}/monitor/server-status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setServerStatus(response.data.data);
        setError('');
      } else {
        setError('Failed to fetch server status');
      }
    } catch (error) {
      console.error('Error fetching server status:', error);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const formatUptime = (uptime) => {
    if (typeof uptime === 'string') return uptime;
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getLastLoginTime = () => {
    if (!user.lastLogin) return 'Never';
    return new Date(user.lastLogin).toLocaleString();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">User Dashboard</h1>
          <div className="header-info">
            <div className="user-info">
              <span>Welcome, {user.username}</span>
              <span className="user-role">{user.role}</span>
            </div>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="dashboard-grid">
          {/* User Info Card */}
          <div className="dashboard-card">
            <h2 className="card-title">User Information</h2>
            <div style={{ marginBottom: '15px' }}>
              <strong>Username:</strong> {user.username}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> {user.email}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Role:</strong> <span className="user-role">{user.role}</span>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Last Login:</strong> {getLastLoginTime()}
            </div>
          </div>

          {/* Server Status Card */}
          <div className="dashboard-card">
            <h2 className="card-title">Server Status</h2>
            {serverStatus ? (
              <>
                <div style={{ marginBottom: '15px' }}>
                  <span className={`status-indicator ${
                    serverStatus.status === 'healthy' ? 'status-healthy' : 'status-error'
                  }`}></span>
                  <strong>Status:</strong> {serverStatus.status}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Uptime:</strong> {formatUptime(serverStatus.uptime)}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Response Time:</strong> {serverStatus.responseTime}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Environment:</strong> {serverStatus.environment}
                </div>
                <div>
                  <strong>Last Updated:</strong> {new Date(serverStatus.timestamp).toLocaleString()}
                </div>
              </>
            ) : (
              <p>Server status unavailable</p>
            )}
          </div>

          {/* System Info Card */}
          <div className="dashboard-card">
            <h2 className="card-title">System Information</h2>
            {serverStatus ? (
              <>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Platform:</strong> {serverStatus.system.platform}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Node Version:</strong> {serverStatus.system.nodeVersion}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>CPU Cores:</strong> {serverStatus.system.cpuCount}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Memory Usage:</strong> {serverStatus.system.memoryUsagePercent}
                </div>
                <div>
                  <strong>Available Memory:</strong> {serverStatus.system.freeMemory}
                </div>
              </>
            ) : (
              <p>System information unavailable</p>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-card">
            <h2 className="card-title">Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                className="btn btn-primary" 
                onClick={fetchServerStatus}
                style={{ width: '100%' }}
              >
                Refresh Status
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => window.open('/api/monitor/server-status', '_blank')}
                style={{ width: '100%' }}
              >
                View API Status
              </button>
            </div>
          </div>
        </div>

        {/* User Activity Summary */}
        <div className="data-table">
          <div className="table-header">
            Your Activity Summary
          </div>
          <div className="table-content">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Account Status</td>
                  <td>
                    <span className={`status-indicator ${
                      user.isActive ? 'status-healthy' : 'status-error'
                    }`}></span>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </td>
                  <td>Your current account status</td>
                </tr>
                <tr>
                  <td>Access Level</td>
                  <td>{user.role}</td>
                  <td>Your current role and permissions</td>
                </tr>
                <tr>
                  <td>Server Access</td>
                  <td>
                    <span className={`status-indicator ${
                      serverStatus ? 'status-healthy' : 'status-error'
                    }`}></span>
                    {serverStatus ? 'Connected' : 'Disconnected'}
                  </td>
                  <td>Connection status to monitoring server</td>
                </tr>
                <tr>
                  <td>Last Activity</td>
                  <td>{getLastLoginTime()}</td>
                  <td>Your most recent login time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;