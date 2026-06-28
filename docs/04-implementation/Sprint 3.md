# Sprint 3 — CMS Integration, Media Uploads & Polish

Sprint 3 merupakan fase akhir untuk menghubungkan antarmuka Admin Dashboard dengan API Backend, menyelesaikan fitur unggah berkas (gambar/pdf), mempercantik desain visual secara keseluruhan, serta melakukan verifikasi akhir sesuai dengan *Definition of Done*.

---

## 1. Objectives
* Menghubungkan form input Admin Dashboard CMS dengan backend REST API (CRUD penuh secara dinamis).
* Menyelesaikan fitur *drag-and-drop file upload* untuk gambar sampul proyek, foto galeri, dan PDF resume.
* Melakukan penyelarasan desain (*styling polish*) pada website publik agar terasa premium, memiliki transisi yang halus, dan mematuhi *Design System*.
* Memastikan seluruh website dan CMS bebas dari bug melalui pengujian fungsional penuh.

---

## 2. Tasks & Checklist

### A. Media Upload Integration (Multer)
* [ ] Konfigurasi pustaka `multer` di server untuk menangani unggah file multipart/form-data.
* [ ] Tambahkan validasi tipe file (hanya menerima JPG, PNG, WEBP, dan PDF untuk resume) dan batasi ukuran maksimal file.
* [ ] Sambungkan endpoint upload media pada route proyek, album foto, dan profil mahasiswa.

### B. Admin CMS CRUD Integration (JavaScript Fetch)
* [ ] Implementasikan AJAX Fetch calls pada Admin Dashboard untuk memproses Login, Logout, dan verifikasi status autentikasi.
* [ ] Hubungkan form CRUD Projects (Create, Read, Update, Delete) secara dinamis menggunakan database PostgreSQL.
* [ ] Hubungkan manajemen Album Foto & Video beserta unggah file media secara dinamis.
* [ ] Hubungkan editor teks Artikel (Writing) untuk menyimpan draft dan publikasi tulisan.
* [ ] Hubungkan panel Profile Info untuk memutakhirkan identitas status kemahasiswaan Rifqi.

### C. Public Website Integration & Polish
* [ ] Hubungkan frontend halaman utama publik (`index.html`) agar menarik data profil, proyek teratas, foto teratas, dan tulisan terbaru secara dinamis dari API.
* [ ] Lengkapi fungsionalitas dinamis halaman Projects, Photography Gallery, serta halaman detail masing-masing konten.
* [ ] Implementasikan visual lightbox interaktif menggunakan Vanilla JS agar foto dapat dilihat secara penuh dengan transisi halus.
* [ ] Lakukan pembenahan detail visual (*styling polish*): warna HSL, rasio gambar, jarak spasi modular, font Outfit & Inter, serta glassmorphism.

### D. Final Verification & Bug Fixing
* [ ] Uji fungsionalitas menyeluruh: edit data profil, tambah proyek, upload foto ke album, tulis & terbitkan artikel, dan uji proteksi keamanan admin.
* [ ] Lakukan verifikasi performa pemuatan halaman (minimalisir CSS/JS blocking).

---

## 3. Definition of Done (DoD) for Sprint 3
* Seluruh fitur utama (Student Info, Projects, Photography & Videography, Writing, dan Admin Dashboard) berfungsi penuh secara dinamis terhubung ke database.
* Admin dashboard terproteksi dengan aman dan manajemen media upload berjalan tanpa error.
* Desain visual konsisten, premium, responsif, dan memuaskan prinsip *Image First, Content First*.
* Seluruh progress ter-commit dengan Conventional Commits dan repositori GitHub diperbarui sepenuhnya.
