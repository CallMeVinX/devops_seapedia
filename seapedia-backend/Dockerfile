# 1. Gunakan base image Python resmi berbasis Linux (Alpine/Slim)
FROM python:3.10-slim

# 2. Set direktori kerja di dalam container
WORKDIR /app

# 3. Hindari pembuatan file .pyc dan pastikan log output langsung tercetak
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 4. Install dependensi sistem yang dibutuhkan (seperti gcc/libpq jika ada)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 5. Salin requirements.txt dan install dependensi Python
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 6. Salin seluruh kode program backend ke container
COPY . .

# 7. Expose port FastAPI (8000)
EXPOSE 8000

# 8. Perintah untuk menjalankan aplikasi
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]