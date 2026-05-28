# AcneDetect Integrated — Latest Acne-Vision Checked

Alur yang dipakai:

Frontend -> Backend `/api/detect` -> FastAPI AI `/acne/analyze` -> Backend -> Frontend

## Status versi AI terbaru

Zip `Acne-Vision(2).zip` sudah dicek. Endpoint utama masih sama:

- AI endpoint utama: `POST /acne/analyze`
- Field file dari backend ke AI: `file`
- Parameter query: `jenis_kulit` dan `top_n`
- Response utama: `acne`, `jenis_kulit`, `total_rekomendasi`, `rekomendasi`

Jadi backend dan frontend tetap memakai alur satu pintu melalui backend.

## Catatan penting

File `Acne-Vision/output/best_model.keras` di zip terbaru masih 136 bytes, artinya masih Git LFS pointer, bukan model asli. Ganti file itu dengan model asli sebelum menjalankan AI.

## Jalankan lokal manual

Terminal 1, AI:

```bash
cd Acne-Vision
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

Terminal 2, Backend:

```bash
cd backend
npm install
npm run db:migrate
npm run dev
```

Terminal 3, Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Cek koneksi

- AI: `http://localhost:8000/health`
- Backend: `http://localhost:5000/api/health`
- Backend -> AI: `http://localhost:5000/api/detect/health`
- Frontend: `http://localhost:5173`

## ENV ringkas

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_USE_MOCK=false
```

Backend `.env`:

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
JWT_SECRET=secret_acnedetect_dev
JWT_EXPIRES_IN=7d
DB_HOST=localhost
DB_PORT=5432
DB_NAME=acnedetect_db
DB_USER=postgres
DB_PASSWORD=password_postgres_kamu
DB_SSL=false
```

AI `.env`:

```env
PORT=8000
CNN_MODEL_PATH=output/best_model.keras
MODEL_PATH=output/best_model.keras
SKINCARE_MODEL_PATH=output/skincare_cnn_integrated.pkl
MAX_FILE_SIZE=10485760
```
