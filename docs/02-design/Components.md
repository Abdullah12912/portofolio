# Components Specification

Dokumen ini mendefinisikan komponen-komponen antarmuka (UI Components) yang akan digunakan di seluruh **Public Website** dan **Admin Dashboard**. Setiap komponen dirancang agar mematuhi aturan visual pada **Design System**.

---

## 1. Global Navigation (Header)
Komponen navigasi atas yang konsisten di semua halaman publik.

* **Layout**: Flexbox horizontal dengan `justify-content: space-between`.
* **Visual**: Latar belakang transparan dengan glassmorphism (`--glass-bg`, `--glass-border`, `--glass-blur`) saat menggulir (*scrolling*).
* **Elements**:
  * **Logo/Name**: "Rifqi Abdullah" (Font Weight 700, menggunakan `--font-display`).
  * **Navigation Links**: Home, Photography, Projects, Writing.
  * **Interactive States**: Hover pada tautan memicu transisi warna ke `--color-primary` dan garis bawah animasi tipis.

---

## 2. Project Card
Kartu representasi proyek di halaman utama dan daftar portofolio.

* **Layout**: Stack vertikal dengan gambar sampul di bagian atas.
* **Visual**:
  * Border radius `--radius-md`.
  * Latar belakang `--color-surface`.
  * Bayangan halus `--shadow-sm`, bertransisi ke `--shadow-md` saat di-hover.
* **Elements**:
  * **Cover Image**: Rasio aspek `16:9` dengan *zoom* halus saat kartu di-hover.
  * **Badge**: Label tipe proyek (misal: "Software", "Research", "Academic", dll.) menggunakan warna latar belakang `--color-primary-glow` dan teks `--color-primary`.
  * **Title**: Judul proyek (Font Size `--fs-lg`, Weight 600).
  * **Description**: Ringkasan singkat proyek (Muted text, Font Size `--fs-sm`).

---

## 3. Project Detail Page Components
Tampilan detail ketika salah satu proyek diklik:
* **Cover Header**: Tampilan gambar sampul proyek berukuran penuh (100% width) dengan judul besar dan badge tipe proyek.
* **Content Container**: Teks detail proyek yang diformat dari Markdown.
* **Optional Gallery Grid**: Jika proyek memiliki gambar pendukung, ditampilkan dalam grid rasio `3:2` dengan dukungan viewer lightbox. Jika tidak ada gambar, area grid ini disembunyikan.
* **Optional External Links**: Baris tombol/ikon (misal: GitHub, Demo Link, PDF Report) di bagian atas/bawah artikel. Jika tidak ada link, disembunyikan.

---

## 4. Album Card
Kartu galeri di halaman Photography & Videography.

* **Layout**: Grid responsif dengan ukuran besar untuk menonjolkan visual (*Image First*).
* **Visual**:
  * Rasio aspek adaptif (`3:2` landscape, `4:5` portrait).
  * Overlay gradasi gelap dari bawah ke atas untuk keterbacaan teks di atas foto.
* **Elements**:
  * **Cover Image**: Foto sampul utama resolusi tinggi.
  * **Metadata Row**: Teks kecil berisi **Lokasi** dan **Tanggal** (misal: "Yogyakarta • Juni 2026").
  * **Title**: Judul album.
  * **Story Snippet**: Teks ringkasan cerita di balik album yang muncul secara elegan saat di-hover.

---

## 5. Lightbox Viewer
Media viewer interaktif layar penuh untuk melihat foto dan video dari album.

* **Layout**: Overlay mutlak di atas seluruh layar (`position: fixed`, `z-index: 1000`).
* **Visual**: Latar belakang hitam pekat transparan (`rgba(0, 0, 0, 0.95)`).
* **Elements**:
  * **Close Button**: Di pojok kanan atas.
  * **Navigation Buttons**: Panah kiri dan kanan di sisi layar (untuk berpindah foto/video).
  * **Image/Video Container**: Ditampilkan dengan ukuran maksimal tanpa merusak aspek rasio.
  * **Caption Area**: Menampilkan cerita singkat / caption foto di bagian bawah layar.

---

## 6. Article Row
Baris representasi artikel di halaman Writing.

* **Layout**: Horizontal Flexbox (desktop) bertransisi menjadi vertikal (mobile).
* **Visual**: Border bawah tipis menggunakan `--color-border`.
* **Elements**:
  * **Date**: Tanggal publikasi di sebelah kiri (Font Size `--fs-sm`, Muted text).
  * **Title**: Link judul artikel (Font Size `--fs-lg`, Weight 500).
  * **Reading Time**: Estimasi waktu baca di sebelah kanan.

---

## 7. Admin Sidebar & Workspace Layout
Struktur antarmuka untuk Admin Dashboard CMS.

* **Layout**: Grid 2-kolom (Sidebar Kiri + Konten Utama Kanan).
* **Sidebar**:
  * Lebar tetap `--space-16` / `260px` dengan latar belakang `--color-surface`.
  * Berisi identitas admin ("Rifqi's CMS") dan menu navigasi vertikal: Dashboard, Profile, Projects, Albums, Articles.
  * Tombol "Logout" di bagian bawah.
* **Workspace**:
  * Area konten utama dengan gulir vertikal independen.
  * Dilengkapi header halaman yang memuat tombol aksi utama (misal: "Buat Album Baru").

---

## 8. Form Controls (Admin)
Elemen masukan data untuk CMS.

* **Text Input / Textarea**:
  * Latar belakang gelap menyesuaikan tema dashboard.
  * Focus state yang jelas menggunakan `--focus-ring`.
* **Drag-and-Drop Image Uploader**:
  * Area bergaris putus-putus (*dashed border*) untuk mengunggah file gambar dengan pratinjau (*preview*) instan.
* **Status Switcher**:
  * Radio button atau toggle switch untuk memilih status publikasi: **Draf** atau **Publish**.
