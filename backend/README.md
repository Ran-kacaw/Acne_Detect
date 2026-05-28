# AcneDetect Backend API

REST API untuk aplikasi AcneDetect, dibangun dengan **Express.js** dan **PostgreSQL**.

## Cara Menjalankan

### 1. Clone & Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env (sudah ada .env real)
# Edit .env dengan konfigurasi PostgreSQL kamu
```

### 3. Buat Database PostgreSQL
```sql
CREATE DATABASE acnedetect_db;
```

### 4. Jalankan Migrasi
```bash
npm run db:migrate
```
Perintah ini akan membuat semua tabel dan mengisi data produk awal.

### 5. Jalankan Server
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server berjalan di `http://localhost:5000`

---

## API Endpoints

### Auth
| Method | URL | Deskripsi | Auth |
|--------|-----|-----------|------|
| POST | `/api/auth/register` | Daftar akun baru | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| GET | `/api/auth/me` | Info user aktif | ✅ |

**Register body:**
```json
{ "name": "Budi", "email": "budi@email.com", "password": "password123" }
```

**Login body:**
```json
{ "email": "budi@email.com", "password": "password123" }
```

**Response:**
```json
{
  "token": "eyJ...",
  "user": { "id": "uuid", "name": "Budi", "email": "budi@email.com" }
}
```

---

### Detection
| Method | URL | Deskripsi | Auth |
|--------|-----|-----------|------|
| POST | `/api/detect` | Upload & deteksi gambar | ✅ |

**Request:** `multipart/form-data`, field `image` (JPG/PNG/WebP, max 5MB)

**Response:**
```json
{
  "imageUrl": "/uploads/uuid.jpg",
  "acneCount": 12,
  "severity": "Moderate",
  "areas": ["Pipi Kiri", "Dahi"],
  "accuracy": 94.0,
  "detections": [{ "x": 80, "y": 100, "w": 20, "h": 20, "confidence": "0.92" }],
  "products": [...]
}
```

---

### History
| Method | URL | Deskripsi | Auth |
|--------|-----|-----------|------|
| GET | `/api/history` | Semua riwayat user | ✅ |
| GET | `/api/history/:id` | Detail riwayat | ✅ |
| POST | `/api/history` | Simpan hasil deteksi | ✅ |
| DELETE | `/api/history/:id` | Hapus riwayat | ✅ |

**POST body:**
```json
{
  "imageUrl": "/uploads/uuid.jpg",
  "acneCount": 12,
  "severity": "Moderate",
  "areas": ["Pipi Kiri", "Dahi"],
  "accuracy": 94.0,
  "products": [...],
  "detections": [...]
}
```

---

### Products
| Method | URL | Deskripsi | Auth |
|--------|-----|-----------|------|
| GET | `/api/products` | Semua produk | ❌ |
| GET | `/api/products?severity=Mild` | Filter by severity | ❌ |
| GET | `/api/products/:id` | Detail produk | ❌ |

---

## Skema Database

### Tabel `users`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| name | VARCHAR(100) | Nama lengkap |
| email | VARCHAR(255) | Email unik |
| password | VARCHAR(255) | Bcrypt hash |
| created_at | TIMESTAMP | - |

### Tabel `detection_history`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| user_id | UUID | FK → users |
| image_url | TEXT | Path gambar |
| acne_count | INTEGER | Jumlah jerawat |
| severity | VARCHAR(20) | Mild/Moderate/Severe |
| areas | TEXT[] | Area wajah |
| accuracy | NUMERIC | Akurasi AI |
| products | JSONB | Rekomendasi produk |
| detections | JSONB | Bounding box |
| created_at | TIMESTAMP | Tanggal deteksi |

### Tabel `products`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| name | VARCHAR(200) | Nama produk |
| description | TEXT | Deskripsi |
| category | VARCHAR(100) | Jenis produk |
| ingredients | TEXT | Bahan aktif |
| usage_instruction | TEXT | Cara pakai |
| rating | NUMERIC(3,1) | Rating 1-5 |
| for_severity | TEXT[] | Cocok untuk severity |

---

## Integrasi dengan Frontend

Di file `src/utils/api.js` frontend, ubah:
```js
export const USE_MOCK = false  // matikan mock mode
```

Pastikan `VITE_API_URL` di `.env` frontend mengarah ke backend:
```
VITE_API_URL=http://localhost:5000
```

---

## Deploy ke Production

### Render / Railway / Fly.io
1. Set environment variables dari `.env.example`
2. Add PostgreSQL addon/plugin
3. Jalankan `npm run db:migrate` sekali saat deploy pertama
4. Start command: `npm start`

### Supabase sebagai Database
Kamu juga bisa menggunakan Supabase (PostgreSQL gratis):
1. Buat project di supabase.com
2. Copy connection string ke `DATABASE_URL`
3. Atau isi `DB_HOST`, `DB_USER`, dll. secara terpisah
