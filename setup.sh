#!/bin/bash

# Web-Based User Activity Monitoring System Setup Script
# This script helps you set up the complete project environment

echo "🚀 Setting up Web-Based User Activity Monitoring System..."
echo "=================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check if ports are available
echo ""
echo "🔍 Checking port availability..."

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "❌ Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check required ports
ports=(3000 5000 27017)
all_ports_available=true

for port in "${ports[@]}"; do
    if ! check_port $port; then
        all_ports_available=false
    fi
done

if [ "$all_ports_available" = false ]; then
    echo ""
    echo "⚠️  Some required ports are already in use."
    echo "Please stop the services using these ports or modify the docker-compose.yml file."
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "📦 Building and starting containers..."

# Build and start all services
if docker-compose up --build -d; then
    echo ""
    echo "✅ All services started successfully!"
else
    echo ""
    echo "❌ Failed to start services. Please check the error messages above."
    exit 1
fi

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to be ready..."

# Wait for MongoDB
echo "Waiting for MongoDB..."
while ! docker-compose exec -T mongo mongosh --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
    sleep 2
done
echo "✅ MongoDB is ready"

# Wait for Backend
echo "Waiting for Backend API..."
while ! curl -f http://localhost:5000/health >/dev/null 2>&1; do
    sleep 2
done
echo "✅ Backend API is ready"

# Wait for Frontend
echo "Waiting for Frontend..."
while ! curl -f http://localhost:3000 >/dev/null 2>&1; do
    sleep 2
done
echo "✅ Frontend is ready"

echo ""
echo "🎉 Setup completed successfully!"
echo "=================================="
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   MongoDB: mongodb://localhost:27017"
echo ""
echo "👤 Default Login Credentials:"
echo "   Admin: admin@example.com / admin123"
echo "   Manager: manager@example.com / manager123"
echo "   User: user@example.com / user123"
echo ""
echo "🔧 Useful Commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   View running containers: docker-compose ps"
echo ""
echo "📚 For more information, see README.md"
echo ""
echo "🚀 Your User Activity Monitoring System is now running!"