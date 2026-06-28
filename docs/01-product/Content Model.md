# Content Model

Dokumen ini mendefinisikan model konten kanonik (*canonical content model*) untuk website portofolio Rifqi Abdullah. Dokumen ini menjadi pedoman utama sebelum merancang database dan API.

---

## 1. Content Relationships

```text
Profile (Rifqi Abdullah)
│
├── Achievements (Milestones)
├── Activities (Timeline entries)
├── Projects (Generic: coding, photography, riset, dll)
├── Articles (Refleksi & Tulisan)
└── Albums (Koleksi visual tematik)
        │
        ├── Album Photos
        └── Album Videos
```

---

## 2. Content Type Definitions

### A. Profile
Informasi identitas dasar pemilik portofolio. Hanya memiliki 1 instansi (*singleton*).
* **fullname**: `Text` (Wajib). Nama lengkap yang ditampilkan di web.
* **bio**: `Text` (Wajib). Biografi singkat untuk hero section.
* **current_activity**: `Text` (Wajib). Deskripsi singkat status/kesibukan saat ini (Current).
* **cv_url**: `Text` (Opsional). Tautan ke file PDF resume/CV yang bisa diunduh.
* **competencies**: `List of Text` (Wajib). Daftar keahlian/kompetensi utama.
* **social_links**: `Key-Value Pair` (Wajib). Tautan akun LinkedIn, GitHub, Instagram.

### B. Achievements (Milestones)
Prestasi penting, penghargaan, atau sertifikasi yang menandai pencapaian Rifqi.
* **title**: `Text` (Wajib). Nama pencapaian/penghargaan.
* **year**: `Text` (Wajib). Tahun perolehan (misal: "2025").
* **description**: `Text` (Opsional). Deskripsi singkat mengenai pencapaian tersebut.

### C. Activities (Timeline Entries)
Log aktivitas atau log perjalanan berupa entri pendek dalam alur waktu (*timeline*).
* **title**: `Text` (Wajib). Nama kegiatan atau pembaruan.
* **date**: `Date` (Wajib). Waktu pelaksanaan aktivitas.
* **description**: `Text` (Opsional). Detail singkat tentang kegiatan.

### D. Projects
Semua jenis proyek (Coding, Penelitian, Riset, Proposal, Event, dll).
* **title**: `Text` (Wajib). Nama proyek.
* **slug**: `Text` (Wajib, Unik). Identifier ramah URL.
* **type**: `Enum` (Wajib). Kategori proyek:
  * `software` (Coding/Web)
  * `research` (Penelitian ilmiah)
  * `academic` (Tugas/proyek kuliah)
  * `photography` (Proyek khusus foto)
  * `video` (Pembuatan video/film)
  * `creative` (Desain/karya seni lain)
  * `other` (Lainnya)
* **description**: `Text` (Wajib). Ringkasan pendek yang muncul pada kartu daftar proyek.
* **cover**: `Text` (Wajib). Tautan/path gambar sampul utama proyek.
* **content**: `Markdown Text` (Wajib). Deskripsi mendalam mengenai proyek.
* **gallery**: `List of Text` (Opsional). Daftar path gambar pendukung (bisa kosong).
* **external_links**: `Key-Value Pair` (Opsional). Tautan menuju repositori GitHub, demo langsung, atau file laporan (bisa kosong).
* **status**: `Enum` (Wajib). Pilihan: `draft` atau `published`.

### E. Albums
Koleksi karya visual tematik (fotografi atau videografi) yang memiliki narasi khusus.
* **title**: `Text` (Wajib). Judul album.
* **slug**: `Text` (Wajib, Unik). Identifier ramah URL.
* **location**: `Text` (Wajib). Tempat pengambilan gambar/karya.
* **date**: `Date/Text` (Wajib). Waktu pembuatan karya (misal: "Juni 2026").
* **story**: `Markdown Text` (Wajib). Narasi konsep, proses kreatif, atau Behind the Scenes (BTS) sebagai *first-class field*.
* **cover**: `Text` (Wajib). Tautan/path file gambar sampul album.
* **status**: `Enum` (Wajib). Pilihan: `draft` atau `published`.

### F. Album Photos
Foto spesifik yang menjadi bagian dari suatu album.
* **album_id**: `Reference` (Wajib). Kunci relasi ke album pemilik.
* **file_url**: `Text` (Wajib). Path file gambar.
* **caption**: `Text` (Opsional). Deskripsi singkat/cerita mikro dari foto terkait.
* **sort_order**: `Integer` (Wajib, Default: `0`). Menentukan urutan visual saat foto ditampilkan di galeri.

### G. Album Videos
Video spesifik yang diunggah atau ditautkan ke dalam suatu album.
* **album_id**: `Reference` (Wajib). Kunci relasi ke album pemilik.
* **file_url**: `Text` (Wajib). Path file thumbnail/cover video lokal.
* **video_url**: `Text` (Wajib). Tautan streaming eksternal (YouTube/Vimeo).
* **caption**: `Text` (Opsional). Deskripsi singkat video.
* **sort_order**: `Integer` (Wajib, Default: `0`). Menentukan urutan visual.

### H. Articles
Catatan, tulisan, dan refleksi pemikiran Rifqi.
* **title**: `Text` (Wajib). Judul tulisan.
* **slug**: `Text` (Wajib, Unik). Identifier ramah URL.
* **content**: `Markdown Text` (Wajib). Konten artikel lengkap.
* **category**: `Text` (Opsional). Kategori artikel (misal: "Refleksi", "Opini").
* **status**: `Enum` (Wajib). Pilihan: `draft` atau `published`.
* **published_at**: `Timestamp` (Opsional). Waktu artikel resmi diterbitkan ke publik.
