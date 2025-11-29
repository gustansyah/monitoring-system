# Application Launcher Guide

This guide explains how to use the various launcher options to start your User Activity Monitoring System without manually opening terminals and running commands.

## 🚀 Quick Launch Options

### Option 1: PowerShell Script (Recommended)
**File:** `start-app.ps1`

The PowerShell script provides the most robust solution with:
- Docker health checks
- Service status monitoring
- Automatic browser opening
- Graceful shutdown on Ctrl+C

**To use:**
1. Right-click on `start-app.ps1`
2. Select "Run with PowerShell"
3. If you get execution policy errors, run this once in PowerShell (as admin):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Option 2: Batch Script
**File:** `start-app.bat`

A simple batch script that:
- Starts Docker Compose services
- Opens the browser
- Provides basic status messages

**To use:**
1. Double-click `start-app.bat`
2. Wait for services to start
3. Press any key when done to stop services

### Option 3: HTML Launcher
**File:** `launcher.html`

A web-based launcher interface that:
- Provides a visual dashboard
- Shows application information
- Includes quick access buttons
- Displays login credentials

**To use:**
1. Double-click `launcher.html` to open in your browser
2. Use the buttons to start/stop services
3. Note: This is a visual interface - actual commands run via the PowerShell script

### Option 4: Desktop Shortcut
**File:** `create-desktop-shortcut.vbs`

Creates a desktop shortcut for one-click access:
- Runs the PowerShell script
- Opens in the correct directory
- Professional desktop icon

**To create the shortcut:**
1. Double-click `create-desktop-shortcut.vbs`
2. Confirm the dialog box
3. Find "User Activity Monitoring System" on your desktop
4. Double-click the desktop shortcut to launch

## 📋 Prerequisites

Before using any launcher:
1. **Install Docker Desktop** from https://www.docker.com/products/docker-desktop
2. **Start Docker Desktop** - make sure it's running in the background
3. **Ensure ports 3000 and 5000 are available**

## 🔧 What Each Launcher Does

All launchers perform these steps:
1. Check if Docker is running
2. Validate project directory
3. Start services with `docker-compose up -d`
4. Wait for services to initialize (15-30 seconds)
5. Open http://localhost:3000 in your default browser
6. Provide options to stop services

## 🌐 Application Access

Once started:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Database:** MongoDB on port 27017

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| User | user@example.com | user123 |

## 🛠️ Troubleshooting

### Docker Issues
- **"Docker is not running"**: Start Docker Desktop first
- **Port conflicts**: Make sure ports 3000, 5000, and 27017 are free
- **Build failures**: Run `docker system prune -a` to clean up

### PowerShell Issues
- **Execution policy errors**: Run `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
- **Permission denied**: Run PowerShell as Administrator

### General Issues
- **Services not starting**: Check Docker Desktop logs
- **Browser not opening**: Manually navigate to http://localhost:3000
- **Slow startup**: First-time builds can take several minutes

## 🔄 Stopping Services

To stop all services:
- **PowerShell/Batch**: Press Ctrl+C or follow the on-screen prompt
- **Manual**: Run `docker-compose down` in the project directory
- **Docker Desktop**: Stop containers from the Docker Desktop interface

## 📱 Mobile Access

Once running, you can access the application from other devices on your network:
1. Find your computer's IP address (run `ipconfig` in command prompt)
2. Use `http://YOUR_IP:3000` on mobile devices
3. Note: Firewall settings may need adjustment

## 🚀 Advanced Usage

### Development Mode
For development with hot-reload:
1. Navigate to `client/` directory: `cd client`
2. Run: `npm start`
3. Navigate to `server/` directory: `cd server`
4. Run: `npm run dev`

### Production Deployment
For production deployment:
1. Update environment variables in `.env` files
2. Change default passwords
3. Configure HTTPS
4. Set up proper monitoring

## 💡 Tips

1. **First-time setup**: Initial Docker builds can take 5-10 minutes
2. **Subsequent starts**: Much faster once images are built
3. **Resource usage**: Docker containers use system resources
4. **Updates**: Pull latest code and run `docker-compose up --build`

## 📞 Support

If you encounter issues:
1. Check Docker Desktop is running
2. Verify ports are available
3. Review Docker logs: `docker-compose logs`
4. Restart Docker Desktop if needed

---

**Created with ❤️ to make your development experience easier!**