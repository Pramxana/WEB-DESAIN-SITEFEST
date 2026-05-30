// --------------------------------------------------
// landingpage.JS — index.html
// --------------------------------------------------

// --------------------------------------------------
// HERO PARTICLES
// --------------------------------------------------
(function () {
  const canvas = document.getElementById("heroParticles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = [
    "rgba(14,165,233,",
    "rgba(34,211,238,",
    "rgba(16,185,129,",
    "rgba(139,92,246,",
  ];

  for (let i = 0; i < 80; i++) {
    const col = COLORS[Math.floor(Math.random() * COLORS.length)];
    particles.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      a: Math.random() * 0.4 + 0.1,
      col,
      twinkle: Math.random() * Math.PI * 2,
    });
  }

  const molecules = [];
  for (let i = 0; i < 8; i++) {
    molecules.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      r: Math.random() * 15 + 8,
      angle: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.005,
      atoms: Math.floor(Math.random() * 3) + 2,
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }

  function drawMolecule(m, w, h) {
    const cx = m.x * w, cy = m.y * h;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(m.angle);
    const atomR = 4, bondR = m.r;
    ctx.strokeStyle = m.col + "0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i < m.atoms; i++) {
      const ax = Math.cos((i / m.atoms) * Math.PI * 2) * bondR;
      const ay = Math.sin((i / m.atoms) * Math.PI * 2) * bondR;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(ax, ay);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(ax, ay, atomR, 0, Math.PI * 2);
      ctx.fillStyle = m.col + "0.5)";
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(0, 0, atomR + 1, 0, Math.PI * 2);
    ctx.fillStyle = m.col + "0.7)";
    ctx.fill();
    ctx.restore();
  }

  let t = 0;
  function frame() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    t += 0.01;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x = (p.x + p.vx + 1) % 1;
      p.y = (p.y + p.vy + 1) % 1;
      p.twinkle += 0.02;
      const px = p.x * w, py = p.y * h;
      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.twinkle));
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + alpha + ")";
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = (p.x - q.x) * w, dy = (p.y - q.y) * h;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(q.x * w, q.y * h);
          ctx.strokeStyle = p.col + 0.06 * (1 - dist / 80) + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    molecules.forEach((m) => {
      m.x = (m.x + m.vx + 1) % 1;
      m.y = (m.y + m.vy + 1) % 1;
      m.angle += m.va;
      drawMolecule(m, w, h);
    });

    requestAnimationFrame(frame);
  }
  frame();
})();

// --------------------------------------------------
// MOLECULE CANVAS
// --------------------------------------------------
(function () {
  const canvas = document.getElementById("molCanvas");
  if (!canvas) return;
  const parent = canvas.parentElement;
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  const ctx = canvas.getContext("2d");

  const COLS = [
    "rgba(14,165,233,",
    "rgba(34,211,238,",
    "rgba(16,185,129,",
    "rgba(139,92,246,",
    "rgba(251,191,36,",
  ];
  const dots = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    col: COLS[Math.floor(Math.random() * COLS.length)],
    a: Math.random() * 0.3 + 0.1,
  }));

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((d) => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
      if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.col + d.a + ")";
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
})();

// --------------------------------------------------
// TICKER
// --------------------------------------------------
(function () {
  const tickerItems = [
    '<i class="bx bx-test-tube"></i> Chemistry Reaction Lab',
    '<i class="bx bx-bolt-circle"></i> Physics Electricity Sim',
    '<i class="bx bx-dna"></i> Biology Body Explorer',
    '<i class="bx bx-trophy"></i> Gamified STEM Learning',
    '<i class="bx bx-bar-chart-alt-2"></i> Realtime Visualization',
    '<i class="bx bx-atom"></i> Molecular Structures',
    '<i class="bx bx-globe"></i> 100% Browser-Based',
  ];
  const ticker = document.getElementById("ticker");
  if (!ticker) return;
  const html = tickerItems
    .map((t) => `<span class="ticker-item"><span class="ti-dot"></span>${t}</span>`)
    .join("");
  ticker.innerHTML = html + html;
})();

// --------------------------------------------------
// CHEMISTRY BUBBLES
// --------------------------------------------------
function createBubbles(id, col) {
  const c = document.getElementById(id);
  if (!c) return;
  c.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const b = document.createElement("div");
    b.className = "bubble";
    const s = Math.random() * 5 + 3;
    b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 70 + 15}%;bottom:${Math.random() * 15}%;background:${col};animation-duration:${Math.random() * 1.5 + 0.8}s;animation-delay:${Math.random() * 0.5}s;`;
    c.appendChild(b);
  }
}

function createSparks() {
  const el = document.getElementById("mixSparks");
  if (!el) return;
  el.innerHTML = "";
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("div");
    s.className = "spark";
    const angle = (i / 14) * 360, dist = Math.random() * 35 + 20;
    s.style.cssText = `left:${38 + Math.random() * 24}%;top:${38 + Math.random() * 24}%;background:${["#FBBF24","#EF4444","#22D3EE","#10B981"][Math.floor(Math.random()*4)]};--tx:${Math.cos((angle*Math.PI)/180)*dist}px;--ty:${Math.sin((angle*Math.PI)/180)*dist}px;animation-duration:${Math.random()*0.5+0.3}s;animation-delay:${Math.random()*0.2}s;box-shadow:0 0 4px currentColor;`;
    el.appendChild(s);
  }
}

let mixCount = 0;
const mixColors = [
  ["#0EA5E9","#10B981"],
  ["#EF4444","#FBBF24"],
  ["#8B5CF6","#22D3EE"],
  ["#10B981","#FBBF24"],
  ["#EF4444","#8B5CF6"],
];
const formulas = [
  "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
  "Fe + CuSO₄ → FeSO₄ + Cu",
  "KMnO₄ + H₂O₂ → MnO₂ + O₂ + H₂O",
  "HCl + NaOH → NaCl + H₂O",
  "Zn + 2HCl → ZnCl₂ + H₂↑",
];

function triggerMix() {
  mixCount = (mixCount + 1) % mixColors.length;
  const [c1, c2] = mixColors[mixCount];
  const btn = document.getElementById("mixBtn");
  if (!btn) return;
  btn.classList.add("mixing");
  btn.innerHTML = '<i class="bx bx-loader-circle"></i> REACTING...';

  const lA = document.getElementById("liquidA");
  const lB = document.getElementById("liquidB");
  const lC = document.getElementById("liquidC");
  if (lA) lA.style.height = 30 + Math.random() * 30 + "%";
  if (lB) lB.style.height = 30 + Math.random() * 30 + "%";
  if (lC) lC.style.height = 30 + Math.random() * 30 + "%";

  createBubbles("bubblesA", c1);
  createBubbles("bubblesB", c2);
  createBubbles("bubblesC", c1);
  createSparks();

  const beakerMix = document.getElementById("beakerMix");
  if (beakerMix) beakerMix.style.background = `linear-gradient(to top, ${c1}, ${c2})`;
  const chemFormula = document.getElementById("chemFormula");
  if (chemFormula) chemFormula.textContent = formulas[mixCount];

  setTimeout(() => {
    btn.classList.remove("mixing");
    btn.innerHTML = '<i class="bx bx-play"></i> REACT & MIX';
  }, 2000);
}

// --------------------------------------------------
// Init bubbles on load
// --------------------------------------------------
createBubbles("bubblesA", "rgba(34,211,238,0.5)");
createBubbles("bubblesB", "rgba(16,185,129,0.5)");
createBubbles("bubblesC", "rgba(139,92,246,0.5)");

// --------------------------------------------------
// ELECTRICITY CANVAS
// --------------------------------------------------
(function () {
  const canvas = document.getElementById("elecCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let voltage = 12, resistance = 4, current = voltage / resistance, particles = [];

  const circuitPath = [
    { x: 60, y: 60 }, { x: 200, y: 60 }, { x: 340, y: 60 },
    { x: 390, y: 60 }, { x: 390, y: 200 }, { x: 200, y: 200 },
    { x: 60, y: 200 }, { x: 60, y: 60 },
  ];

  function initParticles() {
    particles = [];
    const n = Math.min(35, Math.max(4, Math.floor(current * 3)));
    for (let i = 0; i < n; i++) particles.push({ t: i / n });
  }

  function getPos(t) {
    const segs = [];
    let total = 0;
    for (let i = 0; i < circuitPath.length - 1; i++) {
      const dx = circuitPath[i+1].x - circuitPath[i].x;
      const dy = circuitPath[i+1].y - circuitPath[i].y;
      const len = Math.sqrt(dx*dx + dy*dy);
      segs.push({ x0: circuitPath[i].x, y0: circuitPath[i].y, dx, dy, len });
      total += len;
    }
    let d = t * total;
    for (const s of segs) {
      if (d <= s.len) {
        const f = d / s.len;
        return { x: s.x0 + s.dx * f, y: s.y0 + s.dy * f };
      }
      d -= s.len;
    }
    return circuitPath[0];
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.shadowBlur = 12; ctx.shadowColor = "#0EA5E9";
    ctx.strokeStyle = "rgba(14,165,233,0.35)"; ctx.lineWidth = 2;
    ctx.beginPath();
    circuitPath.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "#FBBF24";
    ctx.fillRect(44, 50, 8, 20); ctx.fillRect(54, 55, 5, 10);
    ctx.font = "8px Space Mono, monospace"; ctx.fillStyle = "#FBBF24";
    ctx.fillText(voltage + "V", 24, 64);

    const bright = Math.min(1, current / 10);
    ctx.beginPath();
    ctx.arc(340, 60, 14, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,${180 + Math.floor(bright * 75)},0,${0.08 + bright * 0.7})`;
    ctx.fill();
    ctx.font = "10px serif"; ctx.fillStyle = `rgba(255,220,0,${0.5 + bright * 0.5})`;
    ctx.beginPath();
    ctx.arc(340, 58, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(336, 66);
    ctx.lineTo(344, 66);
    ctx.moveTo(337, 69);
    ctx.lineTo(343, 69);
    ctx.stroke();

    ctx.fillStyle = "rgba(16,185,129,0.3)"; ctx.strokeStyle = "rgba(16,185,129,0.6)";
    ctx.lineWidth = 1.5; ctx.fillRect(178, 192, 44, 16); ctx.strokeRect(178, 192, 44, 16);
    ctx.font = "8px Space Mono, monospace"; ctx.fillStyle = "#10B981";
    ctx.fillText(resistance + "Ω", 186, 205);

    ctx.font = "8px Space Mono, monospace"; ctx.fillStyle = "rgba(34,211,238,0.6)";
    ctx.fillText("I = " + current.toFixed(1) + "A", 195, 50);
    ctx.fillStyle = "rgba(16,185,129,0.5)";
    ctx.fillText("P = " + (voltage * current).toFixed(0) + "W", 160, 238);

    const speed = (current / (voltage * 3)) * 0.016;
    particles.forEach((p) => {
      p.t = (p.t + speed) % 1;
      const pos = getPos(p.t);
      const alpha = 0.5 + Math.sin(p.t * Math.PI * 10) * 0.3;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34,211,238,${alpha})`;
      ctx.shadowBlur = 10; ctx.shadowColor = "#22D3EE";
      ctx.fill(); ctx.shadowBlur = 0;
    });

    requestAnimationFrame(draw);
  }

  initParticles();
  draw();

  window.updateElec = function (type, val) {
    if (type === "volt") {
      voltage = parseInt(val);
      document.getElementById("voltVal").textContent = val + "V";
      document.getElementById("voltMeter").style.width = (val / 24) * 100 + "%";
    } else {
      resistance = parseInt(val);
      document.getElementById("resVal").textContent = val + "Ω";
      document.getElementById("resMeter").style.width = (val / 20) * 100 + "%";
    }
    current = voltage / resistance;
    document.getElementById("currVal").textContent = current.toFixed(1) + "A";
    document.getElementById("currMeter").style.width = Math.min(100, (current / 10) * 100) + "%";
    initParticles();
  };
})();

// --------------------------------------------------
// BIOLOGY PARTICLES
// --------------------------------------------------
(function () {
  const canvas = document.getElementById("bioParticles");
  if (!canvas) return;
  const parent = canvas.parentElement;
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  const ctx = canvas.getContext("2d");

  const pts = Array.from({ length: 25 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.25 + 0.05,
    tw: Math.random() * Math.PI * 2,
  }));

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.tw += 0.02;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      const a = p.a * (0.5 + 0.5 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16,185,129,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
})();

// --------------------------------------------------
// BIOLOGY SYSTEM TABS
// --------------------------------------------------
function setBioSys(el, sys) {
  document.querySelectorAll(".bio-sys-tab").forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  const label = document.getElementById("bioSysLabel");
  if (label) label.textContent = sys.toUpperCase() + " SYSTEM SELECTED";
}

// --------------------------------------------------
// SIMULATION WAVE (sim preview section)
// --------------------------------------------------
(function () {
  let wT = 0, simRunning = false;
  const simWavePath = document.getElementById("simWavePath");
  if (!simWavePath) return;

  function animWave() {
    if (simRunning) wT += 0.05;
    let d = "M 0 55";
    for (let x = 0; x <= 280; x += 3) {
      const y = 55 + Math.sin(x * 0.065 + wT) * (simRunning ? 30 : 4) * Math.exp(-x * 0.001);
      d += ` L ${x} ${y}`;
    }
    simWavePath.setAttribute("d", d);
    requestAnimationFrame(animWave);
  }
  animWave();

  window.toggleSim = function () {
    simRunning = !simRunning;
    const btn = document.getElementById("simBtn");
    if (!btn) return;
    btn.innerHTML = simRunning
      ? '<i class="bx bx-pause"></i> PAUSE SIMULATION'
      : '<i class="bx bx-play"></i> RUN SIMULATION';
    btn.style.background = simRunning ? "#10B981" : "#0EA5E9";
    btn.style.boxShadow = simRunning
      ? "0 0 20px rgba(16,185,129,0.5)"
      : "0 0 15px rgba(14,165,233,0.3)";
  };
})();

// --------------------------------------------------
// CTA PARTICLES
// --------------------------------------------------
(function () {
  const canvas = document.getElementById("ctaParticles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();

  const pts = Array.from({ length: 50 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.0003,
    vy: (Math.random() - 0.5) * 0.0003,
    col: ["rgba(14,165,233,", "rgba(34,211,238,", "rgba(16,185,129,"][Math.floor(Math.random() * 3)],
    a: Math.random() * 0.4 + 0.1,
    tw: Math.random() * Math.PI * 2,
  }));

  function frame() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    pts.forEach((p) => {
      p.x = (p.x + p.vx + 1) % 1;
      p.y = (p.y + p.vy + 1) % 1;
      p.tw += 0.015;
      const a = p.a * (0.5 + 0.5 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + a + ")";
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
})();

// --------------------------------------------------
// SCROLL REVEAL
// --------------------------------------------------
(function () {
  const reveals = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.1 }
  );
  reveals.forEach((el) => obs.observe(el));
})();

// --------------------------------------------------
// COUNTER ANIMATION
// --------------------------------------------------
(function () {
  document.querySelectorAll(".stat-number").forEach((el) => {
    const cntObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = parseInt(el.dataset.target);
        const start = performance.now();
        function update(now) {
          const p = Math.min((now - start) / 1500, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        cntObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    cntObs.observe(el);
  });
})();

// --------------------------------------------------
// SMOOTH SCROLL
// --------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
  });
});