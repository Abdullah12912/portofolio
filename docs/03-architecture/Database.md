# Database Schema (PostgreSQL)

Dokumen ini mendefinisikan skema database PostgreSQL, tipe data, relasi antar tabel, serta perintah DDL (Data Definition Language) untuk **Personal Portfolio Website & Admin Dashboard**.

---

## 1. Entity Relationship Diagram (ERD)

Skema database ini sangat sederhana dan dinormalisasi untuk mendukung kebutuhan konten tanpa kompleksitas berlebih.

```
  ┌───────────────┐
  │    admins     │
  └───────────────┘
  
  ┌───────────────┐
  │ student_info  │
  └───────────────┘
  
  ┌───────────────┐            ┌────────────────┐
  │  media_albums │ 1 ─── 0..* │  media_items   │
  └───────────────┘            └────────────────┘
  
  ┌───────────────┐
  │   projects    │
  └───────────────┘
  
  ┌───────────────┐
  │   articles    │
  └───────────────┘
```

---

## 2. Table Definitions & DDL

### A. Admins Table (`admins`)
Menyimpan kredensial login admin tunggal.
```sql
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### B. Student Info Table (`student_info`)
Menyimpan data identitas pribadi Rifqi sebagai mahasiswa. Hanya akan ada 1 baris (*row*) data di tabel ini.
```sql
CREATE TABLE student_info (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    current_activity TEXT NOT NULL, -- Sedang mengerjakan apa
    cv_url VARCHAR(255),            -- Tautan file PDF CV
    competencies TEXT[],            -- Array keahlian (e.g. {'Photography', 'Web Dev'})
    organizations JSONB,            -- Struktur JSON untuk riwayat organisasi
    achievements JSONB,             -- Struktur JSON untuk pencapaian & kompetisi
    social_links JSONB,             -- Tautan media sosial
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### C. Projects Table (`projects`)
Menyimpan semua jenis proyek (Web, Riset, Proposal, Event, Video Dokumenter).
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Web', 'Research', 'Event', 'Video', etc.
    description TEXT NOT NULL,     -- Deskripsi singkat kartu
    content TEXT NOT NULL,         -- Cerita detail (format markdown)
    cover_image VARCHAR(255),      -- Path file cover image
    gallery_images TEXT[],         -- Array path file gambar pendukung
    external_links JSONB,          -- Link GitHub, demo live, dll.
    status VARCHAR(20) DEFAULT 'draft', -- 'draft' atau 'published'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### D. Media Albums Table (`media_albums`)
Menampung album tematik untuk fotografi & videography.
```sql
CREATE TABLE media_albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,              -- Cerita di balik album (Behind the Scene)
    cover_image VARCHAR(255),      -- Sampul album
    type VARCHAR(20) DEFAULT 'photo', -- 'photo' atau 'video'
    status VARCHAR(20) DEFAULT 'draft', -- 'draft' atau 'published'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### E. Media Items Table (`media_items`)
Menyimpan foto atau video spesifik di dalam suatu album.
```sql
CREATE TABLE media_items (
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES media_albums(id) ON DELETE CASCADE,
    file_url VARCHAR(255) NOT NULL, -- Path file lokal atau URL cloud
    caption TEXT,                  -- Deskripsi singkat foto
    video_url VARCHAR(255),        -- Link youtube/vimeo (jika type video)
    sort_order INT DEFAULT 0,      -- Urutan tampilan di galeri
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### F. Articles Table (`articles`)
Menyimpan tulisan, artikel, dan refleksi.
```sql
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,         -- Konten artikel (format markdown)
    category VARCHAR(50),          -- Kategori tulisan (e.g. 'Refleksi', 'Opini')
    status VARCHAR(20) DEFAULT 'draft', -- 'draft' atau 'published'
    published_at TIMESTAMP WITH TIME ZONE, -- Waktu terbit resmi
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Database Indexes & Optimizations

Untuk mempercepat query pencarian berdasarkan slug (yang digunakan pada URL halaman detail):
```sql
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_media_albums_slug ON media_albums(slug);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_media_items_album ON media_items(album_id);
```
