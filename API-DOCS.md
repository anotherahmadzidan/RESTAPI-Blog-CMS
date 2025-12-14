# Dokumentasi API RESTful Blog CMS

Dokumentasi ini menjelaskan rute, parameter, dan format respons yang tersedia di API Blog CMS.

**Base URL**: `http://localhost:3000/api`

## 🔐 Otentikasi & Otorisasi

Sebagian besar endpoint yang melakukan perubahan data (POST, PUT, DELETE) memerlukan otentikasi menggunakan **JWT (JSON Web Token)**.

* **Header Wajib**: `Authorization: Bearer <access_token>`
* **Role**:
  * `USER`: Bisa membuat post, mengedit/menghapus post sendiri.
  * `ADMIN`: Bisa mengelola kategori, tag, dan mengedit/menghapus post siapa saja.

---

## 1. Auth (Otentikasi)

### Register User Baru

Mendaftarkan pengguna baru ke dalam sistem.

* **URL**: `/auth/register`
* **Method**: `POST`
* **Body (JSON)**:

    ```json
    {
      "name": "Achmad Zidan",
      "email": "achmad@zidan.com",
      "password": "Password123" // Min 8 chars, 1 uppercase, 1 number
    }
    ```

* **Success Response (201)**:

    ```json
    {
      "success": true,
      "message": "User registered successfully",
      "data": {
        "id": 1,
        "name": "Achmad Zidan",
        "email": "achmad@zidan.com"
      }
    }
    ```

### Login

Masuk untuk mendapatkan Access Token dan Refresh Token.

* **URL**: `/auth/login`
* **Method**: `POST`
* **Body (JSON)**:

    ```json
    {
      "email": "achmad@zidan.com",
      "password": "Password123"
    }
    ```

* **Success Response (200)**:

    ```json
    {
      "success": true,
      "message": "Login successful",
      "data": {
        "accessToken": "eyJhbGci...",
        "refreshToken": "eyJhbGci..."
      }
    }
    ```

### Refresh Token

Memperbarui Access Token yang sudah kadaluarsa menggunakan Refresh Token.

* **URL**: `/auth/refresh`
* **Method**: `POST`
* **Body (JSON)**:

    ```json
    {
      "refreshToken": "eyJhbGci..."
    }
    ```

* **Success Response (200)**:

    ```json
    {
      "success": true,
      "message": "Access token refreshed",
      "data": {
        "accessToken": "eyJhbGci... (token baru)"
      }
    }
    ```

### Get Current User Profile

Mendapatkan data profil user yang sedang login.

* **URL**: `/auth/me`
* **Method**: `GET`
* **Header**: `Authorization: Bearer <token>`
* **Success Response (200)**:

    ```json
    {
      "success": true,
      "message": "User profile retrieved",
      "data": {
        "id": 1,
        "name": "Achmad Zidan",
        "email": "achmad@zidan.com",
        "role": "USER",
        "createdAt": "2025-10-01T12:00:00.000Z"
      }
    }
    ```

---

## 2. Posts (Postingan Blog)

### Get All Posts

Mengambil daftar postingan dengan fitur pencarian, filter, dan pagination.

* **URL**: `/posts`
* **Method**: `GET`
* **Query Params**:
  * `page`: Nomor halaman (default: 1)
  * `limit`: Jumlah data per halaman (default: 10, max: 50)
  * `search`: Kata kunci pencarian (judul atau konten)
  * `categoryId`: Filter berdasarkan ID kategori
  * `sortBy`: Field untuk sorting (`createdAt`, `title`, `id`. Default: `createdAt`)
  * `order`: Urutan sorting (`desc`, `asc`. Default: `desc`)
* **Contoh URL**: `/posts?page=1&limit=5&search=tutorial&categoryId=2`
* **Success Response (200)**:

    ```json
    {
      "success": true,
      "message": "Posts retrieved",
      "data": [
        {
          "id": 1,
          "title": "Tutorial API",
          "content": "Isi konten...",
          "createdAt": "...",
          "author": { "id": 1, "name": "Admin" },
          "category": { "id": 2, "name": "Programming" }
        }
      ],
      "pagination": {
        "totalRecords": 50,
        "currentPage": 1,
        "totalPages": 10,
        "limit": 5
      }
    }
    ```

### Get Post Detail

Mengambil detail satu postingan beserta tag-nya.

* **URL**: `/posts/:id`
* **Method**: `GET`
* **Success Response (200)**:

    ```json
    {
      "success": true,
      "message": "Post detail retrieved",
      "data": {
        "id": 1,
        "title": "Tutorial API",
        "content": "Full content...",
        "tags": [
           { "tag": { "id": 1, "name": "Tech" } }
        ],
        "...": "..."
      }
    }
    ```

### Create Post

Membuat postingan baru.

* **URL**: `/posts`
* **Method**: `POST`
* **Header**: `Authorization: Bearer <token>`
* **Body (JSON)**:

    ```json
    {
      "title": "Judul Postingan (Min 3 char)",
      "content": "Isi konten postingan (Min 10 char)",
      "categoryId": 2
    }
    ```

* **Success Response (201)**:

    ```json
    {
      "success": true,
      "message": "Post created successfully",
      "data": { ... }
    }
    ```

### Update Post

Mengupdate postingan. Hanya **Pemilik Post** atau **Admin** yang bisa melakukan ini.

* **URL**: `/posts/:id`
* **Method**: `PUT`
* **Header**: `Authorization: Bearer <token>`
* **Body (JSON)** (Semua field opsional, tapi minimal satu harus ada):

    ```json
    {
      "title": "Judul Baru",
      "content": "Konten diedit...",
      "categoryId": 3
    }
    ```

* **Success Response (200)**:

    ```json
    {
      "success": true,
      "message": "Post updated successfully",
      "data": { ... }
    }
    ```

### Delete Post

Menghapus postingan. Hanya **Pemilik Post** atau **Admin** yang bisa melakukan ini.

* **URL**: `/posts/:id`
* **Method**: `DELETE`
* **Header**: `Authorization: Bearer <token>`
* **Success Response (204)**: *No Content*

---

## 3. Categories (Kategori)

### Get All Categories

Mengambil semua daftar kategori.

* **URL**: `/categories`
* **Method**: `GET`
* **Success Response (200)**:

    ```json
    {
      "success": true,
      "message": "Categories retrieved",
      "data": [
        { "id": 1, "name": "Technology", "_count": { "posts": 5 } }
      ]
    }
    ```

### Create Category (Admin Only)

* **URL**: `/categories`
* **Method**: `POST`
* **Header**: `Authorization: Bearer <token>` (Role: ADMIN)
* **Body**: `{"name": "New Category"}`

### Update Category (Admin Only)

* **URL**: `/categories/:id`
* **Method**: `PUT`
* **Header**: `Authorization: Bearer <token>` (Role: ADMIN)
* **Body**: `{"name": "Updated Name"}`

### Delete Category (Admin Only)

* **URL**: `/categories/:id`
* **Method**: `DELETE`
* **Header**: `Authorization: Bearer <token>` (Role: ADMIN)

---

## 4. Tags (Tag)

### Get All Tags

Mengambil semua daftar tag.

* **URL**: `/tags`
* **Method**: `GET`
* **Success Response (200)**:

    ```json
    {
      "success": true,
      "message": "Tags retrieved",
      "data": [
        { "id": 1, "name": "NodeJS", "_count": { "posts": 3 } }
      ]
    }
    ```

### Create Tag (Admin Only)

* **URL**: `/tags`
* **Method**: `POST`
* **Header**: `Authorization: Bearer <token>` (Role: ADMIN)
* **Body**: `{"name": "New Tag"}`

### Update Tag (Admin Only)

* **URL**: `/tags/:id`
* **Method**: `PUT`
* **Header**: `Authorization: Bearer <token>` (Role: ADMIN)
* **Body**: `{"name": "Updated Tag"}`

### Delete Tag (Admin Only)

* **URL**: `/tags/:id`
* **Method**: `DELETE`
* **Header**: `Authorization: Bearer <token>` (Role: ADMIN)

---

## 5. System

### Health Check

Mengecek status server dan koneksi database.

* **URL**: `/health`
* **Method**: `GET`
* **Success Response (200)**:

    ```json
    {
      "success": true,
      "status": "ok",
      "environment": "development",
      "uptime": 123.45,
      "timestamp": "2025-10-01T12:00:00.000Z",
      "services": {
        "database": "connected"
      }
    }
    ```

## Common Error Codes

| Code | Deskripsi |
| :--- | :--- |
| **400** | Bad Request (Validasi gagal, format input salah) |
| **401** | Unauthorized (Token tidak ada, invalid, atau expired) |
| **403** | Forbidden (Role tidak sesuai atau bukan pemilik resource) |
| **404** | Not Found (Resource tidak ditemukan) |
| **409** | Conflict (Data duplikat, misal email/kategori sudah ada) |
| **500** | Internal Server Error |
