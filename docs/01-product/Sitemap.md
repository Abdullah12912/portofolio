# Sitemap

Peta situs (*Sitemap*) ini mendefinisikan seluruh halaman yang ada pada **Public Website** dan **Admin Dashboard**.

```mermaid
graph TD
    %% Public Website Pages
    SubPublic[Public Website] --> Home[Home / Profile & Current]
    SubPublic --> Photography[Photography & Videography]
    SubPublic --> Projects[Projects Showcase]
    SubPublic --> Writing[Writing / Articles]
    
    Photography --> AlbumDetail[Album Detail Page]
    Projects --> ProjectDetail[Project Detail Page]
    Writing --> ArticleDetail[Article Read Page]
    
    %% Admin Dashboard Pages
    SubAdmin[Admin Dashboard] --> Login[Auth / Login Page]
    SubAdmin --> DashboardHome[Dashboard Home / Creator Workspace]
    SubAdmin --> AdminProfile[Manage Profile & Current]
    SubAdmin --> AdminProjects[Manage Projects CRUD]
    SubAdmin --> AdminMedia[Manage Albums, Photos, Videos CRUD]
    SubAdmin --> AdminWriting[Manage Articles CRUD]
```

---

## 1. Public Website

Halaman-halaman yang dapat diakses oleh publik secara bebas:

### A. Home (Profile & Current) - `/`
Halaman utama yang memperkenalkan identitas Rifqi.
* **Hero Section**: Tagline, biografi singkat, dan status saat ini (Current).
* **Current & Highlighted Section**: Cuplikan proyek terbaru, foto terbaru, dan artikel terbaru.
* **Achievements & Activities**: Timeline aktivitas singkat dan riwayat pencapaian.
* **Contact & Links**: Link media sosial, email, dan Resume/CV.

### B. Photography & Videography - `/gallery`
Dokumentasi karya visual.
* **Gallery Grid**: Daftar album foto tematik dan video.
* **Album Detail - `/gallery/:album-slug`**:
  * Judul album, lokasi, tanggal, deskripsi cerita konsep (*Story* - first class).
  * Tampilan foto-foto besar dengan lightbox viewer.
  * Tautan video (jika berupa video).

### C. Projects - `/projects`
Daftar seluruh proyek (coding, riset, proposal, event, dll).
* **Project Filter & Grid**: Filter berdasarkan tipe (Software, Research, Academic, Photography, Video, Creative, Other).
* **Project Detail - `/projects/:project-slug`**:
  * Deskripsi mendalam, tantangan, solusi, dan cerita pembuatan.
  * Media pendukung opsional (foto pameran, diagram arsitektur, proposal PDF, atau video).
  * Tautan eksternal opsional (GitHub, Demo Live, Laporan Penelitian).

### D. Writing - `/writing`
Catatan, refleksi, dan artikel.
* **Article List**: Daftar artikel dengan tanggal publikasi dan estimasi waktu baca.
* **Article Detail - `/writing/:article-slug`**:
  * Halaman baca artikel dengan format tipografi yang optimal untuk pembacaan lama (*clean typography*).

---

## 2. Admin Dashboard (CMS Workspace)

Halaman terbatas untuk pengelolaan konten (CMS) oleh Rifqi:

### A. Login - `/admin/login`
* Halaman autentikasi administrator menggunakan *username* dan *password*.

### B. Workspace Home (Dashboard) - `/admin`
* Halaman utama admin yang berfokus pada aksi cepat: tombol "Unggah Karya Foto", "Tulis Artikel", "Tambah Proyek Baru", dan daftar draf konten yang sedang dikerjakan.

### C. Manage Profile - `/admin/profile`
* Formulir untuk memperbarui status saat ini, teks biografi hero, daftar kompetensi, daftar pencapaian, dan file CV/Resume.

### D. Manage Projects - `/admin/projects`
* Daftar semua proyek.
* Form Tambah/Edit Proyek (Judul, Tipe, Deskripsi, Cover Image, Galeri Proyek [opsional], Tautan Eksternal [opsional], Status: Draf/Publish).
* Hapus Proyek.

### E. Manage Albums - `/admin/albums`
* Daftar album foto dan video.
* Form Tambah/Edit Album (Judul, Lokasi, Tanggal, Cerita/Deskripsi, Upload Cover, Status: Draf/Publish).
* Upload & Manage Photos/Videos untuk album tersebut (Drag & drop upload file gambar/video).
* Hapus Album.

### F. Manage Writing - `/admin/writing`
* Daftar artikel.
* Editor artikel (Rich Text / Markdown editor sederhana).
* Pengaturan artikel (Status: Draf/Publish, Kategori, Tanggal rilis).
* Hapus Artikel.
