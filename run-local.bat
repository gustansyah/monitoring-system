@echo off
REM Run User Activity Monitoring System locally without Docker

echo 🚀 Starting User Activity Monitoring System (Local Mode)
echo ========================================================

REM Check if MongoDB is installed locally
mongod --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB found locally
    echo.
    echo 📋 Starting MongoDB...
    start "MongoDB" mongod --dbpath "%CD%\data"
    timeout /t 5 /nobreak >nul
    set MONGODB_URI=mongodb://localhost:27017/projectdb
) else (
    echo ⚠️ MongoDB not found locally
    echo 🌐 Using MongoDB Atlas (cloud database)
    set MONGODB_URI=mongodb+srv://demo:demo123@cluster0.mongodb.net/projectdb?retryWrites=true&w=majority
)

echo.
echo 📦 Starting Backend Server...
cd server
start "Backend Server" cmd /k "set MONGODB_URI=%MONGODB_URI% && set JWT_SECRET=local-jwt-secret-key && set PORT=5000 && node server.js"

echo.
echo ⏳ Waiting for server to start...
timeout /t 10 /nobreak >nul

echo.
echo 🌐 Starting Frontend...
cd ..\client
start "Frontend" cmd /k "set REACT_APP_API_URL=http://localhost:5000/api && npm start"

echo.
echo ✅ Application starting...
echo.
echo 📝 Demo Login Credentials:
echo    Admin: admin@example.com / admin123
echo    Manager: manager@example.com / manager123
echo    User: user@example.com / user123
echo.
echo 🌐 Application will be available at: http://localhost:3000
echo 🔗 Backend API: http://localhost:5000
echo.
echo ⚠️  If this is the first run, you need to create demo accounts:
echo    1. Open http://localhost:3000
echo    2. Register new accounts with the demo credentials above
echo    3. Then login with those credentials
echo.
pause