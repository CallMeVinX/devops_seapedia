# SeaPedia DevOps & Docker Orchestration

Repositori ini berisi konfigurasi orkestrasi container menggunakan Docker & Docker Compose untuk aplikasi **SeaPedia** (Frontend Next.js & Backend FastAPI).

---

## 📋 Daftar Isi
1. [Prasyarat](#-prasyarat)
2. [Persiapan Environment](#-persiapan-environment)
3. [Build & Menjalankan Container (Lokal)](#-build--menjalankan-container-lokal)
4. [Manajemen & Monitoring Container](#-manajemen--monitoring-container)
5. [Tag & Push Docker Images ke Docker Hub](#-tag--push-docker-images-ke-docker-hub)
6. [Arsitektur Layanan & Port](#-arsitektur-layanan--port)

---

## 🛠 Prasyarat
Pastikan sistem Anda telah terpasang:
- [Docker Engine & Docker Desktop](https://www.docker.com/products/docker-desktop/) (v20.10+ / v24+)
- Docker Compose v2 (`docker compose`)
- Akun [Docker Hub](https://hub.docker.com/) (jika ingin push image)

---

## ⚙️ Persiapan Environment

Sebelum menjalankan container, salin template `.env.example` ke file `.env` dan sesuaikan nilainya:

```bash
# Salin file template environment
cp .env.example .env
```

Pastikan variabel kredensial (seperti `DATABASE_URL`, `SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`) sudah terisi dengan benar di file `.env`.

---

## 🚀 Build & Menjalankan Container (Lokal)

Ikuti langkah-langkah berikut untuk build dan menjalankan container secara lokal:

### 1. Login ke Docker CLI
Masuk ke akun Docker Hub Anda melalui terminal:
```bash
docker login
```

### 2. Build & Jalankan Container
Jalankan proses build image sekaligus menyalakan container di background mode (`-d`):
```bash
docker compose up -d --build
```

### 3. Periksa Status Container
Pastikan kedua container (`seapedia-frontend-container` dan `seapedia-backend-container`) berstatus `Up` / `running`:
```bash
docker compose ps
```

---

## 🔍 Manajemen & Monitoring Container

Berikut beberapa perintah berguna untuk memantau dan mengelola container:

- **Melihat Log Layanan (Real-time):**
  ```bash
  # Semua layanan
  docker compose logs -f

  # Hanya backend
  docker compose logs -f backend

  # Hanya frontend
  docker compose logs -f frontend
  ```

- **Menghentikan Container:**
  ```bash
  docker compose stop
  ```

- **Mematikan dan Menghapus Container:**
  ```bash
  docker compose down
  ```

- **Restart Container:**
  ```bash
  docker compose restart
  ```

---

## 📦 Tag & Push Docker Images ke Docker Hub

Jika Anda ingin mempublikasikan image ke Docker Hub registry (repository: `lordjmw`):

### 1. Periksa Image yang Telah Dibuat
Lihat daftar image lokal hasil build docker compose:
```bash
docker images
```
> Image yang terbentuk dari docker compose biasanya memiliki nama `devops-frontend` dan `devops-backend`.

### 2. Tag Image
Berikan tag namespace Docker Hub pada image lokal:
```bash
# Tag image frontend
docker tag devops-frontend lordjmw/seapedia-frontend:latest

# Tag image backend
docker tag devops-backend lordjmw/seapedia-backend:latest
```

### 3. Push Image ke Docker Hub
Unggah image ke registry Docker Hub:
```bash
# Push image frontend
docker push lordjmw/seapedia-frontend:latest

# Push image backend
docker push lordjmw/seapedia-backend:latest
```

---

## 🌐 Arsitektur Layanan & Port

| Layanan | Container Name | Port Host : Container | Deskripsi | Akses URL |
| :--- | :--- | :--- | :--- | :--- |
| **Backend** | `seapedia-backend-container` | `8000:8000` | FastAPI Python API Server | `http://localhost:8000` |
| **Frontend** | `seapedia-frontend-container` | `3000:3000` | Next.js Web Application | `http://localhost:3000` |

---

## 💡 Troubleshooting Ringkas

- **Port bentrok (misal 3000 atau 8000 sudah terpakai):**
  Ubah nilai `BACKEND_PORT` atau `FRONTEND_PORT` di file `.env`.
- **Perubahan kode tidak muncul:**
  Jalankan rebuild tanpa cache:
  ```bash
  docker compose build --no-cache
  docker compose up -d
  ```
- **Membersihkan resource docker yang tidak terpakai:**
  ```bash
  docker system prune -f
  ```
