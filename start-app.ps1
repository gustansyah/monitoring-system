# User Activity Monitoring System Launcher
# This script starts the application and opens it in the browser

Write-Host "User Activity Monitoring System Launcher" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    $dockerVersion = docker version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker not running"
    }
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Check if we're in the right directory
if (-not (Test-Path "docker-compose.yml")) {
    Write-Host "✗ docker-compose.yml not found. Please run this script from the project root directory." -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host "✓ Project directory validated" -ForegroundColor Green

# Start Docker Compose services
Write-Host "Starting services with Docker Compose..." -ForegroundColor Yellow
docker-compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to start services" -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host "✓ Services started successfully" -ForegroundColor Green

# Wait for services to be ready
Write-Host "Waiting for services to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Check service health
Write-Host "Checking service health..." -ForegroundColor Yellow
$serverHealth = docker-compose ps -q server | ForEach-Object { docker inspect $_ --format='{{.State.Health.Status}}' }
$clientHealth = docker-compose ps -q client | ForEach-Object { docker inspect $_ --format='{{.State.Health.Status}}' }

if ($serverHealth -eq "healthy" -and $clientHealth -eq "healthy") {
    Write-Host "✓ All services are healthy" -ForegroundColor Green
} else {
    Write-Host "! Services are still starting up..." -ForegroundColor Yellow
}

# Open the frontend in the default browser
Write-Host "Opening application in browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Application started successfully!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services, or close this window to continue running..." -ForegroundColor Yellow

# Handle Ctrl+C to gracefully stop services
try {
    # Wait indefinitely until interrupted
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host ""
    Write-Host "Stopping services..." -ForegroundColor Yellow
    docker-compose down
    Write-Host "✓ Services stopped" -ForegroundColor Green
}