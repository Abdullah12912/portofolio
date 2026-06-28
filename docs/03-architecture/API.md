# API Specification (REST API)

Dokumen ini mendefinisikan seluruh *endpoint* RESTful API, metode HTTP, skema payload *request*, serta format *response* JSON untuk sistem **Personal Portfolio Website & Admin Dashboard**.

---

## 1. Authentication Endpoints

### A. Login Admin
* **Endpoint**: `POST /api/auth/login`
* **Auth Required**: No
* **Request Body**:
  ```json
  {
    "username": "rifqi_admin",
    "password": "secure_password"
  }
  ```
* **Success Response (200 OK)**:
  * *Set-Cookie*: `token=<jwt_token>; HttpOnly; Secure; SameSite=Strict; Path=/`
  ```json
  {
    "success": true,
    "message": "Login successful"
  }
  ```

### B. Logout Admin
* **Endpoint**: `POST /api/auth/logout`
* **Auth Required**: Yes
* **Success Response (200 OK)**:
  * *Set-Cookie*: `token=; Max-Age=0; HttpOnly; Secure; SameSite=Strict; Path=/`
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```

---

## 2. Profile Endpoints

### A. Get Personal Profile
Mengembalikan seluruh data profil termasuk sub-tabel pencapaian (*achievements*) dan aktivitas (*activities*).
* **Endpoint**: `GET /api/profile`
* **Auth Required**: No
* **Success Response (200 OK)**:
  ```json
  {
    "id": 1,
    "fullname": "Rifqi Abdullah",
    "bio": "Mahasiswa yang berfokus pada karya visual, tulisan, dan pengembangan teknologi.",
    "current_activity": "Menyusun proposal Tugas Akhir dan portfolio.",
    "cv_url": "/uploads/profiles/cv-rifqi.pdf",
    "competencies": ["Web Development", "Photography", "Videography", "Creative Writing"],
    "social_links": {
      "github": "https://github.com/rifqi",
      "instagram": "https://instagram.com/rifqi",
      "linkedin": "https://linkedin.com/in/rifqi"
    },
    "achievements": [
      {
        "id": 5,
        "title": "Juara 1 Lomba Fotografi Nasional",
        "year": "2025",
        "description": "Juara kategori Street Photography."
      }
    ],
    "activities": [
      {
        "id": 12,
        "title": "Merilis Website Portfolio v1.0",
        "date": "2026-06-28",
        "description": "Menyelesaikan baseline kode."
      }
    ]
  }
  ```

### B. Update Profile Info
* **Endpoint**: `PUT /api/profile`
* **Auth Required**: Yes (Admin only)
* **Request Body**:
  ```json
  {
    "fullname": "Rifqi Abdullah",
    "bio": "Bio baru...",
    "current_activity": "Status kesibukan baru...",
    "competencies": ["Photography", "Web"],
    "social_links": { "github": "..." }
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Profile updated successfully"
  }
  ```

### C. Manage Profile Sub-entities (Achievements & Activities)
* **Add Achievement**: `POST /api/profile/achievements` (Auth Required)
* **Delete Achievement**: `DELETE /api/profile/achievements/:id` (Auth Required)
* **Add Activity**: `POST /api/profile/activities` (Auth Required)
* **Delete Activity**: `DELETE /api/profile/activities/:id` (Auth Required)

---

## 3. Projects Endpoints

### A. Get All Projects
Mendukung filter query parameter `status` (untuk admin) dan `type`.
* **Endpoint**: `GET /api/projects`
* **Query Parameters**: 
  * `status` (optional: `draft` | `published`)
  * `type` (optional: `software` | `research` | `academic` | `photography` | `video` | `creative` | `other`)
* **Success Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "title": "Website Portofolio Mahasiswa",
      "slug": "website-portofolio-mahasiswa",
      "type": "software",
      "description": "Website pribadi dengan CMS sederhana.",
      "cover_image": "/uploads/projects/cover-portfolio.jpg",
      "status": "published",
      "created_at": "2026-06-28T15:00:00Z"
    }
  ]
  ```

### B. Get Project by Slug
* **Endpoint**: `GET /api/projects/:slug`
* **Success Response (200 OK)**:
  ```json
  {
    "id": 1,
    "title": "Website Portofolio Mahasiswa",
    "slug": "website-portofolio-mahasiswa",
    "type": "software",
    "description": "Website pribadi dengan CMS sederhana.",
    "content": "# Detail Proyek\nIni adalah konten detail proyek dalam format markdown...",
    "cover_image": "/uploads/projects/cover-portfolio.jpg",
    "gallery_images": [
      "/uploads/projects/portfolio-screenshot1.jpg",
      "/uploads/projects/portfolio-screenshot2.jpg"
    ],
    "external_links": {
      "github": "https://github.com/rifqi/portfolio",
      "demo": "https://rifqi.dev"
    },
    "status": "published"
  }
  ```

### C. Create / Update / Delete Project
* **Create Project**: `POST /api/projects` (Auth Required)
* **Update Project**: `PUT /api/projects/:id` (Auth Required)
* **Delete Project**: `DELETE /api/projects/:id` (Auth Required)

---

## 4. Albums Endpoints (Photography / Videography)

### A. Get All Albums
* **Endpoint**: `GET /api/albums`
* **Success Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "title": "Kemanusiaan di Ujung Senja",
      "slug": "kemanusiaan-di-ujung-senja",
      "location": "Pasar Sleman, Yogyakarta",
      "date": "Juni 2026",
      "cover_image": "/uploads/albums/senja-cover.jpg",
      "status": "published"
    }
  ]
  ```

### B. Get Album by Slug (Including Photos & Videos)
* **Endpoint**: `GET /api/albums/:slug`
* **Success Response (200 OK)**:
  ```json
  {
    "id": 1,
    "title": "Kemanusiaan di Ujung Senja",
    "slug": "kemanusiaan-di-ujung-senja",
    "location": "Pasar Sleman, Yogyakarta",
    "date": "Juni 2026",
    "story": "# Cerita Dibalik Karya\nIni adalah narasi story sebagai first-class field...",
    "cover_image": "/uploads/albums/senja-cover.jpg",
    "status": "published",
    "photos": [
      {
        "id": 10,
        "file_url": "/uploads/albums/senja-photo1.jpg",
        "caption": "Potret pedagang sayur tersenyum di sore hari",
        "sort_order": 1
      }
    ],
    "videos": [
      {
        "id": 4,
        "file_url": "/uploads/albums/senja-video-thumb.jpg",
        "video_url": "https://youtube.com/watch?v=123",
        "caption": "Behind the scenes shooting process",
        "sort_order": 1
      }
    ]
  }
  ```

### C. Create Album
* **Endpoint**: `POST /api/albums` (Auth Required)
  * Payload: `title`, `slug`, `location`, `date`, `story`

### D. Manage Album Media Uploads (Multipart Form Data)
* **Upload Photo to Album**: `POST /api/albums/:id/photos` (Auth Required)
  * Request payload: file upload + `caption`, `sort_order`
* **Delete Photo**: `DELETE /api/albums/photos/:id` (Auth Required)
* **Upload Video to Album**: `POST /api/albums/:id/videos` (Auth Required)
  * Request payload: file upload (thumbnail) + `video_url`, `caption`, `sort_order`
* **Delete Video**: `DELETE /api/albums/videos/:id` (Auth Required)

### E. Delete Album
* **Endpoint**: `DELETE /api/albums/:id` (Auth Required)

---

## 5. Articles Endpoints

### A. Get All Articles
* **Endpoint**: `GET /api/articles`
* **Query Parameters**: `status` (optional)

### B. Get Article by Slug
* **Endpoint**: `GET /api/articles/:slug`

### C. Create / Update / Delete Article
* **Create**: `POST /api/articles` (Auth Required)
* **Update**: `PUT /api/articles/:id` (Auth Required)
* **Delete**: `DELETE /api/articles/:id` (Auth Required)
