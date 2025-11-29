# PANDUAN INSTALASI DAN MENJALANKAN PROJECT MENGGUNAKAN NPM

## 📋 Persyaratan Sistem
Sebelum memulai, pastikan komputer Anda telah terinstall:
- **Node.js** (versi 14 atau lebih tinggi) - Download dari https://nodejs.org
- **npm** (biasanya sudah terinstall bersama Node.js)
- **Git** (untuk clone repository) - Download dari https://git-scm.com

## 🚀 Langkah-langkah Instalasi

### 1. Clone Project
```bash
git clone <URL-repository-project>
cd "projek akhir"
```

### 2. Instalasi Dependencies Server
Masuk ke folder server dan install semua dependencies:
```bash
cd server
npm install
```

### 3. Instalasi Dependencies Client
Kembali ke root folder, lalu masuk ke folder client:
```bash
cd ..
cd client
npm install
```

### 4. Kembali ke Root Folder
```bash
cd ..
```

## 🏃‍♂️ Cara Menjalankan Aplikasi

### Opsi 1: Manual (Dua Terminal Terpisah)

**Terminal 1 - Jalankan Server:**
```bash
cd server
npm start
```
Server akan berjalan di http://localhost:5000

**Terminal 2 - Jalankan Client:**
```bash
cd client
npm start
```
Client akan berjalan di http://localhost:3000

### Opsi 2: Menggunakan Script Batch (Windows)

Jika Anda menggunakan Windows, bisa gunakan file batch yang sudah disediakan:
```bash
start-app.bat
```

### Opsi 3: Menggunakan Docker

Jika Anda memiliki Docker, bisa menggunakan:
```bash
docker-compose up
```

## 🔐 Akun Default untuk Login

Berikut adalah akun default yang bisa digunakan:

**Admin:**
- Email: admin@example.com
- Password: admin123

**Manager:**
- Email: manager@example.com
- Password: manager123

**User:**
- Email: user@example.com
- Password: user123

## 📁 Struktur Project

```
projek akhir/
├── server/                 # Backend Node.js
│   ├── models/            # Model database
│   ├── routes/            # API routes
│   ├── middleware/        # Middleware autentikasi
│   └── package.json       # Dependencies server
├── client/                # Frontend React
│   ├── src/
│   │   └── components/    # Komponen React
│   └── package.json       # Dependencies client
├── docker-compose.yml     # Konfigurasi Docker
└── README.md             # Dokumentasi
```

## 🛠️ Troubleshooting

### Masalah Umum dan Solusi:

1. **Port sudah digunakan**
   - Error: `EADDRINUSE: address already in use`
   - Solusi: Matikan proses yang menggunakan port atau ganti port di file konfigurasi

2. **Module not found**
   - Pastikan Anda menjalankan `npm install` di folder server dan client

3. **Permission denied**
   - Windows: Jalankan Command Prompt sebagai Administrator
   - Linux/Mac: Gunakan `sudo` jika diperlukan

4. **MongoDB connection error**
   - Pastikan MongoDB sudah terinstall dan berjalan
   - Atau gunakan MongoDB Atlas (cloud)

### Commands Berguna:

**Check versi Node.js dan npm:**
```bash
node --version
npm --version
```

**Clear cache npm (jika ada masalah):**
```bash
npm cache clean --force
```

**Hapus node_modules dan install ulang:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Bantuan

Jika mengalami masalah:
1. Periksa file log di terminal
2. Pastikan semua dependencies terinstall dengan benar
3. Cek file konfigurasi (.env) jika ada
4. Restart aplikasi dan coba lagi

## 🎯 Fitur Aplikasi

- **Dashboard Admin**: Monitoring lengkap sistem
- **Dashboard Manager**: Monitoring user activity
- **Dashboard User**: Interface untuk user biasa
- **Real-time Monitoring**: Server status dan logs
- **Autentikasi**: Login dengan role-based access

---

**Selamat menggunakan aplikasi!** 🎉

Jika ada pertanyaan, jangan ragu untuk bertanya kepada admin project.