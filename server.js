const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Configure session store
const memoryStore = new session.MemoryStore();

// Session configuration
app.use(session({
  secret: 'my-secret-key-change-in-production',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Keycloak configuration
const keycloakConfig = {
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  bearerOnly: true,
  serverUrl: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
  credentials: {
    secret: process.env.KEYCLOAK_CLIENT_SECRET
  }
};

// Initialize Keycloak
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

// Middleware to parse JSON
app.use(express.json());

// Public route - accessible without authentication
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Keycloak Protected API',
    status: 'success',
    endpoints: {
      public: '/',
      protected: '/protected',
      admin: '/admin'
    }
  });
});

// Protected route - requires authentication
app.get('/protected', keycloak.protect(), (req, res) => {
  // Get user information from Keycloak token
  const accessToken = req.kauth.grant.access_token;
  const userInfo = accessToken.content;
  
  res.json({
    message: 'This is a protected route',
    status: 'success',
    user: {
      username: userInfo.preferred_username || userInfo.sub,
      email: userInfo.email,
      roles: userInfo.realm_access?.roles || [],
      token_expiry: new Date(accessToken.exp * 1000).toISOString(),
      issued_at: new Date(accessToken.iat * 1000).toISOString()
    },
    token_info: {
      expires_in: accessToken.expires_in,
      token_type: accessToken.token_type
    }
  });
});

// Admin route - requires admin role
app.get('/admin', keycloak.protect('realm:admin'), (req, res) => {
  // Get user information from Keycloak token
  const accessToken = req.kauth.grant.access_token;
  const userInfo = accessToken.content;
  
  res.json({
    message: 'This is an admin-only route',
    status: 'success',
    user: {
      username: userInfo.preferred_username || userInfo.sub,
      email: userInfo.email,
      roles: userInfo.realm_access?.roles || [],
      admin_access: true
    },
    admin_data: {
      server_time: new Date().toISOString(),
      user_count: 'Admin can see this data',
      system_status: 'All systems operational'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    keycloak_configured: !!process.env.KEYCLOAK_URL
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    available_routes: ['/', '/protected', '/admin', '/health']
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('💥 Global error handler:', error);
  
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Keycloak URL: ${process.env.KEYCLOAK_URL}`);
  console.log(`👑 Keycloak Realm: ${process.env.KEYCLOAK_REALM}`);
  console.log(`🔑 Client ID: ${process.env.KEYCLOAK_CLIENT_ID}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   GET  http://${HOST}:${PORT}/          - Public route`);
  console.log(`   GET  http://${HOST}:${PORT}/protected - Protected route (requires login)`);
  console.log(`   GET  http://${HOST}:${PORT}/admin    - Admin route (requires admin role)`);
  console.log(`   GET  http://${HOST}:${PORT}/health   - Health check`);
});

module.exports = app;