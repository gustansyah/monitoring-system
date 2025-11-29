# Web-Based User Activity Monitoring System

A comprehensive web application for monitoring user activities and system performance, built with React, Express.js, MongoDB, and Docker.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication system
- Role-based access control (User, Manager, Admin)
- Secure password hashing with bcrypt
- User registration and login functionality

### User Dashboards
- **User Dashboard**: Personal profile, server status, system information
- **Manager Dashboard**: User activity overview, system logs, performance metrics
- **Admin Dashboard**: Complete system control, user management, detailed logs

### Monitoring & Logging
- Real-time server status monitoring
- System performance metrics (CPU, memory, uptime)
- Application logging with Morgan
- User activity tracking
- Health checks for all services

### Containerization
- Docker containerization for all services
- Multi-stage React build optimization
- Nginx reverse proxy for frontend
- MongoDB with persistent data storage

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Nginx**: Production web server

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **Morgan**: HTTP request logger

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Service orchestration
- **Multi-stage builds**: Optimized container images

## 📁 Project Structure

```
project-akhir/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js        # Main App component
│   │   ├── App.css       # Global styles
│   │   └── index.js      # App entry point
│   ├── Dockerfile         # Frontend container config
│   ├── nginx.conf        # Nginx configuration
│   └── package.json      # Frontend dependencies
├── server/                # Express backend
│   ├── models/           # Mongoose models
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   ├── Dockerfile        # Backend container config
│   └── package.json      # Backend dependencies
├── docker-compose.yml     # Service orchestration
├── mongo-init.js         # Database initialization
└── README.md            # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git for cloning the repository

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-akhir
   ```

2. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| User | user@example.com | user123 |

## 🔧 Development Setup

### Backend Development

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   # Create .env file
   echo "NODE_ENV=development" > .env
   echo "PORT=5000" >> .env
   echo "MONGODB_URI=mongodb://localhost:27017/projectdb" >> .env
   echo "JWT_SECRET=your-secret-key" >> .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Frontend Development

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   # Create .env file
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Monitoring
- `GET /api/monitor/server-status` - Get server status
- `GET /api/monitor/logs` - Get system logs (Manager/Admin only)
- `GET /api/monitor/user-activity` - Get user activity (Manager/Admin only)

### Health Check
- `GET /health` - Server health check

## 🔒 Security Features

### Authentication
- JWT token-based authentication
- Secure password hashing with bcrypt
- Token expiration handling
- Role-based access control

### Container Security
- Non-root user execution
- Minimal container images
- Security headers in Nginx
- Health checks for all services

### API Security
- Input validation and sanitization
- Error handling without information leakage
- CORS configuration
- Rate limiting ready structure

## 🐳 Docker Services

### MongoDB Container
- Image: mongo:6.0
- Port: 27017
- Persistent data volume
- Automatic database initialization

### Backend Container
- Base: node:18-alpine
- Port: 5000
- Multi-stage build optimization
- Health checks enabled

### Frontend Container
- Base: nginx:alpine
- Port: 3000
- Optimized React build
- Gzip compression enabled

## 📈 Monitoring Features

### System Metrics
- CPU usage and load average
- Memory consumption
- Disk usage
- Network interfaces
- Process information

### User Activity
- Login tracking
- User status monitoring
- Role-based access logs
- Activity timestamps

### Application Logs
- HTTP request logging
- Error tracking
- Performance monitoring
- Debug information

## 🔄 Continuous Integration

### Docker Compose Commands

```bash
# Start all services
docker-compose up -d

# Build and start
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v

# Restart specific service
docker-compose restart server
```

### Health Checks

All services include health checks:
- MongoDB: Database connectivity
- Backend: HTTP health endpoint
- Frontend: Web server availability

## 🛠️ Troubleshooting

### Common Issues

1. **Port conflicts**
   - Ensure ports 3000, 5000, and 27017 are available
   - Modify ports in docker-compose.yml if needed

2. **Database connection issues**
   - Check MongoDB container status
   - Verify connection string in environment variables
   - Review MongoDB logs

3. **Build failures**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild without cache: `docker-compose build --no-cache`

4. **Permission issues**
   - Check file permissions in mounted volumes
   - Ensure Docker daemon has proper permissions

### Log Locations

- Application logs: `docker-compose logs server`
- Database logs: `docker-compose logs mongo`
- Frontend logs: `docker-compose logs client`
- Nginx access logs: Inside client container at `/var/log/nginx/access.log`

## 📝 Environment Variables

### Backend (.env)
```bash
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
MONGODB_URI=mongodb://admin:password123@mongo:27017/projectdb?authSource=admin
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Production Deployment

### Security Considerations
1. Change default passwords
2. Use environment-specific JWT secrets
3. Enable HTTPS in production
4. Configure proper CORS origins
5. Set up monitoring and alerting

### Performance Optimization
1. Enable Redis for session storage
2. Implement database indexing
3. Use CDN for static assets
4. Configure load balancing
5. Set up proper caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Built with ❤️ using modern web technologies**