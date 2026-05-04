# 🌊 Portofolio Backend
**NestJS · Prisma · PostgreSQL**

---

## 📁 Struktur Proyek

```
portofolio-backend/
├── prisma/
│   ├── schema.prisma     ← Model database
│   └── seed.ts           ← Data awal (proyek contoh)
├── src/
│   ├── main.ts           ← Entry point, CORS, ValidationPipe
│   ├── app.module.ts     ← Root module
│   ├── prisma/           ← PrismaService (global)
│   ├── contact/          ← Simpan & kelola pesan kontak
│   ├── projects/         ← CRUD proyek portfolio
│   └── visitor/          ← Visitor counter harian
├── .env.example
└── package.json
```

---

## 🚀 Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment
```bash
cp .env.example .env
# Edit .env, isi DATABASE_URL dengan connection string PostgreSQL kamu
```

### 3. Buat database PostgreSQL
```sql
CREATE DATABASE portofolio_db;
```

### 4. Jalankan migrasi & generate Prisma client
```bash
npm run db:migrate
# Masukkan nama migrasi, contoh: "init"
```

### 5. Seed data awal (opsional)
```bash
npm run db:seed
```

### 6. Jalankan backend
```bash
npm run start:dev
# Backend berjalan di http://localhost:3001/api
```

---

## 📋 Endpoint API

| Method | URL | Deskripsi |
|--------|-----|-----------|
| `POST` | `/api/contact` | Kirim pesan dari form kontak |
| `GET` | `/api/contact` | Lihat semua pesan (admin) |
| `PATCH` | `/api/contact/:id/read` | Tandai pesan sudah dibaca |
| `DELETE` | `/api/contact/:id` | Hapus pesan |
| `GET` | `/api/projects` | Ambil proyek yang tampil (frontend) |
| `GET` | `/api/projects/admin` | Semua proyek termasuk yg hidden |
| `POST` | `/api/projects` | Tambah proyek baru |
| `PATCH` | `/api/projects/:id` | Update proyek |
| `DELETE` | `/api/projects/:id` | Hapus proyek |
| `POST` | `/api/visitors` | Catat kunjungan hari ini |
| `GET` | `/api/visitors/stats` | Statistik pengunjung 30 hari |

---

## 💡 Tips Pengembangan

- Gunakan **Prisma Studio** untuk lihat isi database: `npm run db:studio`
- Frontend otomatis fallback ke data HTML statis jika API mati
- Anti-spam: satu email maksimal 3 pesan per 24 jam
- Tambah proyek baru via `POST /api/projects` tanpa sentuh kode frontend
