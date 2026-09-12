# Website Portofolio Pribadi

Website portofolio pribadi berbasis React yang menampilkan profil, pengalaman, project, sertifikat, keahlian teknologi, dan informasi kontak. Website ini dilengkapi halaman detail project, splash screen, animasi interaktif, komentar pengunjung, serta dashboard admin untuk mengelola konten portfolio.

## Ringkasan

Project ini dibangun sebagai Single Page Application (SPA) menggunakan Vite, React, dan React Router. Data project, sertifikat, dan komentar dikelola menggunakan Supabase sehingga konten dapat diperbarui melalui dashboard admin tanpa mengubah source code secara langsung.

Tampilan antarmuka menggunakan Tailwind CSS dan Material UI, dengan dukungan animasi dari Framer Motion, GSAP, AOS, dan React Spring. Website dapat dijalankan secara lokal maupun dideploy ke platform seperti Vercel.

## Fitur Utama

### 1. Landing Page Portfolio

Halaman utama terdiri dari beberapa bagian utama:

- Welcome atau splash screen ketika website pertama kali dibuka.
- Home untuk memperkenalkan identitas dan fokus keahlian.
- About untuk menampilkan informasi profil dan statistik portfolio.
- Portfolio Showcase untuk project, sertifikat, dan tech stack.
- Contact untuk informasi atau pesan dari pengunjung.
- Footer dengan tautan sosial dan informasi tambahan.

### 2. Daftar dan Detail Project

Data project diambil dari tabel `projects` pada Supabase dan ditampilkan dalam bentuk kartu portfolio.

Setiap project dapat dibuka melalui route dinamis berikut:

```text
/project/:slug
```

Halaman detail project menampilkan informasi seperti:

- Judul dan kategori project.
- Gambar project.
- Deskripsi project.
- Role atau peran dalam project.
- Teknologi yang digunakan.
- Fitur-fitur project.
- Tautan demo atau project online jika tersedia.
- Tautan repository GitHub jika tersedia.

Jika project berdasarkan `slug` tidak ditemukan, pengguna diarahkan ke halaman 404.

### 3. Sertifikat dan Tech Stack

Bagian portfolio menyediakan tab terpisah untuk:

- Daftar project.
- Daftar sertifikat.
- Teknologi yang dikuasai atau pernah digunakan.

Daftar project dan sertifikat menggunakan tombol **See More** dan **See Less** agar tampilan tetap ringkas pada awal halaman. Data juga disimpan sementara di `localStorage` supaya konten yang pernah dimuat dapat ditampilkan lebih cepat.

### 4. Splash Screen dan Animasi

`WelcomeScreen` ditampilkan saat aplikasi pertama kali dimuat. Setelah animasi selesai, halaman utama akan ditampilkan.

Animasi dan efek visual digunakan pada beberapa bagian website, antara lain:

- Animasi masuk dan keluar dengan Framer Motion.
- Animasi scroll dengan AOS.
- Background animasi.
- Efek interaksi pada tombol, kartu, navbar, dan elemen portfolio.
- Efek swipe pada tab portfolio di perangkat mobile.

### 5. Komentar Pengunjung

Pengunjung dapat mengirim komentar melalui halaman Contact. Komentar disimpan di Supabase dan dapat dilengkapi dengan gambar jika fitur upload tersedia.

Komponen komentar juga mendukung pembaruan data secara realtime menggunakan Supabase Realtime.

### 6. Login dan Dashboard Admin

Website memiliki halaman login untuk admin pada route `/login`. Setelah berhasil login, admin dapat mengakses dashboard yang dilindungi oleh `ProtectedRoute`.

Dashboard tersedia pada route `/dashboard` dan memiliki menu:

- **Projects**: menambah, mengubah, dan menghapus data project serta gambar project.
- **Certificates**: mengelola data sertifikat dan gambar sertifikat.
- **Comments**: melihat dan mengelola komentar pengunjung.

Autentikasi admin menggunakan Supabase Auth. Pengguna yang belum terautentikasi tidak dapat mengakses halaman dashboard.

### 7. Responsive Design

Tampilan website disesuaikan untuk berbagai ukuran layar, mulai dari smartphone hingga desktop. Penyesuaian diterapkan pada:

- Navbar dan menu navigasi.
- Grid kartu project dan sertifikat.
- Tab portfolio.
- Halaman detail project.
- Form kontak dan komentar.
- Sidebar dashboard yang berubah menjadi drawer pada layar kecil.

## Teknologi yang Digunakan

### Frontend

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Material UI
- Lucide React
- React Icons

### Animasi dan Interaksi

- Framer Motion
- GSAP
- AOS
- React Spring
- React Swipeable Views
- Typewriter Effect

### Backend dan Deployment

- Supabase Auth
- Supabase Database
- Supabase Storage
- Supabase Realtime
- Vercel

## Struktur Route

| Route | Keterangan |
| --- | --- |
| `/` | Landing page portfolio |
| `/project/:slug` | Detail project berdasarkan slug |
| `/login` | Halaman login admin |
| `/dashboard` | Dashboard admin |
| `/dashboard/projects` | Pengelolaan project |
| `/dashboard/certificates` | Pengelolaan sertifikat |
| `/dashboard/comments` | Pengelolaan komentar |
| `*` | Halaman 404 |

## Struktur Folder Utama

```text
src/
├── App.jsx                  # Konfigurasi provider dan routing utama
├── index.css                # Tailwind dan styling global
├── main.jsx                 # Entry point aplikasi
├── supabase.js              # Konfigurasi client Supabase
├── components/              # Komponen reusable
│   ├── CardProject.jsx
│   ├── Certificate.jsx
│   ├── Commentar.jsx
│   ├── Navbar.jsx
│   ├── ProjectDetail.jsx
│   ├── ProtectedRoute.jsx
│   └── ...
├── Pages/                   # Halaman aplikasi
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Portofolio.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── WelcomeScreen.jsx
│   ├── 404.jsx
│   └── dashboard/
│       ├── Projects.jsx
│       ├── Certificates.jsx
│       └── Comments.jsx
└── utils/
    └── slug.js              # Utility untuk pengelolaan slug project
```

## Instalasi dan Menjalankan Project

Pastikan Node.js dan npm sudah terpasang pada komputer.

### 1. Clone repository

```bash
git clone <url-repository>
cd Portofolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file environment

Buat file `.env` di root project dan isi dengan kredensial Supabase:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Jangan membagikan file `.env` atau memasukkan secret key ke repository publik.

### 4. Jalankan development server

```bash
npm run dev
```

Setelah itu buka URL yang diberikan Vite, biasanya:

```text
http://localhost:5173
```

## Perintah NPM

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat build production |
| `npm run preview` | Menjalankan preview hasil build |
| `npm run lint` | Menjalankan pemeriksaan ESLint |

## Konfigurasi Supabase

Agar seluruh fitur berjalan, project Supabase perlu menyediakan kebutuhan berikut:

- Supabase Auth untuk login admin.
- Tabel `projects` untuk menyimpan data project.
- Tabel `certificates` untuk menyimpan data sertifikat.
- Tabel `comments` untuk menyimpan komentar pengunjung.
- Storage bucket `project-images` untuk gambar project.
- Storage bucket `certificate-images` untuk gambar sertifikat.
- Kebijakan akses Row Level Security (RLS) yang sesuai dengan kebutuhan aplikasi.

Nama kolom tambahan mengikuti kebutuhan form pada dashboard dan komponen yang digunakan dalam source code.

## Build untuk Production

Buat build production dengan perintah berikut:

```bash
npm run build
```

Folder hasil build dapat digunakan untuk deployment ke Vercel atau layanan hosting static lainnya. Saat melakukan deployment, tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` pada environment variables project hosting.

## Catatan Keamanan

- Gunakan anon key Supabase sesuai konfigurasi RLS.
- Jangan memasukkan service role key ke aplikasi frontend.
- Batasi akses tabel dan storage melalui policy Supabase.
- Pastikan route dashboard hanya dapat diakses oleh akun admin yang sesuai.

## Lisensi

Project ini dibuat untuk kebutuhan portfolio pribadi dan pembelajaran. Silakan menyesuaikan isi, desain, dan konfigurasi sebelum digunakan untuk kebutuhan lain.