#!/bin/bash

echo "========================================"
echo "   APLIKASI MONITORING SYSTEM"
echo "========================================"
echo ""
echo "Memulai instalasi dan menjalankan project..."
echo ""

# Cek apakah Node.js terinstall
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js tidak terinstall!"
    echo "Silahkan install Node.js terlebih dahulu:"
    echo "  - Ubuntu/Debian: sudo apt install nodejs npm"
    echo "  - CentOS/RHEL: sudo yum install nodejs npm"
    echo "  - macOS: brew install node"
    echo "  - Download: https://nodejs.org"
    exit 1
fi

echo "[SUCCESS] Node.js terinstall"
echo "Versi: $(node --version)"
echo ""

# Install dependencies server
echo "[1/4] Menginstall dependencies server..."
cd server
if ! npm install; then
    echo "[ERROR] Gagal menginstall dependencies server!"
    exit 1
fi
echo "[SUCCESS] Dependencies server terinstall"
echo ""

# Install dependencies client
echo "[2/4] Menginstall dependencies client..."
cd ../client
if ! npm install; then
    echo "[ERROR] Gagal menginstall dependencies client!"
    exit 1
fi
echo "[SUCCESS] Dependencies client terinstall"
echo ""

# Kembali ke root folder
cd ..

echo "[3/4] Memulai server dan client..."
echo ""
echo "Server akan berjalan di: http://localhost:5000"
echo "Client akan berjalan di: http://localhost:3000"
echo ""
echo "Tekan Ctrl+C di masing-masing terminal untuk menghentikan aplikasi"
echo ""

# Fungsi untuk cleanup saat script dihentikan
cleanup() {
    echo ""
    echo "Menghentikan semua proses..."
    jobs -p | xargs kill
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Mulai server di background
echo "Menjalankan server..."
cd server && npm start &
SERVER_PID=$!

# Tunggu 3 detik agar server berjalan terlebih dahulu
sleep 3

# Mulai client di background
echo "Menjalankan client..."
cd ../client && npm start &
CLIENT_PID=$!

echo "[4/4] Aplikasi berhasil dimulai!"
echo ""
echo "========================================"
echo "    INFORMASI LOGIN"
echo "========================================"
echo ""
echo "ADMIN:"
echo "  Email: admin@example.com"
echo "  Password: admin123"
echo ""
echo "MANAGER:"
echo "  Email: manager@example.com"
echo "  Password: manager123"
echo ""
echo "USER:"
echo "  Email: user@example.com"
echo "  Password: user123"
echo ""
echo "========================================"
echo ""
echo "Aplikasi akan terbuka di browser otomatis..."
echo "Jika tidak terbuka, silahkan buka manual: http://localhost:3000"
echo ""

# Tunggu 5 detik lalu buka browser
sleep 5
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
elif command -v open &> /dev/null; then
    open http://localhost:3000
elif command -v start &> /dev/null; then
    start http://localhost:3000
fi

# Tunggu semua background process
wait