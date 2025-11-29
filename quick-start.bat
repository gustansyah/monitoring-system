@echo off
title User Activity Monitoring System

echo ==========================================
echo User Activity Monitoring System Launcher
echo ==========================================
echo.

REM Check if Docker is running
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop first.
    echo.
    pause
    exit /b 1
)

echo SUCCESS: Docker is running
echo.

REM Start services
echo Starting services with Docker Compose...
docker-compose up -d

if %errorlevel% neq 0 (
    echo ERROR: Failed to start services!
    pause
    exit /b 1
)

echo SUCCESS: Services started
echo.

REM Wait for services to initialize
echo Waiting for services to initialize (30 seconds)...
timeout /t 30 /nobreak >nul

echo Opening application in browser...
start http://localhost:3000

echo.
echo ==========================================
echo APPLICATION STARTED SUCCESSFULLY!
echo ==========================================
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press any key to stop all services...
pause >nul

echo.
echo Stopping services...
docker-compose down

echo Services stopped. Press any key to exit...
pause >nul