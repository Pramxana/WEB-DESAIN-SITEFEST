// --------------------------------------------------
// TAB SYSTEM
// --------------------------------------------------
let activeTab = 'chem';
let timerIntervals = {};
const challengeInitState = { chem: false, phys: false, bio: false };
const challengeLabels = {
  chem: 'Chemistry Challenge',
  phys: 'Physics Challenge',
  bio: 'Biology Challenge',
  all: 'All Challenges'
};

function markActiveSelector(tab) {
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tab);
  });
}

function showChallengePanel(tab) {
  const panels = document.querySelectorAll('.lab-panel');
  const stage = document.querySelector('.challenge-stage');
  if (stage) stage.classList.toggle('all-mode', tab === 'all');

  panels.forEach((panel) => {
    const shouldShow = tab === 'all' || panel.dataset.lab === tab;
    panel.classList.toggle('active', shouldShow);
  });
}

function initChallenge(tab) {
  if (tab === 'all') {
    ['chem', 'phys', 'bio'].forEach(initChallenge);
    return;
  }

  if (challengeInitState[tab]) return;
  if (tab === 'chem') ChemState.init();
  if (tab === 'phys') PhysState.init();
  if (tab === 'bio') BioState.init();
  challengeInitState[tab] = true;
}

function switchTab(tab) {
  const selectedTab = tab || 'chem';
  activeTab = selectedTab;
  markActiveSelector(selectedTab);
  showChallengePanel(selectedTab);
  initChallenge(selectedTab);

  const activeLabel = document.getElementById('activeChallengeLabel');
  if (activeLabel) activeLabel.textContent = challengeLabels[selectedTab] || 'Challenge Mode';
}

function initChallengePage() {
  switchTab('chem');
}
function showToast(msg, type = 'info', duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), duration);
}

// --------------------------------------------------
// MODAL
// --------------------------------------------------
function openModal(id, title, sub, badge = null) {
  document.getElementById(id === 'success' ? 'successTitle' : 'failedTitle').textContent = title;
  document.getElementById(id === 'success' ? 'successSub' : 'failedSub').textContent = sub;
  if (badge && id === 'success') document.getElementById('badgeAward').textContent = '⭐ ' + badge;
  document.getElementById(id + 'Modal').classList.add('show');
  if (id === 'success') spawnConfetti();
}
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function spawnConfetti() {
  const colors = ['#00ff88','#00c8ff','#ffe600','#ff3060','#b44aff'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `left:${Math.random()*100}vw;top:-20px;background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;
      animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*0.5}s;
      border-radius:${Math.random()>0.5?'50%':'2px'};`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

function resetCurrentLab() {
  if (activeTab === 'all') { resetChem(); resetPhys(); resetBio(); return; }
  if (activeTab === 'chem') resetChem();
  else if (activeTab === 'phys') resetPhys();
  else resetBio();
}

// --------------------------------------------------
// TIMER UTILITY
// --------------------------------------------------
function startTimer(id, seconds, onExpire) {
  if (timerIntervals[id]) clearInterval(timerIntervals[id]);
  let remaining = seconds;
  const el = document.getElementById(id);
  const update = () => {
    const m = String(Math.floor(remaining / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');
    el.textContent = `${m}:${s}`;
    if (remaining <= 30) el.classList.add('danger'); else el.classList.remove('danger');
    if (remaining <= 0) { clearInterval(timerIntervals[id]); onExpire(); }
    remaining--;
  };
  update();
  timerIntervals[id] = setInterval(update, 1000);
}
function stopTimer(id) { if (timerIntervals[id]) clearInterval(timerIntervals[id]); }

// --------------------------------------------------
// LAB 1: KIMIA — STATE MANAGEMENT
// --------------------------------------------------
const ChemState = {
  activeMission: "NETRALISASI_LIMBAH",
  isCompleted: false,
  score: 0,
  volume: 50,       // mL, starts with 50mL waste
  targetVolume: 200,
  currentpH: 1.0,
  dominantCompound: "HCl",
  compoundsAdded: 1,
  reactions: 0,
  addedList: [],    // track what was added

  init() {
    this.reset();
    startTimer('chem-timer', 180, () => {
      if (!this.isCompleted) openModal('failed', 'TIME OUT!', 'Waktu habis. Limbah masih belum dinetralkan.', null);
    });
    addChemLog('Sistem diinisialisasi. Limbah asam terdeteksi.', 'info');
    addChemLog('TARGET: pH 7.0 ± 0.5 | Volume minimal 200 mL', 'info');
  },

  reset() {
    this.isCompleted = false;
    this.volume = 50;
    this.currentpH = 1.0;
    this.dominantCompound = "HCl";
    this.compoundsAdded = 1;
    this.reactions = 0;
    this.addedList = [{name:'HCl', ph:1.0, type:'acid'}];
    this.updateUI();
  },

  updateUI() {
    const pH = this.currentpH;
    // --------------------------------------------------
    // pH color
    // --------------------------------------------------
    const phColor = pH < 3 ? '#ff3060' : pH < 5 ? '#ff7a00' : pH < 6.5 ? '#ffe600' : pH <= 7.5 ? '#00ff88' : pH < 10 ? '#00c8ff' : '#b44aff';
    document.getElementById('ph-display-val').textContent = pH.toFixed(1);
    document.getElementById('ph-display-val').style.color = phColor;
    document.getElementById('dominant-compound').textContent = this.dominantCompound;
    document.getElementById('vol-display').textContent = this.volume + ' mL';
    document.getElementById('vol-label').textContent = this.volume + ' mL';
    document.getElementById('compound-count').textContent = this.compoundsAdded;
    document.getElementById('reaction-count').textContent = this.reactions;

    // --------------------------------------------------
    // volume bar
    // --------------------------------------------------
    const volPct = Math.min(100, (this.volume / this.targetVolume) * 100);
    document.getElementById('volumeFill').style.width = volPct + '%';

    // --------------------------------------------------
    // pH indicator (0-14 map to 100%-0%)
    // --------------------------------------------------
    const phPct = ((14 - pH) / 14) * 100;
    document.getElementById('phIndicator').style.top = `${Math.min(95,Math.max(2,phPct))}%`;

    // --------------------------------------------------
    // liquid color & height
    // --------------------------------------------------
    const liq = document.getElementById('liquidFill');
    liq.style.height = volPct + '%';
    liq.style.background = `${phColor}99`;
    liq.querySelector('.liquid-wave').style.background = `${phColor}66`;

    // --------------------------------------------------
    // bubbles
    // --------------------------------------------------
    this.spawnBubbles(phColor);
  },

  spawnBubbles(color) {
    const liq = document.getElementById('liquidFill');
    const existing = liq.querySelectorAll('.bubble');
    if (existing.length > 4) return;
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 4 + Math.random() * 8;
    b.style.cssText = `width:${size}px;height:${size}px;background:${color};left:${10+Math.random()*60}%;bottom:0;animation-duration:${1.5+Math.random()}s;animation-delay:${Math.random()}s;`;
    liq.appendChild(b);
    setTimeout(() => b.remove(), 2500);
  },

  checkWinCondition() {
    const targetVolumeReached = this.volume >= this.targetVolume;
    if (Math.abs(this.currentpH - 7.0) <= 0.5 && targetVolumeReached) {
      this.isCompleted = true;
      stopTimer('chem-timer');
      localStorage.setItem('badge_molecular_expert', 'true');
      addChemLog('✓ NETRALISASI BERHASIL! pH = ' + this.currentpH.toFixed(1), 'success');
      setTimeout(() => openModal('success', 'MISSION COMPLETE!', `Limbah berhasil dinetralkan! pH = ${this.currentpH.toFixed(1)}\nVolume final: ${this.volume} mL`, 'MOLECULAR EXPERT BADGE'), 600);
      return true;
    }
    return false;
  },

  checkFailCondition(newPH) {
    if (newPH < 0.3 || newPH > 13.5) {
      const beaker = document.getElementById('beakerContainer');
      beaker.classList.add('shake');
      setTimeout(() => beaker.classList.remove('shake'), 600);
      this.spawnSmoke();
      addChemLog('⚠ BAHAYA! Konsentrasi ekstrem — eksperimen tidak aman!', 'error');
      setTimeout(() => {
        openModal('failed', 'EXPERIMENT FAILED', 'Konsentrasi zat terlalu ekstrem.\nTabung reaksi tidak aman! Reset dan coba strategi lain.');
      }, 800);
      return true;
    }
    return false;
  },

  spawnSmoke() {
    const beaker = document.getElementById('beakerContainer');
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('div');
      s.className = 'smoke-particle';
      s.style.cssText = `width:${10+Math.random()*20}px;height:${10+Math.random()*20}px;
        background:rgba(180,74,255,0.4);left:${20+Math.random()*60}%;bottom:${60+Math.random()*40}%;
        animation-delay:${Math.random()*0.5}s;filter:blur(4px);`;
      beaker.appendChild(s);
      setTimeout(() => s.remove(), 2000);
    }
  }
};

function mixCompounds(compoundA, compoundB) {
  // --------------------------------------------------
  // Simple pH averaging with some chemistry logic
  // --------------------------------------------------
  const reactions = {
    'HCl+NaOH': { product: 'NaCl + H₂O', resultPH: 7.0, note: 'Netralisasi sempurna!' },
    'H₂SO₄+NaOH': { product: 'Na₂SO₄ + H₂O', resultPH: 7.0, note: 'Netralisasi asam sulfat.' },
    'HCl+NH₃': { product: 'NH₄Cl', resultPH: 5.5, note: 'Garam ammonium terbentuk.' },
    'CH₃COOH+NaOH': { product: 'CH₃COONa + H₂O', resultPH: 8.9, note: 'Buffer asetat terbentuk.' },
  };
  const key = `${compoundA}+${compoundB}`;
  const key2 = `${compoundB}+${compoundA}`;
  return reactions[key] || reactions[key2] || null;
}

function addCompound(name, ph, type) {
  if (ChemState.isCompleted) return;
  const prevPH = ChemState.currentpH;
  const prevVol = ChemState.volume;
  const addVol = 25; // each addition = 25mL

  // --------------------------------------------------
  // pH calculation: volume-weighted average
  // --------------------------------------------------
  const newVol = prevVol + addVol;
  let newPH = (prevPH * prevVol + ph * addVol) / newVol;
  newPH = Math.max(0, Math.min(14, newPH));

  // --------------------------------------------------
  // Check for known reaction combos
  // --------------------------------------------------
  if (ChemState.addedList.length > 0) {
    const lastCompound = ChemState.addedList[ChemState.addedList.length - 1];
    const rxn = mixCompounds(lastCompound.name, name);
    if (rxn) {
      addChemLog(`⚗ REAKSI: ${lastCompound.name} + ${name} → ${rxn.product} | ${rxn.note}`, 'success');
      ChemState.reactions++;
      // --------------------------------------------------
      // Pull toward reaction pH more aggressively
      // --------------------------------------------------
      newPH = (newPH + rxn.resultPH) / 2;
    }
  }

  if (ChemState.checkFailCondition(newPH)) { return; }

  ChemState.currentpH = parseFloat(newPH.toFixed(1));
  ChemState.volume = newVol;
  ChemState.compoundsAdded++;
  ChemState.dominantCompound = name;
  ChemState.addedList.push({name, ph, type});

  addChemLog(`+ ${name} ditambahkan (${addVol}mL). pH: ${prevPH.toFixed(1)} → ${ChemState.currentpH.toFixed(1)}`, type === 'acid' ? 'error' : type === 'base' ? 'info' : 'success');
  ChemState.updateUI();

  if (!ChemState.checkWinCondition() && ChemState.volume >= ChemState.targetVolume) {
    addChemLog(`Volume ${ChemState.volume}mL tercapai. pH masih ${ChemState.currentpH.toFixed(1)} — butuh penyesuaian lebih.`, 'info');
  }
}

function activateMix() {
  if (ChemState.addedList.length < 2) { showToast('Tambahkan minimal 2 senyawa terlebih dahulu!', 'error'); return; }
  addChemLog('⚡ MIXING ACTIVATED — Kalkulasi reaksi dijalankan...', 'info');
  // --------------------------------------------------
  // Simulate mixing effect
  // --------------------------------------------------
  const beaker = document.getElementById('beakerContainer');
  beaker.style.animation = 'none';
  setTimeout(() => { beaker.style.animation = ''; ChemState.checkWinCondition(); }, 100);
}

function addChemLog(msg, type = '') {
  const log = document.getElementById('reactionLog');
  const now = new Date();
  const ts = `[${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}]`;
  const el = document.createElement('div');
  el.className = `log-entry ${type}`;
  el.innerHTML = `<span class="log-time">${ts}</span> ${msg}`;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}

function resetChem() {
  stopTimer('chem-timer');
  ChemState.reset();
  document.getElementById('reactionLog').innerHTML = '';
  ChemState.init();
}

// --------------------------------------------------
// LAB 2: FISIKA — STATE MANAGEMENT
// --------------------------------------------------
const PhysState = {
  isCompleted: false,
  circuitOn: false,
  voltage: 9,
  components: {}, // cellId -> {type, resistance, voltage, emoji}

  init() {
    this.buildGrid();
    startTimer('phys-timer', 300, () => {
      if (!this.isCompleted) openModal('failed', 'TIME OUT!', 'Waktu habis. Kota masih gelap gulita!');
    });
    this.drawOscWave(false);
  },

  buildGrid() {
    const grid = document.getElementById('circuitGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 24; i++) {
      const cell = document.createElement('div');
      cell.className = 'circuit-cell';
      cell.id = `cell-${i}`;
      cell.ondragover = allowDrop;
      cell.ondrop = e => dropComponent(e, i);
      grid.appendChild(cell);
    }
  },

  calcOhm() {
    const comps = Object.values(this.components);
    const hasBattery = comps.some(c => c.type === 'battery');
    const hasLamp = comps.some(c => c.type === 'lamp');
    const resistors = comps.filter(c => c.type === 'resistor');
    const totalR = resistors.reduce((s, c) => s + c.resistance, 0) + (hasLamp ? 2 : 0);
    const V = hasBattery ? this.voltage : 0;
    const I = totalR > 0 ? V / totalR : Infinity;
    return { V, R: totalR, I, hasBattery, hasLamp, hasResistor: resistors.length > 0 };
  },

  updateOhmDisplay(calc) {
    document.getElementById('volt-val').textContent = calc.hasBattery ? calc.V : '—';
    document.getElementById('resist-val').textContent = calc.R > 0 ? calc.R.toFixed(1) : '—';
    document.getElementById('current-val').textContent = isFinite(calc.I) ? calc.I.toFixed(2) : '∞';
    document.getElementById('ohm-equation').textContent =
      `${calc.hasBattery ? calc.V : '?'}V = ${isFinite(calc.I) ? calc.I.toFixed(2) : '?'}A × ${calc.R > 0 ? calc.R.toFixed(1) : '?'}Ω`;

    if (isFinite(calc.I)) {
      const iEl = document.getElementById('current-val');
      iEl.style.color = calc.I >= 1.5 && calc.I <= 2.0 ? 'var(--neon-green)' : calc.I > 2.0 ? 'var(--neon-red)' : 'var(--neon-blue)';
    }
  },

  checkCircuit() {
    const calc = this.calcOhm();
    this.updateOhmDisplay(calc);

    if (!calc.hasBattery || !calc.hasLamp) {
      showToast('Rangkaian tidak lengkap! Butuh Battery + Lamp minimal.', 'error'); return;
    }

    if (calc.R === 0) {
      // --------------------------------------------------
      // Short circuit!
      // --------------------------------------------------
      document.getElementById('lampIcon').textContent = '💥';
      document.getElementById('lampIcon').className = 'lamp-icon';
      document.getElementById('lampStatus').textContent = 'SHORT CIRCUIT!';
      document.getElementById('lampStatus').style.color = 'var(--neon-red)';
      document.getElementById('oscStatus').textContent = '// ⚠ SHORT CIRCUIT DETECTED — R = 0Ω';
      document.getElementById('oscStatus').style.color = 'var(--neon-red)';
      this.drawOscWave('overload');
      openModal('failed', 'SHORT CIRCUIT!', 'Resistansi = 0Ω! Arus tak terbatas merusak rangkaian.\nTambahkan resistor untuk membatasi arus.');
      return;
    }

    if (!isFinite(calc.I) || calc.I > 4.0) {
      document.getElementById('lampIcon').textContent = '💥';
      document.getElementById('lampStatus').textContent = 'OVERLOAD — BURNT OUT!';
      document.getElementById('lampStatus').style.color = 'var(--neon-red)';
      document.getElementById('lampIcon').classList.add('overload');
      this.drawOscWave('overload');
      openModal('failed', 'LAMP OVERLOADED!', `Arus ${calc.I.toFixed(2)}A melebihi toleransi!\nGunakan lebih banyak resistor.`);
      return;
    }

    if (calc.I >= 1.5 && calc.I <= 2.0) {
      // --------------------------------------------------
      // WIN!
      // --------------------------------------------------
      this.isCompleted = true;
      stopTimer('phys-timer');
      document.getElementById('lampIcon').textContent = '💡';
      document.getElementById('lampIcon').className = 'lamp-icon on';
      document.getElementById('lampStatus').textContent = `PERFECT! I = ${calc.I.toFixed(2)}A ✓`;
      document.getElementById('lampStatus').style.color = 'var(--neon-green)';
      this.drawOscWave('normal', calc.I);
      document.getElementById('oscStatus').textContent = `// ✓ STABLE — I = ${calc.I.toFixed(2)}A — DALAM TOLERANSI`;
      document.getElementById('oscStatus').style.color = 'var(--neon-green)';
      localStorage.setItem('badge_circuit_master', 'true');
      setTimeout(() => openModal('success', 'POWER RESTORED!', `Arus ${calc.I.toFixed(2)}A dalam rentang toleransi.\nLampu menyala — Kota bercahaya kembali!`, 'CIRCUIT MASTER BADGE'), 600);
    } else {
      // --------------------------------------------------
      // Not optimal
      // --------------------------------------------------
      document.getElementById('lampIcon').textContent = '💡';
      document.getElementById('lampIcon').className = 'lamp-icon';
      document.getElementById('lampStatus').textContent = `I = ${calc.I.toFixed(2)}A — DI LUAR TOLERANSI`;
      document.getElementById('lampStatus').style.color = 'var(--neon-yellow)';
      this.drawOscWave('weak', calc.I);
      document.getElementById('oscStatus').textContent = `// ⚠ I = ${calc.I.toFixed(2)}A — Target: 1.5–2.0A`;
      document.getElementById('oscStatus').style.color = 'var(--neon-yellow)';
      showToast(`Arus ${calc.I.toFixed(2)}A — Sesuaikan resistor hingga 1.5–2.0A!`, 'error');
    }
  },

  drawOscWave(mode, current = 1.0) {
    const svg = document.getElementById('oscWave');
    if (!mode) { svg.innerHTML = ''; return; }

    const W = 300, H = 140;
    const amplitude = mode === 'normal' ? 40 : mode === 'weak' ? 20 : mode === 'overload' ? 60 : 10;
    const freq = mode === 'overload' ? 3 : 1.5;
    let d = `M 0 ${H/2}`;
    for (let x = 0; x <= W; x += 2) {
      const y = H/2 - amplitude * Math.sin((x / W) * Math.PI * 2 * freq);
      d += ` L ${x} ${y}`;
    }
    const color = mode === 'normal' ? '#00ff88' : mode === 'overload' ? '#ff3060' : '#ffe600';
    svg.innerHTML = `<path d="${d}" stroke="${color}" stroke-width="2" fill="none" opacity="0.9"/>
      <path d="${d}" stroke="${color}" stroke-width="6" fill="none" opacity="0.1"/>`;
  }
};

let dragData = null;

function dragComponent(e) {
  dragData = { type: e.currentTarget.dataset.type, resistance: parseFloat(e.currentTarget.dataset.resistance||0), voltage: parseFloat(e.currentTarget.dataset.voltage||0) };
  e.currentTarget.style.opacity = '0.5';
  setTimeout(() => e.currentTarget.style.opacity = '1', 100);
}

function dropComponent(e, cellIdx) {
  e.preventDefault();
  if (!dragData) return;
  const cell = document.getElementById(`cell-${cellIdx}`);
  if (cell.textContent.trim() && !cell.querySelector('.remove-cell')) return; // occupied

  const icons = { battery:'🔋', resistor:'⬛', lamp:'💡', switch:'🔘' };
  const labels = { battery:`${dragData.voltage}V`, resistor:`${dragData.resistance}Ω`, lamp:'LED', switch:'SW' };

  cell.innerHTML = `<span style="font-size:22px">${icons[dragData.type]}</span>
    <span class="cell-label">${labels[dragData.type]}</span>
    <button class="remove-cell" onclick="removeCell(${cellIdx})">✕</button>`;
  cell.classList.add('has-component');

  PhysState.components[cellIdx] = { ...dragData };
  PhysState.updateOhmDisplay(PhysState.calcOhm());
  dragData = null;

  // --------------------------------------------------
  // Draw wires
  // --------------------------------------------------
  drawWires();
}

function removeCell(idx) {
  const cell = document.getElementById(`cell-${idx}`);
  cell.innerHTML = '';
  cell.classList.remove('has-component');
  delete PhysState.components[idx];
  PhysState.updateOhmDisplay(PhysState.calcOhm());
  drawWires();
}

function drawWires() {
  // --------------------------------------------------
  // Simple visual — highlight connected cells
  // --------------------------------------------------
  const keys = Object.keys(PhysState.components).map(Number).sort((a,b)=>a-b);
  document.querySelectorAll('.circuit-cell').forEach(c => c.style.boxShadow = '');
  if (keys.length >= 2) {
    keys.forEach(k => {
      const c = document.getElementById(`cell-${k}`);
      if (c) c.style.boxShadow = '0 0 8px rgba(0,200,255,0.3)';
    });
  }
}

function toggleCircuit() {
  const btn = document.getElementById('circuitSwitch');
  PhysState.circuitOn = !PhysState.circuitOn;
  if (PhysState.circuitOn) {
    btn.textContent = '🔌 DEACTIVATE CIRCUIT';
    btn.classList.add('on');
    PhysState.checkCircuit();
  } else {
    btn.textContent = '⚡ ACTIVATE CIRCUIT';
    btn.classList.remove('on');
    document.getElementById('lampIcon').textContent = '💡';
    document.getElementById('lampIcon').className = 'lamp-icon';
    document.getElementById('lampStatus').textContent = 'CIRCUIT INACTIVE';
    document.getElementById('lampStatus').style.color = 'var(--text-dim)';
    PhysState.drawOscWave(false);
    document.getElementById('oscStatus').textContent = '// STANDBY — Activate circuit to see waveform';
    document.getElementById('oscStatus').style.color = '#006020';
  }
}

function resetPhys() {
  stopTimer('phys-timer');
  PhysState.isCompleted = false;
  PhysState.circuitOn = false;
  PhysState.components = {};
  PhysState.buildGrid();
  PhysState.updateOhmDisplay({ V: 9, R: 0, I: 0, hasBattery: false, hasLamp: false });
  document.getElementById('lampIcon').textContent = '💡';
  document.getElementById('lampIcon').className = 'lamp-icon';
  document.getElementById('lampStatus').textContent = 'CIRCUIT INACTIVE';
  document.getElementById('lampStatus').style.color = 'var(--text-dim)';
  PhysState.drawOscWave(false);
  document.getElementById('oscStatus').textContent = '// STANDBY — Activate circuit to see waveform';
  document.getElementById('oscStatus').style.color = '#006020';
  document.getElementById('circuitSwitch').textContent = '⚡ ACTIVATE CIRCUIT';
  document.getElementById('circuitSwitch').classList.remove('on');
  document.getElementById('volt-val').textContent = '9';
  document.getElementById('resist-val').textContent = '—';
  document.getElementById('current-val').textContent = '—';
  document.getElementById('ohm-equation').textContent = '9V = ? × ?Ω';
  PhysState.init();
}

// --------------------------------------------------
// LAB 3: BIOLOGI — STATE MANAGEMENT
// --------------------------------------------------
const BioState = {
  isCompleted: false,
  mistakes: 0,
  maxMistakes: 3,
  organsPlaced: 0,
  totalOrgans: 5,
  diagnosedComplaints: 0,
  totalComplaints: 3,
  placedOrgans: new Set(),
  diagnosedSet: new Set(),
  scanActive: false,
  activeScanComplaint: null,
  selectedComplaint: null,

  init() {
    this.reset();
    startTimer('bio-timer', 240, () => {
      if (!this.isCompleted) openModal('failed', 'TIME OUT!', 'Waktu habis. Pasien belum terdiagnosis!');
    });
  },

  reset() {
    this.mistakes = 0;
    this.organsPlaced = 0;
    this.diagnosedComplaints = 0;
    this.placedOrgans = new Set();
    this.diagnosedSet = new Set();
    this.scanActive = false;
    this.activeScanComplaint = null;
    this.selectedComplaint = null;
    this.isCompleted = false;
    this.updateUI();
  },

  updateUI() {
    // --------------------------------------------------
    // Mistake dots
    // --------------------------------------------------
    for (let i = 1; i <= 3; i++) {
      const dot = document.getElementById(`md-${i}`);
      if (dot) dot.classList.toggle('used', i <= this.mistakes);
    }
    document.getElementById('organs-placed').textContent = this.organsPlaced;
    document.getElementById('mistake-count').textContent = this.mistakes;
    document.getElementById('organs-placed2').textContent = `${this.organsPlaced}/${this.totalOrgans}`;
    document.getElementById('diag-count').textContent = `${this.diagnosedComplaints}/${this.totalComplaints}`;

    // --------------------------------------------------
    // Progress ring
    // --------------------------------------------------
    const total = this.totalOrgans + this.totalComplaints;
    const done = this.organsPlaced + this.diagnosedComplaints;
    const pct = Math.round((done / total) * 100);
    const circ = 301.6;
    document.getElementById('bioProgress').style.strokeDashoffset = circ - (pct / 100) * circ;
    document.getElementById('progressText').textContent = pct + '%';
  },

  checkWin() {
    if (this.organsPlaced >= this.totalOrgans && this.diagnosedComplaints >= this.totalComplaints) {
      this.isCompleted = true;
      stopTimer('bio-timer');
      localStorage.setItem('badge_anatomy_detective', 'true');
      setTimeout(() => openModal('success', 'DIAGNOSIS COMPLETE!', 'Semua organ terpasang dengan benar.\n3 keluhan pasien berhasil didiagnosis!', 'ANATOMY DETECTIVE BADGE'), 600);
    }
  },

  checkFail() {
    if (this.mistakes >= this.maxMistakes) {
      stopTimer('bio-timer');
      openModal('failed', 'TOO MANY ERRORS!', '3 kesalahan fatal! Penempatan organ yang salah bisa membahayakan pasien.');
    }
  }
};

// --------------------------------------------------
// Organ correct drop zone map
// --------------------------------------------------
const organDropMap = { 'heart': 'dz-heart', 'lung-l': 'dz-lung-l', 'lung-r': 'dz-lung-r', 'stomach': 'dz-stomach', 'brain': 'dz-brain' };

function dragOrgan(e) {
  dragData = { organId: e.currentTarget.dataset.organ };
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.organ);
}

function allowDrop(e) { e.preventDefault(); }

function dropOrgan(e, dzOrgan) {
  e.preventDefault();
  const droppedOrgan = dragData ? dragData.organId : e.dataTransfer.getData('text/plain');
  if (!droppedOrgan) return;

  const dzEl = document.getElementById(`dz-${dzOrgan}`);
  if (BioState.placedOrgans.has(dzOrgan)) return; // already filled

  if (droppedOrgan === dzOrgan) {
    // --------------------------------------------------
    // CORRECT!
    // --------------------------------------------------
    dzEl.classList.add('correct', 'filled');
    dzEl.classList.remove('active');
    BioState.placedOrgans.add(dzOrgan);
    BioState.organsPlaced++;
    // --------------------------------------------------
    // Mark organ as placed
    // --------------------------------------------------
    const organEl = document.getElementById(`organ-${droppedOrgan}`);
    if (organEl) organEl.classList.add('placed');
    addScanLog(`✓ ${droppedOrgan.toUpperCase()} terpasang dengan benar!`);
    showToast(`✓ ${droppedOrgan} — Posisi tepat!`, 'success');
  } else {
    // --------------------------------------------------
    // WRONG!
    // --------------------------------------------------
    BioState.mistakes++;
    dzEl.classList.add('wrong');
    setTimeout(() => dzEl.classList.remove('wrong'), 600);
    addScanLog(`✗ Salah! ${droppedOrgan} bukan di sini.`);
    showToast(`✗ Organ salah posisi! Coba lagi.`, 'error');
    BioState.checkFail();
  }

  dragData = null;
  BioState.updateUI();
  BioState.checkWin();
}

// --------------------------------------------------
// Complaint scanning
// --------------------------------------------------
function scanComplaint(complaintNum, targetOrgan) {
  if (!BioState.scanActive) {
    showToast('Aktifkan Scan Tool terlebih dahulu!', 'error'); return;
  }
  if (BioState.diagnosedSet.has(complaintNum)) return;

  BioState.selectedComplaint = { num: complaintNum, organ: targetOrgan };
  addScanLog(`>> Keluhan #${complaintNum} dipilih — Organ target: ${targetOrgan.toUpperCase()}`);
  addScanLog(`>> Menunggu konfirmasi diagnosis...`);

  // --------------------------------------------------
  // Auto-diagnose if we're scanning
  // --------------------------------------------------
  setTimeout(() => {
    if (BioState.placedOrgans.has(targetOrgan) || BioState.scanActive) {
      BioState.diagnosedSet.add(complaintNum);
      BioState.diagnosedComplaints++;
      document.getElementById(`complaint-${complaintNum}`).classList.add('diagnosed');
      document.getElementById(`cs-${complaintNum}`).textContent = '✅';
      addScanLog(`✓ DIAGNOSIS CONFIRMED — Keluhan #${complaintNum}: ${targetOrgan.toUpperCase()}`);
      showToast(`Diagnosis #${complaintNum} berhasil!`, 'success');
      BioState.updateUI();
      BioState.checkWin();
    }
  }, 800);
}

function activateScan() {
  BioState.scanActive = !BioState.scanActive;
  const btn = document.querySelector('.scan-btn');
  if (BioState.scanActive) {
    btn.textContent = '🔬 SCAN ACTIVE — Click Complaint to Diagnose';
    btn.style.borderColor = 'var(--neon-green)';
    btn.style.color = 'var(--neon-green)';
    addScanLog('>> SCAN TOOL ACTIVATED');
    addScanLog('>> Klik keluhan pasien untuk mendiagnosis');
    showToast('Scan Tool aktif! Klik keluhan untuk diagnosa.', 'success');
  } else {
    btn.textContent = '🔬 ACTIVATE SCAN TOOL';
    btn.style.borderColor = 'var(--neon-purple)';
    btn.style.color = 'var(--neon-purple)';
    addScanLog('>> Scan tool standby');
  }
}

function addScanLog(msg) {
  const log = document.getElementById('scanLog');
  const el = document.createElement('div');
  el.textContent = msg;
  if (msg.startsWith('✓')) el.style.color = 'var(--neon-green)';
  else if (msg.startsWith('✗')) el.style.color = 'var(--neon-red)';
  else el.style.color = 'var(--neon-blue)';
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}

function resetBio() {
  stopTimer('bio-timer');
  BioState.reset();
  // --------------------------------------------------
  // Reset organ items
  // --------------------------------------------------
  document.querySelectorAll('.organ-item').forEach(o => o.classList.remove('placed'));
  // --------------------------------------------------
  // Reset drop zones
  // --------------------------------------------------
  document.querySelectorAll('.drop-zone').forEach(dz => {
    dz.classList.remove('correct','filled','wrong','active');
  });
  // --------------------------------------------------
  // Reset complaints
  // --------------------------------------------------
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`complaint-${i}`).classList.remove('diagnosed');
    document.getElementById(`cs-${i}`).textContent = '🔍';
  }
  document.getElementById('complaint-1').classList.add('active-complaint');
  // --------------------------------------------------
  // Reset scan btn
  // --------------------------------------------------
  const btn = document.querySelector('.scan-btn');
  btn.textContent = '🔬 ACTIVATE SCAN TOOL';
  btn.style.borderColor = 'var(--neon-purple)';
  btn.style.color = 'var(--neon-purple)';
  document.getElementById('scanLog').innerHTML = '<div>// Scan tool standby</div>';
  BioState.init();
}

// --------------------------------------------------
// INIT
// --------------------------------------------------
initChallengePage();