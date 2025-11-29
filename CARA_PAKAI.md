# 🚀 Cara Menggunakan Aplikasi (Langkah demi Langkah)

## 📋 Urutan Pertama Kali (Setup Sekali Saja)

### Langkah 1: Pastikan Docker Desktop Sudah Terinstall
1. Buka **Docker Desktop** dari Start Menu
2. Tunggu sampai statusnya "Running" (biasanya ada ikon di taskbar)
3. Jika belum terinstall, download dari: https://www.docker.com/products/docker-desktop

### Langkah 2: Buat Desktop Shortcut (Cukup Sekali)
1. Buka folder project Anda
2. **Double-click** file `create-shortcut.bat`
3. Tunggu sampai muncul pesan "Desktop shortcut created successfully!"
4. Sekarang ada shortcut "User Activity Monitor" di Desktop Anda

---

## 🎯 Cara Membuka Aplikasi (Setiap Kali)

### Cara Paling Mudah: Gunakan Desktop Shortcut
1. **Double-click** shortcut "User Activity Monitor" di Desktop
2. Tunggu beberapa detik (sekitar 30 detik)
3. Browser akan otomatis buka di http://localhost:3000
4. Login dengan credentials:
   - **Admin**: admin@example.com / admin123
   - **Manager**: manager@example.com / manager123
   - **User**: user@example.com / user123

### Cara Alternatif: Langsung dari Folder Project
1. Buka folder project Anda
2. **Double-click** file `quick-start.bat`
3. Tunggu proses selesai
4. Browser akan otomatis terbuka

---

## 🛑 Cara Menutup Aplikasi

### Jika Pakai Desktop Shortcut
1. Kembali ke jendela command prompt yang terbuka
2. **Tekan sembarang tombol** untuk stop semua services
3. Tunggu sampai proses selesai

### Manual (Jika Perlu)
1. Buka Command Prompt
2. Masuk ke folder project
3. Ketik: `docker-compose down`
4. Tekan Enter

---

## 🔧 Akses Aplikasi

Setelah berhasil dijalankan:
- **Frontend (User Interface)**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## ⚠️ Penting Diketahui

### Yang Harus Dijalankan Pertama Kali:
1. **Docker Desktop** harus running dulu
2. **Buat desktop shortcut** (cukup sekali)

### Yang Terjadi Otomatis:
- ✅ Start database MongoDB
- ✅ Start backend server (port 5000)
- ✅ Start frontend (port 3000)
- ✅ Buka browser otomatis

### Yang Tidak Perlu Dilakukan Lagi:
- ❌ Tidak perlu buka terminal manual
- ❌ Tidak perlu ketik `npm start`
- ❌ Tidak perlu ketik `docker-compose` manual

---

## 🆘 Jika Ada Masalah

### "Docker is not running"
- Buka Docker Desktop dulu, tunggu sampai running

### "Port 3000/5000 sudah dipakai"
- Tutup aplikasi lain yang pakai port tersebut
- Restart komputer jika perlu

### Browser tidak otomatis buka
- Manual buka: http://localhost:3000

### Aplikasi lambat loading pertama kali
- Normal untuk pertama kali (Docker sedang build)
- Berikutnya akan lebih cepat

---

## 📱 Ringkasan Singkat

**Pertama Kali:**
1. Start Docker Desktop
2. Double-click `create-shortcut.bat`

**Setiap Kali Mau Buka:**
1. Double-click shortcut "User Activity Monitor" di Desktop
2. Tunggu 30 detik
3. Browser otomatis buka
4. Login dan pakai aplikasi

**Selesai:**
1. Tekan sembarang tombol di command prompt
2. Semua services berhenti

---

**Sekarang Anda bisa buka aplikasi dengan satu klik!** 🎉