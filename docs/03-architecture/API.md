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
* **Error Response (401 Unauthorized)**:
  ```json
  {
    "success": false,
    "message": "Invalid username or password"
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

## 2. Student Info Endpoints

### A. Get Student Info
* **Endpoint**: `GET /api/student`
* **Auth Required**: No
* **Success Response (200 OK)**:
  ```json
  {
    "fullname": "Rifqi Abdullah",
    "bio": "Mahasiswa yang berfokus pada karya visual, tulisan, dan pengembangan teknologi.",
    "current_activity": "Sedang menyusun portofolio dan melakukan riset tugas akhir.",
    "cv_url": "/uploads/cv-rifqi.pdf",
    "competencies": ["Web Development", "Photography", "Videography", "Creative Writing"],
    "organizations": [
      {
        "name": "Himpunan Mahasiswa Informatika",
        "role": "Kepala Divisi Media",
        "period": "2024 - Sekarang"
      }
    ],
    "achievements": [
      {
        "title": "Juara 1 Lomba Fotografi Nasional",
        "year": "2025"
      }
    ],
    "social_links": {
      "github": "https://github.com/rifqi",
      "instagram": "https://instagram.com/rifqi",
      "linkedin": "https://linkedin.com/in/rifqi"
    }
  }
  ```

### B. Update Student Info
* **Endpoint**: `PUT /api/student`
* **Auth Required**: Yes (Admin only)
* **Request Body**: Sama dengan struktur JSON response di atas.
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Student info updated successfully"
  }
  ```

---

## 3. Projects Endpoints

### A. Get All Projects
Mendukung query parameter status untuk panel admin. Untuk publik, status otomatis disaring hanya `published`.
* **Endpoint**: `GET /api/projects`
* **Query Parameters**: `status` (optional: `draft` | `published`)
* **Success Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "title": "Website Portofolio Mahasiswa",
      "slug": "website-portofolio-mahasiswa",
      "category": "Web",
      "description": "Website pribadi dengan CMS sederhana.",
      "cover_image": "/uploads/cover-portfolio.jpg",
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
    "category": "Web",
    "description": "Website pribadi dengan CMS sederhana.",
    "content": "# Detail Proyek\nIni adalah konten detail proyek dalam format markdown...",
    "cover_image": "/uploads/cover-portfolio.jpg",
    "gallery_images": [
      "/uploads/portfolio-screenshot1.jpg",
      "/uploads/portfolio-screenshot2.jpg"
    ],
    "external_links": {
      "github": "https://github.com/rifqi/portfolio",
      "demo": "https://rifqi.dev"
    },
    "status": "published"
  }
  ```

### C. Create Project
* **Endpoint**: `POST /api/projects`
* **Auth Required**: Yes (Admin only)
* **Request Body**: payload JSON tanpa `id`.
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "id": 2,
    "message": "Project created successfully"
  }
  ```

### D. Update Project
* **Endpoint**: `PUT /api/projects/:id`
* **Auth Required**: Yes (Admin only)
* **Request Body**: payload JSON berisi data yang diperbarui.
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Project updated successfully"
  }
  ```

### E. Delete Project
* **Endpoint**: `DELETE /api/projects/:id`
* **Auth Required**: Yes (Admin only)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Project deleted successfully"
  }
  ```

---

## 4. Media & Gallery Endpoints

### A. Get All Albums
* **Endpoint**: `GET /api/albums`
* **Success Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "title": "Kemanusiaan di Ujung Senja",
      "slug": "kemanusiaan-di-ujung-senja",
      "description": "Dokumentasi foto jalanan di pasar tradisional.",
      "cover_image": "/uploads/senja-cover.jpg",
      "type": "photo",
      "status": "published"
    }
  ]
  ```

### B. Get Album by Slug (Including Items)
* **Endpoint**: `GET /api/albums/:slug`
* **Success Response (200 OK)**:
  ```json
  {
    "id": 1,
    "title": "Kemanusiaan di Ujung Senja",
    "slug": "kemanusiaan-di-ujung-senja",
    "description": "Dokumentasi foto jalanan di pasar tradisional.",
    "cover_image": "/uploads/senja-cover.jpg",
    "type": "photo",
    "status": "published",
    "items": [
      {
        "id": 10,
        "file_url": "/uploads/senja-photo1.jpg",
        "caption": "Potret pedagang sayur tersenyum di sore hari",
        "sort_order": 1
      }
    ]
  }
  ```

### C. Create Album
* **Endpoint**: `POST /api/albums`
* **Auth Required**: Yes (Admin only)
* **Request Body**:
  ```json
  {
    "title": "Judul Album Baru",
    "description": "Cerita dibalik album...",
    "type": "photo",
    "status": "draft"
  }
  ```

### D. Upload Media to Album (Multipart Form Data)
* **Endpoint**: `POST /api/albums/:id/upload`
* **Auth Required**: Yes (Admin only)
* **Request Payload**: File binary multipart (`image` atau `video`).
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "file_url": "/uploads/album-id/filename.jpg",
    "message": "Media uploaded successfully"
  }
  ```

### E. Delete Album
* **Endpoint**: `DELETE /api/albums/:id`
* **Auth Required**: Yes (Admin only)

---

## 5. Articles Endpoints

### A. Get All Articles
* **Endpoint**: `GET /api/articles`
* **Query Parameters**: `status` (optional)
* **Success Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "title": "Refleksi Akhir Tahun Mahasiswa Informatika",
      "slug": "refleksi-akhir-tahun",
      "category": "Refleksi",
      "status": "published",
      "published_at": "2025-12-31T23:59:00Z"
    }
  ]
  ```

### B. Get Article by Slug
* **Endpoint**: `GET /api/articles/:slug`

### C. Create Article (`POST /api/articles`) / Update (`PUT /api/articles/:id`) / Delete (`DELETE /api/articles/:id`)
* **Auth Required**: Yes (Admin only)
