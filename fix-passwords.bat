@echo off
REM Fix for demo account passwords in User Activity Monitoring System

echo 🔧 Fixing demo account passwords...
echo ==================================

REM Check if Docker is running
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running or not installed.
    echo Please start Docker and try again.
    pause
    exit /b 1
)

REM Check if containers are running
echo 📋 Checking container status...
docker ps --filter "name=user-activity-server" --format "table {{.Names}}\t{{.Status}}" | findstr "user-activity-server" >nul
if %errorlevel% neq 0 (
    echo ❌ Server container is not running.
    echo Starting containers...
    docker-compose up -d
    if %errorlevel% neq 0 (
        echo ❌ Failed to start containers.
        pause
        exit /b 1
    )
    echo ⏳ Waiting for containers to be ready...
    timeout /t 30 /nobreak >nul
)

REM Execute the password update script
echo 🔄 Updating passwords in database...
docker exec user-activity-server node update-passwords.js

if %errorlevel% equ 0 (
    echo.
    echo ✅ Password update completed successfully!
    echo.
    echo 📝 Demo Login Credentials:
    echo    Admin: admin@example.com / admin123
    echo    Manager: manager@example.com / manager123
    echo    User: user@example.com / user123
    echo.
    echo 🌐 You can now login at: http://localhost:3000
) else (
    echo.
    echo ❌ Password update failed.
    echo Please check the container logs for more details.
    echo Run: docker logs user-activity-server
)

echo.
pause