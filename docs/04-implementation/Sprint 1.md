# Sprint 1 — Environment Setup & Static Public Pages

Sprint 1 difokuskan pada penyusunan fondasi proyek, instalasi database lokal, dan pembuatan struktur antarmuka halaman publik secara statis menggunakan *mock data*.

---

## 1. Objectives
* Menyusun struktur monorepo proyek.
* Menginisialisasi repositori Git lokal dan setup server Node.js.
* Menyiapkan file DDL skema database PostgreSQL (`schema.sql`).
* Menyelesaikan tampilan dasar (HTML/CSS) untuk halaman publik:
  * **Halaman Utama (Student Profile)**
  * **Halaman Projects Showcase**
  * **Halaman Photography Gallery**
  * **Halaman Detail Project / Album / Article**

---

## 2. Tasks & Checklist

### A. Core Boilerplate Setup
* [ ] Inisialisasi `package.json` di root dengan dependensi dasar (`express`, `pg`, `dotenv`, `jsonwebtoken`, `bcryptjs`, dan devDependensi `nodemon`).
* [ ] Konfigurasi `.gitignore` untuk mengecualikan `node_modules`, `.env`, dan folder upload media `/src/public/uploads/`.
* [ ] Buat file `.env.example` untuk mencatat parameter konfigurasi (DB credentials, PORT, JWT Secret).

### B. Database Schema Script
* [ ] Buat file `schema.sql` di root proyek berisi seluruh DDL tabel (`admins`, `student_info`, `projects`, `media_albums`, `media_items`, `articles`) dan index.
* [ ] Buat script inisialisasi awal (*seeding script*) sederhana untuk memasukkan data admin default (`rifqi_admin` dengan password hash default) dan data profil mahasiswa default.

### C. Static Frontend Landing Pages (Public UI Skeleton)
* [ ] Buat file CSS utama `src/public/css/index.css` yang merealisasikan **Design System** (CSS variables, font loading, reset default, global layout, responsive utilities).
* [ ] Buat file HTML & CSS statis untuk halaman utama publik (`src/public/index.html`). Pastikan memuat:
  * Glassmorphism navigation bar.
  * Hero section (Student Info).
  * Section portofolio ringkas.
* [ ] Buat mockup visual halaman Photography & Videography (`src/public/gallery.html`) dan Projects (`src/public/projects.html`).
* [ ] Buat halaman detail visual untuk template karya (`src/public/detail.html`).
* [ ] Implementasikan efek transisi hover, micro-interactions, serta viewer Lightbox statis sederhana menggunakan Vanilla JS.

---

## 3. Definition of Done (DoD) for Sprint 1
* Struktur folder monorepo terbentuk lengkap.
* Server Node.js/Express berhasil berjalan secara lokal (menyajikan folder `src/public` secara statis).
* Script `schema.sql` dapat dieksekusi tanpa error di database PostgreSQL lokal.
* Seluruh halaman publik statis responsif dan lolos pengujian tampilan di browser utama (Chrome/Edge/Firefox).
* Git commit selesai menggunakan standard **Conventional Commits** dan dikirim ke repositori GitHub.
