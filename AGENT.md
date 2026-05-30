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
│   │   ├── vendor/
│   │   │   └── jquery.min.js
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

## 12. Konsistensi Bahasa

Seluruh bahasa yang tampil pada website harus menggunakan **bahasa Inggris** agar project terlihat profesional, konsisten, dan tidak mencampur bahasa Indonesia dengan bahasa Inggris dalam satu UI.

### Aturan Bahasa UI

- Gunakan bahasa Inggris untuk semua teks yang terlihat oleh user.
- Jangan mencampur bahasa Indonesia dan bahasa Inggris dalam label, tombol, card, panel, alert, modal, tooltip, status, atau breadcrumb.
- Jika satu halaman menggunakan bahasa Inggris, seluruh halaman lain juga harus menggunakan bahasa Inggris.
- Teks seperti judul section, subtitle, deskripsi fitur, status challenge, error message, empty state, dan success message wajib ditulis dalam bahasa Inggris.
- Hindari istilah campuran seperti `Mulai Challenge`, `Senyawa Tersedia`, `Tekan Start Challenge terlebih dahulu`, atau `Misi berhasil`. Ubah menjadi bahasa Inggris yang jelas.

### Contoh Penulisan yang Disarankan

Gunakan pola berikut sebagai acuan:

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

### Aturan Bahasa Kode

- Nama class, id, function, variable, dan data attribute harus menggunakan bahasa Inggris.
- Gunakan penamaan yang deskriptif seperti `startChallenge()`, `resetChallengeState()`, `availableCompounds`, `missionProgress`, dan `scanToolActive`.
- Hindari penamaan campuran seperti `tombolStart`, `daftarSenyawa`, `warnaCairan`, atau `statusMisi`.
- Komentar kode boleh tetap singkat, tetapi sebaiknya menggunakan bahasa Inggris agar konsisten dengan nama function dan struktur project.

### Aturan Bahasa Dokumentasi

- README.md dan dokumentasi teknis boleh menggunakan bahasa Indonesia jika ditujukan untuk presentasi sekolah, tetapi teks UI dan kode tetap harus berbahasa Inggris.
- Jika README.md dibuat untuk publik atau GitHub, utamakan bahasa Inggris.
- Jika ada dokumentasi campuran, pisahkan dengan jelas antara bagian penjelasan lokal dan bagian teknis.

---

## 13. Mobile Compatibility dan Responsive Design

Eksperika harus dapat digunakan pada desktop, tablet, dan mobile karena visi project adalah membuat laboratorium virtual yang lebih mudah diakses, ringan, dan tidak bergantung pada perangkat besar. Tampilan desktop tetap menjadi versi utama, tetapi pengalaman mobile tidak boleh rusak, terpotong, atau sulit digunakan.

### Prinsip Mobile-First untuk Eksperika

- Semua halaman wajib tetap terbaca dan dapat digunakan pada layar kecil.
- Jangan biarkan konten keluar dari layar secara horizontal.
- Jangan mengunci layout hanya untuk desktop.
- Simulasi harus tetap bisa dipahami meskipun beberapa fitur kompleks perlu disederhanakan pada mobile.
- Ukuran teks, tombol, card, dan area interaksi harus nyaman untuk sentuhan jari.
- Elemen penting seperti Start Challenge, Reset, Mix & React, Activate Circuit, dan Activate Scan Tool harus tetap terlihat jelas di mobile.
- Jika layout desktop menggunakan banyak kolom, ubah menjadi satu kolom atau stacked layout di mobile.
- Prioritaskan performa ringan agar website tetap nyaman dibuka pada perangkat rendah.

### Sidebar dan Navigasi Mobile

- Sidebar desktop boleh berubah menjadi sidebar collapsible, drawer menu, bottom navigation, atau compact top navigation pada layar kecil.
- Jangan biarkan sidebar memakan terlalu banyak lebar layar mobile.
- Menu aktif tetap harus terlihat jelas.
- Navigasi utama seperti Home, Chemistry Lab, Physics Lab, Biology Lab, dan Challenge tetap harus mudah dijangkau.
- Jika sidebar dibuat collapsible, pastikan tombol buka/tutup jelas dan memiliki icon Boxicons yang konsisten.
- Breadcrumb boleh diperkecil atau disederhanakan di mobile, tetapi jangan sampai membingungkan user.

### Layout Halaman Mobile

- Card dan panel harus turun menjadi satu kolom pada mobile.
- Gunakan `grid-template-columns: 1fr` atau flex column untuk layout yang semula multi-kolom.
- Gunakan spacing yang cukup agar elemen tidak terlalu rapat.
- Hindari tinggi fixed yang membuat konten terpotong.
- Gunakan `max-width: 100%`, `overflow-x: hidden`, dan ukuran yang fleksibel untuk media, canvas, panel, dan simulasi.
- Jika perlu scroll, gunakan scroll vertikal yang natural. Hindari scroll horizontal kecuali benar-benar dibutuhkan untuk canvas/simulasi.

### Touch Interaction

- Ukuran tombol dan area klik minimal nyaman untuk touch interaction.
- Jangan mengandalkan hover sebagai satu-satunya feedback, karena hover tidak bekerja dengan baik di mobile.
- Setiap hover state harus memiliki alternatif active, selected, disabled, atau tap feedback.
- Drag & drop pada mobile harus diuji. Jika sulit digunakan, sediakan alternatif tap-to-select lalu tap-to-place.
- Untuk Challenge Mode, user mobile harus tetap bisa menyelesaikan misi tanpa mouse.

### Simulasi Lab pada Mobile

#### Chemistry Lab dan Chemistry Challenge

- Panel compound, beaker, pH meter, status, dan action button harus tersusun rapi pada layar kecil.
- Daftar compound boleh menjadi accordion, horizontal scroll terkontrol, atau stacked cards.
- Tombol `+ ADD`, `MIX & REACT`, dan `RESET EXPERIMENT` harus mudah ditekan.
- pH meter dan beaker tidak boleh keluar dari container.
- Teks status dan log harus tetap terbaca.

#### Physics Lab dan Physics Challenge

- Circuit grid harus menyesuaikan ukuran layar.
- Komponen seperti Battery, Resistor, Lamp, dan Switch harus tetap mudah dipilih di mobile.
- Jika drag & drop sulit di mobile, gunakan fallback interaction seperti tap component lalu tap grid cell.
- Komponen yang sudah digunakan tetap harus disabled/redup dan kembali aktif saat dihapus.
- Panel oscilloscope, lamp status, dan calculation result boleh turun ke bawah circuit grid.

#### Biology Lab dan Biology Challenge

- Anatomy View harus selalu muat di dalam panel.
- Tubuh/manekin tidak boleh melewati batas canvas pada mobile maupun desktop.
- Drop zone organ harus cukup besar untuk touch interaction.
- Jika drag & drop sulit di mobile, gunakan fallback tap-to-place.
- Tombol `ACTIVATE SCAN TOOL`, observation log, diagnosis, mission progress, dan mistake tracker harus tetap mudah digunakan.

### Breakpoint Standar

Gunakan breakpoint yang konsisten di seluruh CSS:

```css
@media (max-width: 1200px) {
  /* Small desktop / large tablet layout */
}

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

### Mobile Performance

- Hindari animasi berat pada mobile.
- Gunakan animasi ringan seperti opacity, transform, atau glow sederhana.
- Jangan menambahkan library baru hanya untuk memperbaiki layout mobile.
- Load library hanya pada halaman yang membutuhkannya.
- Optimalkan ukuran gambar dan hindari asset besar yang tidak diperlukan.
- Custom cursor boleh dinonaktifkan pada perangkat touch agar tidak mengganggu performa dan UX.

### Checklist Mobile

Sebelum perubahan dianggap selesai, pastikan:

- [ ] Tidak ada horizontal overflow pada layar mobile.
- [ ] Sidebar tidak menutupi konten utama secara permanen.
- [ ] Semua tombol utama mudah ditekan.
- [ ] Font heading dan body tetap terbaca.
- [ ] Card dan panel turun menjadi satu kolom jika layar sempit.
- [ ] Chemistry beaker dan pH meter tidak keluar dari panel.
- [ ] Physics circuit grid tetap bisa digunakan.
- [ ] Biology Anatomy View tetap muat di canvas.
- [ ] Challenge Mode tetap bisa diselesaikan di mobile.
- [ ] Hover effect memiliki alternatif tap/active feedback.
- [ ] Tidak ada error di console saat dibuka dari mobile viewport.

---

## 14. Library dan Dependency

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

## 15. Checklist Sebelum Commit

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
- [ ] Mobile layout tidak memiliki horizontal overflow.
- [ ] Simulasi utama tetap dapat digunakan di mobile atau memiliki fallback interaksi.
- [ ] Tidak ada error di console browser.
- [ ] README.md diperbarui jika ada perubahan struktur atau fitur.

---

## 16. Checklist Refactor Visual

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

## 17. Checklist README.md

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

## 18. Batasan untuk AI Agent

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

## 19. Prioritas Pengerjaan

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

## 20. Contoh Prompt untuk Agent

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

## 21. Alur Challenge Mode dan Validasi Interaksi

Bagian ini menjadi panduan urutan interaksi untuk seluruh challenge. AGENT.md hanya mengatur alur dan prinsip validasi. Detail implementasi teknis tetap dikerjakan di `challenge.js` dan `challenge.css`.

### Prinsip Umum Challenge

- Semua challenge wajib memiliki tombol `START CHALLENGE` sebagai langkah awal.
- Sebelum `START CHALLENGE` ditekan, user tidak boleh bisa menyelesaikan misi.
- Timer hanya boleh berjalan setelah `START CHALLENGE` ditekan.
- Status menang/kalah hanya boleh divalidasi setelah challenge aktif.
- Jika user mencoba menjalankan aksi utama sebelum challenge dimulai, tampilkan feedback seperti:
  - `Tekan Start Challenge terlebih dahulu untuk memulai misi.`
- Reset challenge wajib mengembalikan semua state ke kondisi awal dan membuat user harus menekan `START CHALLENGE` lagi.
- Panel `Available Challenges` di halaman Challenge bersifat static sebagai navigasi antar challenge.
- Panel `Available Challenges` hanya menampilkan:
  - Chemistry Challenge
  - Physics Challenge
  - Biology Challenge
- Jangan menampilkan `All Challenges`.

### Alur Chemistry Challenge

Urutan interaksi Chemistry Challenge:

```txt
User membuka Chemistry Challenge
→ User menekan START CHALLENGE
→ Timer mulai berjalan
→ User memilih senyawa dengan tombol + ADD
→ Senyawa masuk ke pending compound / mix queue
→ pH belum berubah
→ User menekan MIX & REACT
→ Sistem menghitung perubahan pH
→ Sistem memperbarui warna cairan, pH meter, volume, dan status
→ Sistem mengecek target pH hanya jika challenge sudah dimulai
→ Jika target tercapai, tampilkan mission complete
```

Aturan Chemistry Challenge:

- Tombol `+ ADD` hanya menambahkan bahan ke daftar sementara.
- Nilai pH tidak boleh berubah ketika tombol `+ ADD` ditekan.
- Nilai pH hanya boleh berubah ketika tombol `MIX & REACT` ditekan.
- `MISSION COMPLETE` hanya boleh muncul jika `START CHALLENGE` sudah ditekan.
- Gunakan tema Chemistry dengan `--accent-rgb`.

### Alur Physics Challenge

Urutan interaksi Physics Challenge:

```txt
User membuka Physics Challenge
→ User menekan START CHALLENGE
→ Timer mulai berjalan
→ User boleh melakukan drag & drop komponen ke circuit grid
→ User menyusun Battery, Resistor, Lamp, dan Switch
→ User menekan ACTIVATE CIRCUIT
→ Sistem menghitung tegangan, hambatan, dan arus
→ Sistem mengecek target arus 1.5A - 2.0A
→ Jika rangkaian sesuai, tampilkan mission complete
```

Aturan Physics Challenge:

- Sebelum `START CHALLENGE` ditekan, user tidak boleh melakukan drag & drop komponen.
- Sebelum `START CHALLENGE` ditekan, tombol `ACTIVATE CIRCUIT` tidak boleh memvalidasi keberhasilan misi.
- Jika user mencoba mengaktifkan rangkaian sebelum challenge dimulai, tampilkan feedback.
- Gunakan tema Physics dengan `--primary-rgb`.

### Alur Biology Challenge

Urutan interaksi Biology Challenge:

```txt
User membuka Biology Challenge
→ User menekan START CHALLENGE
→ Timer mulai berjalan
→ User boleh melakukan drag & drop organ ke Anatomy View
→ User menekan ACTIVATE SCAN TOOL
→ Scan tool aktif
→ User memilih atau memeriksa observation log / keluhan pasien
→ Sistem menampilkan informasi diagnosis
→ User menentukan diagnosis pasien
→ Sistem mengecek organ dan diagnosis
→ Jika organ benar dan diagnosis benar, tampilkan mission complete
```

Aturan Biology Challenge:

- Sebelum `START CHALLENGE` ditekan, user tidak boleh melakukan drag & drop organ.
- Sebelum `START CHALLENGE` ditekan, tombol `ACTIVATE SCAN TOOL` tidak boleh menjalankan diagnosis.
- User wajib mengaktifkan `SCAN TOOL` terlebih dahulu sebelum proses diagnosis dinilai.
- Diagnosis tidak boleh dianggap benar jika scan tool belum aktif.
- Anatomy View harus menampilkan tubuh/manekin yang muat di dalam canvas.
- Tubuh/manekin tidak boleh melewati batas panel Anatomy View.
- Drop zone organ harus jelas, mudah dijangkau, dan tidak terlalu berdekatan.
- Berikan feedback visual saat drag & drop, misalnya glow, border highlight, atau perubahan warna drop zone.
- Gunakan tema Biology dengan `--secondary-rgb`.

### Validasi State yang Disarankan

Gunakan state yang jelas agar challenge mudah dikontrol:

```js
let isChallengeStarted = false;
let isScanToolActive = false;
let pendingCompounds = [];
let placedComponents = [];
let placedOrgans = [];
```

Nama state boleh disesuaikan dengan kode yang sudah ada, tetapi maknanya harus tetap jelas.

### Reset Challenge

Reset pada challenge harus mengembalikan:

- Status `isChallengeStarted`.
- Timer.
- Progress.
- Score atau mission status.
- Pending compound pada Chemistry.
- pH, volume, warna cairan, dan status reaksi.
- Komponen circuit pada Physics.
- Status circuit, arus, tegangan, hambatan, oscilloscope, dan lamp status.
- Posisi organ pada Biology.
- Status scan tool, diagnosis, organ placed, mistake tracker, dan mission progress.
- Modal mission complete atau mission failed.

Setelah reset, user wajib menekan `START CHALLENGE` lagi untuk memulai misi.

---

## 22. Catatan Akhir

Project Eksperika harus terasa sebagai satu produk yang utuh. Setiap halaman boleh memiliki karakter sesuai topiknya, tetapi tetap harus menggunakan bahasa visual yang sama: warna neon science lab, dark interface, Boxicons, sidebar konsisten, topbar konsisten, card/panel konsisten, dan komentar kode yang rapi.

Fokus utama bukan membuat desain baru, melainkan menyempurnakan project yang sudah ada agar lebih profesional, mudah dikembangkan, dan nyaman digunakan.
