# 🚀 PROJECT MONITORING SYSTEM

Halo teman! Ini adalah panduan cepat untuk menjalankan project monitoring system.

## 📁 File yang Perlu Diperhatikan

1. **PANDUAN_INSTALASI_NPM.md** - Panduan lengkap instalasi
2. **JALANKAN_PROJECT.bat** - Script untuk Windows (klik 2x langsung jalan)
3. **jalankan-project.sh** - Script untuk Linux/Mac

## 🏃‍♂️ Cara Cepat Menjalankan (Windows)

**Cara 1: Klik 2x**
- Double klik file `JALANKAN_PROJECT.bat`
- Tunggu proses instalasi selesai
- Aplikasi akan otomatis terbuka di browser

**Cara 2: Manual**
```bash
# Buka 2 terminal terpisah

# Terminal 1 - Server
cd server
npm start

# Terminal 2 - Client  
cd client
npm start
```

## 🐧 Cara Cepat Menjalankan (Linux/Mac)

```bash
# Buat script executable (hanya sekali)
chmod +x jalankan-project.sh

# Jalankan script
./jalankan-project.sh
```

## 🔐 Data Login

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| User | user@example.com | user123 |

## 🌐 Akses Aplikasi

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📱 Fitur Aplikasi

- **Dashboard Admin**: Monitoring lengkap sistem
- **Dashboard Manager**: Monitoring user activity  
- **Dashboard User**: Interface user biasa
- **Real-time Monitoring**: Server status dan logs

## ⚠️ Penting!

1. Pastikan **Node.js** sudah terinstall (download dari https://nodejs.org)
2. Pastikan **MongoDB** sudah berjalan (atau gunakan MongoDB Atlas)
3. Jika port 3000/5000 sudah digunakan, hentikan proses yang menggunakan port tersebut

## 🆘 Troubleshooting

**Problem: "Port already in use"**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac  
lsof -ti:3000 | xargs kill -9
```

**Problem: "Module not found"**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

## 📞 Bantuan

Jika ada masalah:
1. Cek file `PANDUAN_INSTALASI_NPM.md` untuk panduan lengkap
2. Periksa error message di terminal
3. Restart aplikasi dan coba lagi

---

**Selamat menggunakan aplikasi!** 🎉

*Created by: Gustansyah Dwi Putra*