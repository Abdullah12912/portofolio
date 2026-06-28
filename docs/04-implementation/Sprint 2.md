# Sprint 2 — REST API & Admin Dashboard CMS UI

Sprint 2 berfokus pada pembangunan logika server backend, integrasi database PostgreSQL, implementasi autentikasi JWT, dan penyelesaian tampilan antarmuka Admin Dashboard CMS.

---

## 1. Objectives
* Menghubungkan server Node.js/Express ke database PostgreSQL menggunakan `pg` pool.
* Mengimplementasikan sistem autentikasi admin (Login, Logout, Session check via HttpOnly cookie JWT).
* Mengembangkan endpoint RESTful API lengkap untuk seluruh model data (Student, Projects, Albums, Articles).
* Menyelesaikan tampilan dasar antarmuka Admin Dashboard CMS (`src/admin/index.html` & `src/admin/css/admin.css`) sebagai ruang kerja kreator.

---

## 2. Tasks & Checklist

### A. Database Connection & Helper
* [ ] Buat modul database wrapper `src/server/config/db.js` menggunakan koneksi *connection pool* dari pustaka `pg`.
* [ ] Uji koneksi database saat server startup.

### B. Authentication System (JWT)
* [ ] Tulis middleware `src/server/middleware/auth.js` untuk memverifikasi cookie JWT dan mengekstrak informasi admin.
* [ ] Bangun route autentikasi `src/server/routes/auth.js` (POST `/api/auth/login`, POST `/api/auth/logout`, GET `/api/auth/status`).

### C. REST API Endpoints Development
* [ ] Kembangkan route `src/server/routes/student.js` (GET publik & PUT terproteksi).
* [ ] Kembangkan route `src/server/routes/projects.js` (GET publik/admin & POST, PUT, DELETE terproteksi).
* [ ] Kembangkan route `src/server/routes/gallery.js` (GET publik/admin & POST, PUT, DELETE terproteksi).
* [ ] Kembangkan route `src/server/routes/articles.js` (GET publik/admin & POST, PUT, DELETE terproteksi).

### D. Admin Dashboard CMS UI
* [ ] Buat halaman login admin (`src/admin/login.html`) menggunakan styling minimalis dari Design System.
* [ ] Buat layout dashboard CMS (`src/admin/index.html`) yang responsif, bersih, dan berfokus pada fungsionalitas kreator (*Creator Workspace*).
* [ ] Bangun komponen navigasi sidebar admin dan panel CRUD statis untuk manajemen profil, proyek, galeri foto, dan artikel.

---

## 3. Definition of Done (DoD) for Sprint 2
* Seluruh endpoint REST API diuji secara lokal menggunakan API Client (Postman/cURL) dan mengembalikan format JSON yang sesuai spesifikasi.
* Halaman admin dilindungi secara ketat; pengguna tanpa JWT dialihkan secara otomatis ke halaman login.
* UI Dashboard CMS terbentuk dengan baik (sidebar navigasi aktif, form-form input statis siap diintegrasikan).
* Perubahan ter-commit dengan Conventional Commits dan di-push ke repositori GitHub.
