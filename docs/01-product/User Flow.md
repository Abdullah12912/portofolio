# User Flow

Dokumen ini mendefinisikan alur pengguna (*User Flow*) untuk dua aktor utama:
1. **Public User** (Dosen, Rekruter, Teman, Mitra Kolaborasi).
2. **Admin** (Rifqi Abdullah).

---

## 1. Public User Flow

### A. Alur Menjelajahi Profil Akademik & Aktivitas (Untuk Dosen & Rekruter)
Tujuan: Menilai kualifikasi akademis, organisasi, dan keahlian Rifqi.

```mermaid
sequenceDiagram
    actor User as Public User (Dosen/Rekruter)
    participant Home as Halaman Utama (/)
    participant Projects as Halaman Projects (/projects)
    
    User->>Home: Membuka website
    Home-->>User: Menampilkan Hero (Bio, Status Saat Ini)
    User->>Home: Menjelajah ke section Akademik/Organisasi/Pencapaian
    Home-->>User: Menampilkan daftar kompetensi & riwayat organisasi
    User->>Home: Klik "Unduh CV / Resume"
    Home-->>User: File CV terunduh (PDF)
    User->>Home: Klik "Lihat Semua Proyek"
    Home->>Projects: Mengalihkan ke halaman Proyek
    Projects-->>User: Menampilkan filter & daftar proyek lengkap
```

### B. Alur Mengapresiasi Karya Visual & Cerita (Untuk Mitra & Teman)
Tujuan: Menikmati dokumentasi karya fotografi/videografi beserta proses kreatif di belakangnya.

```mermaid
sequenceDiagram
    actor User as Public User (Teman/Mitra)
    participant Gallery as Halaman Gallery (/gallery)
    participant Album as Album Detail (/gallery/:slug)
    
    User->>Gallery: Membuka menu Photography/Videography
    Gallery-->>User: Menampilkan Grid Album dengan foto sampul yang besar
    User->>Gallery: Klik salah satu Album Foto
    Gallery->>Album: Mengalihkan ke detail Album
    Album-->>User: Menampilkan cerita dibalik karya (Story) & galeri foto
    User->>Album: Klik salah satu foto
    Album-->>User: Membuka Lightbox Viewer (Foto layar penuh, navigasi geser)
```

---

## 2. Admin Flow (Rifqi as CMS User)

### A. Alur Awal: Login & Masuk Workspace
Tujuan: Masuk ke dalam CMS secara aman.

```mermaid
graph TD
    Start([Mulai]) --> OpenLogin[Buka Halaman /admin/login]
    OpenLogin --> InputCredentials[Masukkan Username & Password]
    InputCredentials --> CheckAuth{Apakah Kredensial Valid?}
    CheckAuth -- Tidak --> ShowError[Tampilkan Pesan Error] --> OpenLogin
    CheckAuth -- Ya --> RedirectDashboard[Masuk ke Halaman /admin Workspace]
    RedirectDashboard --> End([Selesai])
```

### B. Alur Mengunggah Karya Baru (Photography/Videography)
Tujuan: Mengunggah album foto tematik dengan cerita di baliknya.

```mermaid
graph TD
    Start([Mulai di Halaman /admin]) --> ClickAddMedia[Klik "Unggah Karya Baru"]
    ClickAddMedia --> OpenForm[Buka Form Upload Media]
    OpenForm --> InputData[Masukkan Judul Album, Deskripsi Cerita, Kategori]
    InputData --> UploadImages[Upload File Foto Utama & File Pendukung]
    UploadImages --> SelectStatus{Pilih Status Publikasi}
    SelectStatus -- Draf --> SaveDraft[Simpan sebagai Draf]
    SelectStatus -- Publish --> SavePublish[Simpan & Publikasikan]
    SaveDraft --> DBSave[(Simpan ke Database)]
    SavePublish --> DBSave
    DBSave --> RedirectList[Kembali ke Daftar Media & Tampilkan Notifikasi Sukses]
    RedirectList --> End([Selesai])
```

### C. Alur Menulis Artikel Baru (Writing)
Tujuan: Membuat draf tulisan, mengedit, dan menerbitkannya.

```mermaid
graph TD
    Start([Mulai di Halaman /admin]) --> ClickWrite[Klik "Tulis Artikel Baru"]
    ClickWrite --> OpenEditor[Buka Editor Artikel]
    OpenEditor --> WriteContent[Tulis Judul & Konten dengan Markdown/Rich Text]
    WriteContent --> SetSlug[Tentukan Slug URL & Kategori]
    SetSlug --> SetStatus{Tentukan Status}
    SetStatus -- Simpan Draf --> SaveDraft[Simpan ke DB dengan status Draft]
    SetStatus -- Terbitkan --> SavePublish[Simpan ke DB dengan status Published]
    SaveDraft --> RedirectList[Kembali ke Daftar Tulisan]
    SavePublish --> RedirectList
    RedirectList --> End([Selesai])
```
