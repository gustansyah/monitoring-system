@echo off
echo ========================================
echo    APLIKASI MONITORING SYSTEM
echo ========================================
echo.
echo Memulai instalasi dan menjalankan project...
echo.

:: Cek apakah Node.js terinstall
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js tidak terinstall!
    echo Silahkan download dan install Node.js dari: https://nodejs.org
    pause
    exit /b 1
)

echo [SUCCESS] Node.js terinstall
echo.

:: Install dependencies server
echo [1/4] Menginstall dependencies server...
cd server
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Gagal menginstall dependencies server!
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies server terinstall
echo.

:: Install dependencies client
echo [2/4] Menginstall dependencies client...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Gagal menginstall dependencies client!
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies client terinstall
echo.

:: Kembali ke root folder
cd ..

echo [3/4] Memulai server dan client...
echo.
echo Server akan berjalan di: http://localhost:5000
echo Client akan berjalan di: http://localhost:3000
echo.
echo Tekan Ctrl+C di masing-masing terminal untuk menghentikan aplikasi
echo.

:: Mulai server di background
start "Server" cmd /k "cd server && npm start"

:: Tunggu 3 detik agar server berjalan terlebih dahulu
timeout /t 3 /nobreak >nul

:: Mulai client di background
start "Client" cmd /k "cd client && npm start"

echo [4/4] Aplikasi berhasil dimulai!
echo.
echo ========================================
echo    INFORMASI LOGIN
echo ========================================
echo.
echo ADMIN:
echo   Email: admin@example.com
echo   Password: admin123
echo.
echo MANAGER:
echo   Email: manager@example.com
echo   Password: manager123
echo.
echo USER:
echo   Email: user@example.com
echo   Password: user123
echo.
echo ========================================
echo.
echo Aplikasi akan terbuka di browser otomatis...
echo Jika tidak terbuka, silahkan buka manual: http://localhost:3000
echo.
pause