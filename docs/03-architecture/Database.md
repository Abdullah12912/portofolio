# Database Schema (PostgreSQL)

Dokumen ini mendefinisikan skema database PostgreSQL, tipe data, relasi antar tabel, serta perintah DDL (Data Definition Language) untuk **Personal Portfolio Website & Admin Dashboard**.

---

## 1. Entity Relationship Diagram (ERD)

Skema database ini menggunakan relasi eksplisit untuk membagi kepemilikan dan mempermudah query.

```
       ┌──────────┐
       │  admins  │
       └──────────┘
       
       ┌──────────┐
       │  profile │
       └─────┬────┘
             │
     ┌───────┴───────┐
     ▼               ▼
┌──────────────┐┌──────────────┐
│ achievements ││  activities  │
└──────────────┘└──────────────┘

┌──────────────┐       ┌──────────────┐
│   projects   │       │   articles   │
└──────────────┘       └──────────────┘

┌──────────────┐
│    albums    │
└──────┬───────┘
       │
     ┌─┴─────────────┐
     ▼               ▼
┌──────────────┐┌──────────────┐
│ album_photos ││ album_videos │
└──────────────┘└──────────────┘
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

### B. Profile Table (`profile`)
Menyimpan data identitas pribadi Rifqi. Hanya akan berisi 1 baris (*row*) data di tabel ini.
```sql
CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    current_activity TEXT NOT NULL, -- Status saat ini (Current)
    cv_url VARCHAR(255),            -- Tautan file PDF CV
    competencies TEXT[],            -- Array keahlian (e.g. {'Photography', 'Web Dev'})
    social_links JSONB,             -- Tautan media sosial
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### C. Achievements Table (`achievements`)
Menyimpan pencapaian penting (*milestones*) yang terikat pada profil.
```sql
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    year VARCHAR(10) NOT NULL,      -- Tahun (misal: "2025")
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### D. Activities Table (`activities`)
Menyimpan entri alur waktu (*timeline entries*).
```sql
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    date DATE NOT NULL,             -- Tanggal entri
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### E. Projects Table (`projects`)
Menyimpan proyek yang dikerjakan Rifqi. Gambar galeri dan tautan eksternal bersifat opsional.
```sql
-- Mendefinisikan type enum untuk kategori proyek
CREATE TYPE project_type AS ENUM (
    'software', 
    'research', 
    'academic', 
    'photography', 
    'video', 
    'creative', 
    'other'
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    type project_type NOT NULL,
    description TEXT NOT NULL,     -- Deskripsi pendek kartu proyek
    content TEXT NOT NULL,         -- Cerita detail (format markdown)
    cover_image VARCHAR(255) NOT NULL, -- Path sampul utama
    gallery_images TEXT[],         -- Array path file gambar pendukung (Opsional)
    external_links JSONB,          -- Link GitHub, Demo, dll (Opsional)
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### F. Albums Table (`albums`)
Koleksi visual tematik yang memiliki lokasi, tanggal, dan cerita (*story*).
```sql
CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    location VARCHAR(150) NOT NULL, -- Lokasi pengambilan karya
    date VARCHAR(50) NOT NULL,      -- Tanggal/Bulan karya (misal: "Juni 2026")
    story TEXT NOT NULL,           -- Cerita di balik album (first-class field)
    cover_image VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### G. Album Photos Table (`album_photos`)
Menyimpan foto spesifik milik suatu album.
```sql
CREATE TABLE album_photos (
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES albums(id) ON DELETE CASCADE,
    file_url VARCHAR(255) NOT NULL,
    caption TEXT,                  -- Deskripsi pendek foto
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### H. Album Videos Table (`album_videos`)
Menyimpan video spesifik milik suatu album yang ditautkan ke media luar.
```sql
CREATE TABLE album_videos (
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES albums(id) ON DELETE CASCADE,
    file_url VARCHAR(255) NOT NULL, -- Thumbnail/cover video lokal
    video_url VARCHAR(255) NOT NULL, -- Tautan youtube/vimeo eksternal
    caption TEXT,                  -- Deskripsi pendek video
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### I. Articles Table (`articles`)
Menyimpan tulisan, artikel, dan refleksi.
```sql
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,         -- Konten artikel (format markdown)
    category VARCHAR(50),          -- Kategori tulisan (e.g. 'Refleksi', 'Opini')
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Database Indexes & Optimizations

Untuk mempercepat query pencarian data:
```sql
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_albums_slug ON albums(slug);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_album_photos_album ON album_photos(album_id);
CREATE INDEX idx_album_videos_album ON album_videos(album_id);
```
