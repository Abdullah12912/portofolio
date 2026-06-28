# Sprint 2 — REST API & Admin Dashboard CMS UI

Sprint 2 berfokus pada pembangunan logika server backend, integrasi database PostgreSQL, implementasi autentikasi JWT (Single Admin CMS), pembuatan API Endpoint, dan penyelesaian tampilan antarmuka Admin Dashboard CMS.

---

## 1. Objectives
* Menghubungkan server Node.js/Express ke database PostgreSQL menggunakan `pg` pool.
* Mengimplementasikan sistem autentikasi JWT admin tunggal (Login, Logout, Session check via HttpOnly Cookie).
* Mengembangkan endpoint RESTful API lengkap untuk data:
  * **Profile** (termasuk sub-tabel `achievements` & `activities`).
  * **Projects** (validasi tipe proyek enum).
  * **Albums** (termasuk upload metadata `location`, `date`, `story`).
  * **Articles** (tulisan & draf).
* Menyelesaikan tampilan dasar antarmuka Admin Dashboard CMS (`src/admin/index.html` & `src/admin/css/admin.css`).

---

## 2. Tasks & Checklist

### A. Database Connection & Helper
* [ ] Buat modul database wrapper `src/server/config/db.js` menggunakan koneksi *connection pool* dari pustaka `pg`.
* [ ] Tambahkan logging status koneksi database saat server startup.

### B. Authentication System (Single Admin JWT)
* [ ] Tulis middleware `src/server/middleware/auth.js` untuk memverifikasi cookie JWT dan menolak request tidak sah.
* [ ] Bangun route autentikasi `src/server/routes/auth.js` (POST `/api/auth/login`, POST `/api/auth/logout`).

### C. REST API Endpoints Development
* [ ] Kembangkan route `src/server/routes/profile.js` (GET publik & PUT terproteksi, serta sub-route CRUD `achievements` & `activities`).
* [ ] Kembangkan route `src/server/routes/projects.js` (GET publik/admin & POST, PUT, DELETE terproteksi).
* [ ] Kembangkan route `src/server/routes/albums.js` (GET publik/admin & POST, PUT, DELETE terproteksi).
* [ ] Kembangkan route `src/server/routes/articles.js` (GET publik/admin & POST, PUT, DELETE terproteksi).

### D. Admin Dashboard CMS UI Layout
* [ ] Buat halaman login admin (`src/admin/login.html`) menggunakan styling minimalis dari Design System.
* [ ] Buat layout dashboard CMS (`src/admin/index.html`) yang responsif, bersih, dan berfokus pada fungsionalitas kreator (*Creator Workspace*).
* [ ] Bangun komponen navigasi sidebar admin dan panel CRUD statis untuk manajemen profil, proyek, galeri foto/video, dan artikel.

---

## 3. Definition of Done (DoD) for Sprint 2
* Seluruh endpoint REST API diuji secara lokal menggunakan API Client (Postman/cURL) dan mengembalikan format JSON yang sesuai spesifikasi.
* Halaman admin dilindungi secara ketat; pengguna tanpa JWT dialihkan secara otomatis ke halaman login.
* UI Dashboard CMS terbentuk dengan baik (sidebar navigasi aktif, form-form input statis siap diintegrasikan).
* Perubahan ter-commit dengan Conventional Commits dan di-push ke repositori GitHub.
* Memenuhi proses verifikasi wajib:
  * `npm run lint` berjalan sukses tanpa error.
  * `npm run build` berjalan sukses.
