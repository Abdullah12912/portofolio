# Git Workflow

Dokumen ini mendefinisikan aturan dan alur kerja pengelolaan repositori Git (*Git Workflow*) untuk proyek **Personal Portfolio Website & Admin Dashboard**. Seluruh kontributor (termasuk single developer) wajib mengikuti alur ini untuk menjaga histori perubahan yang bersih dan terstruktur.

---

## 1. Branching Strategy

Proyek ini menggunakan strategi percabangan (*branching*) sederhana berbasis fitur (*feature branches*):

```text
main (stable, production-ready)
  ▲
  │   (Merge Pull Request / Merge Branch)
  ├──────────────────────────────────┐
  │                                  │
  │                           feature/album-crud (work in progress)
```

* **Branch Utama (`main`)**:
  * Merupakan cabang tunggal sumber kebenaran (*single source of truth*).
  * Berisi kode yang stabil dan siap dideploy ke produksi.
  * Proteksi: Tidak diperkenankan melakukan commit langsung ke `main` untuk perubahan besar.
* **Feature Branches (`feature/nama-fitur`)**:
  * Setiap pengerjaan fitur baru, perbaikan bug, atau pembaruan dokumentasi harus dikerjakan di cabang terpisah yang dicabangkan dari `main`.
  * Penamaan branch menggunakan format `feature/nama-fitur` atau `fix/nama-bug` (huruf kecil, dipisah dengan tanda hubung).
  * *Contoh*: `feature/profile-setup`, `feature/album-photos`, `fix/login-cookie`.
* **Alur Penggabungan (Merge)**:
  * Setelah pengerjaan di feature branch selesai dan lulus pengujian lokal, branch digabungkan kembali ke `main`.
  * Setelah berhasil digabungkan, feature branch lokal dan remote segera **dihapus** untuk menjaga kebersihan repositori.

---

## 2. Commit Message Convention

Pesan commit harus mematuhi standar **Conventional Commits** dengan struktur: `<type>: <description>`.

### Tipe Commit (`type`):
* `feat`: Penambahan fitur baru (misal: halaman galeri, API endpoint baru).
* `fix`: Perbaikan bug atau eror kode.
* `docs`: Pembaruan atau penambahan dokumentasi (tidak mengubah kode aplikasi).
* `style`: Perubahan visual, styling (CSS), format kode, atau merapikan whitespace tanpa mengubah logika kode.
* `refactor`: Restrukturisasi kode untuk peningkatan kualitas tanpa mengubah fungsionalitas visual/API.
* `chore`: Pembaruan build tools, konfigurasi proyek, dependensi package.json, dll.

### Contoh Pesan Commit yang Tepat:
* `feat: add photography gallery layout`
* `fix: resolve JWT token expiration in HttpOnly cookie`
* `docs: update API endpoints specification`
* `style: align project cards padding with spacing tokens`

---

## 3. Commit Granularity (Butiran Commit)

Setiap commit harus merepresentasikan **satu unit kerja logis** (*single logical engineering unit*), bukan pencapaian tonggak sejarah (*milestones*). Jangan menumpuk banyak perubahan berbeda dalam satu commit besar.

* **Good (Commit Granular)**:
  * `feat: create albums table in database`
  * `feat: implement backend API for album CRUD`
  * `feat: build admin CMS interface for creating albums`
* **Bad (Commit Milestone/General)**:
  * `update project`
  * `final`
  * `feat: finish sprint 2`
  * `fix`

---

## 4. Definition of Done (DoD)

Sebuah unit pekerjaan (atau fitur) hanya dapat dianggap **Done** (Selesai) dan siap digabungkan ke `main` jika memenuhi kriteria berikut:

1. **Berfungsi Sesuai Kebutuhan**: Fitur berjalan sesuai spesifikasi di dokumen *Content Model* dan *API*.
2. **Kemudahan Penggunaan**: Antarmuka mudah digunakan tanpa instruksi tambahan.
3. **Pemberlakuan Verifikasi Wajib**:
   * Menjalankan perintah linting: `npm run lint` (tidak ada error/warning kritis).
   * Menjalankan perintah build: `npm run build` (proses kompilasi/validasi sukses).
4. **Dokumentasi Diperbarui**: Jika ada perubahan skema database atau API, dokumentasi terkait wajib diperbarui terlebih dahulu.
5. **Histori Git Bersih**: Pekerjaan telah di-commit secara granular dengan Conventional Commits dan di-push ke GitHub.
