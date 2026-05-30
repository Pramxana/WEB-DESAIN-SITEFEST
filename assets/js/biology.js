// --------------------------------------------------
// biology.JS - Biology Lab anatomy simulation
// --------------------------------------------------

const ORGAN_DATA = {
  "organ-brain": {
    name: "Brain",
    latin: "Encephalon",
    system: "Nervous System",
    type: "Neural command center",
    status: "Synaptic activity stable",
    icon: "bx bx-brain",
    weight: "~1.4 kg",
    bloodFlow: "15% cardiac output",
    cells: "~86 billion neurons",
    desc: "Coordinates sensory input, cognition, memory, motor control, and autonomic regulation through neural circuits.",
    functionShort: "Processes information and controls body-wide responses.",
    functions: ["Cognition", "Motor control", "Memory", "Autonomic regulation"],
    related: ["Spinal cord", "Hypothalamus", "Brainstem"],
    vitals: { hr: [58, 72], temp: [36.8, 37.2], o2: [96, 99], rr: [12, 16] },
  },
  "organ-trachea": {
    name: "Trachea",
    latin: "Trachea",
    system: "Respiratory System",
    type: "Airway conduit",
    status: "Airway resistance nominal",
    icon: "bx bx-wind",
    weight: "~35 g",
    bloodFlow: "Bronchial arteries",
    cells: "Ciliated pseudostratified epithelium",
    desc: "A cartilaginous airway that conducts air from the larynx toward the bronchi and filters particles using mucus and cilia.",
    functionShort: "Moves air into the lungs while protecting the airway.",
    functions: ["Air conduction", "Mucociliary clearance", "Cough reflex"],
    related: ["Larynx", "Bronchi", "Lungs"],
    vitals: { hr: [72, 88], temp: [36.4, 36.9], o2: [95, 99], rr: [16, 22] },
  },
  "organ-lungs-l": {
    name: "Left Lung",
    latin: "Pulmo sinister",
    system: "Respiratory System",
    type: "Gas exchange organ",
    status: "Ventilation balanced",
    icon: "bx bx-cloud",
    weight: "~400 g",
    bloodFlow: "Pulmonary circulation",
    cells: "~300M alveoli across both lungs",
    desc: "The two-lobed lung contains alveoli that exchange oxygen and carbon dioxide with surrounding capillaries.",
    functionShort: "Transfers oxygen into blood and removes carbon dioxide.",
    functions: ["Gas exchange", "Acid-base support", "Immune filtering", "Voice resonance"],
    related: ["Trachea", "Heart", "Diaphragm"],
    vitals: { hr: [70, 85], temp: [36.5, 37.0], o2: [94, 98], rr: [14, 20] },
  },
  "organ-lungs-r": {
    name: "Right Lung",
    latin: "Pulmo dexter",
    system: "Respiratory System",
    type: "Gas exchange organ",
    status: "Three-lobe expansion normal",
    icon: "bx bx-cloud",
    weight: "~450 g",
    bloodFlow: "Pulmonary circulation",
    cells: "Bronchial tree and alveoli",
    desc: "The right lung has three lobes and receives air through the right main bronchus for rapid oxygen exchange.",
    functionShort: "Supports oxygenation and carbon dioxide elimination.",
    functions: ["Oxygenation", "CO2 elimination", "Surfactant support", "Immune defense"],
    related: ["Trachea", "Left lung", "Heart"],
    vitals: { hr: [70, 85], temp: [36.5, 37.0], o2: [94, 98], rr: [14, 20] },
  },
  "organ-heart": {
    name: "Heart",
    latin: "Cor",
    system: "Circulatory System",
    type: "Muscular pump",
    status: "Rhythm stable",
    icon: "bx bx-heart",
    weight: "~300 g",
    bloodFlow: "Coronary arteries",
    cells: "~2 billion cardiomyocytes",
    desc: "A four-chambered pump that drives pulmonary and systemic circulation using coordinated electrical impulses.",
    functionShort: "Pumps blood to move oxygen, nutrients, and waste products.",
    functions: ["Systemic circulation", "Pulmonary circulation", "Valve control", "Electrical rhythm"],
    related: ["Lungs", "Aorta", "Vena cava"],
    vitals: { hr: [60, 100], temp: [36.6, 37.1], o2: [97, 100], rr: [12, 18] },
    pulse: true,
  },
  "organ-blood-vessels": {
    name: "Blood Vessels",
    latin: "Vasa sanguinea",
    system: "Circulatory System",
    type: "Transport network",
    status: "Perfusion pathways open",
    icon: "bx bx-donate-blood",
    weight: "~100,000 km total length",
    bloodFlow: "~5 L/min at rest",
    cells: "Endothelium, smooth muscle, blood cells",
    desc: "Arteries, veins, and capillaries distribute blood, regulate pressure, and exchange materials with tissues.",
    functionShort: "Transports blood through the body and maintains tissue perfusion.",
    functions: ["Oxygen delivery", "Nutrient transport", "Waste removal", "Pressure regulation"],
    related: ["Heart", "Lungs", "Liver"],
    vitals: { hr: [68, 88], temp: [36.5, 37.1], o2: [96, 99], rr: [12, 18] },
  },
  "organ-liver": {
    name: "Liver",
    latin: "Hepar",
    system: "Digestive and Metabolic System",
    type: "Metabolic processor",
    status: "Detox load optimal",
    icon: "bx bx-test-tube",
    weight: "~1.5 kg",
    bloodFlow: "~1.4 L/min",
    cells: "~240 billion hepatocytes",
    desc: "The largest internal organ supports bile production, detoxification, nutrient storage, and plasma protein synthesis.",
    functionShort: "Processes nutrients, detoxifies blood, and produces bile.",
    functions: ["Bile production", "Detoxification", "Glycogen storage", "Protein synthesis"],
    related: ["Portal vein", "Stomach", "Pancreas"],
    vitals: { hr: [68, 80], temp: [36.7, 37.3], o2: [96, 99], rr: [12, 16] },
  },
  "organ-stomach": {
    name: "Stomach",
    latin: "Gaster",
    system: "Digestive System",
    type: "Digestive chamber",
    status: "Acid cycle regulated",
    icon: "bx bx-bowl-hot",
    weight: "~150 g",
    bloodFlow: "Celiac trunk",
    cells: "Parietal, chief, and G cells",
    desc: "A muscular chamber that stores food, secretes acid and enzymes, and churns food into chyme.",
    functionShort: "Begins protein digestion and prepares food for the small intestine.",
    functions: ["Protein digestion", "Acid sterilization", "Chyme formation", "Intrinsic factor"],
    related: ["Esophagus", "Liver", "Pancreas"],
    vitals: { hr: [72, 86], temp: [36.8, 37.4], o2: [96, 98], rr: [14, 18] },
  },
  "organ-pancreas": {
    name: "Pancreas",
    latin: "Pancreas",
    system: "Digestive and Endocrine System",
    type: "Enzyme and hormone gland",
    status: "Glucose response ready",
    icon: "bx bx-injection",
    weight: "~80 g",
    bloodFlow: "Splenic artery",
    cells: "Acinar cells and islets of Langerhans",
    desc: "A dual-function gland that releases digestive enzymes and regulates blood glucose with insulin and glucagon.",
    functionShort: "Supports digestion and stabilizes blood sugar.",
    functions: ["Insulin secretion", "Glucagon release", "Enzyme production", "Bicarbonate secretion"],
    related: ["Duodenum", "Liver", "Stomach"],
    vitals: { hr: [70, 84], temp: [36.6, 37.1], o2: [97, 99], rr: [12, 16] },
  },
  "organ-gallbladder": {
    name: "Gallbladder",
    latin: "Vesica biliaris",
    system: "Digestive System",
    type: "Bile reservoir",
    status: "Bile storage nominal",
    icon: "bx bx-droplet",
    weight: "~50 g",
    bloodFlow: "Cystic artery",
    cells: "Simple columnar epithelium",
    desc: "Stores and concentrates bile before releasing it into the small intestine during fat digestion.",
    functionShort: "Stores bile for lipid digestion.",
    functions: ["Bile storage", "Bile concentration", "Fat emulsification"],
    related: ["Liver", "Bile duct", "Duodenum"],
    vitals: { hr: [70, 82], temp: [36.5, 37.0], o2: [97, 99], rr: [12, 16] },
  },
  "organ-spleen": {
    name: "Spleen",
    latin: "Splen",
    system: "Lymphatic System",
    type: "Immune filter",
    status: "Filtration stable",
    icon: "bx bx-shield-plus",
    weight: "~150 g",
    bloodFlow: "Splenic artery",
    cells: "Lymphocytes and macrophages",
    desc: "Filters blood, recycles red blood cells, and supports immune responses against blood-borne pathogens.",
    functionShort: "Filters blood and supports immune defense.",
    functions: ["Blood filtration", "Antibody support", "Platelet reserve", "RBC recycling"],
    related: ["Pancreas", "Stomach", "Portal circulation"],
    vitals: { hr: [74, 88], temp: [36.7, 37.2], o2: [96, 98], rr: [13, 17] },
  },
  "organ-kidney-l": {
    name: "Left Kidney",
    latin: "Ren sinister",
    system: "Urinary System",
    type: "Blood filtration organ",
    status: "Filtration rate stable",
    icon: "bx bx-water",
    weight: "~150 g",
    bloodFlow: "~1.2 L/min across both kidneys",
    cells: "~1M nephrons",
    desc: "Filters blood, balances electrolytes, controls fluid volume, and contributes to blood pressure regulation.",
    functionShort: "Filters blood and forms urine.",
    functions: ["Filtration", "Fluid balance", "Electrolyte control", "BP support"],
    related: ["Ureter", "Bladder", "Adrenal gland"],
    vitals: { hr: [68, 78], temp: [36.5, 37.0], o2: [97, 99], rr: [12, 15] },
  },
  "organ-kidney-r": {
    name: "Right Kidney",
    latin: "Ren dexter",
    system: "Urinary System",
    type: "Blood filtration organ",
    status: "Waste clearance stable",
    icon: "bx bx-water",
    weight: "~145 g",
    bloodFlow: "~1.2 L/min across both kidneys",
    cells: "~1M nephrons",
    desc: "Excretes nitrogenous waste and helps regulate pH, blood pressure, and water balance.",
    functionShort: "Maintains fluid balance and removes waste.",
    functions: ["Waste excretion", "Acid-base balance", "Water balance", "Vitamin D activation"],
    related: ["Left kidney", "Ureter", "Bladder"],
    vitals: { hr: [68, 78], temp: [36.5, 37.0], o2: [97, 99], rr: [12, 15] },
  },
  "organ-small-intestine": {
    name: "Small Intestine",
    latin: "Intestinum tenue",
    system: "Digestive System",
    type: "Absorption tube",
    status: "Nutrient uptake active",
    icon: "bx bx-transfer-alt",
    weight: "~1.8 kg",
    bloodFlow: "Mesenteric artery",
    cells: "Villi and enterocytes",
    desc: "Completes digestion and absorbs most nutrients through folds, villi, and microvilli.",
    functionShort: "Absorbs nutrients into blood and lymph.",
    functions: ["Nutrient absorption", "Enzyme completion", "Immune surveillance", "Water uptake"],
    related: ["Stomach", "Pancreas", "Large intestine"],
    vitals: { hr: [72, 84], temp: [36.9, 37.5], o2: [95, 98], rr: [14, 18] },
  },
  "organ-large-intestine": {
    name: "Large Intestine",
    latin: "Intestinum crassum",
    system: "Digestive System",
    type: "Water recovery organ",
    status: "Microbiome activity normal",
    icon: "bx bx-cycling",
    weight: "~0.7 kg",
    bloodFlow: "Mesenteric arteries",
    cells: "Colonocytes and microbiota",
    desc: "Reabsorbs water and electrolytes while housing microbiota that contribute to vitamin production.",
    functionShort: "Recovers water and forms feces.",
    functions: ["Water absorption", "Electrolyte balance", "Microbiome habitat", "Defecation"],
    related: ["Small intestine", "Rectum", "Appendix"],
    vitals: { hr: [70, 82], temp: [36.8, 37.3], o2: [96, 98], rr: [12, 16] },
  },
  "organ-bladder": {
    name: "Urinary Bladder",
    latin: "Vesica urinaria",
    system: "Urinary System",
    type: "Storage reservoir",
    status: "Storage capacity normal",
    icon: "bx bx-droplet",
    weight: "~50 g",
    bloodFlow: "Internal iliac arteries",
    cells: "Transitional epithelium",
    desc: "Stores urine and releases it through coordinated detrusor muscle contraction and sphincter relaxation.",
    functionShort: "Stores urine before urination.",
    functions: ["Urine storage", "Micturition reflex", "Anti-reflux support"],
    related: ["Kidneys", "Ureters", "Urethra"],
    vitals: { hr: [70, 80], temp: [36.5, 36.9], o2: [97, 99], rr: [12, 14] },
  },
};

let activeOrganId = null;
const ANATOMY_ZOOM_MIN = 0.5;
const ANATOMY_ZOOM_MAX = 2;

(function ($) {
  "use strict";

  $(function () {
    const $simView = $("#simView");
    const $bodyViewport = $(".body-viewport");
    const $bodyContainer = $("#bodyContainer");
    const $tooltip = $("#organTooltip");
    const $organInfo = $("#organInfo");
    const $organStatusPanel = $("#organStatusPanel");

    buildOrganIndex();
    initTypedStatus();
    bindAnatomy();
    bindControls();
    initVitals();
    initEcg();

    selectOrgan("organ-heart", { silent: true });
    addLog("Biosensor array online - layered SVG anatomy matrix ready.");

    function bindAnatomy() {
      $(".organ-group").each(function () {
        const $group = $(this);
        const $organ = $group.find(".organ.clickable").first();
        const organId = $organ.attr("id");
        const data = ORGAN_DATA[organId];

        if (!data) return;

        $group.attr({
          role: "button",
          tabindex: "0",
          "aria-label": data.name,
        });

        $group.on("mouseenter", function (event) {
          $group.addClass("hovered");
          $("#focusLabel").text(data.name.toUpperCase());
          showTooltip(data, event);
        });

        $group.on("mousemove", function (event) {
          updateTooltipPos(event);
        });

        $group.on("mouseleave", function () {
          $group.removeClass("hovered");
          $tooltip.removeClass("visible");
        });

        $group.on("click keydown", function (event) {
          if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          selectOrgan(organId);
        });
      });

      // --------------------------------------------------
      // Anatomy Viewer Pointer
      // --------------------------------------------------
      $simView.on("mouseenter", function (event) {
        showScanCursor(event);
      });

      $simView.on("mousemove", function (event) {
        showScanCursor(event);
      });

      $simView.on("mouseleave", function () {
        hideScanCursor();
      });
    }

    function bindControls() {
      $("#scanSlider").on("input", function () {
        const value = Number(this.value);
        $simView.css("--scan-alpha", value / 100);
        $("#scanReadout").text(value + "%");
      }).trigger("input");

      $("#heatmapToggle").on("change", function () {
        $simView.toggleClass("heatmap-mode", this.checked);
        addLog("Organ heatmap " + (this.checked ? "enabled." : "disabled."));
      });

      $("#guidedToggle").on("change", function () {
        $simView.toggleClass("guided-mode", this.checked);
        addLog("Guided exploration " + (this.checked ? "online." : "offline."));
      });

      $("#guideBtn").on("click", function () {
        const ids = Object.keys(ORGAN_DATA);
        const currentIndex = Math.max(0, ids.indexOf(activeOrganId));
        const nextId = ids[(currentIndex + 1) % ids.length];
        $("#guidedToggle").prop("checked", true).trigger("change");
        selectOrgan(nextId);
      });

      $("#resetBtn").on("click", resetView);

      $(".tab-btn").on("click", function () {
        $("#activeSystemLabel").text($(this).text().trim().toUpperCase());
      });

      $(document).on("click", ".deep-scan-btn", function () {
        showDeepScanResult(activeOrganId || "organ-heart");
      });
    }

    function selectOrgan(organId, options = {}) {
      const data = ORGAN_DATA[organId];
      if (!data) return;

      activeOrganId = organId;

      $(".organ, .organ-group, .organ-index-item").removeClass("selected active");
      $("#" + organId).addClass("selected");
      $("#" + organId).closest(".organ-group").addClass("active");
      $('[data-organ-id="' + organId + '"]').addClass("active");

      $("#focusLabel").text(data.name.toUpperCase());
      renderOrganInfo(data);
      renderStatusPanel(data);
      applyOrganVitals(data);
      updateFact(data);

      if (!options.silent) {
        addLog("Analysis locked: " + data.name + " - " + data.system + ".");
      }
    }

    function renderOrganInfo(data) {
      const funcTags = data.functions.map((item) => '<span class="bio-tag">' + item + "</span>").join("");
      const relatedTags = data.related.map((item) => '<span class="bio-tag bio-tag-dim">' + item + "</span>").join("");

      $organInfo.html(
        '<div class="organ-title">' + data.name + "</div>" +
        '<div class="organ-latin">' + data.latin + "</div>" +
        '<div class="organ-system-badge"><i class="' + data.icon + '"></i> SYSTEM - ' + data.system.toUpperCase() + "</div>" +
        '<div class="organ-desc">' + data.desc + "</div>" +
        '<div class="bio-section-lbl">Short Function</div>' +
        '<div class="organ-desc">' + data.functionShort + "</div>" +
        '<div class="bio-metrics">' +
          metric("Mass / Scale", data.weight) +
          metric("Perfusion", data.bloodFlow) +
          metric("Histology", data.cells) +
        "</div>" +
        '<div class="bio-section-lbl">Primary Functions</div>' +
        '<div class="bio-tags">' + funcTags + "</div>" +
        '<div class="bio-section-lbl">Connected Structures</div>' +
        '<div class="bio-tags">' + relatedTags + "</div>" +
        '<button type="button" class="btn btn-primary btn-sm deep-scan-btn"><i class="bx bx-expand-alt"></i> Deep Scan</button>'
      );
    }

    function renderStatusPanel(data) {
      const mini = miniVitals(data);
      $organStatusPanel.html(
        '<div class="card-title">SELECTED ORGAN</div>' +
        '<div class="selected-organ-name"><i class="' + data.icon + '"></i><span>' + data.name + "</span></div>" +
        '<div class="selected-organ-status"><i class="bx bx-check-shield"></i>' + data.status + "</div>" +
        '<div class="organ-desc">' + data.type + " - " + data.functionShort + "</div>" +
        '<div class="mini-vitals">' +
          miniVital("HR", mini.hr + " BPM") +
          miniVital("O2", mini.o2 + "%") +
          miniVital("Temp", mini.temp + " C") +
          miniVital("Resp", mini.rr + "/min") +
        "</div>"
      );
    }

    function showDeepScanResult(organId) {
      const data = ORGAN_DATA[organId];
      const result = document.getElementById("deepScanResult");
      if (!data || !result) return;

      $("#scanResultSystem").text(data.system);
      $("#scanResultName").text(data.name);
      $("#scanResultDesc").text(data.desc);
      $(".deep-scan-icon i").attr("class", data.icon);
      $("#scanResultMetrics").html(
        metric("Condition", data.status) +
        metric("Function", data.functionShort) +
        metric("Perfusion", data.bloodFlow)
      );

      $("#scanResultDetails").html(
        scanDetail("System Type", data.system + " - " + data.type) +
        scanDetail("Main Function", data.functionShort) +
        scanDetail("Learning Focus", data.functions.join(", ")) +
        scanDetail("Connected Structures", data.related.join(", "))
      );

      result.hidden = false;
      result.classList.remove("is-visible");
      window.requestAnimationFrame(function () {
        result.classList.add("is-visible");
        result.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      addLog("Deep scan complete: " + data.name + " data expanded.");
    }

    function buildOrganIndex() {
      const html = Object.entries(ORGAN_DATA).map(([id, data]) => {
        const short = data.system.split(" ")[0].toLowerCase();
        return (
          '<button type="button" class="organ-index-item" data-organ-id="' + id + '">' +
            '<span class="organ-index-dot sys-' + short + '"></span>' +
            '<span class="organ-index-name"><i class="' + data.icon + '"></i> ' + data.name + "</span>" +
            '<span class="organ-index-sys">' + short + "</span>" +
          "</button>"
        );
      }).join("");

      $("#organIndex").html(html).on("click", ".organ-index-item", function () {
        selectOrgan($(this).data("organ-id"));
      });
    }

    function initTypedStatus() {
      if (!window.Typed) return;
      new Typed("#typedScanStatus", {
        strings: [
          "Scanning organ system...",
          "Mapping vascular response...",
          "Reading neural pulse...",
          "Anatomy matrix online...",
        ],
        typeSpeed: 34,
        backSpeed: 18,
        backDelay: 1300,
        loop: true,
        showCursor: false,
      });
    }

    function initVitals() {
      setInterval(function () {
        updateRadials();
      }, 1000);

      setInterval(function () {
        if (activeOrganId && ORGAN_DATA[activeOrganId]) {
          applyOrganVitals(ORGAN_DATA[activeOrganId]);
        }
      }, 3500);
    }

    function initEcg() {
      const canvas = document.getElementById("heartbeatCanvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let t = 0;

      function drawWave() {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(34, 211, 238, 0.18)";
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 18) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }

        ctx.strokeStyle = "#22d3ee";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#22d3ee";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const phase = (x + t) % 72;
          let y = h * 0.58 + Math.sin((x + t) * 0.045) * 5;
          if (phase > 16 && phase < 21) y -= (phase - 16) * 6;
          if (phase >= 21 && phase < 26) y += (phase - 21) * 8 - 28;
          if (phase >= 26 && phase < 34) y -= Math.sin(((phase - 26) / 8) * Math.PI) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        t += activeOrganId === "organ-heart" ? 2.5 : 1.8;
        requestAnimationFrame(drawWave);
      }

      drawWave();
    }

    function resetView() {
      $("#opacitySlider").val(80);
      $("#zoomSlider").val(1);
      $("#heatmapToggle, #guidedToggle").prop("checked", false);
      updateOpacity();
      resetAnatomyZoom();
      hideScanCursor();
      $simView.removeClass("heatmap-mode guided-mode");
      $("#deepScanResult").prop("hidden", true).removeClass("is-visible");
      $(".tab-btn").removeClass("active").filter(function () {
        return $(this).text().trim().toLowerCase() === "organs";
      }).addClass("active");
      setSystem("organs", $(".tab-btn.active")[0]);
      selectOrgan("organ-heart", { silent: true });
      addLog("Simulation reset - layered anatomy view restored.");
    }

    function showTooltip(data, event) {
      $tooltip.html(
        '<span class="organ-tooltip-tag">[' + data.system.split(" ")[0] + "]</span> " + data.name +
        '<span class="organ-tooltip-latin">' + data.latin + "</span>"
      ).addClass("visible");
      updateTooltipPos(event);
    }

    function updateTooltipPos(event) {
      $tooltip.css({
        left: event.clientX + 15,
        top: event.clientY + 15,
      });
    }

    function updateFact(data) {
      $("#bioFact").text(data.name + ": " + data.functionShort + " " + data.desc);
    }

    function applyOrganVitals(data) {
      const vitals = miniVitals(data);
      $("#hrVal").text(vitals.hr);
      $("#tempVal").text(vitals.temp);
      $("#o2Val").text(vitals.o2);
      $("#rrVal").text(vitals.rr);
      $("#bpVal").text((110 + Math.floor(Math.random() * 20)) + "/" + (70 + Math.floor(Math.random() * 10)));
      updateBars();
      if (activeOrganId === dataIdByName(data.name)) renderStatusPanel(data);
    }

    function miniVitals(data) {
      return {
        hr: pickVital(data.vitals.hr),
        temp: pickVital(data.vitals.temp),
        o2: pickVital(data.vitals.o2),
        rr: pickVital(data.vitals.rr),
      };
    }

    function pickVital(range) {
      const min = range[0];
      const max = range[1];
      if (Number.isInteger(min) && Number.isInteger(max)) {
        return Math.floor(min + Math.random() * (max - min + 1));
      }
      return (min + Math.random() * (max - min)).toFixed(1);
    }

    function updateBars() {
      const hr = parseFloat($("#hrVal").text()) || 72;
      const temp = parseFloat($("#tempVal").text()) || 36.6;
      const o2 = parseFloat($("#o2Val").text()) || 98;
      const rr = parseFloat($("#rrVal").text()) || 14;
      $(".stat-bar-fill.c1").css("width", Math.min(100, (hr / 120) * 100) + "%");
      $(".stat-bar-fill.c2").css("width", Math.min(100, (temp / 40) * 100) + "%");
      $(".stat-bar-fill.c3").css("width", o2 + "%");
      $(".stat-bar-fill.c4").css("width", Math.min(100, (rr / 30) * 100) + "%");
    }

    function updateRadials() {
      const hr = parseFloat($("#hrVal").text()) || 72;
      const o2 = parseFloat($("#o2Val").text()) || 98;
      const temp = parseFloat($("#tempVal").text()) || 36.6;
      setRadial("neuralPct", Math.max(68, Math.min(96, 100 - Math.abs(hr - 72))));
      setRadial("oxygenPct", Math.round(o2));
      setRadial("metabolicPct", Math.max(62, Math.min(94, Math.round(80 + (temp - 36.6) * 10))));
    }

    function setRadial(id, value) {
      const $el = $("#" + id);
      const rounded = Math.round(value);
      $el.text(rounded + "%");
      $el.closest(".radial-meter").css("--pct", rounded);
    }

    function addLog(text) {
      const time = new Date();
      const stamp = String(time.getMinutes()).padStart(2, "0") + ":" + String(time.getSeconds()).padStart(2, "0");
      const $item = $('<div class="obs-item"><div class="obs-time">' + stamp + '</div><div class="obs-text">' + text + "</div></div>");
      $("#obsLog").prepend($item);
      const $items = $("#obsLog .obs-item");
      if ($items.length > 12) $items.last().remove();
    }

    function metric(label, value) {
      return '<div class="bio-metric"><span class="bio-metric-lbl">' + label + '</span><span class="bio-metric-val">' + value + "</span></div>";
    }

    function miniVital(label, value) {
      return '<div class="mini-vital"><span>' + label + '</span><strong>' + value + "</strong></div>";
    }

    function scanDetail(label, value) {
      return '<article class="deep-scan-detail"><span>' + label + "</span><p>" + value + "</p></article>";
    }

    function dataIdByName(name) {
      return Object.keys(ORGAN_DATA).find((id) => ORGAN_DATA[id].name === name);
    }

    window.updateOpacity = function () {
      const value = Number($("#opacitySlider").val() || 80) / 100;
      $("#system-organs").css("opacity", value);
      $(".organ-label, .label-line").css("opacity", Math.max(0.45, value));
    };

    window.updateZoom = function () {
      handleAnatomyZoom();
    };

    // --------------------------------------------------
    // Anatomy Viewer Interaction Helpers
    // --------------------------------------------------
    function showScanCursor(event) {
      const rect = $simView[0].getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      $simView
        .addClass("scan-cursor-active")
        .css({ "--mx": x + "%", "--my": y + "%" });
    }

    function hideScanCursor() {
      $simView
        .removeClass("scan-cursor-active")
        .css({ "--mx": "50%", "--my": "50%" });
    }

    function handleAnatomyZoom() {
      setAnatomyZoom(Number($("#zoomSlider").val() || 1));
    }

    function setAnatomyZoom(zoom) {
      const safeZoom = Math.max(ANATOMY_ZOOM_MIN, Math.min(ANATOMY_ZOOM_MAX, zoom));
      $("#zoomSlider").val(safeZoom);
      enableZoomScroll(safeZoom > 1);
      applyBodyTransform();
    }

    function enableZoomScroll(isEnabled) {
      const wasEnabled = $bodyViewport.hasClass("zoom-scroll-enabled");
      $bodyViewport.toggleClass("zoom-scroll-enabled", isEnabled);

      if (!isEnabled) {
        centerAnatomyView(true);
        return;
      }

      if (wasEnabled) {
        centerAnatomyView(false);
        return;
      }

      window.requestAnimationFrame(function () {
        centerAnatomyView(true);
      });
    }

    function centerAnatomyView(resetVerticalScroll) {
      const viewport = $bodyViewport[0];
      viewport.scrollLeft = 0;
      if (resetVerticalScroll) viewport.scrollTop = 0;
    }

    function resetAnatomyZoom() {
      setAnatomyZoom(1);
    }

    function applyBodyTransform() {
      const zoom = Number($("#zoomSlider").val() || 1);
      $bodyContainer.css("transform", "scale(" + zoom + ")");
    }

    window.toggleLayer = function (layer, checked) {
      if (layer === "labels") {
        $(".organ-label, .label-line").toggleClass("layer-hidden", !checked);
      } else if (layer === "organs") {
        $("#system-organs").toggleClass("layer-hidden", !checked);
      } else {
        $("#layer-" + layer).toggleClass("layer-hidden", !checked);
      }
      addLog("Layer " + layer + ": " + (checked ? "visible" : "hidden") + ".");
    };

    window.setSystem = function (system, btn) {
      $(".tab-btn").removeClass("active");
      if (btn) $(btn).addClass("active");

      const $outline = $(".body-outline");
      const layers = {
        skeletal: $("#system-skeletal"),
        organs: $("#system-organs"),
        nervous: $("#system-nervous"),
        circulatory: $("#system-circulatory"),
        muscular: $("#system-muscular"),
      };

      $.each(layers, function (_, $layer) {
        $layer.addClass("hidden").css("opacity", "");
      });

      $outline.css("stroke", "rgba(34, 211, 238, 0.38)");
      $(".blood-flow").removeClass("flow-active");

      if (system === "skeletal") {
        layers.skeletal.removeClass("hidden");
        $outline.css("stroke", "rgba(255, 255, 255, 0.28)");
      } else if (system === "muscular") {
        layers.muscular.removeClass("hidden");
        layers.organs.removeClass("hidden").css("opacity", "0.35");
      } else if (system === "circulatory") {
        layers.circulatory.removeClass("hidden");
        layers.organs.removeClass("hidden");
        $(".blood-flow").addClass("flow-active");
        $outline.css("stroke", "rgba(239, 68, 68, 0.45)");
      } else if (system === "nervous") {
        layers.nervous.removeClass("hidden");
        layers.organs.removeClass("hidden").css("opacity", "0.42");
        $outline.css("stroke", "rgba(34, 211, 238, 0.55)");
      } else {
        layers.organs.removeClass("hidden");
      }

      $("#activeSystemLabel").text(system.toUpperCase());
      addLog("Imaging mode: " + system.toUpperCase() + " system overlay.");
    };
  });
})(jQuery);
