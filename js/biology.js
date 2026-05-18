// ============================================================
//  biology.js — biology.html logic
// ============================================================

const ORGAN_DATA = {
  "organ-brain": {
    name: "Brain", latin: "Encephalon", system: "Nervous",
    weight: "~1.4 kg", bloodFlow: "15% cardiac output", cells: "~86 billion neurons",
    desc: "Central organ of the nervous system. Integrates sensory input, motor control, cognition, memory, and autonomic regulation via the hypothalamus and brainstem.",
    functions: ["Conscious thought", "Motor coordination", "Hormone regulation", "Memory consolidation"],
    related: ["Spinal cord", "Hypothalamus", "Pituitary gland"],
    vitals: { hr: [58, 72], temp: [36.8, 37.2], o2: [96, 99], rr: [12, 16] },
  },
  "organ-lungs-l": {
    name: "Left Lung", latin: "Pulmo sinister", system: "Respiratory",
    weight: "~400 g", bloodFlow: "Pulmonary circulation", cells: "~300M alveoli (both lungs)",
    desc: "Two-lobed lung with cardiac notch. Alveoli provide ~70 m² surface area for O₂/CO₂ exchange via simple diffusion.",
    functions: ["Gas exchange", "Acid-base balance", "Filter small clots", "Voice resonance"],
    related: ["Trachea", "Diaphragm", "Right lung"],
    vitals: { hr: [70, 85], temp: [36.5, 37.0], o2: [94, 98], rr: [14, 20] },
  },
  "organ-lungs-r": {
    name: "Right Lung", latin: "Pulmo dexter", system: "Respiratory",
    weight: "~450 g", bloodFlow: "Pulmonary circulation", cells: "Three lobes · Bronchial tree",
    desc: "Three-lobed lung receiving air from the right main bronchus. Ventilation-perfusion matching optimizes gas exchange.",
    functions: ["Oxygenation", "CO₂ elimination", "Surfactant production", "Immune defense"],
    related: ["Trachea", "Left lung", "Heart"],
    vitals: { hr: [70, 85], temp: [36.5, 37.0], o2: [94, 98], rr: [14, 20] },
  },
  "organ-trachea": {
    name: "Trachea", latin: "Trachea", system: "Respiratory",
    weight: "~35 g", bloodFlow: "Bronchial arteries", cells: "Ciliated pseudostratified epithelium",
    desc: "Cartilaginous tube (~10–12 cm) conducting air to bronchi. Mucociliary escalator traps pathogens and particulates.",
    functions: ["Air conduction", "Mucociliary clearance", "Cough reflex"],
    related: ["Larynx", "Bronchi", "Lungs"],
    vitals: { hr: [72, 88], temp: [36.4, 36.9], o2: [95, 99], rr: [16, 22] },
  },
  "organ-heart": {
    name: "Heart", latin: "Cor", system: "Circulatory",
    weight: "~300 g", bloodFlow: "Coronary arteries", cells: "~2 billion cardiomyocytes",
    desc: "Four-chambered pump completing ~100,000 beats/day. SA node initiates impulses; valves ensure unidirectional flow.",
    functions: ["Systemic circulation", "Pulmonary circulation", "Coronary perfusion", "Endocrine (ANP)"],
    related: ["Aorta", "Vena cava", "Lungs"],
    vitals: { hr: [60, 100], temp: [36.6, 37.1], o2: [97, 100], rr: [12, 18] },
    pulse: true,
  },
  "organ-liver": {
    name: "Liver", latin: "Hepar", system: "Digestive · Metabolic",
    weight: "~1.5 kg", bloodFlow: "~1.4 L/min", cells: "~240 billion hepatocytes",
    desc: "Largest internal organ with ~500 functions: bile synthesis, glycogen storage, detoxification, and plasma protein production.",
    functions: ["Bile production", "Detoxification", "Glycogenesis", "Clotting factors"],
    related: ["Gallbladder", "Portal vein", "Stomach"],
    vitals: { hr: [68, 80], temp: [36.7, 37.3], o2: [96, 99], rr: [12, 16] },
  },
  "organ-gallbladder": {
    name: "Gallbladder", latin: "Vesica biliaris", system: "Digestive",
    weight: "~50 g", bloodFlow: "Cystic artery", cells: "Simple columnar epithelium",
    desc: "Reservoir concentrating bile (~50 mL); contracts via cholecystokinin during fat digestion.",
    functions: ["Bile storage", "Bile concentration", "Fat emulsification"],
    related: ["Liver", "Duodenum", "Bile duct"],
    vitals: { hr: [70, 82], temp: [36.5, 37.0], o2: [97, 99], rr: [12, 16] },
  },
  "organ-stomach": {
    name: "Stomach", latin: "Gaster", system: "Digestive",
    weight: "~150 g", bloodFlow: "Celiac trunk", cells: "Parietal · Chief · G cells",
    desc: "J-shaped organ secreting HCl (pH 1.5–3.5) and pepsinogen. Churning reduces food to chyme over 2–4 hours.",
    functions: ["Protein digestion", "Acid sterilization", "Intrinsic factor", "Chyme formation"],
    related: ["Esophagus", "Duodenum", "Pancreas"],
    vitals: { hr: [72, 86], temp: [36.8, 37.4], o2: [96, 98], rr: [14, 18] },
  },
  "organ-pancreas": {
    name: "Pancreas", latin: "Pancreas", system: "Digestive · Endocrine",
    weight: "~80 g", bloodFlow: "Splenic artery", cells: "Islets of Langerhans",
    desc: "Exocrine (enzymes) and endocrine (insulin, glucagon) gland regulating blood glucose homeostasis.",
    functions: ["Insulin secretion", "Enzyme production", "Bicarbonate secretion", "Glucagon release"],
    related: ["Duodenum", "Liver", "Spleen"],
    vitals: { hr: [70, 84], temp: [36.6, 37.1], o2: [97, 99], rr: [12, 16] },
  },
  "organ-spleen": {
    name: "Spleen", latin: "Splen", system: "Lymphatic · Immune",
    weight: "~150 g", bloodFlow: "Splenic artery", cells: "Lymphocytes · Macrophages",
    desc: "Largest lymphoid organ filtering blood, recycling erythrocytes, and mounting immune responses.",
    functions: ["Blood filtration", "Platelet reservoir", "Antibody production", "Hematopoiesis"],
    related: ["Pancreas", "Stomach", "Portal circulation"],
    vitals: { hr: [74, 88], temp: [36.7, 37.2], o2: [96, 98], rr: [13, 17] },
  },
  "organ-small-intestine": {
    name: "Small Intestine", latin: "Intestinum tenue", system: "Digestive",
    weight: "~1.8 kg", bloodFlow: "Mesenteric artery", cells: "Villi · ~200 m² surface",
    desc: "~6 m organ where 90% of nutrient absorption occurs via villi and brush border enzymes.",
    functions: ["Nutrient absorption", "Enzyme completion", "Immune surveillance", "Water reabsorption"],
    related: ["Stomach", "Large intestine", "Pancreas"],
    vitals: { hr: [72, 84], temp: [36.9, 37.5], o2: [95, 98], rr: [14, 18] },
  },
  "organ-large-intestine": {
    name: "Large Intestine", latin: "Intestinum crassum", system: "Digestive",
    weight: "~0.7 kg", bloodFlow: "Mesenteric arteries", cells: "Gut microbiome (~38T)",
    desc: "Colon reabsorbs water/electrolytes and harbors microbiota producing vitamins K and B₁₂.",
    functions: ["Water absorption", "Electrolyte balance", "Microbiome habitat", "Defecation"],
    related: ["Small intestine", "Rectum", "Appendix"],
    vitals: { hr: [70, 82], temp: [36.8, 37.3], o2: [96, 98], rr: [12, 16] },
  },
  "organ-kidney-l": {
    name: "Left Kidney", latin: "Ren sinister", system: "Urinary · Excretory",
    weight: "~150 g", bloodFlow: "~1.2 L/min (both)", cells: "~1M nephrons each",
    desc: "Filters ~180 L blood/day; nephrons regulate fluid, electrolytes, pH, and BP via renin-angiotensin.",
    functions: ["Filtration", "Urine formation", "BP regulation", "Erythropoietin"],
    related: ["Adrenal gland", "Ureter", "Bladder"],
    vitals: { hr: [68, 78], temp: [36.5, 37.0], o2: [97, 99], rr: [12, 15] },
  },
  "organ-kidney-r": {
    name: "Right Kidney", latin: "Ren dexter", system: "Urinary · Excretory",
    weight: "~145 g", bloodFlow: "~1.2 L/min (both)", cells: "~1M nephrons each",
    desc: "Slightly lower due to liver displacement. Excretes nitrogenous waste (urea, creatinine).",
    functions: ["Waste excretion", "Acid-base balance", "Vitamin D activation", "Water homeostasis"],
    related: ["Ureter", "Left kidney", "Bladder"],
    vitals: { hr: [68, 78], temp: [36.5, 37.0], o2: [97, 99], rr: [12, 15] },
  },
  "organ-bladder": {
    name: "Urinary Bladder", latin: "Vesica urinaria", system: "Urinary",
    weight: "~50 g", bloodFlow: "Internal iliac", cells: "Transitional epithelium",
    desc: "Muscular reservoir (400–600 mL). Detrusor contracts during micturition with sphincter coordination.",
    functions: ["Urine storage", "Micturition reflex", "Anti-reflux barrier"],
    related: ["Ureters", "Urethra", "Kidneys"],
    vitals: { hr: [70, 80], temp: [36.5, 36.9], o2: [97, 99], rr: [12, 14] },
  },
};

let activeOrganId = null;

document.addEventListener("DOMContentLoaded", () => {
  const organGroups = document.querySelectorAll(".organ-group");
  const organs = document.querySelectorAll(".organ.clickable");
  const obsLog = document.getElementById("obsLog");
  const organInfo = document.getElementById("organInfo");
  const bodyContainer = document.getElementById("bodyContainer");
  const opacitySlider = document.getElementById("opacitySlider");
  const rotateSlider = document.getElementById("rotateSlider");
  const zoomSlider = document.getElementById("zoomSlider");
  const resetBtn = document.getElementById("resetBtn");
  const tooltip = document.getElementById("organTooltip");
  const organIndex = document.getElementById("organIndex");

  buildOrganIndex();

  organGroups.forEach((group) => {
    const organ = group.querySelector(".organ.clickable");
    if (!organ) return;
    const organId = organ.id;

    group.addEventListener("mouseenter", (e) => {
      const data = ORGAN_DATA[organId];
      if (!data) return;
      const sys = data.system.split("·")[0].trim();
      tooltip.innerHTML =
        `<span class="organ-tooltip-tag">[${sys}]</span> ${data.name}` +
        `<span class="organ-tooltip-latin">${data.latin}</span>`;
      tooltip.classList.add("visible");
      updateTooltipPos(e);
    });
    group.addEventListener("mousemove", (e) => updateTooltipPos(e));
    group.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
    group.addEventListener("click", () => selectOrgan(organId));
  });

  function selectOrgan(organId) {
    activeOrganId = organId;
    organs.forEach((o) => o.classList.remove("selected"));
    document.querySelectorAll(".organ-index-item").forEach((el) => el.classList.remove("active"));

    document.getElementById(organId)?.classList.add("selected");
    document.querySelector(`[data-organ-id="${organId}"]`)?.classList.add("active");

    const data = ORGAN_DATA[organId];
    if (!data) return;

    renderOrganInfo(data);
    applyOrganVitals(data);
    toggleHeartPulse(!!data.pulse);
    addLog(`Analysis: ${data.name} (${data.latin}) — ${data.system}`);
  }

  function renderOrganInfo(data) {
    const funcTags = data.functions.map((f) => `<span class="bio-tag">${f}</span>`).join("");
    const relatedTags = data.related.map((r) => `<span class="bio-tag bio-tag-dim">${r}</span>`).join("");

    organInfo.innerHTML = `
      <div class="organ-title">${data.name}</div>
      <div class="organ-latin">${data.latin}</div>
      <div class="organ-system-badge">SYSTEM · ${data.system.toUpperCase()}</div>
      <div class="organ-desc">${data.desc}</div>
      <div class="bio-metrics">
        <div class="bio-metric"><span class="bio-metric-lbl">Mass</span><span class="bio-metric-val">${data.weight}</span></div>
        <div class="bio-metric"><span class="bio-metric-lbl">Perfusion</span><span class="bio-metric-val">${data.bloodFlow}</span></div>
        <div class="bio-metric"><span class="bio-metric-lbl">Histology</span><span class="bio-metric-val">${data.cells}</span></div>
      </div>
      <div class="bio-section-lbl">Primary Functions</div>
      <div class="bio-tags">${funcTags}</div>
      <div class="bio-section-lbl">Connected Structures</div>
      <div class="bio-tags">${relatedTags}</div>
    `;
  }

  function buildOrganIndex() {
    if (!organIndex) return;
    organIndex.innerHTML = Object.entries(ORGAN_DATA)
      .map(([id, d]) => {
        const short = d.system.split("·")[0].trim();
        return `<button type="button" class="organ-index-item" data-organ-id="${id}">
          <span class="organ-index-dot sys-${short.toLowerCase().replace(/\s+/g, "-")}"></span>
          <span class="organ-index-name">${d.name}</span>
          <span class="organ-index-sys">${short}</span>
        </button>`;
      })
      .join("");

    organIndex.querySelectorAll(".organ-index-item").forEach((btn) => {
      btn.addEventListener("click", () => selectOrgan(btn.dataset.organId));
    });
  }

  function updateTooltipPos(e) {
    tooltip.style.left = `${e.clientX + 15}px`;
    tooltip.style.top = `${e.clientY + 15}px`;
  }

  window.updateOpacity = () => {
    const outline = document.querySelector(".body-outline");
    const muscle = document.getElementById("system-muscular");
    const val = opacitySlider.value / 100;
    if (outline) outline.style.opacity = val;
    if (muscle) muscle.style.opacity = val * 0.85;
  };

  window.updateRotation = () => {
    const scale = zoomSlider ? zoomSlider.value / 100 : 1;
    bodyContainer.style.transform = `rotateY(${rotateSlider.value}deg) scale(${scale})`;
  };

  window.updateZoom = () => updateRotation();

  window.toggleLayer = (layer, checked) => {
    if (layer === "labels") {
      document.querySelectorAll(".organ-label").forEach((el) => {
        el.style.opacity = checked ? "" : "0";
      });
    } else if (layer === "organs") {
      document.getElementById("system-organs")?.classList.toggle("layer-hidden", !checked);
    } else {
      document.getElementById(`layer-${layer}`)?.classList.toggle("layer-hidden", !checked);
    }
    addLog(`Layer ${layer}: ${checked ? "visible" : "hidden"}`);
  };

  window.setSystem = (system, btn) => {
    document.querySelectorAll(".tab-btn").forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");

    const layers = {
      skeletal: document.getElementById("system-skeletal"),
      organs: document.getElementById("system-organs"),
      nervous: document.getElementById("system-nervous"),
      circulatory: document.getElementById("system-circulatory"),
      muscular: document.getElementById("system-muscular"),
    };
    const outline = document.querySelector(".body-outline");

    Object.values(layers).forEach((g) => {
      if (g) {
        g.classList.add("hidden");
        g.style.opacity = "";
      }
    });
    outline.style.stroke = "rgba(139, 92, 246, 0.3)";
    stopCirculatoryAnim();

    if (system === "skeletal") {
      layers.skeletal.classList.remove("hidden");
      outline.style.stroke = "rgba(255, 255, 255, 0.25)";
    } else if (system === "organs") {
      layers.organs.classList.remove("hidden");
    } else if (system === "muscular") {
      layers.muscular.classList.remove("hidden");
      layers.organs.classList.remove("hidden");
      layers.organs.style.opacity = "0.35";
    } else if (system === "circulatory") {
      layers.circulatory.classList.remove("hidden");
      layers.organs.classList.remove("hidden");
      outline.style.stroke = "rgba(239, 68, 68, 0.45)";
      startCirculatoryAnim();
    } else if (system === "nervous") {
      layers.nervous.classList.remove("hidden");
      layers.organs.classList.remove("hidden");
      layers.organs.style.opacity = "0.4";
      outline.style.stroke = "rgba(34, 211, 238, 0.45)";
    }

    addLog(`Imaging mode: ${system.toUpperCase()} system overlay`);
  };

  function startCirculatoryAnim() {
    document.querySelectorAll(".blood-flow").forEach((p) => p.classList.add("flow-active"));
  }

  function stopCirculatoryAnim() {
    document.querySelectorAll(".blood-flow").forEach((p) => p.classList.remove("flow-active"));
  }

  function toggleHeartPulse(on) {
    document.getElementById("organ-heart")?.classList.toggle("heart-pulse", on);
  }

  resetBtn.addEventListener("click", () => {
    opacitySlider.value = 80;
    rotateSlider.value = 0;
    if (zoomSlider) zoomSlider.value = 100;
    updateOpacity();
    updateRotation();
    activeOrganId = null;
    organs.forEach((o) => o.classList.remove("selected"));
    document.querySelectorAll(".organ-index-item").forEach((el) => el.classList.remove("active"));
    toggleHeartPulse(false);
    stopCirculatoryAnim();
    organInfo.innerHTML =
      `<div class="info-placeholder">Select an organ from the body model or index to view histological data, physiological metrics, and system interactions.</div>`;
    const organTab = document.querySelector('[onclick*="organs"]');
    if (organTab) setSystem("organs", organTab);
    addLog("Simulation reset — baseline anatomy view restored.");
  });

  function pickVital(range) {
    const [min, max] = range;
    if (Number.isInteger(min)) return Math.floor(min + Math.random() * (max - min + 1));
    return (min + Math.random() * (max - min)).toFixed(1);
  }

  function applyOrganVitals(data) {
    if (!data.vitals) return;
    setVal("hrVal", pickVital(data.vitals.hr));
    setVal("tempVal", pickVital(data.vitals.temp));
    setVal("o2Val", pickVital(data.vitals.o2));
    setVal("rrVal", pickVital(data.vitals.rr));
    setVal("bpVal", `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 10)}`);
    updateBars();
  }

  function setVal(id, v) {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
  }

  function updateBars() {
    const hr = parseFloat(document.getElementById("hrVal")?.textContent) || 72;
    const temp = parseFloat(document.getElementById("tempVal")?.textContent) || 36.6;
    const o2 = parseFloat(document.getElementById("o2Val")?.textContent) || 98;
    const rr = parseFloat(document.getElementById("rrVal")?.textContent) || 14;
    document.querySelector(".stat-bar-fill.c1").style.width = `${Math.min(100, (hr / 120) * 100)}%`;
    document.querySelector(".stat-bar-fill.c2").style.width = `${Math.min(100, (temp / 40) * 100)}%`;
    document.querySelector(".stat-bar-fill.c3").style.width = `${o2}%`;
    const rrBar = document.querySelector(".stat-bar-fill.c4");
    if (rrBar) rrBar.style.width = `${Math.min(100, (rr / 30) * 100)}%`;
  }

  function updateVitals() {
    if (activeOrganId && ORGAN_DATA[activeOrganId]) {
      applyOrganVitals(ORGAN_DATA[activeOrganId]);
      return;
    }
    setVal("hrVal", 68 + Math.floor(Math.random() * 8));
    setVal("tempVal", (36.4 + Math.random() * 0.4).toFixed(1));
    setVal("o2Val", 96 + Math.floor(Math.random() * 3));
    setVal("rrVal", 13 + Math.floor(Math.random() * 4));
    setVal("bpVal", `${115 + Math.floor(Math.random() * 10)}/${72 + Math.floor(Math.random() * 8)}`);
    updateBars();
  }

  setInterval(updateVitals, 3500);

  function addLog(text) {
    const time = new Date();
    const m = String(time.getMinutes()).padStart(2, "0");
    const s = String(time.getSeconds()).padStart(2, "0");
    const item = document.createElement("div");
    item.className = "obs-item";
    item.innerHTML = `<div class="obs-time">${m}:${s}</div><div class="obs-text">${text}</div>`;
    obsLog.prepend(item);
    if (obsLog.children.length > 12) obsLog.removeChild(obsLog.lastChild);
  }

  addLog("Biosensor array online — 14 organ structures mapped.");
  addLog("Histology database loaded · Nephron to neocortex profiles ready.");
});
