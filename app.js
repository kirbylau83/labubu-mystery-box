// ── State ──
let state = loadState();

function defaultState() {
  return { coins: 100, collection: {}, boxesOpened: 0 };
}

function loadState() {
  try {
    const saved = localStorage.getItem("labubu_state");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return defaultState();
}

function saveState() {
  localStorage.setItem("labubu_state", JSON.stringify(state));
}

// ── DOM refs ──
const $coins = document.getElementById("coin-display");
const $boxesOpened = document.getElementById("boxes-opened");
const $collectionCount = document.getElementById("collection-count");
const $overlay = document.getElementById("overlay");
const $openingBox = document.getElementById("opening-box");
const $reveal = document.getElementById("reveal");
const $mathChallenge = document.getElementById("math-challenge");
const $mathResult = document.getElementById("math-result");
const $toast = document.getElementById("toast");

// ── Init ──
function init() {
  renderBoxes();
  renderCollection();
  updateStats();
  setupNav();
}

// ── Navigation ──
function setupNav() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`page-${btn.dataset.page}`).classList.add("active");
      if (btn.dataset.page === "collection") renderCollection();
    });
  });
}

// ── Stats ──
function updateStats() {
  $coins.textContent = state.coins;
  $boxesOpened.textContent = state.boxesOpened;
  const owned = Object.keys(state.collection).length;
  $collectionCount.textContent = `${owned}/${CHARACTERS.length}`;

  // Update box disabled states
  document.querySelectorAll(".box-card").forEach((card) => {
    const cost = parseInt(card.dataset.cost);
    card.classList.toggle("disabled", state.coins < cost);
  });
}

function bumpCoins() {
  $coins.classList.add("bump");
  setTimeout(() => $coins.classList.remove("bump"), 250);
}

// ── Render Boxes ──
function renderBoxes() {
  const grid = document.getElementById("boxes-grid");
  grid.innerHTML = "";

  BOX_TYPES.forEach((box) => {
    const card = document.createElement("div");
    card.className = `box-card ${box.id}`;
    card.dataset.cost = box.cost;

    const poolDesc = box.characterPool
      .map((p) => `${p.weight}% ${capitalize(p.rarity)}`)
      .join(" / ");

    card.innerHTML = `
      <span class="box-emoji">📦</span>
      <div class="box-name">${box.name}</div>
      <div class="box-cost">🪙 ${box.cost} coins</div>
      <div class="box-odds">${poolDesc}<br>${Math.round(box.mathChance * 100)}% Math Challenge</div>
    `;

    card.addEventListener("click", () => openBox(box));
    grid.appendChild(card);
  });
}

// ── Open Box ──
function openBox(box) {
  if (state.coins < box.cost) {
    showToast("Not enough coins!");
    return;
  }

  state.coins -= box.cost;
  state.boxesOpened++;
  saveState();
  updateStats();
  bumpCoins();

  // Show overlay with shaking box
  $reveal.classList.remove("active");
  $mathChallenge.classList.remove("active");
  $mathResult.classList.remove("active");
  $openingBox.style.display = "block";
  $overlay.classList.add("active");

  setTimeout(() => {
    $openingBox.style.display = "none";

    const isMath = Math.random() < box.mathChance;
    if (isMath) {
      showMathChallenge(box);
    } else {
      const char = pickCharacter(box);
      showCharacterReveal(char);
    }
  }, 800);
}

// ── Pick Character ──
function pickCharacter(box) {
  const pool = box.characterPool;
  const totalWeight = pool.reduce((s, p) => s + p.weight, 0);
  let roll = Math.random() * totalWeight;
  let chosenRarity = pool[0].rarity;

  for (const entry of pool) {
    roll -= entry.weight;
    if (roll <= 0) {
      chosenRarity = entry.rarity;
      break;
    }
  }

  const candidates = CHARACTERS.filter((c) => c.rarity === chosenRarity);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// ── Character Reveal ──
function showCharacterReveal(char) {
  const rarityConf = RARITY_CONFIG[char.rarity];
  const isDupe = state.collection[char.id] > 0;
  const count = (state.collection[char.id] || 0) + 1;

  state.collection[char.id] = count;
  saveState();
  updateStats();

  document.getElementById("reveal-emoji").textContent = char.emoji;
  document.getElementById("reveal-name").textContent = char.name;

  const rarityBadge = document.getElementById("reveal-rarity");
  rarityBadge.textContent = rarityConf.label;
  rarityBadge.style.background = rarityConf.bg;
  rarityBadge.style.color = rarityConf.border;
  rarityBadge.style.border = `2px solid ${rarityConf.border}`;

  const dupeEl = document.getElementById("reveal-duplicate");
  dupeEl.textContent = isDupe ? `Duplicate! (×${count})` : "New character!";
  dupeEl.style.color = isDupe ? "var(--text-muted)" : "#2ecc71";

  $reveal.classList.add("active");

  if (char.rarity === "legendary" || char.rarity === "rare") {
    spawnConfetti();
  }
}

// ── Math Challenge ──
let mathTimer = null;
let mathTimeLeft = 0;
let currentMathAnswer = 0;
let currentMathReward = 0;

function showMathChallenge(box) {
  const problem = generateMathProblem(box.mathDifficulty);
  currentMathAnswer = problem.answer;
  currentMathReward = box.mathReward;
  mathTimeLeft = 15;

  document.getElementById("math-equation").textContent = problem.equation + " = ?";
  document.getElementById("math-timer").textContent = mathTimeLeft;
  document.getElementById("math-timer").classList.remove("urgent");
  document.getElementById("math-reward").textContent = `Reward: 🪙 ${box.mathReward} coins`;
  const input = document.getElementById("math-input");
  input.value = "";

  $mathChallenge.classList.add("active");
  input.focus();

  clearInterval(mathTimer);
  mathTimer = setInterval(() => {
    mathTimeLeft--;
    const timerEl = document.getElementById("math-timer");
    timerEl.textContent = mathTimeLeft;
    if (mathTimeLeft <= 5) timerEl.classList.add("urgent");
    if (mathTimeLeft <= 0) {
      clearInterval(mathTimer);
      submitMathAnswer(true);
    }
  }, 1000);
}

function submitMathAnswer(timedOut = false) {
  clearInterval(mathTimer);
  const input = document.getElementById("math-input");
  const userAnswer = parseInt(input.value);
  const correct = !timedOut && userAnswer === currentMathAnswer;

  $mathChallenge.classList.remove("active");

  document.getElementById("math-result-icon").textContent = correct ? "🎉" : "😢";
  document.getElementById("math-result-text").textContent = correct
    ? "Correct!"
    : timedOut
    ? "Time's up!"
    : `Wrong! Answer: ${currentMathAnswer}`;
  document.getElementById("math-result-coins").textContent = correct
    ? `+${currentMathReward} coins!`
    : "+0 coins";

  if (correct) {
    state.coins += currentMathReward;
    saveState();
    updateStats();
    bumpCoins();
    spawnConfetti();
  }

  $mathResult.classList.add("active");
}

document.getElementById("math-submit-btn").addEventListener("click", () => submitMathAnswer());
document.getElementById("math-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitMathAnswer();
});

// ── Close Overlay ──
document.querySelectorAll(".close-overlay").forEach((btn) => {
  btn.addEventListener("click", () => {
    $overlay.classList.remove("active");
  });
});

// ── Collection ──
function renderCollection() {
  const container = document.getElementById("collection-container");
  container.innerHTML = "";

  const owned = Object.keys(state.collection).length;
  const pct = Math.round((owned / CHARACTERS.length) * 100);
  document.getElementById("progress-bar").style.width = `${pct}%`;
  document.getElementById("progress-text").textContent = `${owned} / ${CHARACTERS.length} collected (${pct}%)`;

  const rarities = ["legendary", "rare", "uncommon", "common"];

  rarities.forEach((rarity) => {
    const chars = CHARACTERS.filter((c) => c.rarity === rarity);
    const section = document.createElement("div");
    section.className = "rarity-section";

    const conf = RARITY_CONFIG[rarity];
    section.innerHTML = `<div class="rarity-label" style="color:${conf.border}">${conf.label}</div>`;

    const grid = document.createElement("div");
    grid.className = "collection-grid";

    chars.forEach((char) => {
      const count = state.collection[char.id] || 0;
      const card = document.createElement("div");
      card.className = `char-card ${count > 0 ? "owned" : "locked"}`;
      card.style.borderColor = count > 0 ? conf.border : "";

      card.innerHTML = `
        <div class="char-emoji">${count > 0 ? char.emoji : "❓"}</div>
        <div class="char-name">${count > 0 ? char.name : "???"}</div>
        ${count > 1 ? `<span class="char-count">×${count}</span>` : ""}
      `;
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// ── Confetti ──
function spawnConfetti() {
  const colors = ["#ff8906", "#e53170", "#ffd700", "#2ecc71", "#3498db", "#9b59b6"];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = -10 + "px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + "s";
    piece.style.width = (Math.random() * 8 + 5) + "px";
    piece.style.height = (Math.random() * 8 + 5) + "px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }
}

// ── Toast ──
function showToast(msg) {
  $toast.textContent = msg;
  $toast.classList.add("show");
  setTimeout(() => $toast.classList.remove("show"), 2000);
}

// ── Reset ──
document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Reset all progress? This cannot be undone.")) {
    state = defaultState();
    saveState();
    updateStats();
    renderCollection();
  }
});

// ── Helpers ──
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Go! ──
init();
