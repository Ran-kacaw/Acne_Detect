# AcneDetect Backend API

Backend API untuk aplikasi **AcneDetect**, yaitu sistem deteksi tingkat keparahan jerawat dan rekomendasi skincare berbasis AI. API ini dibangun menggunakan **Express.js**, **PostgreSQL**, dan terintegrasi dengan layanan AI berbasis **FastAPI**.

API ini menyediakan fitur autentikasi pengguna, upload gambar wajah untuk deteksi jerawat, penyimpanan riwayat deteksi, penyimpanan produk favorit, daftar produk skincare, serta form kontak.

---

## Fitur Utama

* Registrasi dan login pengguna menggunakan JWT.
* Deteksi tingkat keparahan jerawat dari gambar wajah.
* Integrasi dengan layanan AI FastAPI.
* Rekomendasi produk skincare berdasarkan hasil deteksi dan jenis kulit.
* Penyimpanan riwayat deteksi pengguna.
* Penyimpanan produk favorit.
* Endpoint produk skincare.
* Endpoint form kontak.
* Upload gambar menggunakan Multer.
* Database menggunakan PostgreSQL.

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* Multer
* Axios
* FastAPI AI Service
* Railway / Render / VPS untuk deployment backend
* Vercel untuk frontend

---

## Base URL

Gunakan URL berikut jika backend sudah dideploy:

```txt
https://acnedetect-production.up.railway.app
```

Jika dijalankan secara lokal:

```txt
http://localhost:5000
```

---

## Endpoint

### Health Check

```txt
GET /api/health
GET /health
```

Contoh response:

```json
{
  "status": "ok",
  "service": "acnedetect-backend",
  "timestamp": "2026-05-31T08:00:00.000Z"
}
```

---

## Authentication

Beberapa endpoint membutuhkan token JWT. Token didapat setelah pengguna melakukan login atau register.

Format header untuk endpoint yang membutuhkan autentikasi:

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |

Contoh:

```txt
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## Register

```txt
POST /api/auth/register
```

### Request Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Request Body

```json
{
  "name": "Dwi Ayu Setiawati",
  "email": "dwiayu@example.com",
  "password": "password123"
}
```

### Response 201 Created

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "id": "uuid",
    "name": "Dwi Ayu Setiawati",
    "email": "dwiayu@example.com"
  }
}
```

### Error Response

Jika email tidak valid:

```json
{
  "message": "Email tidak valid"
}
```

Jika password kurang dari 8 karakter:

```json
{
  "message": "Password minimal 8 karakter"
}
```

Jika email sudah terdaftar:

```json
{
  "message": "Email sudah terdaftar"
}
```

---

## Login

```txt
POST /api/auth/login
```

### Request Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Request Body

```json
{
  "email": "dwiayu@example.com",
  "password": "password123"
}
```

### Response 200 OK

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "id": "uuid",
    "name": "Dwi Ayu Setiawati",
    "email": "dwiayu@example.com"
  }
}
```

### Error Response

```json
{
  "message": "Email atau password salah"
}
```

---

## Get Current User

```txt
GET /api/auth/me
```

Endpoint ini digunakan untuk mengambil data pengguna yang sedang login.

### Request Headers

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |

### Response 200 OK

```json
{
  "user": {
    "id": "uuid",
    "name": "Dwi Ayu Setiawati",
    "email": "dwiayu@example.com"
  }
}
```

### Error Response

Jika token tidak dikirim:

```json
{
  "message": "Token tidak ditemukan"
}
```

Jika token tidak valid:

```json
{
  "message": "Token tidak valid"
}
```

---

# Acne Detection

## Check AI Health

```txt
GET /api/detect/health
```

Endpoint ini digunakan untuk mengecek apakah backend berhasil terhubung dengan layanan AI FastAPI.

### Response 200 OK

```json
{
  "backend": "ok",
  "fastapi_url": "https://example-ai-service.hf.space",
  "fastapi_health": {
    "status": "ok"
  },
  "acne_info": {
    "cnn_loaded": true,
    "skincare_loaded": true,
    "skincare_total_produk": 185
  }
}
```

---

## Detect Acne

```txt
POST /api/detect
```

Endpoint ini digunakan untuk mengunggah gambar wajah dan mendapatkan hasil deteksi tingkat keparahan jerawat beserta rekomendasi produk skincare.

Endpoint ini membutuhkan autentikasi.

### Request Headers

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |
| Content-Type  | multipart/form-data   |

### Request Body Form-Data

| Key         | Type | Required | Description                                                                  |
| ----------- | ---- | -------- | ---------------------------------------------------------------------------- |
| image       | File | Yes      | Gambar wajah dalam format JPG, JPEG, atau PNG                                |
| jenis_kulit | Text | No       | Jenis kulit pengguna, contoh: Berminyak, Kering, Normal, Kombinasi, Sensitif |

### Contoh Request

```txt
POST /api/detect
Authorization: Bearer token_pengguna
Content-Type: multipart/form-data
```

Form-data:

```txt
image: wajah.jpg
jenis_kulit: Berminyak
```

### Response 200 OK

```json
{
  "success": true,
  "imageUrl": "https://acnedetect-production.up.railway.app/uploads/uuid.jpg",
  "imagePath": "/uploads/uuid.jpg",
  "filename": "uuid.jpg",
  "originalFilename": "wajah.jpg",
  "inference_time_ms": 1350,
  "acne": {
    "acne_level": 1,
    "acne_label": "Level 1 — Jerawat Ringan",
    "acne_deskripsi": "Terdapat jerawat ringan pada area wajah.",
    "confidence": 0.875,
    "confidence_pct": "87.50%",
    "probabilities": {
      "Tingkat 0": 0.05,
      "Tingkat 1": 0.875,
      "Tingkat 2": 0.06,
      "Tingkat 3": 0.015
    },
    "saran_dokter": false
  },
  "jenis_kulit": "Berminyak",
  "total_rekomendasi": 5,
  "rekomendasi": [
    {
      "id": 1,
      "rank": 1,
      "brand": "Example Brand",
      "produk": "Acne Care Gel",
      "name": "Acne Care Gel",
      "jenis_produk": "Moisturizer",
      "category": "Moisturizer",
      "bahan_aktif": "Niacinamide, Salicylic Acid",
      "ingredients": "Niacinamide, Salicylic Acid",
      "description": "Rekomendasi skincare berdasarkan hasil deteksi.",
      "recommendation_score": 92
    }
  ],
  "acneLevel": 1,
  "acneLabel": "Level 1 — Jerawat Ringan",
  "confidence": 0.875,
  "confidencePct": "87.50%",
  "skinType": "Berminyak",
  "products": [
    {
      "brand": "Example Brand",
      "produk": "Acne Care Gel"
    }
  ],
  "date": "2026-05-31T08:00:00.000Z"
}
```

### Error Response

Jika gambar tidak dikirim:

```json
{
  "message": "File gambar wajib diunggah dengan field name: image"
}
```

Jika format file tidak sesuai:

```json
{
  "message": "Format file tidak didukung. Gunakan JPG, JPEG, atau PNG"
}
```

Jika file terlalu besar:

```json
{
  "message": "File terlalu besar. Maksimal 5MB atau sesuai MAX_FILE_SIZE."
}
```

Jika layanan AI gagal:

```json
{
  "message": "Gagal menganalisis gambar dengan AI",
  "detail": "Service unavailable",
  "fastapi_url": "https://example-ai-service.hf.space"
}
```

---

# History

Semua endpoint history membutuhkan autentikasi.

## Get Detection History

```txt
GET /api/history
```

Endpoint ini digunakan untuk mengambil seluruh riwayat deteksi milik pengguna yang sedang login.

### Request Headers

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |

### Response 200 OK

```json
[
  {
    "id": "uuid",
    "imageUrl": "https://acnedetect-production.up.railway.app/uploads/uuid.jpg",
    "acneLevel": 1,
    "acneLabel": "Level 1 — Jerawat Ringan",
    "acneDeskripsi": "Terdapat jerawat ringan pada area wajah.",
    "confidence": "87.5000",
    "confidencePct": "87.50%",
    "probabilities": {
      "Tingkat 0": 0.05,
      "Tingkat 1": 0.875,
      "Tingkat 2": 0.06,
      "Tingkat 3": 0.015
    },
    "saranDokter": false,
    "skinType": "Berminyak",
    "rekomendasi": [
      {
        "brand": "Example Brand",
        "produk": "Acne Care Gel"
      }
    ],
    "date": "2026-05-31T08:00:00.000Z"
  }
]
```

---

## Save Detection History

```txt
POST /api/history
```

Endpoint ini digunakan untuk menyimpan hasil deteksi ke database.

### Request Headers

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |
| Content-Type  | application/json      |

### Request Body

```json
{
  "imageUrl": "https://acnedetect-production.up.railway.app/uploads/uuid.jpg",
  "acne": {
    "acne_level": 1,
    "acne_label": "Level 1 — Jerawat Ringan",
    "acne_deskripsi": "Terdapat jerawat ringan pada area wajah.",
    "confidence": 0.875,
    "confidence_pct": "87.50%",
    "probabilities": {
      "Tingkat 0": 0.05,
      "Tingkat 1": 0.875,
      "Tingkat 2": 0.06,
      "Tingkat 3": 0.015
    },
    "saran_dokter": false
  },
  "jenis_kulit": "Berminyak",
  "rekomendasi": [
    {
      "brand": "Example Brand",
      "produk": "Acne Care Gel",
      "jenis_produk": "Moisturizer",
      "bahan_aktif": "Niacinamide, Salicylic Acid"
    }
  ]
}
```

### Response 201 Created

```json
{
  "message": "Riwayat berhasil disimpan",
  "id": "uuid",
  "date": "2026-05-31T08:00:00.000Z"
}
```

### Error Response

Jika imageUrl kosong:

```json
{
  "message": "Data tidak lengkap: imageUrl kosong"
}
```

---

## Delete Detection History

```txt
DELETE /api/history/{id}
```

Endpoint ini digunakan untuk menghapus riwayat deteksi berdasarkan ID.

### Request Headers

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |

### Response 200 OK

```json
{
  "message": "Riwayat berhasil dihapus"
}
```

### Error Response

Jika riwayat tidak ditemukan:

```json
{
  "message": "Riwayat tidak ditemukan"
}
```

---

# Products

Endpoint produk dapat diakses tanpa login.

## Get All Products

```txt
GET /api/products
```

Endpoint ini digunakan untuk mengambil daftar produk skincare.

### Query Parameters

| Parameter | Type   | Required | Description                                |
| --------- | ------ | -------- | ------------------------------------------ |
| severity  | String | No       | Filter produk berdasarkan tingkat severity |
| category  | String | No       | Filter produk berdasarkan kategori produk  |

### Contoh Request

```txt
GET /api/products
GET /api/products?category=Moisturizer
GET /api/products?severity=Mild
```

### Response 200 OK

```json
[
  {
    "id": "uuid",
    "name": "Acne Care Gel",
    "description": "Produk untuk membantu merawat kulit berjerawat.",
    "category": "Moisturizer",
    "ingredients": "Niacinamide, Salicylic Acid",
    "usage": "Gunakan pada pagi dan malam hari.",
    "rating": "4.8",
    "image": "https://example.com/product.jpg"
  }
]
```

---

## Get Product By ID

```txt
GET /api/products/{id}
```

### Response 200 OK

```json
{
  "id": "uuid",
  "name": "Acne Care Gel",
  "description": "Produk untuk membantu merawat kulit berjerawat.",
  "category": "Moisturizer",
  "ingredients": "Niacinamide, Salicylic Acid",
  "usage": "Gunakan pada pagi dan malam hari.",
  "rating": "4.8",
  "image": "https://example.com/product.jpg",
  "for_severity": ["Mild", "Moderate"]
}
```

### Error Response

Jika produk tidak ditemukan:

```json
{
  "message": "Produk tidak ditemukan"
}
```

---

# Favorites

Semua endpoint favorites membutuhkan autentikasi.

## Get Favorite Products

```txt
GET /api/favorites
```

Endpoint ini digunakan untuk mengambil daftar produk favorit pengguna.

### Request Headers

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |

### Response 200 OK

```json
[
  {
    "id": "uuid",
    "productKey": "example-brand-acne-care-gel-niacinamide",
    "product": {
      "brand": "Example Brand",
      "produk": "Acne Care Gel",
      "jenis_produk": "Moisturizer",
      "bahan_aktif": "Niacinamide, Salicylic Acid"
    },
    "date": "2026-05-31T08:00:00.000Z"
  }
]
```

---

## Save Favorite Product

```txt
POST /api/favorites
```

Endpoint ini digunakan untuk menyimpan produk ke daftar favorit.

### Request Headers

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |
| Content-Type  | application/json      |

### Request Body

```json
{
  "product": {
    "brand": "Example Brand",
    "produk": "Acne Care Gel",
    "jenis_produk": "Moisturizer",
    "bahan_aktif": "Niacinamide, Salicylic Acid",
    "recommendation_score": 92
  }
}
```

### Response 201 Created

```json
{
  "message": "Produk berhasil disimpan ke favorit",
  "data": {
    "id": "uuid",
    "productKey": "example-brand-acne-care-gel-niacinamide",
    "product": {
      "brand": "Example Brand",
      "produk": "Acne Care Gel",
      "jenis_produk": "Moisturizer",
      "bahan_aktif": "Niacinamide, Salicylic Acid",
      "recommendation_score": 92
    },
    "date": "2026-05-31T08:00:00.000Z"
  }
}
```

### Error Response

Jika data produk tidak lengkap:

```json
{
  "message": "Data produk tidak lengkap"
}
```

---

## Delete Favorite Product

```txt
DELETE /api/favorites/{id}
```

Endpoint ini digunakan untuk menghapus produk dari daftar favorit.

### Request Headers

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer token_pengguna |

### Response 200 OK

```json
{
  "message": "Produk favorit berhasil dihapus"
}
```

### Error Response

Jika produk favorit tidak ditemukan:

```json
{
  "message": "Produk favorit tidak ditemukan"
}
```

---

# Contact

## Send Contact Message

```txt
POST /api/contact
```

Endpoint ini digunakan untuk menyimpan pesan dari pengguna melalui form kontak.

### Request Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Request Body

```json
{
  "name": "Dwi Ayu Setiawati",
  "email": "dwiayu@example.com",
  "message": "Saya ingin bertanya tentang hasil deteksi jerawat."
}
```

### Response 201 Created

```json
{
  "message": "Pesan berhasil dikirim",
  "data": {
    "id": "uuid",
    "name": "Dwi Ayu Setiawati",
    "email": "dwiayu@example.com",
    "message": "Saya ingin bertanya tentang hasil deteksi jerawat.",
    "created_at": "2026-05-31T08:00:00.000Z"
  }
}
```

### Error Response

Jika data tidak lengkap:

```json
{
  "message": "Nama, email, dan pesan wajib diisi"
}
```

---

# Environment Variables

Buat file `.env` berdasarkan `.env.example`.

```env
PORT=5000
NODE_ENV=development

CLIENT_URL=http://localhost:5173
PUBLIC_API_URL=http://localhost:5000

FASTAPI_URL=http://localhost:8000
AI_TIMEOUT_MS=60000
MAX_RECOMMENDATIONS=5
DEFAULT_SKIN_TYPE=Berminyak

UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
JSON_LIMIT=10mb

JWT_SECRET=change_this_to_a_long_random_secret
JWT_EXPIRES_IN=7d

DB_HOST=localhost
DB_PORT=5432
DB_NAME=acnedetect_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=false

# Jika menggunakan database dari Railway/Supabase/Render:
# DATABASE_URL=postgresql://user:password@host:5432/database
```

---

# Cara Menjalankan Project Secara Lokal

## 1. Install Dependencies

```bash
npm install
```

## 2. Buat Database PostgreSQL

Masuk ke PostgreSQL lalu buat database:

```sql
CREATE DATABASE acnedetect_db;
```

## 3. Jalankan Migrasi Database

```bash
npm run db:migrate
```

## 4. Jalankan Backend

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server akan berjalan di:

```txt
http://localhost:5000
```

---

# Integrasi dengan Frontend

Pada frontend, atur environment variable berikut:

```env
VITE_API_URL=https://acnedetect-production.up.railway.app
VITE_USE_MOCK=false
```

Jika berjalan lokal:

```env
VITE_API_URL=http://localhost:5000
VITE_USE_MOCK=false
```

Pastikan URL tidak ditambah `/api` di belakang.

Benar:

```env
VITE_API_URL=https://acnedetect-production.up.railway.app
```

Salah:

```env
VITE_API_URL=https://acnedetect-production.up.railway.app/api
```

---

# Integrasi dengan AI Service

Backend ini tidak langsung menjalankan model AI. Backend akan mengirim gambar ke layanan AI melalui endpoint FastAPI.

Environment variable yang digunakan:

```env
FASTAPI_URL=http://localhost:8000
```

Jika AI sudah dideploy, gunakan URL deploy AI:

```env
FASTAPI_URL=https://nama-space-ai.hf.space
```

Endpoint AI yang dipanggil backend:

```txt
POST /acne/analyze
GET /acne/info
GET /health
```

---

# Struktur Folder

```txt
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── migrate.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── detectController.js
│   │   ├── favoriteController.js
│   │   ├── historyController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── contact.js
│   │   ├── detect.js
│   │   ├── favorites.js
│   │   ├── history.js
│   │   └── products.js
│   └── index.js
├── uploads/
├── .env.example
├── Dockerfile
├── package.json
└── README.md
```

---

# Database Tables

## users

Digunakan untuk menyimpan data akun pengguna.

| Column     | Type      | Description                 |
| ---------- | --------- | --------------------------- |
| id         | UUID      | Primary key                 |
| name       | VARCHAR   | Nama pengguna               |
| email      | VARCHAR   | Email pengguna              |
| password   | VARCHAR   | Password yang sudah di-hash |
| created_at | TIMESTAMP | Waktu pembuatan akun        |
| updated_at | TIMESTAMP | Waktu update akun           |

## detection_history

Digunakan untuk menyimpan riwayat hasil deteksi jerawat.

| Column         | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| id             | UUID      | Primary key                          |
| user_id        | UUID      | Relasi ke tabel users                |
| image_url      | TEXT      | URL gambar hasil upload              |
| acne_level     | INTEGER   | Level jerawat 0 sampai 3             |
| acne_label     | TEXT      | Label hasil deteksi                  |
| acne_deskripsi | TEXT      | Deskripsi hasil deteksi              |
| confidence     | NUMERIC   | Nilai confidence dalam bentuk angka  |
| confidence_pct | VARCHAR   | Nilai confidence dalam bentuk persen |
| probabilities  | JSONB     | Probabilitas setiap kelas            |
| saran_dokter   | BOOLEAN   | Penanda apakah perlu saran dokter    |
| skin_type      | VARCHAR   | Jenis kulit pengguna                 |
| rekomendasi    | JSONB     | Data rekomendasi produk              |
| created_at     | TIMESTAMP | Waktu deteksi                        |

## favorite_products

Digunakan untuk menyimpan produk favorit pengguna.

| Column       | Type      | Description               |
| ------------ | --------- | ------------------------- |
| id           | UUID      | Primary key               |
| user_id      | UUID      | Relasi ke tabel users     |
| product_key  | TEXT      | Key unik produk           |
| product_data | JSONB     | Data produk yang disimpan |
| created_at   | TIMESTAMP | Waktu produk disimpan     |

## contact_us

Digunakan untuk menyimpan pesan dari form kontak.

| Column     | Type      | Description         |
| ---------- | --------- | ------------------- |
| id         | UUID      | Primary key         |
| name       | VARCHAR   | Nama pengirim       |
| email      | VARCHAR   | Email pengirim      |
| message    | TEXT      | Isi pesan           |
| created_at | TIMESTAMP | Waktu pesan dikirim |

---

# Catatan Penting

* Format gambar yang diterima adalah JPG, JPEG, dan PNG.
* Ukuran file default maksimal 5MB, atau mengikuti nilai `MAX_FILE_SIZE` pada `.env`.
* Endpoint `/api/detect` membutuhkan token login.
* Hasil deteksi bukan diagnosis medis, melainkan prediksi awal dari model AI.
* Jika hasil menunjukkan jerawat berat atau `saran_dokter` bernilai `true`, pengguna disarankan berkonsultasi dengan dokter kulit.
* Gambar yang diunggah akan disimpan di folder `uploads/` dan dapat diakses melalui URL backend.
* Pastikan `PUBLIC_API_URL` diisi dengan URL backend production agar `imageUrl` tersimpan dengan benar.
* Jika menggunakan endpoint `/api/products`, pastikan tabel `products` sudah tersedia di database.

---

# Deployment Notes

Untuk deployment di Railway atau Render:

1. Upload project backend ke GitHub.
2. Hubungkan repository ke Railway atau Render.
3. Tambahkan PostgreSQL database.
4. Isi environment variables sesuai `.env.example`.
5. Pastikan `DATABASE_URL` tersedia jika memakai PostgreSQL dari layanan cloud.
6. Jalankan migrasi database:

```bash
npm run db:migrate
```

7. Gunakan start command:

```bash
npm start
```

8. Pastikan frontend menggunakan URL backend production pada `VITE_API_URL`.

---

# Author

Capstone Project Team — AcneDetect

Project ini dikembangkan sebagai bagian dari capstone project untuk membangun sistem deteksi jerawat dan rekomendasi skincare berbasis AI.
