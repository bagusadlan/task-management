# Aplikasi React Task dan Shop

Aplikasi React modern yang dibangun dengan TypeScript dan Tailwind CSS dengan fitur manajemen tugas, fungsionalitas belanja online, dan autentikasi pengguna.

## Daftar Isi

- [Fitur](#fitur)
- [Memulai](#memulai)
- [Struktur Proyek](#struktur-proyek)
- [Autentikasi](#autentikasi)
- [Gambaran Fitur](#gambaran-fitur)
- [Teknologi](#teknologi)

## Fitur

- **Autentikasi Pengguna**: Sistem login dan registrasi
- **Manajemen Tugas**: Membuat, memperbarui, menghapus, dan menandai tugas sebagai selesai
- **Toko Online**: Melihat produk, detail produk, dan menambahkan barang ke keranjang
- **Desain Responsif**: Antarmuka yang ramah seluler dibangun dengan Tailwind CSS

## Memulai

### Prasyarat

- Node.js (v14.0.0 atau lebih baru)
- npm (v6.0.0 atau lebih baru)

### Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/username-anda/task-management.git
   cd task-management
   ```

2. Install dependensi:

   ```bash
   npm install
   ```

3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
4. Buka browser Anda dan navigasikan ke:
   ```
   http://localhost:5173
   ```

## Struktur Proyek

Aplikasi ini mengikuti metodologi Atomic Design untuk organisasi komponen:

```
src/
├── components/          # Komponen UI mengikuti Atomic Design
│   └── ui/              # Komponen UI inti (Card, Button, Text, dll.)
│   ├── container/       # Kombinasi sederhana dari atom
│   ├── layout/          # Komponen UI kompleks
│   ├── templates/       # Layout halaman
├── contexts/            # Penyedia Context React
├── helpers/             # Fungsi bantuan
├── hooks/               # Custom hooks
├── lib/                 # Utilitas dan konfigurasi
│   ├── config/          # Konfigurasi aplikasi
│   ├── services/        # Fungsi memanggil API
│   └── types/           # Definisi tipe data TypeScript
├── pages/               # Halaman aplikasi
├── App.tsx              # Komponen aplikasi utama
└── main.tsx             # File entry
```

### Struktur Atomic Design

Pustaka komponen kami diorganisir menggunakan metodologi Atomic Design:

- **Ui**: Blok bangunan terkecil seperti tombol, input, label (atom)
- **Container**: Kombinasi sederhana dari ui yang bekerja bersama (molecul)
- **Layout**: Komponen UI kompleks yang terdiri dari container dan ui (organism)
- **Pages**: Halaman aplikasi

### Folder Lib

Folder `lib` berisi utilitas dan kode yang dibagikan:

- **config**: Konfigurasi aplikasi
- **types**: Definisi tipe TypeScript
- **services**: Fungsi layanan untuk panggilan API dan penanganan data

## Autentikasi

Untuk tujuan demo, aplikasi menggunakan localStorage untuk autentikasi. Dalam lingkungan produksi, ini akan digantikan dengan backend yang aman. Dengan query function menggunakan tanstack-query yang ditempatkan pada folder src/lib/actions, fungsi actions dipanggil menggunakan custom hooks pada folder src/hooks.

### Kredensial Demo

Anda dapat menggunakan kredensial demo ini untuk menguji aplikasi:

- **Email**: user@gmail.com
- **Password**: password

Atau daftar akun baru menggunakan formulir pendaftaran.

## Gambaran Fitur

### Manajemen Tugas

- Membuat tugas dengan judul dan deskripsi
- Menandai tugas sebagai selesai/belum selesai
- Menghapus tugas
- Memfilter tugas berdasarkan status (semua, aktif, selesai)
- Tugas diurutkan dengan yang terbaru di atas

### Toko Online

- Melihat daftar produk
- Melihat detail produk
- Menambah/menghapus produk dari keranjang
- Menyesuaikan jumlah produk di keranjang
- Melihat total harga di keranjang

## Teknologi

- **React**: Framework frontend
- **TypeScript**: Pemeriksaan tipe data
- **React Router**: Routing
- **Tailwind CSS**: Framework CSS utility first
- **localStorage**: Penyimpanan data dengan tujuan demo
