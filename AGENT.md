# AGENT.md — Panduan Konsistensi Project Eksperika

Dokumen ini digunakan sebagai pedoman untuk AI agent, developer, atau kontributor yang membantu mengembangkan project **Eksperika — Virtual Science Lab**. Tujuan utama file ini adalah menjaga konsistensi desain, struktur kode, komentar, warna, icon, UX antarhalaman, dan gaya penulisan kode agar project tidak terlihat seperti gabungan halaman yang berbeda-beda.

---

## 1. Identitas Project

**Nama project:** Eksperika  
**Jenis project:** Website laboratorium virtual interaktif  
**Konsep utama:** Platform simulasi sains digital dengan halaman Landing Page, Dashboard, Chemistry Lab, Physics Lab, Biology Lab, dan Challenge.  
**Gaya visual utama:** Futuristic science lab, dark interface, neon accent, grid background, sidebar dashboard, card-based UI, custom cursor, dan animasi ringan.

Jangan mengubah konsep utama website. Semua perubahan harus bersifat penyempurnaan, perapian, atau refactor ringan tanpa mengganti arah desain secara ekstrem.

---

## 2. Struktur Project Saat Ini

Gunakan struktur project yang sudah ada sebagai dasar utama:

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

### Fungsi Folder

- `css/` menyimpan seluruh stylesheet project.
- `css/global.css` wajib menjadi pusat style global seperti warna, font, sidebar, topbar, button, card, panel, cursor, dan utility class.
- File CSS halaman seperti `chemistry.css`, `physic.css`, `biology.css`, dan lainnya hanya boleh berisi style khusus halaman tersebut.
- `js/` menyimpan seluruh logic JavaScript.
- `js/main.js` wajib menjadi pusat logic global seperti custom cursor, shared navigation behavior, helper function, atau logic yang digunakan lebih dari satu halaman.
- File JS halaman hanya boleh berisi logic khusus halaman tersebut.
- `fonts/` menyimpan font Boxicons lokal.

---

## 3. Prinsip Utama Pengembangan

Setiap perubahan wajib mengikuti prinsip berikut:

1. Jangan membuat ulang project dari nol.
2. Jangan menghapus fitur yang sudah ada tanpa alasan kuat.
3. Jangan mengubah layout besar secara ekstrem.
4. Jangan mengganti library utama tanpa alasan jelas.
5. Jangan mencampur banyak gaya desain dalam satu project.
6. Semua halaman harus terasa sebagai bagian dari satu sistem yang sama.
7. Perubahan harus memperbaiki konsistensi, readability, maintainability, dan UX.
8. Jika ada perubahan besar yang benar-benar diperlukan, jelaskan alasannya terlebih dahulu.

---

## 4. Sistem Warna

Semua warna utama harus dikontrol melalui CSS variable di `css/global.css`.

Gunakan variable berikut sebagai standar:

```css
:root {
  --primary: #0ea5e9;
  --secondary: #10b981;
  --accent: #22d3ee;
  --warning: #fbbf24;
  --danger: #ef4444;

  --background: #020617;
  --background-soft: #060f1c;
  --surface: rgba(15, 23, 42, 0.92);
  --surface-soft: rgba(15, 23, 42, 0.72);

  --text-main: #f0f9ff;
  --text-muted: rgba(240, 249, 255, 0.62);
  --text-soft: rgba(240, 249, 255, 0.42);

  --border: rgba(14, 165, 233, 0.22);
  --border-soft: rgba(14, 165, 233, 0.14);

  --glow-primary: 0 0 20px rgba(14, 165, 233, 0.3);
  --glow-secondary: 0 0 20px rgba(16, 185, 129, 0.3);
  --glow-accent: 0 0 20px rgba(34, 211, 238, 0.3);

  --radius: 4px;
  --sidebar-w: 230px;

  --font-mono: "Space Mono", monospace;
  --font-display: "Bebas Neue", sans-serif;
  --font-body: "Space Grotesk", sans-serif;
}
```

### Aturan Warna

- Hindari menulis warna hex berulang-ulang di banyak file.
- Warna seperti `#0ea5e9`, `#10b981`, `#22d3ee`, dan `#f0f9ff` harus diganti dengan variable jika digunakan berulang.
- Warna khusus simulasi masih boleh digunakan jika memang mewakili objek eksperimen, misalnya cairan kimia, status listrik, atau organ tubuh.
- Background utama halaman harus tetap gelap dan konsisten.
- Hover, active state, border, dan shadow harus memakai turunan dari variable global.
- Jangan membuat palette baru di setiap halaman.

---

## 5. Konsistensi Tampilan Antarhalaman

Halaman berikut harus saling terhubung secara visual dan UX:

- `landingpage.html`
- `dashboard.html`
- `chemistry.html`
- `physic.html`
- `biology.html`
- `challenge.html`

### Komponen yang Harus Konsisten

- Sidebar dashboard.
- Topbar/header halaman internal.
- Breadcrumb.
- Button style.
- Card style.
- Panel style.
- Font family.
- Custom cursor.
- Grid background.
- Border dan shadow.
- Icon size dan spacing.
- Active state navigasi.
- Responsive behavior.

Jika membuat halaman baru, gunakan struktur dasar dari halaman yang sudah ada:

```html
<body>
  <div class="cursor" id="cursor"></div>
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="grid-bg"></div>

  <div class="app">
    <aside class="sidebar">
      <!-- Sidebar content -->
    </aside>

    <main class="main">
      <header class="topbar">
        <!-- Page title and breadcrumb -->
      </header>

      <section class="content">
        <!-- Page content -->
      </section>
    </main>
  </div>
</body>
```

---

## 6. Konsistensi Icon

Project ini menggunakan **Boxicons**. Jangan menambahkan Font Awesome, Bootstrap Icons, SVG random, atau library icon lain jika tidak diperlukan.

### Aturan Icon

- Gunakan format:

```html
<i class="bx bxs-flask"></i>
```

- Semua icon wajib berasal dari Boxicons.
- Utamakan gaya solid `bxs` untuk navigasi utama dan icon penting.
- Gaya regular `bx` boleh digunakan untuk action ringan, control, atau secondary button.
- Jangan mencampur style icon tanpa alasan.
- Jangan menggunakan inline SVG untuk icon jika Boxicons memiliki alternatif yang mirip.
- Ukuran icon di sidebar harus konsisten melalui class `.nav-icon`.
- Icon dalam button harus memiliki spacing yang sama.

### Mapping Icon Utama

Gunakan mapping berikut agar icon antarhalaman tetap seragam:

```txt
Home          → bx bxs-home
Chemistry     → bx bxs-flask
Physics       → bx bxs-bolt-circle
Biology       → bx bxs-dna atau bx bx-dna
Challenge     → bx bxs-book-open
Play/Start    → bx bx-play
Reset         → bx bx-reset
Chart/Data    → bx bx-bar-chart-alt-2
Status/Pulse  → bx bx-pulse
Trophy/Result → bx bxs-trophy
```

Jika ingin memilih antara `bx-dna` dan `bxs-dna`, gunakan satu pilihan yang sama di seluruh project.

---

## 7. Aturan HTML

### Struktur HTML

- Gunakan struktur semantik jika memungkinkan: `header`, `nav`, `aside`, `main`, `section`, `footer`.
- Jangan terlalu banyak menggunakan `div` jika elemen semantik lebih tepat.
- Pastikan setiap halaman memiliki `title` yang jelas.
- Pastikan semua file halaman memanggil stylesheet dengan urutan berikut:

```html
<link rel="stylesheet" href="css/boxicons.min.css" />
<link rel="stylesheet" href="css/global.css" />
<link rel="stylesheet" href="css/nama-halaman.css" />
```

- Pastikan script global dipanggil sebelum script khusus halaman:

```html
<script src="js/main.js"></script>
<script src="js/nama-halaman.js"></script>
```

### Link Antarhalaman

Navigasi harus jelas dan saling terhubung:

```txt
Landing Page → Dashboard
Dashboard → Chemistry, Physics, Biology, Challenge
Chemistry → Dashboard, Physics, Biology, Challenge
Physics → Dashboard, Chemistry, Biology, Challenge
Biology → Dashboard, Chemistry, Physics, Challenge
Challenge → Dashboard, Chemistry, Physics, Biology
```

Jangan membuat link kosong seperti `href="#"` jika sebenarnya harus menuju halaman lain.

---

## 8. Aturan CSS

CSS harus ditulis terstruktur dan mudah dibaca.

### Urutan Section CSS yang Disarankan

```css
/* --------------------------------------------------
   Page Variables / Overrides
-------------------------------------------------- */

/* --------------------------------------------------
   Page Layout
-------------------------------------------------- */

/* --------------------------------------------------
   Header / Topbar
-------------------------------------------------- */

/* --------------------------------------------------
   Main Components
-------------------------------------------------- */

/* --------------------------------------------------
   Cards / Panels
-------------------------------------------------- */

/* --------------------------------------------------
   Buttons / Controls
-------------------------------------------------- */

/* --------------------------------------------------
   Animation
-------------------------------------------------- */

/* --------------------------------------------------
   Responsive Layout
-------------------------------------------------- */
```

### Aturan CSS

- Gunakan `global.css` untuk komponen yang dipakai berulang.
- Jangan menduplikasi style sidebar, topbar, button, panel, dan card di setiap file CSS halaman.
- Gunakan nama class yang jelas dan konsisten.
- Gunakan kebab-case untuk class CSS.
- Hindari inline style di HTML jika style tersebut bisa dipindahkan ke CSS.
- Media query boleh diletakkan di bagian bawah file atau mengikuti section masing-masing, tetapi harus konsisten.
- Jangan menulis selector terlalu panjang jika bisa dibuat lebih sederhana.
- Hindari penggunaan `!important` kecuali benar-benar diperlukan.

---

## 9. Aturan JavaScript

### Struktur JavaScript

Gunakan `main.js` untuk logic global dan file JS halaman untuk logic spesifik.

Contoh pembagian:

```txt
main.js          → cursor, shared helper, shared UI behavior
landingpage.js   → hero animation, landing interactions
chemistry.js     → chemistry simulation logic
physic.js        → physics simulation logic
biology.js       → biology interaction logic
challenge.js     → challenge selection and scoring logic
```

### Aturan Penulisan JS

- Gunakan nama variable dan fungsi yang jelas.
- Hindari duplikasi logic.
- Jangan mengubah logic utama simulasi kecuali ada bug.
- Pisahkan fungsi berdasarkan tugasnya.
- Jangan membuat fungsi terlalu panjang jika bisa dipecah.
- Validasi elemen DOM sebelum digunakan agar tidak error di halaman lain.
- Gunakan komentar hanya pada fungsi penting, bukan pada setiap baris.

Contoh validasi DOM:

```js
const startButton = document.querySelector(".start-button");

if (startButton) {
  startButton.addEventListener("click", handleStartExperiment);
}
```

---

## 10. Standar Komentar Kode

Komentar harus konsisten di semua file. Gunakan hanya garis `-----` sebagai hiasan komentar.

Jangan gunakan variasi seperti:

```txt
=====
*****
─────
═════
```

### Format Komentar HTML

```html
<!-- --------------------------------------------------
     Header Section
-------------------------------------------------- -->
```

### Format Komentar CSS

```css
/* --------------------------------------------------
   Global Variables
-------------------------------------------------- */
```

### Format Komentar JavaScript

```js
// --------------------------------------------------
// Navigation Handler
// --------------------------------------------------
```

### Section yang Wajib Diberi Komentar

- Global variables.
- Reset style.
- Navbar.
- Sidebar.
- Topbar.
- Hero section.
- Main layout.
- Card section.
- Panel section.
- Footer.
- Responsive layout.
- JavaScript event handler.
- Animation logic.
- Utility function.

Jangan memberi komentar berlebihan pada kode yang sudah jelas.

---

## 11. UX Antarhalaman

UX harus mudah dipahami dan tidak membingungkan pengguna.

### Aturan UX

- Setiap halaman internal harus memiliki sidebar yang sama.
- Menu aktif harus sesuai halaman saat ini.
- Breadcrumb harus menunjukkan posisi pengguna.
- Button utama harus memiliki label yang jelas.
- Jangan membuat tombol yang terlihat bisa diklik tetapi tidak memiliki fungsi.
- Gunakan feedback visual saat hover, active, selected, correct, wrong, disabled, dan loading.
- Challenge harus terasa terhubung dengan Chemistry, Physics, dan Biology.
- Landing Page harus mengarahkan pengguna ke Dashboard atau simulasi utama.
- Dashboard harus menjadi pusat navigasi ke semua lab.

---

## 12. Responsive Design

Website harus tetap nyaman dibuka di layar kecil.

### Aturan Responsive

- Sidebar boleh berubah menjadi layout lebih ringkas di layar kecil.
- Card dan panel harus bisa turun ke satu kolom.
- Jangan biarkan content overflow horizontal.
- Canvas atau simulasi harus memiliki ukuran yang fleksibel.
- Font heading besar di landing page harus diturunkan ukurannya di mobile.
- Button group harus bisa wrap.

Gunakan breakpoint yang konsisten, misalnya:

```css
@media (max-width: 1024px) {
  /* Tablet layout */
}

@media (max-width: 768px) {
  /* Mobile layout */
}

@media (max-width: 480px) {
  /* Small mobile layout */
}
```

---

## 13. Library dan Dependency

Project saat ini menggunakan:

```txt
Boxicons v2.1.4
Google Fonts
jQuery v3.7.1
FancyBox v5.0.36
SwiperJS v11.1.5
TypedJS v2.1.0
```

### Aturan Library

- Jangan menambah library baru jika fitur bisa dibuat dengan JavaScript biasa.
- Jangan mengganti Boxicons dengan library lain.
- Jangan memuat library di halaman yang tidak membutuhkannya.
- Jika library hanya dipakai di satu halaman, load hanya di halaman tersebut.
- Pastikan CDN tidak berulang tanpa kebutuhan.

---

## 14. Checklist Sebelum Commit

Sebelum menyimpan atau mengirim perubahan, pastikan:

- [ ] Tidak ada fitur utama yang terhapus.
- [ ] Semua halaman masih bisa dibuka.
- [ ] Sidebar dan topbar konsisten.
- [ ] Warna sudah memakai CSS variable jika digunakan berulang.
- [ ] Icon tetap memakai Boxicons.
- [ ] Style icon tidak tercampur sembarangan.
- [ ] Komentar memakai format garis `-----`.
- [ ] Tidak ada komentar dengan format `=====`, `*****`, `────`, atau `════`.
- [ ] CSS sudah dikelompokkan berdasarkan section.
- [ ] JS tidak memiliki logic duplikat yang tidak perlu.
- [ ] Link antarhalaman berfungsi.
- [ ] Responsive layout tidak rusak.
- [ ] Tidak ada error di console browser.
- [ ] README.md diperbarui jika ada perubahan struktur atau fitur.

---

## 15. Checklist Refactor Visual

Saat merapikan visual, lakukan hal berikut:

- [ ] Samakan background utama semua halaman.
- [ ] Samakan warna panel dan card.
- [ ] Samakan border radius.
- [ ] Samakan shadow dan glow.
- [ ] Samakan ukuran icon sidebar.
- [ ] Samakan jarak antar section.
- [ ] Samakan style button primary, secondary, ghost, dan danger.
- [ ] Samakan hover effect.
- [ ] Samakan empty state dan status text.
- [ ] Kurangi inline style yang tidak perlu.

---

## 16. Checklist README.md

Jika README.md dibuat atau diperbarui, wajib memuat:

- Nama project.
- Deskripsi singkat.
- Tujuan project.
- Fitur utama.
- Struktur folder dalam bentuk tree.
- Penjelasan fungsi setiap folder.
- Penjelasan fungsi setiap halaman utama.
- Teknologi/library yang digunakan.
- Cara menjalankan project.
- Catatan pengembangan.

---

## 17. Batasan untuk AI Agent

AI agent yang mengerjakan project ini harus mengikuti batasan berikut:

1. Jangan membuat file baru yang tidak diperlukan.
2. Jangan menghapus file existing tanpa instruksi jelas.
3. Jangan mengubah nama file HTML, CSS, atau JS utama tanpa alasan kuat.
4. Jangan mengganti konsep Eksperika menjadi platform lain.
5. Jangan mengubah semua UI secara total.
6. Jangan mencampur icon library.
7. Jangan membuat komentar dengan format berbeda-beda.
8. Jangan menambahkan dependency besar untuk fitur kecil.
9. Jangan memindahkan logic simulasi tanpa memastikan fitur tetap berjalan.
10. Jika refactor berisiko, jelaskan perubahan dan alasan teknisnya.

---

## 18. Prioritas Pengerjaan

Jika agent diminta merapikan project, ikuti urutan prioritas berikut:

1. Pastikan semua halaman masih berjalan.
2. Rapikan dan pusatkan variable warna di `global.css`.
3. Samakan sidebar, topbar, button, card, dan panel.
4. Samakan icon Boxicons.
5. Rapikan komentar HTML, CSS, dan JS.
6. Kurangi duplikasi CSS.
7. Kurangi duplikasi JS.
8. Perbaiki link antarhalaman.
9. Perbaiki responsive layout.
10. Perbarui README.md.

---

## 19. Contoh Prompt untuk Agent

Gunakan prompt berikut jika ingin meminta AI agent mengerjakan project ini:

```txt
Baca dan ikuti seluruh aturan pada AGENT.md sebelum mengubah kode.
Rapikan project Eksperika tanpa membuat ulang dari nol.
Fokus pada konsistensi warna, icon Boxicons, sidebar, topbar, card, button, komentar kode, struktur CSS, struktur JavaScript, responsive layout, dan hubungan antarhalaman.
Jangan menghapus fitur utama.
Jangan mengganti konsep utama.
Gunakan css/global.css sebagai pusat variable dan komponen global.
Gunakan format komentar garis ----- secara konsisten di HTML, CSS, dan JavaScript.
Setelah selesai, jelaskan perubahan penting yang dilakukan dan update README.md jika struktur atau fitur berubah.
```

---

## 20. Catatan Akhir

Project Eksperika harus terasa sebagai satu produk yang utuh. Setiap halaman boleh memiliki karakter sesuai topiknya, tetapi tetap harus menggunakan bahasa visual yang sama: warna neon science lab, dark interface, Boxicons, sidebar konsisten, topbar konsisten, card/panel konsisten, dan komentar kode yang rapi.

Fokus utama bukan membuat desain baru, melainkan menyempurnakan project yang sudah ada agar lebih profesional, mudah dikembangkan, dan nyaman digunakan.
