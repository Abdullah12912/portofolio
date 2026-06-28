# Architecture Specification

Dokumen ini mendefinisikan arsitektur teknis dan tumpukan teknologi (*technology stack*) untuk **Personal Portfolio Website & Admin Dashboard**. Desain arsitektur difokuskan pada kesederhanaan, performa tinggi, keamanan dasar, serta pemeliharaan jangka panjang (*longevity*).

---

## 1. System Topology

Sesuai dengan **CTO Decision #001**, sistem ini menggunakan arsitektur 3-tier sederhana:

```
                  ┌───────────────────────┐
                  │    Browser Client     │
                  └───────────┬───────────┘
                              │
             HTTP Requests    │    Admin Actions / API Calls
             (HTML/CSS/JS)    │    (REST API + JSON)
                              ▼
                  ┌───────────────────────┐
                  │     Node.js Server    │  ◄─── (Single Server Node)
                  └───────────┬───────────┘
                              │
             SQL Queries      │    node-postgres (pg)
             (RESTful CRUD)   │    
                              ▼
                  ┌───────────────────────┐
                  │   PostgreSQL Database │
                  └───────────────────────┘
```

---

## 2. Technology Stack

* **Frontend**: HTML5, Vanilla CSS (menggunakan CSS variables), dan Vanilla Javascript (ES6+).
  * *Alasan*: Menghindari overhead build-step yang rumit untuk web portofolio statis/dinamis, memastikan kecepatan pemuatan halaman instant (*performance priority*), dan menjamin relevansi kode dalam 3 tahun ke depan tanpa dependensi framework JS yang sering berubah.
* **Backend API**: Node.js dengan Express.js.
  * *Alasan*: Ringan, mudah dikonfigurasi, dan memiliki dukungan pustaka yang sangat luas untuk REST API.
* **Database**: PostgreSQL.
  * *Alasan*: Database relasional yang solid, sangat stabil, mendukung pencarian teks, JSONB jika diperlukan, dan integrasi mudah dengan Node.js.
* **Database Driver**: `pg` (node-postgres).
  * *Alasan*: Driver PostgreSQL native untuk Node.js yang cepat dan handal tanpa kompleksitas ORM yang berlebihan.

---

## 3. Directory Layout (Monorepo)

Untuk memudahkan pengelolaan kode dan pendeployan, proyek ini disusun dalam satu repositori (*monorepo*):

```text
PORTOFOLIO/
├── docs/                 # Dokumentasi proyek (Vision, Design, dll.)
├── src/
│   ├── server/           # Backend (Express API, DB config, routes)
│   │   ├── config/       # Koneksi PostgreSQL
│   │   ├── middleware/   # Auth & error handling
│   │   ├── routes/       # Endpoint routing (projects, gallery, articles)
│   │   └── index.js      # Server entry point
│   ├── public/           # Frontend Public Website (HTML, CSS, JS)
│   │   ├── css/          # Desain sistem & style halaman utama
│   │   ├── js/           # Integrasi API & interaksi client-side
│   │   └── index.html    # Entry point public website
│   └── admin/            # Frontend Admin CMS (HTML, CSS, JS)
│       ├── css/          # Style khusus dashboard
│       ├── js/           # Logika CRUD & integrasi CMS API
│       └── index.html    # Entry point dashboard
├── .gitignore
├── README.md
├── package.json
└── schema.sql            # Skema database PostgreSQL
```

---

## 4. Single Admin CMS Security Constraints

Sistem ini dirancang secara eksklusif untuk satu orang administrator (**Single-user Admin / Rifqi Abdullah**). Demi mempertahankan ruang lingkup proyek yang ramping (MVP) dan mencegah kerentanan keamanan yang tidak perlu:
* **No User Registration**: Tidak ada halaman pendaftaran akun. Akun admin tunggal di-seeding langsung melalui skrip inisialisasi database.
* **No Password Reset**: Tidak ada fitur pemulihan kata sandi, kirim email reset, atau integrasi server SMTP.
* **No User Management**: Tidak ada fitur tambah/edit/hapus pengguna lain ataupun pembagian peran (*role management*). Hanya ada satu akun admin tunggal yang memiliki akses penuh ke CMS.

### Mekanisme Autentikasi JWT:
1. Admin mengirimkan POST ke `/api/auth/login` dengan username dan password.
2. Server memvalidasi kredensial dengan password hash di database (`bcrypt`).
3. Jika valid, server menerbitkan JWT token dan menyimpannya di cookie client dengan flag `HttpOnly; Secure; SameSite=Strict; Path=/`.
4. Semua endpoint API mutatif (POST, PUT, DELETE) di bawah `/api/` dilindungi oleh middleware `authMiddleware` yang memverifikasi JWT dari cookie.

---

## 5. File & Media Upload Mechanics

Mengingat prinsip **Image First** dan **Simple Admin**:
* **Penyimpanan Media**: Selama masa pengembangan (Sprint 1-2), gambar akan diunggah dan disimpan langsung di sistem berkas lokal server di bawah folder `/src/public/uploads/`.
* **Struktur Folder Unggahan**:
  * `/src/public/uploads/profiles/` - Untuk file PDF Resume/CV dan gambar profil.
  * `/src/public/uploads/projects/` - Untuk file gambar sampul (cover) dan galeri proyek.
  * `/src/public/uploads/albums/` - Untuk file gambar sampul album dan file media (foto/video thumbnail) di dalam album.
* **Optimasi Gambar**: Upload dibatasi maksimal 5MB per file. Server akan menolak format non-gambar (hanya menerima JPEG, PNG, WEBP, dan PDF khusus untuk resume).
* **Integrasi Database**: Server akan menyimpan path lokal file yang diunggah (misal: `/uploads/projects/project-cover.jpg`) ke dalam tabel database PostgreSQL.
