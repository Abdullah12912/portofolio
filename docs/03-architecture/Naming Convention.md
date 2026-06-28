# Naming Conventions

Dokumen ini mendefinisikan aturan penamaan (*naming conventions*) di seluruh aspek proyek **Personal Portfolio Website & Admin Dashboard**. Aturan ini dibuat untuk memastikan konsistensi kode, kemudahan kolaborasi, serta kerapian basis data.

---

## 1. Database Naming (PostgreSQL)

Seluruh nama tabel, kolom, indeks, dan tipe buatan (*custom types*) harus menggunakan format **snake_case** dengan huruf kecil.
* **Tabel**: Menggunakan kata jamak (*plural*) kecuali untuk tabel profile (*singleton*).
  * *Contoh*: `profile`, `projects`, `albums`, `album_photos`, `album_videos`, `articles`.
* **Kolom**: Menggunakan kata benda tunggal yang mendeskripsikan isi kolom.
  * *Contoh*: `cover_image`, `video_url`, `published_at`.
* **Foreign Key**: Menggunakan nama tabel tujuan (tunggal) diikuti dengan `_id`.
  * *Contoh*: `album_id` (merujuk ke tabel `albums`).

---

## 2. JavaScript / API Naming

* **Variabel & Fungsi**: Menggunakan format **camelCase**.
  * *Contoh*: `const activeProjects = ...`, `function fetchProfileData() { ... }`.
* **API Request & Response Payload (JSON Keys)**: Menggunakan format **camelCase**.
  * *Contoh*:
    ```json
    {
      "coverImage": "/uploads/projects/cover.jpg",
      "externalLinks": { "github": "..." }
    }
    ```
* **URL Routes**: Menggunakan format **kebab-case** untuk path parameter maupun endpoint.
  * *Contoh*: `/api/auth/login`, `/api/album-photos`, `/gallery/:album-slug`.

---

## 3. File Naming Conventions

Aturan penamaan file di dalam repositori ditentukan berdasarkan kategori file berikut:

* **React Components (jika ada)**: Menggunakan **PascalCase**.
  * *Contoh*: `ProjectCard.jsx`, `Sidebar.jsx`.
* **Custom Hooks (jika ada)**: Menggunakan **camelCase** berawalan `use`.
  * *Contoh*: `useAuth.js`, `useFetch.js`.
* **Utility Files & Helper Scripts**: Menggunakan **camelCase**.
  * *Contoh*: `dbConfig.js`, `formatDate.js`, `imageResizer.js`.
* **CSS Files & Class Names**: Menggunakan **kebab-case** dengan huruf kecil.
  * *Contoh file*: `index.css`, `admin-layout.css`.
  * *Contoh kelas CSS*: `.nav-bar`, `.project-card`, `.active-link`.
* **Markdown Files**: Menggunakan **Title Case** untuk nama file dokumentasi.
  * *Contoh*: `Content Model.md`, `Naming Convention.md`, `Git Workflow.md`.
* **Environment Variables**: Menggunakan **UPPER_SNAKE_CASE**.
  * *Contoh*: `DATABASE_URL`, `JWT_SECRET`, `PORT`.
