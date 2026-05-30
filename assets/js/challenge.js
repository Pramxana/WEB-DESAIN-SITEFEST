// --------------------------------------------------
// TAB SYSTEM
// --------------------------------------------------
let activeTab = 'chem';
let timerIntervals = {};
const challengeInitState = { chem: false, phys: false, bio: false };
const challengeLabels = {
  chem: 'Chemistry Challenge',
  phys: 'Physics Challenge',
  bio: 'Biology Challenge'
};
const challengeModeAliases = {
  chemistry: 'chem',
  physics: 'phys',
  biology: 'bio',
  chem: 'chem',
  phys: 'phys',
  bio: 'bio'
};
const challengeURLModes = { chem: 'chemistry', phys: 'physics', bio: 'biology' };
function bxIcon(name, extraClass = '') {
  const className = extraClass ? `bx ${name} ${extraClass}` : `bx ${name}`;
  return `<i class="${className}" aria-hidden="true"></i>`;
}

function bxIconText(name, text, extraClass = '') {
  return `${bxIcon(name, extraClass)} ${text}`;
}


function activateChallengeCard(tab) {
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tab);
    button.setAttribute('aria-selected', button.dataset.tab === tab ? 'true' : 'false');
  });
}

function showChallengePanel(tab) {
  const panels = document.querySelectorAll('.lab-panel');
  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.lab === tab);
  });
}

function initChallenge(tab) {
  if (challengeInitState[tab]) return;
  if (tab === 'chem') ChemState.init();
  if (tab === 'phys') PhysState.init();
  if (tab === 'bio') BioState.init();
  challengeInitState[tab] = true;
}

function getChallengeModeFromURL() {
  const mode = new URLSearchParams(window.location.search).get('mode');
  return challengeModeAliases[mode] || 'chem';
}

function setChallengeMode(tab, updateURL = false) {
  const selectedTab = challengeModeAliases[tab] || 'chem';
  activeTab = selectedTab;
  document.body.dataset.challengeMode = challengeURLModes[selectedTab];
  activateChallengeCard(selectedTab);
  showChallengePanel(selectedTab);
  initChallenge(selectedTab);
  syncChallengeInteractions(selectedTab);

  const activeLabel = document.getElementById('activeChallengeLabel');
  if (activeLabel) activeLabel.textContent = challengeLabels[selectedTab] || 'Challenge Mode';

  if (updateURL) {
    const url = new URL(window.location.href);
    url.searchParams.set('mode', challengeURLModes[selectedTab]);
    window.history.replaceState({}, '', url);
  }
}

function switchTab(tab) {
  setChallengeMode(tab, true);
}

function initChallengePage() {
  setChallengeMode(getChallengeModeFromURL());
}
function showToast(msg, type = 'info', duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), duration);
}

// --------------------------------------------------
// BACK TO LAB REDIRECTION
// --------------------------------------------------
function backToLab() {
  if (activeTab === 'chem') {
    window.location.href = 'chemistry.html';
  } else if (activeTab === 'phys') {
    window.location.href = 'physic.html';
  } else if (activeTab === 'bio') {
    window.location.href = 'biology.html';
  } else {
    window.location.href = 'dashboard.html'; // Fallback page if the tab is not recognized
  }
}

// --------------------------------------------------
// MODAL
// --------------------------------------------------
function openModal(id, title, sub, badge = null) {
  document.getElementById(id === 'success' ? 'successTitle' : 'failedTitle').textContent = title;
  document.getElementById(id === 'success' ? 'successSub' : 'failedSub').textContent = sub;
  if (badge && id === 'success') document.getElementById('badgeAward').innerHTML = bxIconText('bx-star', badge);
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
  if (activeTab === 'chem') {
    resetChemistryChallenge();
  } else if (activeTab === 'phys') {
    resetPhysicsChallenge();
  } else {
    resetBiologyChallenge();
  }
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
function stopTimer(id) {
  if (timerIntervals[id]) {
    clearInterval(timerIntervals[id]);
    delete timerIntervals[id];
  }
}

const challengeStarted = { chem: false, phys: false, bio: false };
const challengeTimerDefaults = {
  chem: { id: 'chem-timer', text: '03:00' },
  phys: { id: 'phys-timer', text: '05:00' },
  bio: { id: 'bio-timer', text: '04:00' }
};

function isChallengeActive(tab = activeTab) {
  return challengeStarted[tab] === true;
}

function validateChallengeStarted(tab = activeTab) {
  if (isChallengeActive(tab)) return true;
  showToast('Press Start Challenge first to begin the mission.', 'error');
  return false;
}

function resetChallengeActivation(tab) {
  const timer = challengeTimerDefaults[tab];
  stopTimer(timer.id);
  challengeStarted[tab] = false;
  document.getElementById(timer.id).textContent = timer.text;
  document.getElementById(timer.id).classList.remove('danger');
  document.getElementById('successModal').classList.remove('show');
  document.getElementById('failedModal').classList.remove('show');
  document.getElementById('badgeAward').textContent = 'BADGE EARNED';
  disableChallengeInteractions(tab);
}

// --------------------------------------------------
// CHALLENGE INTERACTION STATE
// --------------------------------------------------
function setElementInteractionState(selector, enabled) {
  document.querySelectorAll(selector).forEach((element) => {
    element.classList.toggle('interaction-disabled', !enabled);
    element.setAttribute('aria-disabled', enabled ? 'false' : 'true');
  });
}

function disableChallengeInteractions(tab) {
  const panel = document.getElementById(`lab-${tab}`);
  if (panel) panel.classList.add('challenge-locked');
  if (tab === 'chem') setElementInteractionState('#lab-chem .add-btn, #lab-chem .activate-btn', false);
  if (tab === 'phys') {
    setElementInteractionState('.component-block', false);
    updateComponentAvailability();
  }
  if (tab === 'bio') setElementInteractionState('.organ-item', false);
}

function enableChallengeInteractions(tab) {
  const panel = document.getElementById(`lab-${tab}`);
  if (panel) panel.classList.remove('challenge-locked');
  if (tab === 'chem') setElementInteractionState('#lab-chem .add-btn, #lab-chem .activate-btn', true);
  if (tab === 'phys') {
    setElementInteractionState('.component-block', true);
    updateComponentAvailability();
  }
  if (tab === 'bio') setElementInteractionState('.organ-item', true);
}

function syncChallengeInteractions(tab = activeTab) {
  if (isChallengeActive(tab)) enableChallengeInteractions(tab);
  else disableChallengeInteractions(tab);
}

function startChallenge() {
  if (challengeStarted[activeTab]) return; 
  challengeStarted[activeTab] = true;
  enableChallengeInteractions(activeTab);
  
  if (activeTab === 'chem') {
    ChemState.isChallengeStarted = true;
    startTimer('chem-timer', 180, () => {
      if (!ChemState.isCompleted) openModal('failed', 'TIME OUT!', 'Time is up. The acid waste has not been neutralized.', null);
    });
    addChemLog('TARGET: pH 7.0 ± 0.5 | Minimum volume: 200 mL', 'info');
  } else if (activeTab === 'phys') {
    PhysState.isChallengeStarted = true;
    startTimer('phys-timer', 300, () => {
      if (!PhysState.isCompleted) openModal('failed', 'TIME OUT!', 'Time is up. The city is still dark.');
    });
  } else if (activeTab === 'bio') {
    BioState.isChallengeStarted = true;
    startTimer('bio-timer', 240, () => {
      if (!BioState.isCompleted) openModal('failed', 'TIME OUT!', 'Time is up. The patient has not been diagnosed.');
    });
  }
}

// --------------------------------------------------
// LAB 1: CHEMISTRY — STATE MANAGEMENT
// --------------------------------------------------
const ChemState = {
  activeMission: "ACID_WASTE_NEUTRALIZATION",
  isCompleted: false,
  isChallengeStarted: false,
  score: 0,
  volume: 50,       // mL, starts with 50mL waste
  reactedVolume: 50,
  targetVolume: 200,
  currentpH: 1.0,
  dominantCompound: "HCl",
  compoundsAdded: 1,
  reactions: 0,
  addedList: [],    // compounds that have completed mixing
  pendingCompounds: [],

  init() {
    this.reset();
    addChemLog('System initialized. Acid waste detected.', 'info');
    addChemLog('TARGET: pH 7.0 ± 0.5 | Minimum volume: 200 mL', 'info');
  },

  reset() {
    this.isCompleted = false;
    this.isChallengeStarted = false;
    this.volume = 50;
    this.reactedVolume = 50;
    this.currentpH = 1.0;
    this.dominantCompound = "HCl";
    this.compoundsAdded = 1;
    this.reactions = 0;
    this.addedList = [{name:'HCl', ph:1.0, type:'acid'}];
    this.pendingCompounds = [];
    this.updateUI({ spawnBubble: false });
  },

  updateUI({ spawnBubble = true } = {}) {
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
    if (spawnBubble) this.spawnBubbles(phColor);
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
      if (!validateChallengeStarted('chem')) {
        addChemLog('Target reached, but the mission is not active. Press Start Challenge to validate the result.', 'info');
        return false;
      }
      this.isCompleted = true;
      stopTimer('chem-timer');
      localStorage.setItem('badge_molecular_expert', 'true');
      addChemLog(bxIconText('bx-check', 'NEUTRALIZATION SUCCESSFUL! pH = ' + this.currentpH.toFixed(1)), 'success');
      setTimeout(() => openModal('success', 'MISSION COMPLETE!', `Waste neutralized successfully! pH = ${this.currentpH.toFixed(1)}\nFinal volume: ${this.volume} mL`, 'MOLECULAR EXPERT BADGE'), 600);
      return true;
    }
    return false;
  },

  checkFailCondition(newPH) {
    if (!isChallengeActive('chem')) return false;
    if (newPH < 0.3 || newPH > 13.5) {
      const beaker = document.getElementById('beakerContainer');
      beaker.classList.add('shake');
      setTimeout(() => beaker.classList.remove('shake'), 600);
      this.spawnSmoke();
      addChemLog(bxIconText('bx-error', 'DANGER! Extreme concentration — unsafe experiment!'), 'error');
      setTimeout(() => {
        openModal('failed', 'EXPERIMENT FAILED', 'The concentration is too extreme.\nThe test tube is unsafe! Reset and try another strategy.');
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
    'HCl+NaOH': { product: 'NaCl + H₂O', resultPH: 7.0, note: 'Complete neutralization!' },
    'H₂SO₄+NaOH': { product: 'Na₂SO₄ + H₂O', resultPH: 7.0, note: 'Sulfuric acid neutralization.' },
    'HCl+NH₃': { product: 'NH₄Cl', resultPH: 5.5, note: 'Ammonium salt formed.' },
    'CH₃COOH+NaOH': { product: 'CH₃COONa + H₂O', resultPH: 8.9, note: 'Acetate buffer formed.' },
  };
  const key = `${compoundA}+${compoundB}`;
  const key2 = `${compoundB}+${compoundA}`;
  return reactions[key] || reactions[key2] || null;
}

// --------------------------------------------------
// CHEMISTRY MIX QUEUE
// --------------------------------------------------
const compoundCardIds = {
  HCl: 'comp-hcl',
  'H₂SO₄': 'comp-h2so4',
  NaOH: 'comp-naoh',
  'NH₃': 'comp-nh3',
  'CH₃COOH': 'comp-ch3cooh',
  'H₂O': 'comp-h2o'
};

function renderPendingCompounds() {
  document.querySelectorAll('.compound-item').forEach((item) => item.classList.remove('selected'));
  ChemState.pendingCompounds.forEach((compound) => {
    const card = document.getElementById(compoundCardIds[compound.name]);
    if (card) card.classList.add('selected');
  });
}

function addCompoundToQueue(name, ph, type) {
  if (!validateChallengeStarted('chem')) return;
  if (ChemState.isCompleted) return;
  const addVol = 25;
  ChemState.pendingCompounds.push({ name, ph, type, volume: addVol });
  ChemState.volume += addVol;
  ChemState.compoundsAdded++;
  ChemState.dominantCompound = `PENDING: ${name}`;
  addChemLog(`+ ${name} added to queue (${addVol}mL). pH remains ${ChemState.currentpH.toFixed(1)} until MIX & REACT.`, 'info');
  renderPendingCompounds();
  ChemState.updateUI({ spawnBubble: false });
}

function calculatePendingPHChange() {
  let nextPH = ChemState.currentpH;
  let mixedVolume = ChemState.reactedVolume;
  let previousCompound = ChemState.addedList[ChemState.addedList.length - 1];
  const detectedReactions = [];

  ChemState.pendingCompounds.forEach((compound) => {
    const nextVolume = mixedVolume + compound.volume;
    nextPH = (nextPH * mixedVolume + compound.ph * compound.volume) / nextVolume;
    const reaction = previousCompound ? mixCompounds(previousCompound.name, compound.name) : null;

    if (reaction) {
      detectedReactions.push({ previousCompound, compound, reaction });
      nextPH = (nextPH + reaction.resultPH) / 2;
    }

    mixedVolume = nextVolume;
    previousCompound = compound;
  });

  return {
    currentpH: Math.max(0, Math.min(14, parseFloat(nextPH.toFixed(1)))),
    mixedVolume,
    detectedReactions
  };
}

function validateChallengeProgress() {
  if (!ChemState.checkWinCondition() && ChemState.volume >= ChemState.targetVolume) {
    addChemLog(`Volume ${ChemState.volume}mL reached. pH is still ${ChemState.currentpH.toFixed(1)} — further adjustment required.`, 'info');
  }
}

function mixAndReact() {
  if (!validateChallengeStarted('chem')) return;
  if (ChemState.pendingCompounds.length === 0) {
    showToast('Add at least one compound first.', 'error');
    return;
  }

  const queuedCompounds = [...ChemState.pendingCompounds];
  const result = calculatePendingPHChange();
  addChemLog(bxIconText('bx-bolt-circle', 'MIXING ACTIVATED — Calculating reaction...'), 'info');

  // --------------------------------------------------
  // Simulate mixing effect
  // --------------------------------------------------
  const beaker = document.getElementById('beakerContainer');
  beaker.classList.remove('shake');
  void beaker.offsetWidth;
  beaker.classList.add('shake');
  setTimeout(() => beaker.classList.remove('shake'), 600);

  result.detectedReactions.forEach(({ previousCompound, compound, reaction }) => {
    addChemLog(`${bxIcon('bx-test-tube')} REACTION: ${previousCompound.name} + ${compound.name} → ${reaction.product} | ${reaction.note}`, 'success');
  });

  ChemState.pendingCompounds = [];
  ChemState.addedList.push(...queuedCompounds);
  ChemState.reactedVolume = result.mixedVolume;
  ChemState.currentpH = result.currentpH;
  ChemState.reactions += result.detectedReactions.length || 1;
  ChemState.dominantCompound = queuedCompounds[queuedCompounds.length - 1].name;
  renderPendingCompounds();
  ChemState.updateUI();

  if (ChemState.checkFailCondition(ChemState.currentpH)) return;
  validateChallengeProgress();
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

function resetChemistryChallenge() {
  resetChallengeActivation('chem');
  document.querySelectorAll('.bubble, .smoke-particle').forEach((particle) => particle.remove());
  document.getElementById('reactionLog').innerHTML = '';
  ChemState.init();
  renderPendingCompounds();
}

// --------------------------------------------------
// LAB 2: PHYSICS — STATE MANAGEMENT
// --------------------------------------------------
const PhysState = {
  isCompleted: false,
  isChallengeStarted: false,
  circuitOn: false,
  voltage: 9,
  components: {}, // cellId -> {type, resistance, voltage, icon}
  usedComponents: new Set(),

  init() {
    this.buildGrid();
    this.drawOscWave(false);
    updateComponentAvailability();
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
    if (!validateChallengeStarted('phys')) return;
    const calc = this.calcOhm();
    this.updateOhmDisplay(calc);

    if (!calc.hasBattery || !calc.hasLamp) {
      showToast('Incomplete circuit! Add at least a Battery and Lamp.', 'error'); return;
    }

    if (calc.R === 0) {
      // --------------------------------------------------
      // Short circuit!
      // --------------------------------------------------
      document.getElementById('lampIcon').innerHTML = bxIcon('bx-error');
      document.getElementById('lampIcon').className = 'lamp-icon';
      document.getElementById('lampStatus').textContent = 'SHORT CIRCUIT!';
      document.getElementById('lampStatus').style.color = 'var(--neon-red)';
      document.getElementById('oscStatus').innerHTML = `// ${bxIcon('bx-error')} SHORT CIRCUIT DETECTED — R = 0Ω`;
      document.getElementById('oscStatus').style.color = 'var(--neon-red)';
      this.drawOscWave('overload');
      openModal('failed', 'SHORT CIRCUIT!', 'Resistance = 0Ω! Infinite current will damage the circuit.\nAdd a resistor to limit the current.');
      return;
    }

    if (!isFinite(calc.I) || calc.I > 4.0) {
      document.getElementById('lampIcon').innerHTML = bxIcon('bx-error');
      document.getElementById('lampStatus').textContent = 'OVERLOAD — BURNT OUT!';
      document.getElementById('lampStatus').style.color = 'var(--neon-red)';
      document.getElementById('lampIcon').classList.add('overload');
      this.drawOscWave('overload');
      openModal('failed', 'LAMP OVERLOADED!', `Current ${calc.I.toFixed(2)}A exceeds the tolerance!\nAdd more resistors.`);
      return;
    }

    if (calc.I >= 1.5 && calc.I <= 2.0) {
      // --------------------------------------------------
      // WIN!
      // --------------------------------------------------
      this.isCompleted = true;
      stopTimer('phys-timer');
      document.getElementById('lampIcon').innerHTML = bxIcon('bx-bulb');
      document.getElementById('lampIcon').className = 'lamp-icon on';
      document.getElementById('lampStatus').innerHTML = `PERFECT! I = ${calc.I.toFixed(2)}A ${bxIcon('bx-check')}`;
      document.getElementById('lampStatus').style.color = 'var(--neon-green)';
      this.drawOscWave('normal', calc.I);
      document.getElementById('oscStatus').innerHTML = `// ${bxIcon('bx-check')} STABLE — I = ${calc.I.toFixed(2)}A — WITHIN TOLERANCE`;
      document.getElementById('oscStatus').style.color = 'var(--neon-green)';
      localStorage.setItem('badge_circuit_master', 'true');
      setTimeout(() => openModal('success', 'POWER RESTORED!', `Current ${calc.I.toFixed(2)}A is within tolerance.\nLamp is on — The city is powered again!`, 'CIRCUIT MASTER BADGE'), 600);
    } else {
      // --------------------------------------------------
      // Not optimal
      // --------------------------------------------------
      document.getElementById('lampIcon').innerHTML = bxIcon('bx-bulb');
      document.getElementById('lampIcon').className = 'lamp-icon';
      document.getElementById('lampStatus').textContent = `I = ${calc.I.toFixed(2)}A — OUTSIDE TOLERANCE`;
      document.getElementById('lampStatus').style.color = 'var(--neon-yellow)';
      this.drawOscWave('weak', calc.I);
      document.getElementById('oscStatus').innerHTML = `// ${bxIcon('bx-error')} I = ${calc.I.toFixed(2)}A — Target: 1.5–2.0A`;
      document.getElementById('oscStatus').style.color = 'var(--neon-yellow)';
      showToast(`Current ${calc.I.toFixed(2)}A — Adjust resistance until the current is between 1.5–2.0A!`, 'error');
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

// --------------------------------------------------
// Physics component availability
// --------------------------------------------------
function isComponentUsed(componentId) {
  return PhysState.usedComponents.has(componentId);
}

function resetComponentVisualState(component) {
  component.classList.remove('is-used', 'component-disabled', 'disabled');
  component.removeAttribute('disabled');
  component.style.removeProperty('opacity');
  component.style.removeProperty('filter');
  component.setAttribute('draggable', 'true');
}

function updateComponentAvailability() {
  document.querySelectorAll('.component-block').forEach((component) => {
    const componentId = component.dataset.componentId;
    const isUsed = isComponentUsed(componentId);
    const isDisabled = !isChallengeActive('phys') || isUsed;
    if (isUsed) {
      component.classList.add('is-used', 'component-disabled');
      component.setAttribute('draggable', 'false');
    } else {
      resetComponentVisualState(component);
    }
    component.setAttribute('aria-disabled', isDisabled ? 'true' : 'false');
  });
}

function markComponentAsUsed(componentId) {
  PhysState.usedComponents.add(componentId);
  updateComponentAvailability();
}

function markComponentAsAvailable(componentId) {
  PhysState.usedComponents.delete(componentId);
  updateComponentAvailability();
}

function dragComponent(e) {
  if (!validateChallengeStarted('phys')) {
    e.preventDefault();
    dragData = null;
    return;
  }
  const componentId = e.currentTarget.dataset.componentId;
  if (isComponentUsed(componentId)) {
    e.preventDefault();
    dragData = null;
    showToast('This component is already placed in the circuit. Remove it from the grid to use it again.', 'error');
    return;
  }
  dragData = { componentId, type: e.currentTarget.dataset.type, resistance: parseFloat(e.currentTarget.dataset.resistance||0), voltage: parseFloat(e.currentTarget.dataset.voltage||0) };
  const component = e.currentTarget;
  component.style.opacity = '0.5';
  setTimeout(() => component.style.removeProperty('opacity'), 100);
}

function dropComponent(e, cellIdx) {
  e.preventDefault();
  if (!validateChallengeStarted('phys')) {
    dragData = null;
    return;
  }
  if (!dragData) return;
  const cell = document.getElementById(`cell-${cellIdx}`);
  if (cell.classList.contains('has-component')) {
    showToast('This circuit slot is already occupied. Remove the existing component first.', 'error');
    dragData = null;
    return;
  }
  if (isComponentUsed(dragData.componentId)) {
    showToast('This component is already placed in the circuit. Remove it from the grid to use it again.', 'error');
    dragData = null;
    return;
  }

  const icons = { battery:'bx-battery', resistor:'bx-square', lamp:'bx-bulb', switch:'bx-power-off' };
  const labels = { battery:`${dragData.voltage}V`, resistor:`${dragData.resistance}Ω`, lamp:'LED', switch:'SW' };

  cell.innerHTML = `<i class="bx ${icons[dragData.type]} circuit-cell-icon" aria-hidden="true"></i>
    <span class="cell-label">${labels[dragData.type]}</span>
    <button class="remove-cell" onclick="removeCell(${cellIdx})"><i class="bx bx-x" aria-hidden="true"></i></button>`;
  cell.classList.add('has-component');

  PhysState.components[cellIdx] = { ...dragData };
  markComponentAsUsed(dragData.componentId);
  PhysState.updateOhmDisplay(PhysState.calcOhm());
  dragData = null;

  // --------------------------------------------------
  // Draw wires
  // --------------------------------------------------
  drawWires();
}

function removeCell(idx) {
  const cell = document.getElementById(`cell-${idx}`);
  const component = PhysState.components[idx];
  if (!component) return;
  cell.innerHTML = '';
  cell.classList.remove('has-component');
  delete PhysState.components[idx];
  markComponentAsAvailable(component.componentId);
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
  if (!validateChallengeStarted('phys')) return;
  const btn = document.getElementById('circuitSwitch');
  PhysState.circuitOn = !PhysState.circuitOn;
  if (PhysState.circuitOn) {
    btn.innerHTML = bxIconText('bx-plug', 'DEACTIVATE CIRCUIT');
    btn.classList.add('on');
    PhysState.checkCircuit();
  } else {
    btn.innerHTML = bxIconText('bx-bolt-circle', 'ACTIVATE CIRCUIT');
    btn.classList.remove('on');
    document.getElementById('lampIcon').innerHTML = bxIcon('bx-bulb');
    document.getElementById('lampIcon').className = 'lamp-icon';
    document.getElementById('lampStatus').textContent = 'CIRCUIT INACTIVE';
    document.getElementById('lampStatus').style.color = 'var(--text-dim)';
    PhysState.drawOscWave(false);
    document.getElementById('oscStatus').textContent = '// STANDBY — Activate circuit to see waveform';
    document.getElementById('oscStatus').style.color = '#006020';
  }
}

function resetPhysicsChallenge() {
  resetChallengeActivation('phys');
  PhysState.isCompleted = false;
  PhysState.isChallengeStarted = false;
  PhysState.circuitOn = false;
  PhysState.components = {};
  PhysState.usedComponents = new Set();
  PhysState.buildGrid();
  PhysState.updateOhmDisplay({ V: 9, R: 0, I: 0, hasBattery: false, hasLamp: false });
  document.getElementById('lampIcon').innerHTML = bxIcon('bx-bulb');
  document.getElementById('lampIcon').className = 'lamp-icon';
  document.getElementById('lampStatus').textContent = 'CIRCUIT INACTIVE';
  document.getElementById('lampStatus').style.color = 'var(--text-dim)';
  PhysState.drawOscWave(false);
  document.getElementById('oscStatus').textContent = '// STANDBY — Activate circuit to see waveform';
  document.getElementById('oscStatus').style.color = '#006020';
  document.getElementById('circuitSwitch').innerHTML = bxIconText('bx-bolt-circle', 'ACTIVATE CIRCUIT');
  document.getElementById('circuitSwitch').classList.remove('on');
  document.getElementById('volt-val').textContent = '9';
  document.getElementById('resist-val').textContent = '—';
  document.getElementById('current-val').textContent = '—';
  document.getElementById('ohm-equation').textContent = '9V = ? × ?Ω';
  PhysState.init();
}

// --------------------------------------------------
// LAB 3: BIOLOGY — STATE MANAGEMENT
// --------------------------------------------------
const BioState = {
  isCompleted: false,
  isChallengeStarted: false,
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
    initBiologyDragDrop();
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
    this.isChallengeStarted = false;
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
      if (!validateChallengeStarted('bio')) return false;
      this.isCompleted = true;
      stopTimer('bio-timer');
      localStorage.setItem('badge_anatomy_detective', 'true');
      setTimeout(() => openModal('success', 'DIAGNOSIS COMPLETE!', 'All organs were placed correctly.\n3 patient complaints were diagnosed successfully!', 'ANATOMY DETECTIVE BADGE'), 600);
    }
  },

  checkFail() {
    if (this.mistakes >= this.maxMistakes) {
      if (!validateChallengeStarted('bio')) return false;
      stopTimer('bio-timer');
      openModal('failed', 'TOO MANY ERRORS!', '3 critical mistakes! Incorrect organ placement could endanger the patient.');
    }
  }
};

// --------------------------------------------------
// Organ correct drop zone map
// --------------------------------------------------
const organDropMap = { 'heart': 'dz-heart', 'lung-l': 'dz-lung-l', 'lung-r': 'dz-lung-r', 'stomach': 'dz-stomach', 'brain': 'dz-brain' };

function dragOrgan(e) {
  if (!validateChallengeStarted('bio')) {
    e.preventDefault();
    dragData = null;
    return;
  }
  dragData = { organId: e.currentTarget.dataset.organ };
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.organ);
  e.currentTarget.classList.add('dragging');
  highlightOrganDropZones(e.currentTarget.dataset.organ);
}

function clearOrganDropFeedback() {
  document.querySelectorAll('.drop-zone').forEach((zone) => {
    zone.classList.remove('drop-ready', 'drop-match', 'drag-over');
  });
}

function highlightOrganDropZones(organId) {
  clearOrganDropFeedback();
  document.querySelectorAll('.drop-zone:not(.filled)').forEach((zone) => {
    zone.classList.add('drop-ready');
    zone.classList.toggle('drop-match', zone.id === organDropMap[organId]);
  });
}

function endOrganDrag() {
  document.querySelectorAll('.organ-item.dragging').forEach((organ) => organ.classList.remove('dragging'));
  clearOrganDropFeedback();
  dragData = null;
}

function allowDrop(e) {
  e.preventDefault();
  const zone = e.target.closest ? e.target.closest('.drop-zone') : null;
  document.querySelectorAll('.drop-zone.drag-over').forEach((item) => item.classList.remove('drag-over'));
  if (zone && !zone.classList.contains('filled')) zone.classList.add('drag-over');
}

function handleOrganDrop(droppedOrgan, dzOrgan) {
  if (!validateChallengeStarted('bio')) {
    endOrganDrag();
    return;
  }
  const dzEl = document.getElementById(`dz-${dzOrgan}`);
  if (!droppedOrgan || !dzEl || BioState.placedOrgans.has(dzOrgan)) {
    endOrganDrag();
    return;
  }

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
    addScanLog(`${bxIcon('bx-check')} ${droppedOrgan.toUpperCase()} placed correctly!`, 'success');
    showToast(`${droppedOrgan} placed correctly!`, 'success');
  } else {
    // --------------------------------------------------
    // WRONG!
    // --------------------------------------------------
    BioState.mistakes++;
    dzEl.classList.add('wrong');
    setTimeout(() => dzEl.classList.remove('wrong'), 600);
    addScanLog(`${bxIcon('bx-x')} Incorrect! ${droppedOrgan} does not belong here.`, 'error');
    showToast('Incorrect organ placement. Try again.', 'error');
    BioState.checkFail();
  }

  endOrganDrag();
  BioState.updateUI();
  BioState.checkWin();
}

function dropOrgan(e, dzOrgan) {
  e.preventDefault();
  e.stopPropagation();
  const droppedOrgan = dragData ? dragData.organId : e.dataTransfer.getData('text/plain');
  handleOrganDrop(droppedOrgan, dzOrgan);
}

function dropOrganNearZone(e) {
  e.preventDefault();
  const droppedOrgan = dragData ? dragData.organId : e.dataTransfer.getData('text/plain');
  if (!droppedOrgan) return;

  const availableZones = [...document.querySelectorAll('.drop-zone:not(.filled)')];
  const nearestZone = availableZones
    .map((zone) => {
      const rect = zone.getBoundingClientRect();
      const distance = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
      return { zone, distance, tolerance: Math.max(92, Math.max(rect.width, rect.height) * 1.35) };
    })
    .sort((a, b) => a.distance - b.distance)[0];

  if (nearestZone && nearestZone.distance <= nearestZone.tolerance) {
    handleOrganDrop(droppedOrgan, nearestZone.zone.id.replace('dz-', ''));
    return;
  }

  showToast('Move the organ closer to the highlighted target area.', 'error');
  endOrganDrag();
}

function initBiologyDragDrop() {
  document.querySelectorAll('.drop-zone').forEach((zone) => {
    if (zone.dataset.dragReady === 'true') return;
    zone.dataset.dragReady = 'true';
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  });
}

// --------------------------------------------------
// Complaint scanning
// --------------------------------------------------
function scanComplaint(complaintNum, targetOrgan) {
  if (!validateChallengeStarted('bio')) return;
  if (!BioState.scanActive) {
    showToast('Activate the scan tool first to perform a diagnosis.', 'error'); return;
  }
  if (BioState.diagnosedSet.has(complaintNum)) return;

  BioState.selectedComplaint = { num: complaintNum, organ: targetOrgan };
  addScanLog(`>> Complaint #${complaintNum} selected — Target organ: ${targetOrgan.toUpperCase()}`);
  addScanLog(`>> Waiting for diagnosis confirmation...`);

  // --------------------------------------------------
  // Validate the selected diagnosis after the scan animation
  // --------------------------------------------------
  setTimeout(() => validateDiagnosis(complaintNum, targetOrgan), 800);
}

function validateDiagnosis(complaintNum, targetOrgan) {
  if (!validateChallengeStarted('bio')) return;
  if (!BioState.scanActive) {
    showToast('Activate the scan tool first to perform a diagnosis.', 'error');
    return;
  }
  if (BioState.diagnosedSet.has(complaintNum)) return;

  if (!BioState.placedOrgans.has(targetOrgan)) {
    BioState.mistakes++;
    addScanLog(`${bxIcon('bx-x')} DIAGNOSIS FAILED — Place ${targetOrgan.toUpperCase()} correctly first.`, 'error');
    showToast('Place the target organ correctly before confirming a diagnosis.', 'error');
    BioState.updateUI();
    BioState.checkFail();
    return;
  }

  BioState.diagnosedSet.add(complaintNum);
  BioState.diagnosedComplaints++;
  document.getElementById(`complaint-${complaintNum}`).classList.add('diagnosed');
  document.getElementById(`cs-${complaintNum}`).innerHTML = bxIcon('bx-check');
  addScanLog(`${bxIcon('bx-check')} DIAGNOSIS CONFIRMED — Complaint #${complaintNum}: ${targetOrgan.toUpperCase()}`, 'success');
  showToast(`Diagnosis #${complaintNum} confirmed.`, 'success');
  BioState.updateUI();
  BioState.checkWin();
}

function activateScanTool() {
  if (!validateChallengeStarted('bio')) return;
  BioState.scanActive = !BioState.scanActive;
  const btn = document.querySelector('.scan-btn');
  if (BioState.scanActive) {
    btn.innerHTML = bxIconText('bx-scan', 'SCAN ACTIVE — Click Complaint to Diagnose');
    btn.style.borderColor = 'var(--neon-green)';
    btn.style.color = 'var(--neon-green)';
    addScanLog('>> SCAN TOOL ACTIVATED');
    addScanLog('>> Select a patient complaint to diagnose');
    showToast('Scan tool active. Select a complaint to diagnose.', 'success');
  } else {
    btn.innerHTML = bxIconText('bx-scan', 'ACTIVATE SCAN TOOL');
    btn.style.borderColor = 'var(--neon-purple)';
    btn.style.color = 'var(--neon-purple)';
    addScanLog('>> Scan tool standby');
  }
}

function addScanLog(msg, type = 'info') {
  const log = document.getElementById('scanLog');
  const el = document.createElement('div');
  el.innerHTML = msg;
  if (type === 'success') el.style.color = 'var(--neon-green)';
  else if (type === 'error') el.style.color = 'var(--neon-red)';
  else el.style.color = 'var(--neon-blue)';
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}

function resetBiologyChallenge() {
  resetChallengeActivation('bio');
  BioState.reset();
  // --------------------------------------------------
  // Reset organ items
  // --------------------------------------------------
  document.querySelectorAll('.organ-item').forEach(o => o.classList.remove('placed'));
  // --------------------------------------------------
  // Reset drop zones
  // --------------------------------------------------
  document.querySelectorAll('.drop-zone').forEach(dz => {
    dz.classList.remove('correct','filled','wrong','active','drop-ready','drop-match','drag-over');
  });
  // --------------------------------------------------
  // Reset complaints
  // --------------------------------------------------
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`complaint-${i}`).classList.remove('diagnosed');
    document.getElementById(`cs-${i}`).innerHTML = bxIcon('bx-search');
  }
  document.getElementById('complaint-1').classList.add('active-complaint');
  // --------------------------------------------------
  // Reset scan btn
  // --------------------------------------------------
  const btn = document.querySelector('.scan-btn');
  btn.innerHTML = bxIconText('bx-scan', 'ACTIVATE SCAN TOOL');
  btn.style.borderColor = 'var(--neon-purple)';
  btn.style.color = 'var(--neon-purple)';
  document.getElementById('scanLog').innerHTML = '<div>// Scan tool standby</div>';
  BioState.init();
}

// --------------------------------------------------
// INIT
// --------------------------------------------------
initChallengePage();
