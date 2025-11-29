import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ user, onLogout }) => {
  const [serverStatus, setServerStatus] = useState(null);
  const [logs, setLogs] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logFilter, setLogFilter] = useState('all');
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [logFilter]);

  const fetchDashboardData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      // Fetch all data in parallel
      const [serverResponse, logsResponse, userActivityResponse] = await Promise.all([
        axios.get(`${API_URL}/monitor/server-status`, { headers }),
        axios.get(`${API_URL}/monitor/logs?lines=100&level=${logFilter}`, { headers }),
        axios.get(`${API_URL}/monitor/user-activity`, { headers })
      ]);

      if (serverResponse.data.success) {
        setServerStatus(serverResponse.data.data);
      }

      if (logsResponse.data.success) {
        setLogs(logsResponse.data.data.logs);
      }

      if (userActivityResponse.success) {
        setUserActivity(userActivityResponse.data.users);
      }

      setError('');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Error loading dashboard data');
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

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error': return '#dc3545';
      case 'warn': return '#ffc107';
      case 'info': return '#17a2b8';
      case 'debug': return '#6c757d';
      default: return '#28a745';
    }
  };

  const getUsersByRole = () => {
    const roles = { admin: 0, manager: 0, user: 0 };
    userActivity.forEach(u => {
      roles[u.role]++;
    });
    return roles;
  };

  const getActiveUsers = () => {
    return userActivity.filter(u => u.isActive).length;
  };

  const getRecentLogins = () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return userActivity.filter(u => u.lastLogin && new Date(u.lastLogin) > oneDayAgo).length;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  const roleStats = getUsersByRole();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Admin Dashboard</h1>
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

        {/* Admin Stats Cards */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-title">Server Status</h2>
            <div className="card-value">
              <span className={`status-indicator ${
                serverStatus?.status === 'healthy' ? 'status-healthy' : 'status-error'
              }`}></span>
              {serverStatus?.status || 'Unknown'}
            </div>
            <div className="card-description">
              Uptime: {serverStatus ? formatUptime(serverStatus.uptime) : 'N/A'}
            </div>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Total Users</h2>
            <div className="card-value">{userActivity.length}</div>
            <div className="card-description">
              Admin: {roleStats.admin} | Manager: {roleStats.manager} | User: {roleStats.user}
            </div>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">System Resources</h2>
            <div className="card-value">
              {serverStatus?.system?.memoryUsagePercent || 'N/A'}
            </div>
            <div className="card-description">
              Memory: {serverStatus?.system?.usedMemory || 'N/A'} / {serverStatus?.system?.totalMemory || 'N/A'}
            </div>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Admin Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                className="btn btn-primary" 
                onClick={fetchDashboardData}
                style={{ width: '100%' }}
              >
                Refresh Dashboard
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowUserDetails(!showUserDetails)}
                style={{ width: '100%' }}
              >
                {showUserDetails ? 'Hide' : 'Show'} User Details
              </button>
            </div>
          </div>
        </div>

        {/* Detailed System Information */}
        <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
          <div className="dashboard-card">
            <h2 className="card-title">System Information</h2>
            {serverStatus ? (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Platform:</strong> {serverStatus.system.platform} ({serverStatus.system.arch})
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Node Version:</strong> {serverStatus.system.nodeVersion}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>CPU:</strong> {serverStatus.system.cpuCount} cores - {serverStatus.system.cpuModel}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Load Average:</strong> {serverStatus.system.loadAverage?.join(', ') || 'N/A'}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Network Interfaces:</strong> {serverStatus.system.activeNetworkInterfaces?.join(', ') || 'N/A'}
                </div>
                <div>
                  <strong>Process ID:</strong> {serverStatus.process.pid}
                </div>
              </>
            ) : (
              <p>System information unavailable</p>
            )}
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Process Memory</h2>
            {serverStatus ? (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <strong>RSS:</strong> {serverStatus.process.memoryUsage.rss}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Heap Total:</strong> {serverStatus.process.memoryUsage.heapTotal}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Heap Used:</strong> {serverStatus.process.memoryUsage.heapUsed}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>External:</strong> {serverStatus.process.memoryUsage.external}
                </div>
                <div>
                  <strong>Response Time:</strong> {serverStatus.responseTime}
                </div>
              </>
            ) : (
              <p>Process memory information unavailable</p>
            )}
          </div>
        </div>

        {/* User Management Table */}
        {showUserDetails && (
          <div className="data-table" style={{ marginBottom: '30px' }}>
            <div className="table-header">
              User Management
            </div>
            <div className="table-content">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Member Since</th>
                  </tr>
                </thead>
                <tbody>
                  {userActivity.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id.substring(0, 8)}...</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="user-role">{user.role}</span>
                      </td>
                      <td>
                        <span className={`status-indicator ${
                          user.isActive ? 'status-healthy' : 'status-error'
                        }`}></span>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </td>
                      <td>
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* System Logs */}
        <div className="data-table">
          <div className="table-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>System Logs (Admin View)</span>
              <select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Levels</option>
                <option value="error">Errors</option>
                <option value="warn">Warnings</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>
          </div>
          <div className="table-content">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Level</th>
                  <th>Message</th>
                  <th>Source</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(0, 50).map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>
                      <span
                        style={{
                          color: getLogLevelColor(log.level),
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}
                      >
                        {log.level}
                      </span>
                    </td>
                    <td>{log.message}</td>
                    <td>{log.source}</td>
                    <td>{log.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;