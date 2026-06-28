# Product Vision - Personal Portfolio Website

## Vision Statement
> Membangun website pribadi yang merepresentasikan perjalanan saya sebagai mahasiswa melalui pencapaian, aktivitas, karya visual, dan proyek yang saya kerjakan.

## Target Audience
1. **Dosen**: Melihat kompetensi akademis, riset, proposal, dan keterlibatan akademis Rifqi.
2. **Rekruter**: Meninjau portofolio proyek, keahlian praktis, dan profesionalisme.
3. **Teman**: Mengetahui aktivitas, organisasi, dan pemikiran Rifqi.
4. **Mitra Kolaborasi**: Menjajaki peluang proyek, riset, atau event bersama.
5. **Diri Sendiri**: Sebagai arsip digital/dokumentasi atas seluruh karya dan pencapaian.

---

## Content Priorities

### 1. Profile / Current
Menjawab pertanyaan: *"Mahasiswa seperti apa Rifqi saat ini?"*
* **Profil Diri**: Siapa saya, minat utama, dan status aktivitas terkini.
* **Current Status**: Apa yang sedang dikerjakan secara aktif sekarang (misal: "Menyusun proposal Tugas Akhir").
* **Kompetensi**: Daftar keterampilan dan bidang keahlian (soft skills & hard skills).

### 2. Achievements (Milestones)
Penghargaan, prestasi akademis, sertifikasi, atau beasiswa.
* **Akademik**: Indeks Prestasi Kumulatif (IPK) terpilih atau penghargaan dari kampus.
* **Kompetisi**: Penghargaan lomba tingkat regional, nasional, maupun internasional.

### 3. Activities (Timeline Entries)
Catatan harian, keterlibatan kepanitiaan/organisasi, seminar, workshop, kunjungan, atau pembaruan proyek.
* **Keterlibatan**: Keanggotaan organisasi, kepanitiaan event.
* **Timeline**: Aktivitas singkat seperti menghadiri pelatihan, peluncuran portofolio, dll.

### 4. Photography & Videography (Dokumentasi Karya Visual)
Bukan sekadar galeri biasa, melainkan media bercerita.
* **Album**: Kumpulan karya foto tematik.
* **Cerita (Stories)**: Narasi di balik foto, lokasi, tanggal pengambilan, proses kreatif, dan Behind The Scenes (BTS).
* **Video**: Dokumentasi video, sinematografi, atau dokumenter pendek.

### 5. Projects (Project ≠ Coding)
Semua jenis proyek yang pernah diinisiasi atau diikuti:
* **Web/Software**: Proyek pengembangan perangkat lunak (jika ada).
* **Riset & Akademis**: Karya ilmiah, proposal penelitian, jurnal.
* **Desain & Kreatif**: Desain visual, video dokumenter, kepanitiaan event.

### 6. Writing (Refleksi & Pemikiran)
Catatan tertulis untuk menunjukkan kedalaman berpikir:
* **Artikel & Refleksi**: Opini, ulasan topik tertentu, catatan harian pembelajaran.

---

## Out of Scope & MVP Boundaries

### CTO Decision #006 — MVP Boundary
**Status:** APPROVED & FROZEN

Untuk menjaga fokus produk, ruang lingkup versi pertama dibatasi secara ketat. MVP **tidak boleh** memuat fitur berikut:
* **Search**: Pencarian teks penuh pada situs.
* **Tags & Categories with Nesting**: Pengelompokan yang bertingkat atau tag bebas.
* **Likes & Comments**: Sistem interaksi sosial atau umpan balik publik.
* **View Counters & Analytics**: Penghitung jumlah tayang halaman atau dashboard grafik analitik.
* **RSS Feed**: Fitur sindikasi konten.
* **Multi-language Support**: Penyediaan konten dalam banyak bahasa (situs hanya akan menggunakan Bahasa Indonesia/Inggris secara statis).
* **AI-generated Content**: Integrasi kecerdasan buatan, chatbot, atau pembuat teks otomatis.
* **Rich Permission Systems**: Autentikasi multi-user (hanya ada single admin: Rifqi).
* **Notifications**: Notifikasi email, newsletter, atau push notifications.
* **Scheduling Posts**: Penjadwalan penerbitan konten secara otomatis di masa depan.
* **Draft Approval Workflows**: Alur kerja peninjauan konten sebelum dipublikasikan.

---

## CTO Decisions on Governance

### CTO Decision #005 — Documentation Hierarchy
**Status:** APPROVED & FROZEN

Dokumentasi proyek memiliki urutan otoritas sebagai berikut:
```
Vision.md
        │
        ▼
Sitemap.md
        │
        ▼
Content Model.md
        │
        ▼
Architecture.md
        │
        ▼
Database.md
        │
        ▼
API.md
        │
        ▼
Implementation Sprints
```
Dokumen di tingkat bawah **tidak boleh bertentangan** dengan dokumen di tingkat atas. Setiap perubahan fitur baru harus terlebih dahulu dicatatkan di tingkat atas sebelum dilakukan implementasi kode.

---

## Product Principles

### Principle 1: Content First
Desain UI bertujuan untuk mempermudah membaca dan menikmati konten. Tidak boleh ada ornamen desain yang mendistraksi dari teks atau gambar utama.

### Principle 2: Image First
Foto dan visual disajikan dalam ukuran besar. Pemanfaatan *whitespace* (jarak antar elemen) yang luas untuk memberikan ruang bernapas pada visual.

### Principle 3: Story First
Setiap karya, foto, atau proyek harus memiliki cerita di baliknya. Tidak hanya menampilkan hasil akhir, melainkan juga proses, lokasi, tanggal, dan pembelajaran.

### Principle 4: Simple Admin
Dashboard CMS harus sangat sederhana dan to-the-point. Sekali klik untuk mempublikasikan konten.

### Principle 5: Longevity
Struktur kode dan teknologi yang dipilih harus mudah dirawat (maintainable) dan tetap relevan dalam jangka waktu minimal 3 tahun ke depan tanpa harus dirombak total.
