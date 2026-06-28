# Sprint 1 — Project Setup, Database Schema & Static Landing Pages

Sprint 1 difokuskan sepenuhnya pada penyusunan struktur repositori (*boilerplate*), inisialisasi skema database PostgreSQL lokal, serta pembuatan halaman-halaman publik secara statis menggunakan *mock data*. Tidak ada pengerjaan API, login, ataupun CRUD dinamis pada sprint ini.

---

## 1. Objectives
* Inisialisasi repositori Git dan monorepo folder layout.
* Menyiapkan file DDL skema database PostgreSQL (`schema.sql`).
* Membuat halaman publik statis (HTML/CSS) yang responsif:
  * **Halaman Utama (Profile, Current, Achievements, Activities)**
  * **Halaman Projects Showcase**
  * **Halaman Photography & Videography Gallery**
  * **Halaman Detail Album / Project / Article**
* Menyajikan halaman statis menggunakan Node.js/Express static server dasar.

---

## 2. Tasks & Checklist

### A. Environment Setup & Boilerplate
* [ ] Inisialisasi `package.json` di root dengan package dasar (Express, dotenv, pg, bcryptjs, jsonwebtoken, nodemon).
* [ ] Konfigurasi `.gitignore` untuk mengecualikan `node_modules/`, `.env`, dan folder media `src/public/uploads/`.
* [ ] Buat file `.env.example` sebagai referensi kredensial database lokal.

### B. Database Schema Creation (DDL)
* [ ] Buat file `schema.sql` di root proyek yang berisi query DDL untuk pembuatan tabel `admins`, `profile`, `achievements`, `activities`, `projects`, `albums`, `album_photos`, `album_videos`, dan `articles` beserta indeks-indeksnya.
* [ ] Buat query inisialisasi data awal (*seeding script*) di akhir file `schema.sql` untuk memasukkan data admin tunggal default (`rifqi_admin` dengan password hash) dan profil awal.

### C. Static Frontend Landing Pages
* [ ] Buat stylesheet utama `src/public/css/index.css` yang memuat seluruh CSS variables dari **Design System** (Typography Strategy, Color Palette, Spacing Scale).
* [ ] Bangun layout kerangka responsif (`src/public/index.html`) yang menampilkan:
  * Glassmorphism header & navigation bar.
  * Hero section (Nama, Bio, Current activity status).
  * Section Achievements (Milestones) dan Activities (Timeline).
  * Footer minimalis.
* [ ] Bangun halaman daftar proyek statis (`src/public/projects.html`) dan galeri album visual statis (`src/public/gallery.html`).
* [ ] Bangun halaman detail statis (`src/public/detail.html`) untuk melihat detail tulisan, detail album (menampilkan cerita/story, lokasi, tanggal), dan detail proyek.
* [ ] Implementasikan interaksi visual micro-animations (hover transitions) dan lightbox viewer statis menggunakan Vanilla JS.
* [ ] Buat server statis Express sederhana di `src/server/index.js` untuk menyajikan folder `src/public/` secara statis pada PORT local development.

---

## 3. Definition of Done (DoD) for Sprint 1
* Seluruh berkas dokumentasi baseline v1.0 berada di tempatnya.
* Server Node.js Express berhasil berjalan secara lokal dan menyajikan halaman statis publik tanpa error.
* Script database `schema.sql` dapat dieksekusi penuh di PostgreSQL lokal.
* Halaman HTML statis responsif pada perangkat mobile (Mobile-First approach) dan browser desktop.
* Memenuhi proses verifikasi wajib:
  * `npm run lint` berjalan sukses tanpa error (setelah linter dipasang).
  * `npm run build` berjalan sukses (jika ada build-step, jika tidak ada, server dipastikan running cleanly).
* Git commit selesai menggunakan Conventional Commits.
