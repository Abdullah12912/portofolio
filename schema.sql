-- =============================================================================
-- Portofolio - PostgreSQL Database Schema
-- Architecture Baseline v1.0
-- =============================================================================
-- Run this file against a fresh PostgreSQL database to initialize the schema.
-- Example: psql -U postgres -d portofolio -f schema.sql
-- =============================================================================


-- -----------------------------------------------------------------------------
-- EXTENSIONS
-- -----------------------------------------------------------------------------

-- (None required for MVP)


-- -----------------------------------------------------------------------------
-- CUSTOM TYPES
-- -----------------------------------------------------------------------------

CREATE TYPE project_type AS ENUM (
    'software',
    'research',
    'academic',
    'photography',
    'video',
    'creative',
    'other'
);


-- -----------------------------------------------------------------------------
-- TABLE: admins
-- Single administrator account. No registration flow — seeded manually.
-- -----------------------------------------------------------------------------

CREATE TABLE admins (
    id           SERIAL PRIMARY KEY,
    username     VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- TABLE: profile
-- Singleton table — exactly one row representing the portfolio owner.
-- -----------------------------------------------------------------------------

CREATE TABLE profile (
    id               SERIAL PRIMARY KEY,
    fullname         VARCHAR(100) NOT NULL,
    bio              TEXT NOT NULL,
    current_activity TEXT NOT NULL,
    cv_url           VARCHAR(255),
    competencies     TEXT[],
    social_links     JSONB DEFAULT '{}',
    updated_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- TABLE: achievements
-- Milestone-type entries tied to the profile (awards, scholarships, etc.)
-- -----------------------------------------------------------------------------

CREATE TABLE achievements (
    id          SERIAL PRIMARY KEY,
    profile_id  INT REFERENCES profile(id) ON DELETE CASCADE,
    title       VARCHAR(150) NOT NULL,
    year        VARCHAR(10) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- TABLE: activities
-- Timeline entries tied to the profile (events attended, milestones, etc.)
-- -----------------------------------------------------------------------------

CREATE TABLE activities (
    id          SERIAL PRIMARY KEY,
    profile_id  INT REFERENCES profile(id) ON DELETE CASCADE,
    title       VARCHAR(150) NOT NULL,
    date        DATE NOT NULL,
    description TEXT,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- TABLE: projects
-- All project types: software, research, academic, photography, video, etc.
-- Gallery and external links are optional.
-- -----------------------------------------------------------------------------

CREATE TABLE projects (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(150) NOT NULL,
    slug            VARCHAR(150) UNIQUE NOT NULL,
    type            project_type NOT NULL,
    description     TEXT NOT NULL,
    content         TEXT NOT NULL,
    cover_image     VARCHAR(255) NOT NULL,
    gallery_images  TEXT[],
    external_links  JSONB DEFAULT '{}',
    status          VARCHAR(20) DEFAULT 'draft'
                        CHECK (status IN ('draft', 'published')),
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- TABLE: albums
-- Thematic visual collections. Story is a first-class field.
-- -----------------------------------------------------------------------------

CREATE TABLE albums (
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(150) NOT NULL,
    slug         VARCHAR(150) UNIQUE NOT NULL,
    location     VARCHAR(150) NOT NULL,
    date         VARCHAR(50) NOT NULL,
    story        TEXT NOT NULL,
    cover_image  VARCHAR(255) NOT NULL,
    status       VARCHAR(20) DEFAULT 'draft'
                     CHECK (status IN ('draft', 'published')),
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- TABLE: album_photos
-- Individual photographs belonging to an album.
-- -----------------------------------------------------------------------------

CREATE TABLE album_photos (
    id          SERIAL PRIMARY KEY,
    album_id    INT REFERENCES albums(id) ON DELETE CASCADE,
    file_url    VARCHAR(255) NOT NULL,
    caption     TEXT,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- TABLE: album_videos
-- Video entries belonging to an album (thumbnail stored locally, stream via URL).
-- -----------------------------------------------------------------------------

CREATE TABLE album_videos (
    id          SERIAL PRIMARY KEY,
    album_id    INT REFERENCES albums(id) ON DELETE CASCADE,
    file_url    VARCHAR(255) NOT NULL,
    video_url   VARCHAR(255) NOT NULL,
    caption     TEXT,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- TABLE: articles
-- Written reflections, opinions, and notes.
-- -----------------------------------------------------------------------------

CREATE TABLE articles (
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    slug         VARCHAR(200) UNIQUE NOT NULL,
    content      TEXT NOT NULL,
    category     VARCHAR(50),
    status       VARCHAR(20) DEFAULT 'draft'
                     CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------------------------------
-- INDEXES
-- Optimizing slug lookups (used in all public URL routing)
-- and foreign key joins for album media.
-- -----------------------------------------------------------------------------

CREATE INDEX idx_projects_slug      ON projects(slug);
CREATE INDEX idx_projects_type      ON projects(type);
CREATE INDEX idx_projects_status    ON projects(status);
CREATE INDEX idx_albums_slug        ON albums(slug);
CREATE INDEX idx_albums_status      ON albums(status);
CREATE INDEX idx_articles_slug      ON articles(slug);
CREATE INDEX idx_articles_status    ON articles(status);
CREATE INDEX idx_album_photos_album ON album_photos(album_id);
CREATE INDEX idx_album_videos_album ON album_videos(album_id);
CREATE INDEX idx_achievements_profile ON achievements(profile_id);
CREATE INDEX idx_activities_profile   ON activities(profile_id);


-- =============================================================================
-- SEED DATA
-- Initial admin account and default profile row.
-- The password below is the bcrypt hash of "admin123" with 12 salt rounds.
-- IMPORTANT: Change the password immediately after first login via database.
-- =============================================================================

-- Default admin account
INSERT INTO admins (username, password_hash)
VALUES (
    'rifqi_admin',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeAFVXUuS1Lp1RFdi'
);

-- Default profile row (singleton — always ID 1)
INSERT INTO profile (fullname, bio, current_activity, competencies, social_links)
VALUES (
    'Rifqi Abdullah',
    'Mahasiswa yang berfokus pada karya visual, tulisan, dan pengembangan teknologi.',
    'Menyusun portofolio digital dan mengerjakan proyek-proyek kreatif.',
    ARRAY['Photography', 'Videography', 'Web Development', 'Creative Writing'],
    '{"github": "", "instagram": "", "linkedin": ""}'::JSONB
);
