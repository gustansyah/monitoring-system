# 🚀 Quick Start Guide

You now have multiple ways to start your User Activity Monitoring System without manually opening terminals!

## 🎯 Easiest Method: Desktop Shortcut

1. **Create the desktop shortcut** (one-time setup):
   - Double-click [`create-shortcut.bat`](create-shortcut.bat:1)
   - Follow the prompts

2. **Use the shortcut**:
   - Find "User Activity Monitor" on your desktop
   - Double-click it to start everything
   - The app will open automatically in your browser

## 🔧 Alternative Methods

### Method 1: Quick Start Batch File
- Double-click [`quick-start.bat`](quick-start.bat:1)
- Waits 30 seconds for services to start
- Opens browser automatically
- Press any key to stop services

### Method 2: HTML Launcher
- Double-click [`launcher.html`](launcher.html:1)
- Opens a nice web interface
- Shows login credentials
- Click buttons to start/stop services

### Method 3: PowerShell Script
- Right-click [`start-app.ps1`](start-app.ps1:1) → "Run with PowerShell"
- Most advanced option with health checks
- Graceful shutdown with Ctrl+C

## 📋 What You Need

1. **Docker Desktop** must be running first
2. **Ports 3000 and 5000** should be available
3. **One-time setup** for desktop shortcut

## 🌐 Access Points

Once started:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔑 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| User | user@example.com | user123 |

## ⚡ Quick Commands

If you ever need to do it manually:
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## 🛠️ Troubleshooting

- **"Docker is not running"**: Start Docker Desktop first
- **Port conflicts**: Make sure ports 3000, 5000, 27017 are free
- **Slow first start**: Initial Docker builds can take 5-10 minutes

---

**That's it! You can now start your application with a single double-click!** 🎉