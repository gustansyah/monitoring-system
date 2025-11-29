@echo off
title User Activity Monitoring System

echo Starting User Activity Monitoring System...
echo.

REM Check if Docker is running
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Start Docker Compose services
echo Starting services with Docker Compose...
docker-compose up -d

REM Wait for services to be ready
echo Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Open the frontend in the default browser
echo Opening application in browser...
start http://localhost:3000

echo.
echo Application started successfully!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000
echo.
echo Press any key to stop all services...
pause >nul

REM Stop services when user presses a key
echo Stopping services...
docker-compose down

echo Services stopped. Press any key to exit...
pause >nul