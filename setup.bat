@echo off
REM Web-Based User Activity Monitoring System Setup Script for Windows
REM This script helps you set up the complete project environment

echo 🚀 Setting up Web-Based User Activity Monitoring System...
echo ==================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    echo Visit: https://docs.docker.com/get-docker/
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    echo Visit: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Check if ports are available
echo.
echo 🔍 Checking port availability...

REM Function to check if port is in use (simplified for Windows)
netstat -an | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo ❌ Port 3000 is already in use
    set PORT_ISSUE=1
) else (
    echo ✅ Port 3000 is available
)

netstat -an | findstr :5000 >nul
if %errorlevel% equ 0 (
    echo ❌ Port 5000 is already in use
    set PORT_ISSUE=1
) else (
    echo ✅ Port 5000 is available
)

netstat -an | findstr :27017 >nul
if %errorlevel% equ 0 (
    echo ❌ Port 27017 is already in use
    set PORT_ISSUE=1
) else (
    echo ✅ Port 27017 is available
)

if defined PORT_ISSUE (
    echo.
    echo ⚠️  Some required ports are already in use.
    echo Please stop services using these ports or modify docker-compose.yml file.
    set /p continue="Do you want to continue anyway? (y/N): "
    if /i not "%continue%"=="y" exit /b 1
)

echo.
echo 📦 Building and starting containers...

REM Build and start all services
docker-compose up --build -d
if %errorlevel% neq 0 (
    echo.
    echo ❌ Failed to start services. Please check error messages above.
    pause
    exit /b 1
)

echo.
echo ⏳ Waiting for services to be ready...

REM Wait for services (simplified for Windows)
echo Waiting for services to initialize...
timeout /t 30 /nobreak >nul

echo.
echo ✅ All services started successfully!
echo.
echo 🎉 Setup completed successfully!
echo ==================================
echo.
echo 🌐 Application URLs:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000
echo    MongoDB: mongodb://localhost:27017
echo.
echo 👤 Default Login Credentials:
echo    Admin: admin@example.com / admin123
echo    Manager: manager@example.com / manager123
echo    User: user@example.com / user123
echo.
echo 🔧 Useful Commands:
echo    View logs: docker-compose logs -f
echo    Stop services: docker-compose down
echo    Restart services: docker-compose restart
echo    View running containers: docker-compose ps
echo.
echo 📚 For more information, see README.md
echo.
echo 🚀 Your User Activity Monitoring System is now running!
pause