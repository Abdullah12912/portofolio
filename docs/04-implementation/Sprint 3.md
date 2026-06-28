# Sprint 3 — CMS Integration, Media Uploads & Polish

Sprint 3 merupakan fase akhir untuk menghubungkan antarmuka Admin Dashboard dengan API Backend, menyelesaikan fitur unggah berkas (gambar/pdf), mempercantik desain visual secara keseluruhan, serta melakukan verifikasi akhir sesuai dengan *Definition of Done*.

---

## 1. Objectives
* Menghubungkan form input Admin Dashboard CMS dengan backend REST API (CRUD penuh secara dinamis).
* Menyelesaikan fitur *drag-and-drop file upload* untuk gambar sampul, foto/video pendukung, dan PDF resume.
* Melakukan penyelarasan desain (*styling polish*) pada website publik agar terasa premium, memiliki transisi yang halus, dan mematuhi *Design System*.
* Memastikan seluruh website dan CMS bebas dari bug melalui pengujian fungsional penuh.

---

## 2. Tasks & Checklist

### A. Media Upload Integration (Multer)
* [ ] Konfigurasi pustaka `multer` di server untuk menangani unggah file multipart/form-data.
* [ ] Tambahkan validasi tipe file (hanya menerima JPG, PNG, WEBP, dan PDF untuk resume) dan batasi ukuran maksimal file (5MB).
* [ ] Sambungkan endpoint upload media pada route proyek, album foto/video, dan profil.

### B. Admin CMS CRUD Integration (JavaScript Fetch)
* [ ] Hubungkan form Login, Logout, dan verifikasi status autentikasi di Dashboard.
* [ ] Hubungkan form CRUD Projects (Create, Read, Update, Delete) secara dinamis menggunakan database PostgreSQL (termasuk optional gallery & external links).
* [ ] Hubungkan manajemen Album Foto & Video beserta unggah file media (`album_photos` & `album_videos`) secara dinamis.
* [ ] Hubungkan editor teks Artikel (Writing) untuk menyimpan draft dan publikasi tulisan.
* [ ] Hubungkan panel Profile info untuk memutakhirkan identitas diri, pencapaian (`achievements`), dan kegiatan (`activities`).

### C. Public Website Integration & Polish
* [ ] Hubungkan frontend halaman utama publik (`index.html`) agar menarik data profil, pencapaian, kegiatan timeline, proyek teratas, foto teratas, dan tulisan terbaru secara dinamis dari API.
* [ ] Lengkapi fungsionalitas dinamis halaman Projects, Photography Gallery, serta halaman detail masing-masing konten.
* [ ] Implementasikan visual lightbox interaktif menggunakan Vanilla JS agar foto/video dapat dilihat secara penuh dengan transisi halus.
* [ ] Lakukan pembenahan detail visual (*styling polish*): warna HSL, rasio gambar, jarak spasi modular, Typography Strategy, serta glassmorphism.

### D. Final Verification & Bug Fixing
* [ ] Uji fungsionalitas menyeluruh: edit data profil, tambah proyek, upload foto/video ke album, tulis & terbitkan artikel, dan uji proteksi keamanan admin.
* [ ] Lakukan verifikasi performa pemuatan halaman (minimalisir CSS/JS blocking).

---

## 3. Definition of Done (DoD) for Sprint 3
* Seluruh fitur utama (Profile, Projects, Photography & Videography, Writing, dan Admin Dashboard) berfungsi penuh secara dinamis terhubung ke database.
* Admin dashboard terproteksi dengan aman dan manajemen media upload berjalan tanpa error.
* Desain visual konsisten, premium, responsif, dan memuaskan prinsip *Image First, Content First*.
* Seluruh progress ter-commit dengan Conventional Commits dan repositori GitHub diperbarui sepenuhnya.
* Memenuhi proses verifikasi wajib:
  * `npm run lint` berjalan sukses tanpa error.
  * `npm run build` berjalan sukses.
