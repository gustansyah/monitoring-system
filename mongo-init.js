// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the project database
db = db.getSiblingDB('projectdb');

// Create application user with read/write permissions
db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'projectdb'
    }
  ]
});

// Create collections and indexes
db.createCollection('users');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "createdAt": 1 });
db.users.createIndex({ "lastLogin": 1 });

// Insert default admin user (password: admin123)
db.users.insertOne({
  username: 'admin',
  email: 'admin@example.com',
  password: '$2a$10$jgsQCvLmfBixDY6Q/fSYjO3rAwQEYslfqc5zZH4Vz1ZhBFeVKfe2m',
  role: 'admin',
  isActive: true,
  createdAt: new Date(),
  lastLogin: null
});

// Insert default manager user (password: manager123)
db.users.insertOne({
  username: 'manager',
  email: 'manager@example.com',
  password: '$2a$10$57.OQIPKMIWDA2tyqosyL.WfoUsuN.DdVam/ZYQYW4ubvJydrwLOq',
  role: 'manager',
  isActive: true,
  createdAt: new Date(),
  lastLogin: null
});

// Insert default regular user (password: user123)
db.users.insertOne({
  username: 'user',
  email: 'user@example.com',
  password: '$2a$10$9wwMMw6BfX2vUVp98Rn9NOtbm1tFrqKtsqTKdcsM7onuGAFnBZMUq',
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  lastLogin: null
});

// Note: The passwords above are bcrypt hashes for "admin123", "manager123", and "user123"

print('Database initialization completed successfully!');
print('Default users created:');
print('- Admin: admin@example.com / admin123');
print('- Manager: manager@example.com / manager123');
print('- User: user@example.com / user123');