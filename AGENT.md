# AGENT.md — Eksperika Web Development Guide

Dokumen ini adalah panduan wajib untuk AI coding assistant, developer, atau kontributor yang mengembangkan project **Eksperika — Virtual Science Lab**. Tujuan utama file ini adalah menjaga agar website tetap konsisten dari segi konsep, desain, warna, icon, struktur kode, komentar, responsivitas, dan pengalaman pengguna.

AI agent harus membaca file ini sebelum mengubah kode apa pun.

---

## 1. Identitas Project

**Nama project:** Eksperika  
**Tagline:** Platform Laboratorium Virtual Interaktif untuk Pembelajaran Sains Digital  
**Jenis project:** Website laboratorium virtual interaktif berbasis web  
**Konsep utama:** Platform simulasi sains digital yang membantu siswa belajar fisika, kimia, dan biologi melalui visualisasi serta interaksi langsung.

Halaman utama project:

- Landing Page
- Dashboard
- Chemistry Lab
- Physics Lab
- Biology Lab
- Challenge Page

Eksperika bukan hanya landing page. Eksperika harus terasa sebagai sebuah platform pembelajaran digital yang memiliki alur, navigasi, simulasi, dan challenge yang saling terhubung.

---

## 2. Prinsip Utama yang Tidak Boleh Dilupakan

Setiap kali melakukan perubahan, AI agent wajib mengikuti prinsip berikut:

1. **Jangan membuat ulang project dari awal.**
2. **Jangan menghapus fitur yang sudah berjalan tanpa instruksi jelas.**
3. **Jangan mengganti konsep Eksperika menjadi platform lain.**
4. **Jangan mengubah desain secara ekstrem.**
5. **Jaga konsistensi warna, font, icon, card, button, sidebar, topbar, dan spacing.**
6. **Pastikan website benar-benar responsif di perangkat mobile asli, bukan hanya saat browser desktop dikecilkan.**
7. **Custom cursor hanya boleh aktif di desktop/laptop, tidak boleh aktif di mobile atau perangkat touch.**
8. **Gunakan Boxicons sebagai icon utama. Jangan mencampur banyak icon library.**
9. **Gunakan CSS variable di `global.css` untuk warna dan style global.**
10. **Jika mengubah JavaScript, pastikan tidak menimbulkan error pada halaman lain.**

Jika ada konflik antara visual dan fungsi, utamakan urutan berikut:

1. Fitur utama tetap berjalan.
2. Mobile layout tidak rusak.
3. Konsistensi visual tetap terjaga.
4. Kode tetap rapi dan mudah dirawat.
5. Efek visual boleh dikurangi jika terlalu berat.

---

## 3. Struktur Project Saat Ini

Gunakan struktur project yang sudah ada sebagai dasar utama. Jangan mengganti nama file utama tanpa alasan kuat.

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
│   │   ├── vendor/
│   │   │   ├── jquery.min.js
│   │   │   └── typed.umd.js
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
├── README.md
└── AGENT.md
```

### Fungsi Folder

- `assets/css/global.css` menjadi pusat style global seperti warna, font, sidebar, topbar, button, card, panel, cursor, dan utility class.
- File CSS halaman seperti `chemistry.css`, `physic.css`, `biology.css`, dan `challenge.css` hanya boleh berisi style khusus halaman tersebut.
- `assets/js/main.js` menjadi pusat logic global seperti custom cursor, shared navigation, helper function, atau logic yang digunakan lebih dari satu halaman.
- File JS halaman hanya boleh berisi logic khusus halaman tersebut.
- `assets/fonts/` menyimpan font Boxicons lokal.

---

## 4. Tema Visual Global

Eksperika menggunakan tema visual **dark futuristic science laboratory**.

Karakter desain utama:

- Dark interface.
- Neon accent.
- Grid background.
- Science HUD panel.
- Card-based layout.
- Glow halus.
- Sidebar dashboard.
- Topbar konsisten.
- Animasi ringan.
- Custom cursor hanya desktop.

Jangan mengubah tema menjadi:

- Minimalis putih polos.
- Corporate formal.
- Cartoon berlebihan.
- Tema warna acak.
- UI yang tidak berhubungan dengan laboratorium sains digital.

---

## 5. Sistem Warna Global

Semua warna utama wajib dikontrol melalui CSS variable di `assets/css/global.css`.

Gunakan variable berikut sebagai standar:

```css
:root {
  --primary-rgb: 14, 165, 233;
  --secondary-rgb: 16, 185, 129;
  --accent-rgb: 34, 211, 238;

  --primary: rgb(var(--primary-rgb));
  --secondary: rgb(var(--secondary-rgb));
  --accent: rgb(var(--accent-rgb));

  --warning: #fbbf24;
  --danger: #ef4444;
  --success: #22c55e;

  --background: #020617;
  --background-soft: #060f1c;
  --surface: rgba(15, 23, 42, 0.92);
  --surface-soft: rgba(15, 23, 42, 0.72);

  --text-main: #f0f9ff;
  --text-muted: rgba(240, 249, 255, 0.62);
  --text-soft: rgba(240, 249, 255, 0.42);

  --border: rgba(14, 165, 233, 0.22);
  --border-soft: rgba(14, 165, 233, 0.14);

  --glow-primary: 0 0 20px rgba(var(--primary-rgb), 0.3);
  --glow-secondary: 0 0 20px rgba(var(--secondary-rgb), 0.3);
  --glow-accent: 0 0 20px rgba(var(--accent-rgb), 0.3);

  --radius: 4px;
  --sidebar-w: 230px;

  --font-mono: "Space Mono", monospace;
  --font-display: "Bebas Neue", sans-serif;
  --font-body: "Space Grotesk", sans-serif;
}
```

### Aturan Warna per Halaman Lab

Halaman lab harus memiliki karakter warna berbeda, tetapi tetap memakai sistem warna global.

#### Chemistry Lab

Chemistry harus menggunakan `accent-rgb`.

```css
.chemistry-page,
body.chemistry-page {
  --lab-rgb: var(--accent-rgb);
  --lab-color: rgb(var(--lab-rgb));
  --lab-glow: 0 0 24px rgba(var(--lab-rgb), 0.35);
}
```

#### Physics Lab

Physics harus menggunakan `primary-rgb`.

```css
.physics-page,
body.physics-page {
  --lab-rgb: var(--primary-rgb);
  --lab-color: rgb(var(--lab-rgb));
  --lab-glow: 0 0 24px rgba(var(--lab-rgb), 0.35);
}
```

#### Biology Lab

Biology harus menggunakan `secondary-rgb`.

```css
.biology-page,
body.biology-page {
  --lab-rgb: var(--secondary-rgb);
  --lab-color: rgb(var(--lab-rgb));
  --lab-glow: 0 0 24px rgba(var(--lab-rgb), 0.35);
}
```

### Larangan Warna

Hindari warna hard-coded berulang seperti:

```css
color: #0ea5e9;
background: #10b981;
border-color: #22d3ee;
```

Gunakan variable:

```css
color: var(--primary);
background: var(--secondary);
border-color: var(--accent);
```

Warna khusus masih boleh digunakan untuk objek simulasi, misalnya cairan kimia, pH meter, status listrik, organ tubuh, error, warning, atau success.

---

## 6. Konsistensi Layout Antarhalaman

Semua halaman harus terasa berasal dari satu sistem desain.

### Landing Page

Landing page minimal berisi:

1. Navbar.
2. Hero section.
3. Section masalah/latar belakang.
4. Section solusi atau fitur utama.
5. Preview simulasi/lab.
6. Dampak/manfaat.
7. CTA.
8. Footer.

Urutan ideal:

```txt
Hero
→ Problems / Background
→ Solution / Features
→ Lab Preview
→ Social Impact / Benefits
→ CTA / Footer
```

### Dashboard dan Halaman Internal

Dashboard, Chemistry Lab, Physics Lab, Biology Lab, dan Challenge harus memiliki pola layout:

- Sidebar.
- Topbar/header.
- Breadcrumb.
- Main content.
- Card/panel.
- Active navigation state.
- Responsive mobile navigation.

Struktur dasar halaman internal:

```html
<body class="page-name">
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

Jika halaman sudah memiliki struktur berbeda, jangan ubah total. Sesuaikan secara bertahap agar tetap konsisten.

---

## 7. Sidebar dan Navigasi

Menu utama yang harus tersedia:

- Home
- Chemistry Lab
- Physics Lab
- Biology Lab
- Challenge

### Aturan Sidebar

- Sidebar harus konsisten di semua halaman internal.
- Hanya satu menu boleh memiliki class `active`.
- Active menu harus sesuai halaman yang sedang dibuka.
- Jangan biarkan Chemistry active ketika user berada di Physics atau Biology.
- Icon, jarak, font, dan hover harus seragam.
- Link tidak boleh kosong jika seharusnya menuju halaman lain.

### Mapping Link

```txt
Home          → dashboard.html
Chemistry Lab → chemistry.html
Physics Lab   → physic.html
Biology Lab   → biology.html
Challenge     → challenge.html
```

### Contoh Sidebar

```html
<nav class="sidebar">
  <div class="brand">
    <span class="brand-icon"><i class="bx bxs-flask"></i></span>
    <span class="brand-name">Eksperika</span>
  </div>

  <div class="nav-section">
    <span class="nav-label">Navigation</span>

    <a class="nav-item" href="dashboard.html">
      <i class="bx bxs-home nav-icon"></i>
      <span>Home</span>
    </a>

    <a class="nav-item" href="chemistry.html">
      <i class="bx bxs-flask nav-icon"></i>
      <span>Chemistry Lab</span>
    </a>

    <a class="nav-item" href="physic.html">
      <i class="bx bxs-bolt-circle nav-icon"></i>
      <span>Physics Lab</span>
    </a>

    <a class="nav-item" href="biology.html">
      <i class="bx bx-dna nav-icon"></i>
      <span>Biology Lab</span>
    </a>

    <a class="nav-item" href="challenge.html">
      <i class="bx bxs-book-open nav-icon"></i>
      <span>Challenge</span>
    </a>
  </div>
</nav>
```

---

## 8. Konsistensi Icon

Project ini menggunakan **Boxicons**. Jangan menambahkan Font Awesome, Bootstrap Icons, Lucide, inline SVG acak, atau library icon lain jika tidak diperlukan.

### Aturan Icon

- Semua icon utama harus berasal dari Boxicons.
- Utamakan gaya `bxs` untuk navigasi utama.
- Gaya `bx` boleh digunakan untuk action ringan atau secondary button.
- Ukuran icon sidebar harus dikontrol oleh `.nav-icon`.
- Icon dalam button harus memiliki spacing yang sama.
- Jangan mencampur gaya icon tanpa alasan.

### Mapping Icon Utama

```txt
Home          → bx bxs-home
Chemistry     → bx bxs-flask
Physics       → bx bxs-bolt-circle
Biology       → bx bx-dna
Challenge     → bx bxs-book-open
Play/Start    → bx bx-play
Reset         → bx bx-reset
Chart/Data    → bx bx-bar-chart-alt-2
Status/Pulse  → bx bx-pulse
Trophy/Result → bx bxs-trophy
Menu          → bx bx-menu
Close         → bx bx-x
```

Jika ingin memakai `bxs-dna`, gunakan pilihan itu di seluruh project. Jangan berganti-ganti antara `bx-dna` dan `bxs-dna` tanpa alasan.

---

## 9. Typography

Gunakan font yang konsisten.

Standar font:

- Display/title: `var(--font-display)`
- Body: `var(--font-body)`
- Code/HUD/small label: `var(--font-mono)`

Gunakan `clamp()` untuk heading besar agar tidak rusak di mobile.

```css
.hero-title {
  font-size: clamp(2.5rem, 8vw, 6rem);
  line-height: 0.95;
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 3.5rem);
}

p {
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.7;
}
```

Jangan menggunakan font size fixed besar yang menyebabkan teks terpotong di mobile.

---

## 10. Aturan HTML

### Struktur HTML

- Gunakan elemen semantik jika memungkinkan: `header`, `nav`, `aside`, `main`, `section`, `footer`.
- Jangan terlalu banyak memakai `div` jika elemen semantik lebih tepat.
- Setiap halaman wajib memiliki `title` yang jelas.
- Setiap halaman wajib memiliki meta viewport.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Urutan CSS

Gunakan urutan stylesheet:

```html
<link rel="stylesheet" href="assets/css/boxicons.min.css">
<link rel="stylesheet" href="assets/css/global.css">
<link rel="stylesheet" href="assets/css/nama-halaman.css">
```

Jika path project berbeda, sesuaikan tanpa mengubah struktur besar.

### Urutan JavaScript

Script global dipanggil sebelum script halaman:

```html
<script src="assets/js/main.js"></script>
<script src="assets/js/nama-halaman.js"></script>
```

### Link Antarhalaman

Navigasi harus jelas:

```txt
Landing Page → Dashboard
Dashboard → Chemistry, Physics, Biology, Challenge
Chemistry → Dashboard, Physics, Biology, Challenge
Physics → Dashboard, Chemistry, Biology, Challenge
Biology → Dashboard, Chemistry, Physics, Challenge
Challenge → Dashboard, Chemistry, Physics, Biology
```

Jangan memakai `href="#"` pada navigasi utama jika sebenarnya harus menuju halaman lain.

---

## 11. Aturan CSS

CSS harus rapi, mudah dibaca, dan tidak duplikatif.

### Urutan Section CSS

Gunakan komentar section seperti berikut:

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
- Jangan menduplikasi style sidebar, topbar, button, panel, dan card di setiap file halaman.
- Gunakan class kebab-case.
- Hindari inline style.
- Hindari selector terlalu panjang.
- Hindari `!important` kecuali untuk override penting seperti mobile cursor atau emergency fix.
- Jangan gunakan `width` fixed besar pada elemen utama.

Hindari:

```css
width: 1200px;
min-width: 1000px;
left: 900px;
```

Gunakan:

```css
width: 100%;
max-width: 1200px;
```

atau:

```css
width: min(100%, 1200px);
```

---

## 12. Aturan JavaScript

Gunakan `main.js` untuk logic global dan file JS halaman untuk logic spesifik.

```txt
main.js          → cursor, shared helper, navigation behavior
landingpage.js   → hero animation, landing interactions
chemistry.js     → chemistry simulation logic
physic.js        → physics simulation logic
biology.js       → biology interaction logic
challenge.js     → challenge selection and scoring logic
```

### Aturan JS

- Gunakan nama variable dan function yang jelas.
- Hindari duplikasi logic.
- Jangan mengubah logic utama simulasi kecuali ada bug.
- Validasi elemen DOM sebelum digunakan agar tidak error di halaman lain.
- Pisahkan fungsi berdasarkan tugas.
- Jangan membuat fungsi terlalu panjang.
- Jangan menggunakan event listener pada elemen yang belum pasti ada.

Contoh aman:

```js
const startButton = document.querySelector(".start-button");

if (startButton) {
  startButton.addEventListener("click", handleStartExperiment);
}
```

Hindari:

```js
document.querySelector(".start-button").addEventListener("click", handleStartExperiment);
```

Karena bisa error jika `.start-button` tidak ada di halaman tertentu.

---

## 13. Standar Komentar Kode

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

## 14. Konsistensi Bahasa UI

Seluruh teks yang tampil pada website harus menggunakan **bahasa Inggris** agar project terlihat profesional dan konsisten.

### Aturan Bahasa UI

- Gunakan bahasa Inggris untuk label, tombol, card, panel, alert, modal, tooltip, status, breadcrumb, dan section heading.
- Jangan mencampur bahasa Indonesia dan Inggris dalam UI.
- Hindari istilah seperti `Mulai Challenge`, `Senyawa Tersedia`, `Tekan Start Challenge terlebih dahulu`, atau `Misi berhasil`.
- Gunakan nama class, id, function, variable, dan data attribute dalam bahasa Inggris.

Contoh:

```txt
Mulai Challenge                → Start Challenge
Senyawa Tersedia               → Available Compounds
Tambahkan minimal satu senyawa → Add at least one compound first
Tekan Start Challenge dahulu   → Press Start Challenge first
Misi berhasil                  → Mission Complete
Misi gagal                     → Mission Failed
Waktu tersisa                  → Time Remaining
Kembali ke Lab                 → Back to Lab
Pilih diagnosis                → Select Diagnosis
Aktifkan alat scan             → Activate Scan Tool
```

README boleh menggunakan bahasa Indonesia jika ditujukan untuk presentasi sekolah, tetapi UI dan kode tetap harus menggunakan bahasa Inggris.

---

## 15. Mobile Compatibility dan Responsive Design

Eksperika harus nyaman digunakan pada desktop, laptop, tablet, dan smartphone.

Masalah penting yang harus dicegah:

- Responsive hanya bekerja saat browser desktop dikecilkan, tetapi rusak saat dibuka di smartphone asli.
- Header terlalu lebar.
- Teks terpotong.
- Button keluar layar.
- Canvas atau simulasi melebar keluar viewport.
- Sidebar menutupi konten.
- Custom cursor masih aktif di mobile.

### Meta Viewport Wajib

Setiap halaman HTML wajib memiliki:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Tanpa ini, tampilan mobile asli bisa rusak meskipun terlihat baik di desktop resize.

### Global Responsive Safety

Tambahkan pengaman global di `global.css`:

```css
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

img,
svg,
canvas,
video {
  max-width: 100%;
}
```

### Breakpoint Standar

Gunakan breakpoint yang konsisten:

```css
@media (max-width: 1200px) {
  /* Small desktop / large tablet */
}

@media (max-width: 1024px) {
  /* Tablet */
}

@media (max-width: 768px) {
  /* Mobile */
}

@media (max-width: 480px) {
  /* Small mobile */
}

@media (max-width: 390px) {
  /* Extra small mobile */
}
```

### Aturan Mobile Layout

Pada mobile:

- Semua grid kompleks harus turun menjadi satu kolom.
- Sidebar harus berubah menjadi hamburger, drawer, compact menu, atau bottom navigation.
- Header tidak boleh melebar keluar layar.
- Tombol harus nyaman untuk sentuhan jari.
- Hero section harus tersusun vertikal.
- Card dan panel harus stacked.
- Canvas/simulasi harus mengikuti container.
- Jangan mengandalkan hover sebagai satu-satunya feedback.

Contoh:

```css
@media (max-width: 768px) {
  .hero-layout,
  .features-grid,
  .lab-grid,
  .dashboard-grid,
  .challenge-layout {
    grid-template-columns: 1fr !important;
  }
}
```

---


## 15A. Viewport Fit, Anti-Terpotong, dan Anti-Overflow

Bagian ini wajib diprioritaskan karena Eksperika memiliki banyak elemen visual besar seperti hero title, simulation window, canvas lab, floating badge, navbar, sidebar, dan panel kontrol. Semua elemen tersebut harus **fit ke layar** dan tidak boleh terpotong seperti visual yang melebar keluar viewport.

### Prinsip Wajib Viewport Fit

AI agent wajib memastikan setiap halaman memenuhi aturan berikut:

1. **Tidak boleh ada horizontal scroll** pada desktop, tablet, maupun mobile.
2. **Tidak boleh ada elemen utama yang keluar dari viewport**, termasuk hero visual, simulation panel, navbar, CTA button, canvas, card, dan floating badge.
3. **Hero section tidak boleh menggunakan lebar tetap yang memaksa layout melebar.**
4. **Simulation preview harus mengecil secara proporsional**, bukan tetap besar lalu terpotong.
5. **Floating element harus tetap berada di dalam container**, bukan diposisikan terlalu jauh menggunakan `left`, `right`, atau `transform` fixed.
6. **Gunakan `min()` / `max()` / `clamp()` / `fr` / `%` / `vw` secara aman**, bukan angka pixel besar yang kaku.
7. **Viewport 100vw harus digunakan dengan hati-hati** karena bisa membuat overflow akibat scrollbar browser. Utamakan `width: 100%`.
8. **Elemen absolute wajib punya parent `position: relative` dan batas yang jelas.**
9. **Semua section wajib memiliki padding responsif**, bukan padding desktop besar yang tetap dipakai di layar kecil.
10. **Setelah perubahan CSS, wajib cek ukuran 1366px, 1024px, 768px, 480px, dan 390px.**

### Global Anti-Overflow Guard

Tambahkan atau pastikan aturan ini ada di `global.css`:

```css
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
}

img,
svg,
canvas,
video,
iframe {
  max-width: 100%;
  height: auto;
}

section,
header,
main,
footer,
.app,
.page,
.container,
.content,
.hero,
.hero-section,
.lab-panel,
.simulation-panel,
.canvas-wrap {
  max-width: 100%;
}
```

Catatan penting: `overflow-x: hidden` hanya pengaman terakhir. AI agent tetap wajib mencari penyebab overflow, seperti `width` fixed, `min-width` besar, `position:absolute` terlalu jauh, `transform: translateX(...)`, atau grid yang tidak bisa mengecil.

### Container dan Section Width

Gunakan container yang aman:

```css
.container,
.section-inner {
  width: min(100% - 32px, 1200px);
  margin-inline: auto;
}

@media (max-width: 480px) {
  .container,
  .section-inner {
    width: min(100% - 20px, 1200px);
  }
}
```

Hindari:

```css
.container {
  width: 1200px;
}
```

Karena akan membuat layout terpotong pada layar yang lebih kecil.

### Hero Layout Agar Tidak Terpotong

Hero landing page harus menggunakan grid yang fleksibel. Visual simulasi di kanan tidak boleh memaksa halaman melebar.

```css
.hero {
  min-height: calc(100svh - var(--navbar-h, 72px));
  display: grid;
  align-items: center;
  overflow: hidden;
}

.hero-inner {
  width: min(100% - 32px, 1280px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
}

.hero-content,
.hero-visual {
  min-width: 0;
}

.hero-visual {
  width: 100%;
  max-width: 640px;
  justify-self: end;
}
```

Pada tablet dan mobile, hero wajib berubah menjadi satu kolom:

```css
@media (max-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    justify-self: center;
    max-width: min(100%, 640px);
  }
}
```

### Heading Besar Wajib Memakai Clamp

Judul besar seperti `INTERACTIVE CHEMISTRY REACTION LABORATORY` tidak boleh memakai font-size fixed yang menyebabkan teks keluar layar.

```css
.hero-title {
  font-size: clamp(3rem, 9vw, 7rem);
  line-height: 0.9;
  max-width: 10ch;
  overflow-wrap: break-word;
}

.hero-title .highlight {
  display: inline-block;
  max-width: 100%;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(2.4rem, 16vw, 4.5rem);
    max-width: 100%;
  }
}
```

Jika ada kata yang terlalu panjang, gunakan `overflow-wrap: break-word;` atau ubah layout teks agar turun baris dengan rapi.

### Simulation Window / Preview Tidak Boleh Keluar Layar

Panel simulasi seperti chemistry preview, physics canvas, biology viewer, dan challenge area wajib mengikuti ukuran container.

```css
.simulation-window,
.lab-preview,
.lab-canvas,
.circuit-canvas,
.anatomy-view {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
}

.simulation-window {
  aspect-ratio: 16 / 10;
}

@media (max-width: 768px) {
  .simulation-window {
    aspect-ratio: auto;
    min-height: 420px;
  }
}
```

Jika ukuran visual terlalu besar, jangan memakai `scale(1.2)` pada parent yang menyebabkan elemen keluar layar. Gunakan `max-width` dan layout grid yang benar.

### Floating Badge Harus Tetap di Dalam Panel

Floating badge seperti `H2SO4 Reaction`, `Exothermic!`, atau `NaCl + H2O` tidak boleh keluar dari viewport. Gunakan posisi yang relatif terhadap panel dan batasi dengan `clamp()`.

```css
.floating-badge {
  position: absolute;
  max-width: min(220px, 42vw);
  white-space: nowrap;
  z-index: 5;
}

.badge-top-left {
  top: clamp(12px, 3vw, 28px);
  left: clamp(12px, 3vw, 28px);
}

.badge-top-right {
  top: clamp(12px, 3vw, 28px);
  right: clamp(12px, 3vw, 28px);
}

@media (max-width: 768px) {
  .floating-badge {
    position: static;
    display: inline-flex;
    margin: 8px 8px 0 0;
    white-space: normal;
  }

  .floating-badge-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
```

Hindari posisi seperti ini jika membuat badge keluar layar:

```css
.floating-badge {
  right: -80px;
  transform: translateX(50%);
}
```

### Navbar dan Header Tidak Boleh Melebar

Navbar landing page dan topbar halaman internal wajib tetap fit.

```css
.navbar,
.topbar {
  width: 100%;
  max-width: 100%;
}

.navbar-inner,
.topbar-inner {
  width: min(100% - 32px, 1280px);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
}

.nav-menu {
  min-width: 0;
  flex-wrap: wrap;
}

.nav-actions {
  flex-shrink: 0;
}
```

Pada mobile, menu desktop harus disembunyikan atau diubah menjadi drawer/hamburger:

```css
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .navbar-inner,
  .topbar-inner {
    width: min(100% - 20px, 1280px);
  }
}
```

### Canvas dan Lab Area Harus Punya Wrapper

Jangan langsung memberi ukuran besar pada `canvas`. Bungkus dengan wrapper responsif.

```css
.canvas-wrap {
  width: 100%;
  max-width: 100%;
  overflow: auto;
  border-radius: var(--radius);
}

.canvas-wrap canvas {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
```

Jika simulasi membutuhkan ukuran internal tertentu, JS boleh mengatur resolusi canvas berdasarkan ukuran wrapper:

```js
const canvasWrap = document.querySelector(".canvas-wrap");
const canvas = document.querySelector("canvas");

if (canvasWrap && canvas) {
  const resizeCanvas = () => {
    const rect = canvasWrap.getBoundingClientRect();
    canvas.width = Math.floor(rect.width);
    canvas.height = Math.floor(Math.max(320, rect.width * 0.6));
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}
```

### Larangan Khusus Penyebab Terpotong

AI agent harus mencari dan memperbaiki pola CSS berikut jika menyebabkan overflow:

```css
width: 100vw;
min-width: 900px;
width: 1400px;
left: 900px;
right: -120px;
transform: translateX(40%);
position: absolute; /* tanpa parent yang membatasi */
grid-template-columns: 700px 700px;
```

Ganti dengan pola aman:

```css
width: 100%;
max-width: 100%;
grid-template-columns: repeat(2, minmax(0, 1fr));
left: auto;
right: clamp(12px, 3vw, 32px);
```

### Debug Wajib Sebelum Selesai

AI agent wajib melakukan pengecekan berikut sebelum menyatakan selesai:

```js
console.log("Page scroll width:", document.documentElement.scrollWidth);
console.log("Viewport width:", window.innerWidth);
console.log(
  "Has horizontal overflow:",
  document.documentElement.scrollWidth > window.innerWidth
);
```

Jika hasilnya `true`, cari elemen penyebab overflow dengan snippet ini:

```js
[...document.querySelectorAll("*")]
  .filter((el) => el.getBoundingClientRect().right > window.innerWidth)
  .map((el) => ({
    element: el,
    className: el.className,
    right: el.getBoundingClientRect().right,
    width: el.getBoundingClientRect().width,
  }));
```

Perbaikan dianggap belum selesai selama masih ada horizontal overflow atau elemen utama yang terpotong.

## 16. Sidebar Mobile

Pada layar kecil, sidebar desktop tidak boleh memakan lebar layar secara permanen.

Gunakan tombol menu:

```html
<button class="mobile-menu-btn" aria-label="Open navigation menu">
  <i class="bx bx-menu"></i>
</button>

<div class="mobile-overlay"></div>
```

CSS dasar:

```css
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: min(82vw, 320px);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 6, 23, 0.7);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 999;
  }

  .mobile-overlay.is-active {
    opacity: 1;
    pointer-events: auto;
  }
}
```

JavaScript dasar:

```js
const menuBtn = document.querySelector(".mobile-menu-btn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".mobile-overlay");

if (menuBtn && sidebar && overlay) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("is-open");
    overlay.classList.add("is-active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("is-open");
    overlay.classList.remove("is-active");
  });
}
```

---

## 17. Custom Cursor

Custom cursor hanya boleh aktif di desktop/laptop.

Pada perangkat touch/mobile, cursor harus dinonaktifkan sepenuhnya.

### CSS Wajib

```css
@media (hover: none), (pointer: coarse), (max-width: 768px) {
  * {
    cursor: auto !important;
  }

  .custom-cursor,
  .cursor,
  .cursor-dot,
  .cursor-outline,
  #cursor,
  #customCursor,
  #cursorDot {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
}
```

### JavaScript Wajib

Jika custom cursor dibuat dengan JavaScript, jangan menjalankan event `mousemove` di mobile.

```js
const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

if (!isTouchDevice) {
  // Run custom cursor only on desktop/laptop
}
```

Jika kode cursor sudah ada, bungkus seluruh logic cursor dengan pengecekan tersebut.

---

## 18. Landing Page Detail

Landing page harus menjelaskan konsep Eksperika secara jelas.

### Hero Section

Hero section harus menampilkan:

- Nama Eksperika.
- Tagline utama.
- Deskripsi singkat.
- CTA seperti `Start Experiment`.
- Visual simulasi/lab.

Hero mobile:

- Heading memakai `clamp()`.
- CTA tidak boleh keluar layar.
- Visual turun ke bawah.
- Tidak boleh ada horizontal scroll.

### Problems / Background Section

Section ini wajib menjelaskan alasan Eksperika dibuat.

Masalah utama:

1. Keterbatasan laboratorium.
2. Pembelajaran sains terlalu teoritis.
3. Kurangnya media pembelajaran interaktif yang ringan dan mudah diakses.

Contoh pesan utama:

> Not every school has complete laboratory facilities. As a result, science learning often focuses only on theory, even though concepts in physics, chemistry, and biology need visualization and experimentation to be understood more effectively.

### Features Section

Fitur utama:

- Interactive Virtual Laboratory.
- Dynamic Science Visualization.
- Responsive & Lightweight Web Design.
- Interactive Experiment Control.
- Guided Learning Experience.

### CTA Section

CTA harus mengarahkan user untuk mencoba simulasi atau masuk ke dashboard.

---

## 19. Dashboard Detail

Dashboard adalah pusat navigasi pengguna.

Dashboard harus berisi:

- Welcome section.
- Ringkasan eksperimen.
- Card menuju Chemistry Lab.
- Card menuju Physics Lab.
- Card menuju Biology Lab.
- Card menuju Challenge.

Pada mobile:

- Sidebar menjadi hamburger/drawer.
- Card turun menjadi satu kolom.
- Header tetap rapi.
- Tidak boleh ada horizontal overflow.

---

## 20. Chemistry Lab Detail

Chemistry Lab menggunakan `accent-rgb`.

Fokus halaman:

- Simulasi reaksi kimia.
- Pemilihan larutan/bahan.
- Area beaker atau tabung reaksi.
- Visual perubahan warna/reaksi.
- Kontrol eksperimen.
- Instruksi dan observasi.

Aturan:

- Cairan tidak boleh terlihat tumpah keluar wadah.
- Wadah harus proporsional.
- Efek reaksi boleh memakai animasi ringan.
- Kontrol eksperimen harus nyaman di mobile.
- Pada mobile, area simulasi dan kontrol tersusun vertikal.

---

## 21. Physics Lab Detail

Physics Lab menggunakan `primary-rgb`.

Fokus halaman:

- Simulasi rangkaian listrik.
- Mode series, parallel, atau mixed.
- Komponen bulb, voltmeter, ammeter, capacitor, battery, resistor, switch.
- Kontrol tegangan, hambatan, arus, atau komponen.
- Visual kabel/rangkaian.
- Hasil perhitungan atau indikator.

Aturan:

- Komponen penting harus muncul dengan benar.
- Jika komponen auto-selected, tampilannya harus konsisten.
- Icon series dan parallel harus center dan sejajar.
- Canvas/rangkaian tidak boleh melebar keluar layar.
- Pada mobile, panel kontrol berada di bawah atau atas area rangkaian.
- Jika drag & drop sulit di mobile, sediakan fallback tap-to-select lalu tap-to-place.

---

## 22. Biology Lab Detail

Biology Lab menggunakan `secondary-rgb`.

Fokus halaman:

- Visualisasi biologi yang ringan.
- Struktur tubuh manusia atau organ sederhana.
- Bagian-bagian yang dapat diklik.
- Penjelasan singkat dan interaktif.

Aturan:

- Hindari visual manusia yang terlalu kaku atau aneh.
- Gunakan diagram/organ sederhana jika lebih ringan.
- Visual harus muat di panel.
- Pada mobile, visual biologi harus tetap proporsional.
- Jika drag & drop sulit di mobile, sediakan fallback tap-to-place.

---

## 23. Challenge Page Detail

Challenge Page adalah halaman latihan atau evaluasi ringan.

Fitur yang disarankan:

- Filter kategori: Chemistry, Physics, Biology.
- Card challenge.
- Instruksi misi.
- Timer jika diperlukan.
- Status progress.
- Feedback hasil.

Aturan:

- Challenge harus terasa sebagai bagian dari Eksperika.
- Sidebar dan topbar harus sama seperti dashboard/lab.
- Pada mobile, layout challenge harus satu kolom.
- Tombol kategori harus mudah ditekan.
- Jika ada area simulasi, pastikan tidak keluar layar.
- Jangan menampilkan `All Challenges` jika instruksi terbaru meminta hanya tiga kategori utama.

---

## 24. Alur Challenge Mode dan Validasi Interaksi

Bagian ini wajib diikuti agar challenge tidak langsung selesai sebelum user memulai.

### Prinsip Umum Challenge

- Semua challenge wajib memiliki tombol `START CHALLENGE`.
- Sebelum `START CHALLENGE` ditekan, user tidak boleh bisa menyelesaikan misi.
- Timer hanya berjalan setelah `START CHALLENGE` ditekan.
- Status menang/kalah hanya divalidasi setelah challenge aktif.
- Reset challenge wajib mengembalikan semua state ke kondisi awal.
- Setelah reset, user wajib menekan `START CHALLENGE` lagi.

Jika user menjalankan aksi utama sebelum challenge dimulai, tampilkan feedback:

```txt
Press Start Challenge first to begin the mission.
```

### State yang Disarankan

```js
let isChallengeStarted = false;
let isScanToolActive = false;
let pendingCompounds = [];
let placedComponents = [];
let placedOrgans = [];
```

Nama state boleh menyesuaikan kode lama, tetapi maknanya harus jelas.

### Chemistry Challenge Flow

```txt
User opens Chemistry Challenge
→ User presses START CHALLENGE
→ Timer starts
→ User selects compound with + ADD
→ Compound enters pending mix queue
→ pH does not change yet
→ User presses MIX & REACT
→ System calculates pH changes
→ System updates liquid color, pH meter, volume, and status
→ System checks target pH only if challenge has started
→ If target is reached, show Mission Complete
```

Aturan:

- `+ ADD` hanya menambahkan bahan ke daftar sementara.
- pH tidak boleh berubah saat `+ ADD` ditekan.
- pH hanya berubah saat `MIX & REACT` ditekan.
- `Mission Complete` hanya boleh muncul jika challenge sudah dimulai.
- Gunakan tema Chemistry dengan `accent-rgb`.

### Physics Challenge Flow

```txt
User opens Physics Challenge
→ User presses START CHALLENGE
→ Timer starts
→ User can place components on circuit grid
→ User arranges Battery, Resistor, Lamp, and Switch
→ User presses ACTIVATE CIRCUIT
→ System calculates voltage, resistance, and current
→ System checks target current 1.5A - 2.0A
→ If circuit is correct, show Mission Complete
```

Aturan:

- Sebelum `START CHALLENGE`, user tidak boleh menyelesaikan misi.
- Sebelum `START CHALLENGE`, `ACTIVATE CIRCUIT` tidak boleh memvalidasi keberhasilan.
- Jika drag & drop sulit di mobile, gunakan tap-to-place fallback.
- Gunakan tema Physics dengan `primary-rgb`.

### Biology Challenge Flow

```txt
User opens Biology Challenge
→ User presses START CHALLENGE
→ Timer starts
→ User can place organs in Anatomy View
→ User presses ACTIVATE SCAN TOOL
→ Scan tool becomes active
→ User checks observation log / patient symptoms
→ System shows diagnosis information
→ User selects patient diagnosis
→ System checks organs and diagnosis
→ If organ placement and diagnosis are correct, show Mission Complete
```

Aturan:

- Sebelum `START CHALLENGE`, user tidak boleh menyelesaikan misi.
- Scan tool wajib aktif sebelum diagnosis dinilai.
- Anatomy View harus muat di dalam panel.
- Drop zone organ harus jelas dan mudah dijangkau.
- Gunakan tema Biology dengan `secondary-rgb`.

### Reset Challenge

Reset harus mengembalikan:

- `isChallengeStarted`.
- Timer.
- Progress.
- Score atau mission status.
- Pending compound Chemistry.
- pH, volume, warna cairan, dan status reaksi.
- Komponen circuit Physics.
- Status circuit, arus, tegangan, hambatan, oscilloscope, dan lamp status.
- Posisi organ Biology.
- Status scan tool, diagnosis, mistake tracker, dan mission progress.
- Modal Mission Complete atau Mission Failed.

---

## 25. Touch Interaction

Website harus bisa digunakan tanpa mouse.

Aturan:

- Tombol dan area klik harus cukup besar.
- Jangan mengandalkan hover saja.
- Hover harus punya alternatif active, selected, disabled, atau tap feedback.
- Drag & drop harus diuji di mobile.
- Jika drag & drop sulit, sediakan fallback:

```txt
Tap component
→ Tap target area
→ Component is placed
```

Challenge Mode harus tetap bisa diselesaikan di mobile.

---

## 26. Accessibility

Aturan aksesibilitas:

- Gunakan `aria-label` untuk tombol icon penting.
- Jangan gunakan warna sebagai satu-satunya indikator.
- Pastikan kontras teks cukup.
- Button harus memiliki state hover/focus/active.
- Gambar penting harus memiliki alt text.
- Tombol hamburger dan close menu wajib memiliki `aria-label`.

Contoh:

```html
<button class="mobile-menu-btn" aria-label="Open navigation menu">
  <i class="bx bx-menu"></i>
</button>
```

---

## 27. Performance

Eksperika harus ringan.

Aturan:

- Jangan menambahkan library baru jika tidak perlu.
- Hindari animasi berat di mobile.
- Gunakan opacity dan transform untuk animasi.
- Hindari terlalu banyak particle atau loop animasi.
- Kompres gambar.
- Jangan memuat library di halaman yang tidak membutuhkannya.
- Custom cursor tidak berjalan di mobile.

Pada mobile, kurangi efek berat:

```css
@media (max-width: 768px) {
  .heavy-glow,
  .particle-layer,
  .animated-bg {
    opacity: 0.35;
  }
}
```

---

## 28. Library dan Dependency

Project saat ini menggunakan:

```txt
Boxicons v2.1.4
Google Fonts
jQuery v3.7.1
FancyBox v5.0.36
SwiperJS v11.1.5
TypedJS v2.1.0
```

Aturan:

- Jangan menambah library baru jika fitur bisa dibuat dengan JavaScript biasa.
- Jangan mengganti Boxicons.
- Jangan memuat library di halaman yang tidak membutuhkannya.
- Jika library hanya dipakai di satu halaman, load hanya di halaman tersebut.
- Pastikan CDN tidak dipanggil berulang tanpa kebutuhan.

---

## 29. README.md

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

README boleh berbahasa Indonesia untuk kebutuhan sekolah/lomba, tetapi UI website tetap bahasa Inggris.

---

## 30. Checklist Sebelum Commit

Sebelum menyimpan atau mengirim perubahan, cek hal berikut.

### Visual

- [ ] Warna konsisten.
- [ ] Font konsisten.
- [ ] Icon memakai Boxicons.
- [ ] Button konsisten.
- [ ] Card/panel konsisten.
- [ ] Sidebar/topbar konsisten.
- [ ] Active state sesuai halaman.

### Functionality

- [ ] Semua halaman bisa dibuka.
- [ ] Semua link navigasi berjalan.
- [ ] Button penting bisa diklik.
- [ ] Simulasi tidak error.
- [ ] Challenge tidak bisa selesai sebelum Start Challenge.
- [ ] Reset mengembalikan state awal.
- [ ] Tidak ada error di console.

### Responsiveness

- [ ] Desktop rapi.
- [ ] Tablet rapi.
- [ ] Mobile asli rapi.
- [ ] Tidak ada horizontal scroll.
- [ ] `document.documentElement.scrollWidth <= window.innerWidth` pada ukuran 1366px, 1024px, 768px, 480px, dan 390px.
- [ ] Header tidak terpotong.
- [ ] Hero section tidak terpotong.
- [ ] Floating badge tidak keluar viewport.
- [ ] Canvas/simulasi tidak keluar layar.
- [ ] Sidebar mobile bisa dibuka/tutup.
- [ ] Custom cursor hilang di mobile.
- [ ] Touch interaction bisa digunakan.

### Performance

- [ ] Tidak ada animasi berlebihan.
- [ ] Gambar tidak terlalu berat.
- [ ] Script tidak berjalan sia-sia di mobile.
- [ ] Library tidak dimuat berulang tanpa kebutuhan.

---

## 31. Batasan untuk AI Agent

AI agent tidak boleh:

1. Membuat ulang website dari nol.
2. Menghapus file existing tanpa instruksi jelas.
3. Mengubah nama file HTML, CSS, atau JS utama tanpa alasan kuat.
4. Mengganti konsep Eksperika menjadi platform lain.
5. Mengubah semua UI secara total.
6. Mencampur banyak icon library.
7. Membuat komentar dengan format berbeda-beda.
8. Menambahkan dependency besar untuk fitur kecil.
9. Memindahkan logic simulasi tanpa memastikan fitur tetap berjalan.
10. Membiarkan mobile layout rusak.
11. Membiarkan custom cursor aktif di mobile.
12. Membiarkan horizontal scroll di mobile.
13. Mengabaikan tagline dan tujuan Eksperika.

---

## 32. Prioritas Pengerjaan

Jika diminta merapikan project, ikuti urutan prioritas:

1. Pastikan semua halaman masih berjalan.
2. Pastikan meta viewport ada di semua halaman.
3. Rapikan variable warna di `global.css`.
4. Samakan sidebar, topbar, button, card, dan panel.
5. Samakan icon Boxicons.
6. Rapikan komentar HTML, CSS, dan JS.
7. Kurangi duplikasi CSS.
8. Kurangi duplikasi JS.
9. Perbaiki link antarhalaman.
10. Perbaiki responsive layout mobile asli.
11. Pastikan custom cursor mati di mobile.
12. Perbarui README.md jika struktur atau fitur berubah.

---

## 33. Contoh Prompt untuk AI Agent

Gunakan prompt berikut saat meminta AI mengerjakan project:

```txt
Baca dan ikuti seluruh aturan pada AGENT.md sebelum mengubah kode.
Rapikan project Eksperika tanpa membuat ulang dari nol.
Fokus pada konsistensi warna, icon Boxicons, sidebar, topbar, card, button, komentar kode, struktur CSS, struktur JavaScript, responsive layout, mobile compatibility asli, viewport fit, anti-terpotong, anti-horizontal-overflow, dan hubungan antarhalaman.
Pastikan semua section fit ke layar, tidak ada elemen yang terpotong seperti hero visual/simulation window/floating badge, tidak ada horizontal scroll, dan custom cursor hanya aktif di desktop serta hilang di mobile.
Pastikan Chemistry memakai accent-rgb, Physics memakai primary-rgb, dan Biology memakai secondary-rgb.
Jangan menghapus fitur utama.
Jangan mengganti konsep utama.
Gunakan assets/css/global.css sebagai pusat variable dan komponen global.
Gunakan format komentar garis ----- secara konsisten di HTML, CSS, dan JavaScript.
Setelah selesai, jelaskan perubahan penting yang dilakukan dan update README.md jika struktur atau fitur berubah.
```

---

## 34. Definisi Selesai

Sebuah perubahan dianggap selesai jika:

- Tampilan tetap konsisten dengan Eksperika.
- Fitur utama tetap berjalan.
- Tidak ada error JavaScript.
- Tidak ada horizontal scroll di desktop, tablet, dan mobile.
- Hero, navbar, simulation window, canvas, dan floating badge tidak terpotong.
- Halaman bisa digunakan di desktop dan smartphone.
- Sidebar/header berfungsi dengan baik.
- Custom cursor hanya aktif di desktop.
- Chemistry memakai `accent-rgb`.
- Physics memakai `primary-rgb`.
- Biology memakai `secondary-rgb`.
- Challenge hanya bisa diselesaikan setelah `START CHALLENGE` ditekan.
- Touch interaction tetap bisa digunakan.
- README diperbarui jika ada perubahan penting.

---

## 35. Ringkasan Singkat yang Harus Selalu Diingat

Eksperika adalah platform laboratorium virtual interaktif berbasis web.

Selalu jaga:

- Konsistensi desain.
- Responsivitas mobile asli.
- Semua elemen fit ke layar dan tidak terpotong.
- Tidak ada horizontal overflow.
- Sidebar dan topbar yang seragam.
- Warna lab sesuai aturan.
- Icon dari Boxicons.
- Custom cursor hanya desktop.
- Simulasi tetap ringan dan interaktif.
- Challenge tidak boleh selesai sebelum Start Challenge.
- Jangan membuat ulang dari awal.
- Jangan merusak fitur lama.

Tujuan akhirnya adalah membuat Eksperika terasa seperti website edukasi sains digital yang modern, ringan, interaktif, responsif, dan relevan untuk pelajar.
