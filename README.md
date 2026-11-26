# porto — Portofolio Adryan (Vite + React + Three.js)

Web portofolio dengan latar 3D (bukit rumput berangin, langit berawan, TV retro),
halaman Beranda, Tentang, Proyek (+ detail), Bukti kegiatan, Kontak, dan pilihan bahasa ID/EN.

## Menjalankan
```bash
npm install
npm run dev        # buka alamat yang muncul (biasanya http://localhost:5173)
npm run build      # hasil produksi ada di folder dist/
npm run preview    # coba hasil build
```
Butuh Node.js 18 atau lebih baru.

## Mengubah isi
Semua teks dan data ada di **`src/data.js`** (setiap teks punya versi `id` dan `en`):

| Bagian | Isi |
| --- | --- |
| `LINKS` | email, WhatsApp, GitHub, LinkedIn, Instagram |
| `T` | teks halaman (beranda, judul, deskripsi, footer) |
| `FOCUS`, `EXP`, `SKILLS` | fokus bidang, pengalaman & pendidikan, skill & tech stack |
| `PROJECTS` | daftar proyek + halaman detailnya (`slug`, `long`, `demo`, `code`) |
| `PROOFS` | bukti kegiatan |

**Gambar:** taruh file di `public/img/`, lalu isi `img:"img/namafile.jpg"` pada proyek atau bukti.

## Struktur
```
src/
  data.js                 <- edit isi di sini
  App.jsx                 <- kerangka halaman + transisi angin
  LangContext.jsx         <- bahasa ID/EN
  hooks/useHashRoute.js   <- routing (#tentang, #proyek-lontara, dst.)
  components/             <- Header, Footer, Ph (gambar placeholder)
  pages/                  <- Home, About, Projects, ProjectDetail, Proof, Contact
  scene/                  <- latar 3D (initScene.js) dan state angin
  index.css               <- semua gaya
```

## Latar 3D
Ada di `src/scene/initScene.js`. Bila komputer terasa berat, kecilkan jumlah rumput
pada baris `const N=...` dan jumlah partikel `PN=...`. Versi Three.js dikunci di `0.128.0`
agar tampilan tidak berubah.

## Deploy (GitHub Pages / Netlify / Vercel)
Jalankan `npm run build`, lalu unggah isi folder `dist/`. Routing memakai hash,
jadi tidak perlu pengaturan khusus server.
