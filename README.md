# Eksperika

Eksperika adalah website virtual science lab berbasis HTML, CSS, dan JavaScript. Project ini menampilkan landing page, dashboard, simulasi kimia, simulasi fisika, eksplorasi biologi, dan challenge mode dengan visual futuristik bertema laboratorium digital.

## Tujuan Project

Project ini dibuat untuk menghadirkan pengalaman belajar sains yang interaktif di browser. Pengguna dapat melihat simulasi, mengubah parameter eksperimen, membaca status hasil, dan mencoba tantangan edukatif tanpa instalasi aplikasi tambahan.

## Struktur Folder

```txt
WEB-DESAIN-SITEFEST/
├── landingpage.html
├── dashboard.html
├── chemistry.html
├── physic.html
├── biology.html
├── challenge.html
├── assets/
│   ├── css/
│   │   ├── global.css
│   │   ├── landingpage.css
│   │   ├── dashboard.css
│   │   ├── chemistry.css
│   │   ├── physic.css
│   │   ├── biology.css
│   │   ├── challenge.css
│   │   └── boxicons.min.css
│   ├── js/
│   │   ├── main.js
│   │   ├── landingpage.js
│   │   ├── dashboard.js
│   │   ├── chemistry.js
│   │   ├── physic.js
│   │   ├── biology.js
│   │   └── challenge.js
│   └── fonts/
│       ├── boxicons.eot
│       ├── boxicons.svg
│       ├── boxicons.ttf
│       ├── boxicons.woff
│       └── boxicons.woff2
├── package.json
├── package-lock.json
└── README.md
```

## Fungsi Folder

- `assets/css/` menyimpan seluruh stylesheet, termasuk `global.css` sebagai pusat theme variable, layout shell, komponen umum, tombol, panel, dan sidebar.
- `assets/js/` menyimpan script interaksi, animasi canvas, handler simulasi, dan logic setiap halaman.
- `assets/fonts/` menyimpan font lokal Boxicons agar icon dapat dirender dari file project.
- Root project menyimpan file HTML utama agar navigasi antar halaman tetap sederhana dan mudah dibuka langsung.

## Fungsi File Utama

- `landingpage.html` adalah halaman depan Eksperika berisi hero, preview simulasi, fitur, testimoni, CTA, dan footer.
- `dashboard.html` adalah pusat navigasi lab, ringkasan progress, activity log, dan mini simulation.
- `chemistry.html` adalah halaman simulasi reaksi kimia, pH, reagent, beaker, dan observation log.
- `physic.html` adalah halaman simulasi rangkaian listrik dengan kontrol voltage, resistance, source type, dan live meter.
- `biology.html` adalah halaman eksplorasi anatomi manusia, organ, sistem tubuh, scan mode, dan quiz mode.
- `challenge.html` adalah mode tantangan gabungan untuk chemistry, physics, dan biology.
- `assets/css/global.css` adalah file tema utama. Warna inti dikelola dengan variable seperti `--primary`, `--secondary`, `--background`, `--surface`, `--text-main`, `--text-muted`, `--border`, dan `--accent`.
- `assets/js/main.js` berisi utility global seperti custom cursor.

## Catatan Pengembangan

- Sistem warna sudah dipusatkan di `assets/css/global.css` dan halaman lain menggunakan variable agar tema lebih konsisten.
- Icon utama menggunakan gaya outline Boxicons (`bx`) agar semua glyph tampil dari font lokal. Icon `bxl` hanya dipakai untuk logo sosial di footer.
- Komentar section HTML, CSS, dan JavaScript dibuat konsisten memakai garis `-----`.
- Struktur asset sudah dirapikan ke dalam `assets/css`, `assets/js`, dan `assets/fonts`.
- Project tetap menggunakan HTML, CSS, dan JavaScript vanilla tanpa framework.
- Jika project makin besar, file HTML selain landing page bisa dipindahkan ke folder `pages/`, tetapi semua link navigasi perlu disesuaikan ulang.
