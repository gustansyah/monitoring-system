const express = require('express');
const router = express.Router();
const os = require('os');
const fs = require('fs');
const path = require('path');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get server status and system information
router.get('/server-status', authenticateToken, async (req, res) => {
  try {
    const startTime = process.hrtime();
    const uptime = process.uptime();
    
    // Calculate memory usage
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);
    
    // Get CPU information
    const cpuCount = os.cpus().length;
    const cpuModel = os.cpus()[0].model;
    
    // Get process information
    const processMemory = process.memoryUsage();
    const processUptime = formatUptime(uptime);
    
    // Calculate response time
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const responseTime = `${(seconds * 1000 + nanoseconds / 1e6).toFixed(2)}ms`;
    
    // Get system load average
    const loadAverage = os.loadavg();
    
    // Network interfaces (simplified)
    const networkInterfaces = os.networkInterfaces();
    const activeInterfaces = Object.keys(networkInterfaces).filter(iface => 
      networkInterfaces[iface].some(addr => !addr.internal)
    );
    
    const serverStatus = {
      timestamp: new Date().toISOString(),
      uptime: processUptime,
      uptimeSeconds: Math.floor(uptime),
      responseTime,
      system: {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        nodeVersion: process.version,
        totalMemory: formatBytes(totalMemory),
        freeMemory: formatBytes(freeMemory),
        usedMemory: formatBytes(usedMemory),
        memoryUsagePercent: `${memoryUsagePercent}%`,
        cpuCount,
        cpuModel,
        loadAverage: loadAverage.map(load => load.toFixed(2)),
        activeNetworkInterfaces: activeInterfaces
      },
      process: {
        pid: process.pid,
        memoryUsage: {
          rss: formatBytes(processMemory.rss),
          heapTotal: formatBytes(processMemory.heapTotal),
          heapUsed: formatBytes(processMemory.heapUsed),
          external: formatBytes(processMemory.external)
        }
      },
      status: 'healthy',
      environment: process.env.NODE_ENV || 'development'
    };
    
    res.status(200).json({
      success: true,
      data: serverStatus
    });
  } catch (error) {
    console.error('Server status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving server status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get server logs
router.get('/logs', authenticateToken, authorizeRoles('manager', 'admin'), (req, res) => {
  try {
    const { lines = 100, level } = req.query;
    const logLines = parseInt(lines) || 100;
    
    // In a real application, you would read from actual log files
    // For this demo, we'll create mock log data
    const mockLogs = generateMockLogs(logLines, level);
    
    res.status(200).json({
      success: true,
      data: {
        logs: mockLogs,
        total: mockLogs.length,
        filter: level || 'all',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving logs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user activity (for admin/manager)
router.get('/user-activity', authenticateToken, authorizeRoles('manager', 'admin'), async (req, res) => {
  try {
    const User = require('../models/User');
    const users = await User.find({})
      .select('-password')
      .sort({ lastLogin: -1 })
      .limit(50);
    
    const userActivity = users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }));
    
    res.status(200).json({
      success: true,
      data: {
        users: userActivity,
        total: userActivity.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('User activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user activity',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

// Helper function to generate mock logs
function generateMockLogs(count, filterLevel) {
  const levels = ['info', 'warn', 'error', 'debug'];
  const messages = [
    'User authentication successful',
    'Database connection established',
    'API request processed',
    'Cache cleared successfully',
    'Server configuration updated',
    'New user registration',
    'Password reset requested',
    'File upload completed',
    'Data backup initiated',
    'Security scan completed'
  ];
  
  const logs = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)];
    if (filterLevel && level !== filterLevel) continue;
    
    const timestamp = new Date(now - Math.random() * 24 * 60 * 60 * 1000); // Random time in last 24h
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    logs.push({
      timestamp: timestamp.toISOString(),
      level,
      message,
      source: 'server',
      id: `log-${Date.now()}-${i}`
    });
  }
  
  return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

module.exports = router;