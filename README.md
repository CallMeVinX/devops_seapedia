# SeaPedia DevOps & Docker Management

Repositori ini berisi konfigurasi containerization menggunakan Docker untuk aplikasi **SeaPedia** (Frontend Next.js & Backend FastAPI).

---

## 📋 Daftar Isi
1. [Prasyarat](#-prasyarat)
2. [Persiapan Environment](#-persiapan-environment)
3. [Build & Menjalankan Container (Lokal)](#-build--menjalankan-container-lokal)
4. [Manajemen & Monitoring Container](#-manajemen--monitoring-container)
5. [Tag & Push Docker Images ke Docker Hub](#-tag--push-docker-images-ke-docker-hub)
6. [Arsitektur Layanan & Port](#-arsitektur-layanan--port)
7. [💡 Troubleshooting & Tips](#-troubleshooting--tips)

---

## 🛠 Prasyarat
Pastikan sistem Anda telah terpasang:
- [Docker Engine & Docker Desktop](https://www.docker.com/products/docker-desktop/) (v20.10+ / v24+)
- Git
- Akun [Docker Hub](https://hub.docker.com/) (jika ingin push image)

---

## ⚙️ Persiapan Environment

Sebelum menjalankan container, salin template `.env.example` ke file `.env` di root direktori dan sesuaikan nilainya:

```bash
# Salin file template environment
cp .env.example .env
```

Pastikan variabel kredensial (seperti `DATABASE_URL`, `SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`) sudah terisi dengan benar di file `.env`.

---

## 🚀 Build & Menjalankan Container (Lokal)

### 1. Buat Docker Network (Opsional namun Disarankan)
Agar container backend dan frontend dapat saling berkomunikasi via DNS nama container:
```bash
docker network create seapedia-network
```

---

### 2. Backend (FastAPI - Python 3.11)

- **Build Image:**
  ```bash
  docker build -t seapedia-backend ./seapedia-backend
  ```

- **Jalankan Container:**
  ```bash
  docker run -d \
    --name seapedia-backend-container \
    --network seapedia-network \
    -p 8000:8000 \
    --env-file .env \
    --restart always \
    seapedia-backend
  ```

---

### 3. Frontend (Next.js - Node 20 Multi-stage)

- **Build Image:**
  ```bash
  docker build -t seapedia-frontend ./seapedia-frontend
  ```

- **Jalankan Container:**
  ```bash
  docker run -d \
    --name seapedia-frontend-container \
    --network seapedia-network \
    -p 3000:3000 \
    --env-file .env \
    --restart always \
    seapedia-frontend
  ```

---

### 4. Periksa Status Container
Pastikan container berjalan dengan normal:
```bash
docker ps
```

---

## 🔍 Manajemen & Monitoring Container

Berikut perintah-perintah praktis untuk memantau dan mengelola container:

- **Melihat Log Container (Real-time):**
  ```bash
  # Log Backend
  docker logs -f seapedia-backend-container

  # Log Frontend
  docker logs -f seapedia-frontend-container
  ```

- **Menghentikan Container:**
  ```bash
  docker stop seapedia-backend-container seapedia-frontend-container
  ```

- **Menjalankan Kembali Container yang Dihentikan:**
  ```bash
  docker start seapedia-backend-container seapedia-frontend-container
  ```

- **Restart Container:**
  ```bash
  docker restart seapedia-backend-container seapedia-frontend-container
  ```

- **Menghapus Container:**
  ```bash
  docker rm -f seapedia-backend-container seapedia-frontend-container
  ```

---

## 📦 Tag & Push Docker Images ke Docker Hub

Jika ingin mempublikasikan image ke registry Docker Hub (`lordjmw`):

### 1. Login ke Docker Hub
```bash
docker login
```

### 2. Build Langsung dengan Tag Registry (atau gunakan `docker tag`)
```bash
# Build & tag Backend
docker build -t callmevin/seapedia-backend:latest ./seapedia-backend

# Build & tag Frontend
docker build -t callmevin/seapedia-frontend:latest ./seapedia-frontend
```

*Atau jika image lokal sudah ada:*
```bash
docker tag seapedia-backend callmevin/seapedia-backend:latest
docker tag seapedia-frontend callmevin/seapedia-frontend:latest
```

### 3. Push Image ke Docker Hub
```bash
# Push Backend
docker push callmevin/seapedia-backend:latest

# Push Frontend
docker push callmevin/seapedia-frontend:latest
```

---

## 🌐 Arsitektur Layanan & Port

| Layanan | Container Name | Port Host : Container | Base Image | Akses URL |
| :--- | :--- | :--- | :--- | :--- |
| **Backend** | `seapedia-backend-container` | `8000:8000` | `python:3.11-slim` | `http://localhost:8000` / `/docs` |
| **Frontend** | `seapedia-frontend-container` | `3000:3000` | `node:20-alpine` | `http://localhost:3000` |

---

## 💡 Troubleshooting & Tips

- **Rebuild Image Bersih (Tanpa Cache):**
  Jika terjadi perubahan kode atau dependensi yang belum ter-*reflect*, tambahkan flag `--no-cache`:
  ```bash
  docker build --no-cache -t seapedia-backend ./seapedia-backend
  docker build --no-cache -t seapedia-frontend ./seapedia-frontend
  ```
- **Port Bentrok (Port 3000 atau 8000 sudah terpakai):**
  Ubah mapping port host saat `docker run`, misalnya `-p 8080:8000` atau `-p 3001:3000`.
- **Koneksi Antar Container:**
  Pastikan kedua container berada dalam satu network (`seapedia-network`) agar frontend dapat mengakses backend via `http://seapedia-backend-container:8000`.
- **Membersihkan Resource Docker yang Tidak Terpakai:**
  ```bash
  docker system prune -f
  ```
