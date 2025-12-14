# REST API Blog CMS

Proyek ini adalah Backend RESTful API untuk sistem manajemen konten (Blog CMS) yang dibangun menggunakan **Node.js**, **Express**, dan **Prisma ORM**. API ini menyediakan fitur otentikasi, manajemen pengguna, postingan blog, kategori, dan tag dengan validasi data yang ketat serta keamanan berbasis peran (Role-Based Access Control).

## 🚀 Fitur Utama

* **Otentikasi & Keamanan**:
  * Registrasi dan Login User (JWT Access & Refresh Tokens).
  * Hashing password menggunakan `bcrypt`.
  * Proteksi HTTP Header menggunakan `helmet`.
  * CORS enabled.
* **Manajemen Konten (CRUD)**:
  * **Post**: Create, Read (Pagination, Search, Filter by Category/Tag), Update, Delete.
  * **Category**: Manajemen kategori (Admin Only untuk mutasi).
  * **Tag**: Manajemen tag (Admin Only untuk mutasi).
* **Role-Based Access Control (RBAC)**:
  * Pemisahan hak akses antara `USER` dan `ADMIN`.
  * Middleware untuk memvalidasi kepemilikan postingan (hanya penulis atau admin yang bisa mengedit/menghapus).
* **Validasi Data**: Menggunakan `zod` untuk validasi request body yang ketat.
* **Logging**: Middleware logger kustom untuk memantau request.
* **Database**: Menggunakan SQLite (default dev) dengan Prisma ORM.

## 🛠️ Teknologi yang Digunakan

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [Prisma ORM](https://www.prisma.io/)
* [SQLite](https://www.sqlite.org/) (Database)
* [Zod](https://zod.dev/) (Validasi)
* [JsonWebToken](https://github.com/auth0/node-jsonwebtoken) (Otentikasi)
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) (Hashing Password)

## ⚙️ Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

* Node.js (v18 atau lebih baru disarankan)
* npm (Node Package Manager)

## 📦 Instalasi & Konfigurasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di lokal komputer Anda:

1. **Clone Repository** (jika ada) atau ekstrak folder proyek.

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Konfigurasi Environment Variable**:
    Salin file `.env.example` menjadi `.env`:

    ```bash
    cp .env.example .env
    ```

    Buka file `.env` dan sesuaikan isinya (contoh konfigurasi default):

    ```env
    NODE_ENV=development
    PORT=3000
    DATABASE_URL="file:./dev.db"

    JWT_SECRET=rahasia_super_aman_123
    JWT_EXPIRES_IN=15m

    JWT_REFRESH_SECRET=rahasia_refresh_super_aman_123
    JWT_REFRESH_EXPIRES_IN=7d
    ```

4. **Migrasi Database**:
    Jalankan perintah berikut untuk membuat tabel database SQLite menggunakan Prisma:

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Seeding Database (Data Awal)**:
    Isi database dengan data dummy (User Admin, Kategori, Tag, Contoh Post):

    ```bash
    npm run seed
    ```

    > **Catatan Penting**: Seeding akan membuat akun default berikut:
    > * **Admin**: Email: `admin@test.com` | Password: `Admin1234`
    > * **User**: Email: `user1@test.com` | Password: `User1234`

## ▶️ Menjalankan Aplikasi

* **Mode Development** (dengan nodemon jika terinstall atau node biasa):

    ```bash
    npm run dev
    ```

    Server akan berjalan di `http://localhost:3000`.

## 📚 Dokumentasi API Endpoint

Berikut adalah daftar endpoint utama yang tersedia:

### 1. Otentikasi (`/api/auth`)

| Method | Endpoint    | Deskripsi                          | Auth Wajib? |
| :----- | :---------- | :--------------------------------- | :---------- |
| POST   | `/register` | Mendaftar pengguna baru            | Tidak       |
| POST   | `/login`    | Masuk dan mendapatkan Token        | Tidak       |
| POST   | `/refresh`  | Memperbarui Access Token           | Tidak       |
| GET    | `/me`       | Mendapatkan profil user yang login | **Ya** |

### 2. Postingan (`/api/posts`)

| Method | Endpoint | Deskripsi                                      | Auth Wajib?    |
| :----- | :------- | :--------------------------------------------- | :------------- |
| GET    | `/`      | Mengambil semua post (Pagination, Search, Sort)| Tidak          |
| GET    | `/:id`   | Detail postingan                               | Tidak          |
| POST   | `/`      | Membuat postingan baru                         | **Ya** |
| PUT    | `/:id`   | Update postingan (Milik sendiri/Admin)         | **Ya** |
| DELETE | `/:id`   | Hapus postingan (Milik sendiri/Admin)          | **Ya** |

### 3. Kategori (`/api/categories`)

| Method | Endpoint | Deskripsi              | Auth Wajib?     |
| :----- | :------- | :--------------------- | :-------------- |
| GET    | `/`      | List semua kategori    | Tidak           |
| POST   | `/`      | Buat kategori baru     | **Ya (Admin)** |
| PUT    | `/:id`   | Update kategori        | **Ya (Admin)** |
| DELETE | `/:id`   | Hapus kategori         | **Ya (Admin)** |

### 4. Tag (`/api/tags`)

| Method | Endpoint | Deskripsi              | Auth Wajib?     |
| :----- | :------- | :--------------------- | :-------------- |
| GET    | `/`      | List semua tag         | Tidak           |
| POST   | `/`      | Buat tag baru          | **Ya (Admin)** |
| PUT    | `/:id`   | Update tag             | **Ya (Admin)** |
| DELETE | `/:id`   | Hapus tag              | **Ya (Admin)** |

### 5. Health Check (`/api/health`)

* `GET /`: Mengecek status server dan koneksi database.

## 📂 Struktur Folder

```text
.
├── prisma/
│   ├── migrations/    # History migrasi database
│   ├── schema.prisma  # Skema model database
│   └── seed.js        # Script data dummy
├── src/
│   ├── config/        # Konfigurasi DB & JWT
│   ├── controllers/   # Logika bisnis (Handler request)
│   ├── middleware/    # Auth, Logger, Error Handling, Validation
│   ├── routes/        # Definisi rute API
│   ├── utils/         # Helper functions (JWT Generator)
│   ├── validators/    # Skema validasi Zod
│   └── app.js         # Entry point aplikasi
├── .env.example       # Template environment variables
├── package.json
└── README.md
