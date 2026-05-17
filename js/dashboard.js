// ============================================================
//  dashboard.js — dashboard.html
// ============================================================

// ── WELCOME PARTICLES ──
(function () {
  const c = document.getElementById("welcomeParticles");
  if (!c) return;
  const ctx = c.getContext("2d");

  function rs() {
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
  }
  rs();
  window.addEventListener("resize", rs);

  const COLS = ["rgba(14,165,233,", "rgba(34,211,238,", "rgba(16,185,129,"];
  const pts = Array.from({ length: 50 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.0003,
    vy: (Math.random() - 0.5) * 0.0003,
    col: COLS[Math.floor(Math.random() * COLS.length)],
    a: Math.random() * 0.3 + 0.05,
    tw: Math.random() * Math.PI * 2,
  }));

  function frame() {
    const w = c.width, h = c.height;
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

// ── WELCOME VIZ (orbiting atoms) ──
(function () {
  const c = document.getElementById("welcomeViz");
  if (!c) return;
  const ctx = c.getContext("2d");
  let t = 0;

  function frame() {
    ctx.clearRect(0, 0, 200, 140);
    const cx = 100, cy = 70;

    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(34,211,238,0.7)";
    ctx.fill();
    ctx.shadowBlur = 20; ctx.shadowColor = "#22D3EE";
    ctx.fill(); ctx.shadowBlur = 0;

    const orbits = [
      { r: 38, spd: 1,   col: "rgba(14,165,233,0.5)" },
      { r: 58, spd: 0.6, col: "rgba(16,185,129,0.4)" },
      { r: 76, spd: 0.4, col: "rgba(34,211,238,0.3)" },
    ];

    orbits.forEach((o) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, o.r, o.r * 0.45, t * 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = o.col; ctx.lineWidth = 1; ctx.stroke();

      const ex = cx + o.r * Math.cos(t * o.spd);
      const ey = cy + o.r * 0.45 * Math.sin(t * o.spd);
      ctx.beginPath();
      ctx.arc(ex, ey, 4, 0, Math.PI * 2);
      ctx.fillStyle = o.col.replace("0.", "0.9");
      ctx.fill();
      ctx.shadowBlur = 10; ctx.shadowColor = o.col;
      ctx.fill(); ctx.shadowBlur = 0;
    });

    t += 0.04;
    requestAnimationFrame(frame);
  }
  frame();
})();

// ── CHEMISTRY LAB PREVIEW ──
(function () {
  const c = document.getElementById("chemCanvas");
  if (!c) return;
  const ctx = c.getContext("2d");
  let t = 0;

  const pts = Array.from({ length: 20 }, () => ({
    x: Math.random() * 300, y: Math.random() * 140,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    col: ["rgba(34,211,238,", "rgba(14,165,233,", "rgba(16,185,129,"][Math.floor(Math.random() * 3)],
    a: Math.random() * 0.3 + 0.1,
  }));

  function frame() {
    ctx.clearRect(0, 0, 300, 140);

    [
      [80,  30, 100, "rgba(14,165,233,"],
      [140, 50, 80,  "rgba(16,185,129,"],
      [200, 20, 110, "rgba(139,92,246,"],
      [260, 40, 90,  "rgba(34,211,238,"],
    ].forEach(([x, h, fill, col], i) => {
      const y = 140 - fill;
      ctx.fillStyle = col + "0.06)"; ctx.strokeStyle = col + "0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(x - 12, y, 24, fill, 4);
      ctx.fill(); ctx.stroke();

      const wave = 4 * Math.sin(t * 2 + i);
      const gr = ctx.createLinearGradient(x, y + wave, x, 140);
      gr.addColorStop(0, col + "0.8)"); gr.addColorStop(1, col + "0.3)");
      ctx.fillStyle = gr;
      ctx.beginPath(); ctx.roundRect(x - 11, y + wave, 22, fill - wave, 4);
      ctx.fill();

      ctx.beginPath(); ctx.ellipse(x, y + wave, 14, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = col + "0.5)"; ctx.shadowBlur = 15; ctx.shadowColor = col + "1)";
      ctx.fill(); ctx.shadowBlur = 0;
    });

    pts.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > 300) p.vx *= -1;
      if (p.y < 0 || p.y > 140) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + p.a + ")"; ctx.fill();
    });

    t += 0.04;
    requestAnimationFrame(frame);
  }
  frame();
})();

// ── PHYSICS LAB PREVIEW ──
(function () {
  const c = document.getElementById("physCanvas");
  if (!c) return;
  const ctx = c.getContext("2d");
  let pts = [], t = 0;

  const path = [
    { x: 30,  y: 70  }, { x: 90,  y: 70  }, { x: 210, y: 70  },
    { x: 270, y: 70  }, { x: 270, y: 110 }, { x: 150, y: 110 },
    { x: 30,  y: 110 }, { x: 30,  y: 70  },
  ];
  for (let i = 0; i < 18; i++) pts.push({ t: i / 18 });

  function getP(ft) {
    const segs = []; let tot = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const dx = path[i+1].x - path[i].x, dy = path[i+1].y - path[i].y;
      const len = Math.sqrt(dx*dx + dy*dy);
      segs.push({ x0: path[i].x, y0: path[i].y, dx, dy, len });
      tot += len;
    }
    let d = ft * tot;
    for (const s of segs) {
      if (d <= s.len) { const f = d / s.len; return { x: s.x0 + s.dx*f, y: s.y0 + s.dy*f }; }
      d -= s.len;
    }
    return path[0];
  }

  function frame() {
    ctx.clearRect(0, 0, 300, 140);

    ctx.shadowBlur = 10; ctx.shadowColor = "#0EA5E9";
    ctx.strokeStyle = "rgba(14,165,233,0.3)"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    path.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke(); ctx.shadowBlur = 0;

    ctx.fillStyle = "rgba(251,191,36,0.7)"; ctx.fillRect(18, 64, 10, 12);

    const bright = 0.5 + 0.4 * Math.sin(t * 3);
    ctx.beginPath(); ctx.arc(210, 70, 12, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,200,0,${0.1 + bright * 0.6})`;
    ctx.shadowBlur = bright * 30; ctx.shadowColor = "rgba(255,200,0,0.8)";
    ctx.fill(); ctx.shadowBlur = 0;

    pts.forEach((p) => {
      p.t = (p.t + 0.01) % 1;
      const pos = getP(p.t);
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34,211,238,${0.5 + Math.sin(p.t * 20) * 0.3})`;
      ctx.shadowBlur = 8; ctx.shadowColor = "#22D3EE";
      ctx.fill(); ctx.shadowBlur = 0;
    });

    for (let i = 0; i < 3; i++) {
      const y = 80 + i * 8;
      const x = 40 + ((t * 80 + i * 30) % 180);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 15, y);
      ctx.strokeStyle = `rgba(14,165,233,${0.2 - i * 0.05})`; ctx.lineWidth = 1; ctx.stroke();
    }

    t += 0.04;
    requestAnimationFrame(frame);
  }
  frame();
})();

// ── BIOLOGY LAB PREVIEW ──
(function () {
  const c = document.getElementById("bioCanvas");
  if (!c) return;
  const ctx = c.getContext("2d");
  let t = 0;

  function frame() {
    ctx.clearRect(0, 0, 300, 140);

    ctx.strokeStyle = "rgba(16,185,129,0.4)"; ctx.lineWidth = 1.2;
    ctx.shadowBlur = 8; ctx.shadowColor = "rgba(16,185,129,0.5)";

    ctx.beginPath(); ctx.ellipse(150, 28, 18, 22, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(135, 50); ctx.bezierCurveTo(125, 65, 125, 100, 128, 115);
    ctx.lineTo(140, 115); ctx.lineTo(140, 135); ctx.lineTo(160, 135);
    ctx.lineTo(160, 115); ctx.lineTo(172, 115);
    ctx.bezierCurveTo(175, 100, 175, 65, 165, 50);
    ctx.closePath(); ctx.stroke(); ctx.shadowBlur = 0;

    const pulse = 1 + 0.12 * Math.sin(t * 7);
    ctx.save(); ctx.translate(150, 72); ctx.scale(pulse, pulse);
    ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(16,185,129,${0.3 + 0.3 * Math.abs(Math.sin(t * 7))})`;
    ctx.shadowBlur = 12; ctx.shadowColor = "#10B981";
    ctx.fill(); ctx.shadowBlur = 0; ctx.restore();

    [[150, 28], [150, 72], [135, 85], [150, 98]].forEach(([x, y], i) => {
      const a = 0.5 + 0.4 * Math.sin(t * 2 + i);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16,185,129,${a})`;
      ctx.shadowBlur = 10; ctx.shadowColor = "#10B981";
      ctx.fill(); ctx.shadowBlur = 0;
    });

    const sy = (t * 30) % 140;
    ctx.beginPath(); ctx.moveTo(100, sy); ctx.lineTo(200, sy);
    ctx.strokeStyle = "rgba(16,185,129,0.2)"; ctx.lineWidth = 1; ctx.stroke();

    for (let i = 0; i < 5; i++) {
      const px = 100 + Math.sin(t + i * 1.3) * 40 + Math.cos(t * 0.7 + i) * 20;
      const py = 20 + Math.sin(t * 0.8 + i * 1.7) * 50;
      ctx.beginPath(); ctx.arc(px, py, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(52,211,153,${0.2 + Math.sin(t + i) * 0.15})`; ctx.fill();
    }

    t += 0.04;
    requestAnimationFrame(frame);
  }
  frame();
})();

// ── MINI SIMULATION WAVE ──
let miniSimRunning = false, miniT = 0;
let simFreq = 4, simAmp = 20, simDecay = 3;

function updateSimVal(key, val) {
  if (key === "freq") {
    simFreq = parseFloat(val);
    document.getElementById("freqVal").textContent = val;
    document.getElementById("smFreq").textContent = (1 / val).toFixed(2);
  }
  if (key === "amp") {
    simAmp = parseFloat(val);
    document.getElementById("ampVal").textContent = val;
    document.getElementById("smAmp").textContent = val;
  }
  if (key === "decay") {
    simDecay = parseFloat(val);
    document.getElementById("decayVal").textContent = val;
  }
}

function toggleMiniSim() {
  miniSimRunning = !miniSimRunning;
  const btn = document.getElementById("simRunBtn");
  const badge = document.getElementById("simStatusBadge");
  btn.textContent = miniSimRunning ? "⏸ PAUSE" : "▶ RUN SIMULATION";
  btn.classList.toggle("running", miniSimRunning);
  if (badge) badge.textContent = miniSimRunning ? "RUNNING" : "IDLE";
}

(function waveLoop() {
  if (miniSimRunning) miniT += 0.06;
  const path = document.getElementById("miniWave");
  if (path) {
    let d = "M 0 45";
    for (let x = 0; x <= 260; x += 3) {
      const decay = Math.exp(-x * simDecay * 0.001);
      const y = 45 + Math.sin(x * simFreq * 0.04 + miniT) * simAmp * decay;
      d += ` L ${x} ${y}`;
    }
    path.setAttribute("d", d);
    const smPeriod = document.getElementById("smPeriod");
    if (smPeriod) smPeriod.textContent = ((1 / simFreq) * 10).toFixed(1) + "s";
  }
  requestAnimationFrame(waveLoop);
})();

// ── SIDEBAR NAV ACTIVE ──
(function () {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-item").forEach((item) => {
    const href = item.getAttribute("href");
    if (href && href !== "#" && href === currentPage) {
      item.classList.add("active");
    }
    item.addEventListener("click", (e) => {
      if (!href || href === "#") e.preventDefault();
      document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"));
      item.classList.add("active");
    });
  });
})();