# User Flow

Dokumen ini mendefinisikan alur pengguna (*User Flow*) untuk dua aktor utama:
1. **Public User** (Dosen, Rekruter, Teman, Mitra Kolaborasi).
2. **Admin** (Rifqi Abdullah).

---

## 1. Public User Flow

### A. Alur Menjelajahi Profil & Aktivitas
Tujuan: Menilai identitas diri, pencapaian terbaru, riwayat aktivitas, dan kompetensi Rifqi.

```mermaid
sequenceDiagram
    actor User as Public User (Dosen/Rekruter)
    participant Home as Halaman Utama (/)
    participant Projects as Halaman Projects (/projects)
    
    User->>Home: Membuka website
    Home-->>User: Menampilkan Hero (Bio, Status Saat Ini)
    User->>Home: Menjelajah ke section Achievements (Milestones) & Activities (Timeline)
    Home-->>User: Menampilkan daftar pencapaian & rentetan aktivitas
    User->>Home: Klik "Unduh CV / Resume"
    Home-->>User: File CV terunduh (PDF)
    User->>Home: Klik "Lihat Semua Proyek"
    Home->>Projects: Mengalihkan ke halaman Proyek
    Projects-->>User: Menampilkan filter tipe proyek & daftar proyek
```

### B. Alur Mengapresiasi Karya Visual & Cerita (Photography/Videography)
Tujuan: Menikmati dokumentasi karya fotografi/videografi beserta konsep cerita, lokasi, dan tanggal di belakangnya.

```mermaid
sequenceDiagram
    actor User as Public User (Teman/Mitra)
    participant Gallery as Halaman Gallery (/gallery)
    participant Album as Album Detail (/gallery/:slug)
    
    User->>Gallery: Membuka menu Photography/Videography
    Gallery-->>User: Menampilkan Grid Album dengan foto sampul yang besar
    User->>Gallery: Klik salah satu Album Foto/Video
    Gallery->>Album: Mengalihkan ke detail Album
    Album-->>User: Menampilkan Metadata (Lokasi, Tanggal), Story, & Grid Media (Photos/Videos)
    User->>Album: Klik salah satu file foto
    Album-->>User: Membuka Lightbox Viewer (Foto layar penuh, navigasi geser)
```

---

## 2. Admin Flow (Rifqi as CMS User)

### A. Alur Awal: Login & Masuk Workspace (Single Admin CMS)
Tujuan: Masuk ke dalam CMS secara aman tanpa adanya registrasi atau lupa password.

```mermaid
graph TD
    Start([Mulai]) --> OpenLogin[Buka Halaman /admin/login]
    OpenLogin --> InputCredentials[Masukkan Username & Password]
    InputCredentials --> CheckAuth{Apakah Kredensial Valid?}
    CheckAuth -- Tidak --> ShowError[Tampilkan Pesan Error] --> OpenLogin
    CheckAuth -- Ya --> RedirectDashboard[Masuk ke Halaman /admin Workspace]
    RedirectDashboard --> End([Selesai])
```

### B. Alur Mengelola Album Baru (Albums, Photos, Videos)
Tujuan: Mengunggah album baru dengan metadata (lokasi, tanggal, cover) dan menambahkan foto/video ke dalamnya.

```mermaid
graph TD
    Start([Mulai di Halaman /admin]) --> ClickAddAlbum[Klik "Buat Album Baru"]
    ClickAddAlbum --> OpenForm[Buka Form Album]
    OpenForm --> InputData[Masukkan Judul, Lokasi, Tanggal, Story]
    InputData --> UploadCover[Upload File Sampul Album]
    UploadCover --> SelectStatus{Pilih Status}
    SelectStatus -- Draf --> SaveDraft[Simpan sebagai Draf]
    SelectStatus -- Publish --> SavePublish[Simpan & Terbitkan]
    SaveDraft --> DBSave[(Simpan ke Tabel albums)]
    SavePublish --> DBSave
    DBSave --> OpenAlbumDetail[Buka Halaman Detail Album di CMS]
    OpenAlbumDetail --> ClickUploadMedia[Klik "Unggah Media Foto/Video"]
    ClickUploadMedia --> UploadMediaFiles[Upload File Foto/Video ke album_photos / album_videos]
    UploadMediaFiles --> End([Selesai])
```

### C. Alur Mengunggah Proyek Baru
Tujuan: Menambah proyek baru (Web, Riset, Event, dll) dengan opsi galeri pendukung dan tautan luar.

```mermaid
graph TD
    Start([Mulai di Halaman /admin]) --> ClickAddProject[Klik "Tambah Proyek Baru"]
    ClickAddProject --> OpenFormProject[Buka Form Proyek]
    OpenFormProject --> InputDetails[Masukkan Judul, Tipe Proyek, Deskripsi, Markdown Content]
    InputDetails --> UploadCover[Upload Cover Gambar]
    UploadCover --> AddGallery[Unggah Foto Galeri Pendukung - Opsional]
    AddGallery --> AddLinks[Masukkan Tautan Demo/Github - Opsional]
    AddLinks --> SaveProject[(Simpan ke Tabel projects)]
    SaveProject --> End([Selesai])
```
