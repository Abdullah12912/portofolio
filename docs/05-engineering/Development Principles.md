# Development Principles

Dokumen ini mendefinisikan filosofi rekayasa perangkat lunak (*engineering philosophy*) dan prinsip pengembangan yang menjadi kompas bagi pengambil keputusan teknis dalam proyek **Personal Portfolio Website & Admin Dashboard**.

---

## 1. Core Software Principles

### A. KISS (Keep It Simple, Stupid)
* **Filosofi**: Kesederhanaan adalah kunci pemeliharaan jangka panjang. Tulis kode yang mudah dipahami oleh developer lain (atau diri sendiri di masa depan) tanpa trik sintaksis yang rumit.
* **Aplikasi**: Lebih memilih struktur backend routing Express standard dan query SQL vanilla daripada menggunakan ORM yang berat atau arsitektur microservices.

### B. DRY (Don't Repeat Yourself)
* **Filosofi**: Setiap bagian dari pengetahuan teknis atau logika aplikasi harus memiliki representasi tunggal yang tidak ambigu dalam sistem.
* **Aplikasi**: Ekstraksi middleware autentikasi, config database, dan parsing error ke modul tersendiri untuk digunakan ulang di seluruh Express routes. Di frontend, gunakan CSS Custom Properties untuk mengontrol nilai style global.

### C. YAGNI (You Aren't Gonna Need It)
* **Filosofi**: Jangan menulis kode atau membuat fitur hanya karena berpikir bahwa fitur tersebut mungkin akan dibutuhkan di masa depan. Kerjakan HANYA yang dibutuhkan saat ini untuk mencapai tujuan MVP.
* **Aplikasi**: Tidak mengimplementasikan pencarian teks penuh (*full-text search*), sistem notifikasi, atau setup multi-user karena hal itu berada di luar batasan MVP (sesuai **CTO Decision #006**).

---

## 2. UI / UX Principles

### A. Content First
* **Filosofi**: Desain antarmuka dibuat untuk menyajikan konten secara optimal, bukan sebaliknya. UI harus tidak terlihat (*invisible*) dan tidak mendistraksi pembaca.
* **Aplikasi**: Mengutamakan whitespace yang luas, ukuran gambar yang menonjol, dan tipografi yang bersih sehingga teks mudah dibaca dan gambar/karya visual menjadi fokus utama mata pengguna.

### B. Mobile First
* **Filosofi**: Mayoritas lalu lintas web saat ini berasal dari perangkat seluler. Antarmuka harus dirancang dan dioptimalkan terlebih dahulu untuk layar kecil sebelum diperluas ke layar monitor desktop.
* **Aplikasi**: Menggunakan CSS Flexbox/Grid responsif, media queries yang tepat, dan ukuran area sentuh tombol minimal `44px x 44px` agar mudah diakses di ponsel pintar.

### C. Accessibility (a11y)
* **Filosofi**: Website harus dapat diakses oleh semua orang, termasuk mereka yang memiliki keterbatasan fisik atau menggunakan pembaca layar (*screen readers*).
* **Aplikasi**:
  * Menggunakan HTML semantik (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
  * Memastikan kontras warna teks dan latar belakang memenuhi standar WCAG (Contrast ratio minimal 4.5:1 untuk teks normal).
  * Menyediakan tag `alt` yang deskriptif untuk seluruh elemen gambar.
  * Memastikan elemen interaktif dapat dinavigasi menggunakan keyboard (`:focus` states harus terlihat jelas).

### D. Progressive Enhancement
* **Filosofi**: Website harus tetap berfungsi pada tingkat dasar di browser manapun, kemudian memberikan pengalaman interaktif yang lebih kaya bagi browser modern yang mendukung fitur terbaru.
* **Aplikasi**: Halaman web harus dapat dibaca dan dinavigasi meskipun JavaScript dinonaktifkan di browser. JavaScript digunakan untuk memberikan peningkatan pengalaman (*enhancement*) seperti transisi halus lightbox dan validasi form interaktif.

---

## 3. Performance & Optimization Principles

### A. Performance Budget (Anggaran Performa)
* **Filosofi**: Kecepatan pemuatan halaman adalah bagian dari pengalaman pengguna. Halaman utama harus dimuat secara instan (target: LCP / Largest Contentful Paint < 1.5 detik pada koneksi seluler lambat).
* **Aplikasi**: Membatasi ukuran file CSS/JS pihak ketiga, meminimalkan pemblokiran render (*render-blocking resources*), dan mengimplementasikan *lazy-loading* untuk seluruh konten gambar galeri dan proyek.

### B. No Premature Optimization
* **Filosofi**: Jangan membuang waktu mengoptimalkan bagian kode yang tidak memicu hambatan (*bottleneck*) performa nyata. Lakukan optimasi berbasis data dan profil performa yang terukur.
* **Aplikasi**: Menghindari penulisan caching tingkat lanjut (seperti Redis) atau query database yang sangat rumit di awal proyek. Gunakan query PostgreSQL sederhana terlebih dahulu hingga profil performa menunjukkan kebutuhan pengoptimalan.
