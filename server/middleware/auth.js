const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret key (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token - user not found' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Account is deactivated' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication' 
    });
  }
};

// Middleware to check user role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Required role: ${roles.join(' or ')}` 
      });
    }

    next();
  };
};

// Middleware to check if user can access their own resources or has higher role
const authorizeSelfOrHigher = (req, res, next) => {
  const targetUserId = req.params.id || req.params.userId;
  const currentUserId = req.user._id.toString();
  
  // Admin can access any resource
  if (req.user.role === 'admin') {
    return next();
  }
  
  // Manager can access their own resources and user resources
  if (req.user.role === 'manager') {
    // Check if accessing own resource
    if (targetUserId === currentUserId) {
      return next();
    }
    
    // For other resources, we need to check if target is a user
    // This will be handled in specific routes
    return next();
  }
  
  // Regular users can only access their own resources
  if (targetUserId !== currentUserId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. You can only access your own resources' 
    });
  }
  
  next();
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  authorizeSelfOrHigher,
  generateToken,
  JWT_SECRET
};