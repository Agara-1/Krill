// HLUBINA — denní anti-kvíz. Body dostaneš za vzácnou, ale platnou odpověď.
(() => {
'use strict';

const QUESTIONS = 7;
const SECONDS = 20;
const MAX_PTS = 100;
const M_PER_PT = 10;
const EPOCH = new Date(2026, 0, 1);

// ---------- Pomocné funkce ----------
const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const nf = new Intl.NumberFormat('cs-CZ');
const pf = v => new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: v < 1 ? 2 : 1 }).format(v);
const meters = pts => pts === 0 ? '0 m' : '−' + nf.format(pts * M_PER_PT) + ' m';

function norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9+#]/g, '');
}
function mulberry32(a) {
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function strHash(s) { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
function lev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}
function erf(x) { // Abramowitz–Stegun
  const s = Math.sign(x); x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
const normCdf = (x, mu, sd) => 0.5 * (1 + erf((x - mu) / (sd * Math.SQRT2)));

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};

// ---------- Vzácnost a body ----------
const TIERS = {
  none:     { name: 'Bez úlovku',   color: '#9bb3cf', emoji: '⬛' },
  plankton: { name: 'Plankton',     color: '#7af5d8', emoji: '🟦' },
  medusa:   { name: 'Medúza',       color: '#d2adff', emoji: '🟪' },
  angler:   { name: 'Lampovník',    color: '#ffd86b', emoji: '🟨' },
  pearl:    { name: 'Dumbo',       color: '#7ff9ff', emoji: '🐙' },
};
function tierOf(pts) {
  if (pts <= 0) return 'none';
  if (pts <= 20) return 'plankton';
  if (pts <= 60) return 'medusa';
  if (pts < 100) return 'angler';
  return 'pearl';
}
const L = Math.log;
function pointsFor(share) {
  if (share >= 5) return Math.round(20 - 15 * clamp((L(share) - L(5)) / (L(30) - L(5)), 0, 1));
  if (share >= 1.5) return Math.round(30 + 30 * (L(5) - L(share)) / (L(5) - L(1.5)));
  if (share >= 0.35) return Math.round(70 + 25 * (L(1.5) - L(share)) / (L(1.5) - L(0.35)));
  return 100;
}

// ---------- Kategorie ----------
const CATS = window.HLUBINA_CATEGORIES.map(c => {
  // Duplicitní zápisy (např. ruční a doplněný z Wikipedie) se sloučí do první položky.
  const seen = new Set();
  const entries = [];
  for (const raw of c.a.split(';').map(x => x.trim()).filter(Boolean)) {
    const parts = raw.split('|').map(p => p.trim()).filter(Boolean);
    const keys = [...new Set(parts.map(norm))].filter(k => k && !seen.has(k));
    if (!keys.length || seen.has(norm(parts[0]))) continue;
    keys.forEach(k => seen.add(k));
    entries.push({ name: parts[0], keys, rank: entries.length });
  }
  return { ...c, entries };
});

// Podíly odpovědí pro daný den: Zipfovo rozdělení s denním šumem.
function buildRound(seed, cat) {
  const rng = mulberry32(seed ^ strHash(cat.id));
  const w = cat.entries.map(e => Math.pow(e.rank + 1.6, -1.5) * (0.75 + rng() * 0.6));
  const sum = w.reduce((a, b) => a + b, 0);
  const answered = 0.93; // zbytek hráčů nestihl / odpověděl neplatně
  const shares = w.map(x => x / sum * 100 * answered);
  const pts = shares.map(pointsFor);
  const expected = shares.reduce((acc, s, i) => acc + s / 100 * pts[i], 0);
  return { cat, shares, pts, expected };
}

function matchAnswer(cat, input) {
  const n = norm(input);
  if (!n) return null;
  for (let i = 0; i < cat.entries.length; i++) if (cat.entries[i].keys.includes(n)) return i;
  if (n.length < 5) return null;
  const max = n.length >= 9 ? 2 : 1;
  let best = max + 1, bestIdx = -1, tie = false;
  cat.entries.forEach((e, i) => {
    for (const k of e.keys) {
      if (k.length < 4) continue;
      const d = lev(n, k, max);
      if (d < best) { best = d; bestIdx = i; tie = false; }
      else if (d === best && bestIdx !== i) tie = true;
    }
  });
  return best <= max && !tie ? bestIdx : null;
}

// ---------- Den a ponor ----------
function today() {
  const now = new Date();
  const mid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((mid - EPOCH) / 864e5);
}
// Karty (herní režimy). Každá má vlastní sadu kategorií a vlastní denní ponor.
const byId = id => CATS.find(c => c.id === id);
const MODES = {
  mix:  { label: 'Mix', title: 'Denní ponor', blurb: 'Všehochuť: zvířata, barvy, prohlížeče, prvky a další.',
          cats: CATS.filter(c => !c.pack) },
  geo:  { label: 'Zeměpis', title: 'Zeměpisný ponor', blurb: 'Státy, ostrovy, hory, moře, řeky a města z celého světa i od nás.',
          cats: CATS.filter(c => c.pack === 'geo').concat(['eu-mimo', 'mesto-hl', 'reka', 'hora', 'mesto'].map(byId)) },
  meme: { label: 'Memes CZ/SK', title: 'Memový ponor', blurb: 'Večerníčky, filmové hlášky, pohádky, dobroty, politici, youtubeři a slovenčina.',
          cats: CATS.filter(c => c.pack === 'meme') },
};
const MODE_KEYS = Object.keys(MODES);

function makeDive(dayNo, practice, mode = 'mix') {
  const base = (dayNo * 2654435761) >>> 0;
  const seed = practice ? (Math.random() * 2 ** 31) | 0 : mode === 'mix' ? base : (base ^ strHash(mode)) >>> 0;
  const rng = mulberry32(seed);
  const pool = MODES[mode].cats;
  const idx = pool.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const rounds = idx.slice(0, QUESTIONS).map(i => buildRound(seed, pool[i]));
  const mu = rounds.reduce((a, r) => a + r.expected, 0);
  const sd = 60 + rng() * 25;
  const players = 8000 + Math.floor(rng() * 14000);
  return { seed, dayNo, practice, rounds, mu, sd, players };
}

// ---------- Stav ----------
const dayNo = today();
const diveNo = dayNo + 1;
const saveKey = m => m === 'mix' ? 'hlubina-v1-' + dayNo : 'hlubina-v1-' + m + '-' + dayNo;
let mode = store.get('hlubina-mode');
if (!MODES[mode]) mode = 'mix';
let dive = makeDive(dayNo, false, mode);
let saved = loadSaved(mode);
let practice = null; // { answers }

function S() { return practice || saved; }
function persist() { if (!practice) store.set(saveKey(mode), saved); }

function loadSaved(m) {
  const st = store.get(saveKey(m)) || { answers: [], current: -1, done: false };
  // Rozehraná otázka po obnovení stránky se počítá jako vypršený čas.
  if (!st.done && st.current >= 0 && st.answers.length === st.current) {
    st.answers.push({ input: '', idx: null, pts: 0, timeout: true });
    st.current = -1;
    if (st.answers.length >= QUESTIONS) st.done = true;
    store.set(saveKey(m), st);
  }
  return st;
}

function switchMode(m) {
  mode = m; store.set('hlubina-mode', m);
  practice = null;
  dive = makeDive(dayNo, false, mode);
  saved = loadSaved(mode);
  if (saved.done) showResults();
  else showIntro();
  const tab = document.querySelector('.mode-tab[aria-selected="true"]');
  if (tab) tab.focus();
}

function modeTabs() {
  return `<nav class="modes" role="tablist" aria-label="Herní karty">${MODE_KEYS.map(k => {
    const st = k === mode ? saved : store.get(saveKey(k));
    const mark = st && st.done ? '<span class="mode-done" aria-label="dnes dohráno">✓</span>' : '';
    return `<button class="mode-tab" role="tab" data-mode="${k}" aria-selected="${k === mode}">${MODES[k].label}${mark}</button>`;
  }).join('')}</nav>`;
}
function bindTabs() {
  document.querySelectorAll('.mode-tab').forEach(b => b.onclick = () => { if (b.dataset.mode !== mode || practice) switchMode(b.dataset.mode); });
}
const modeName = () => MODES[mode].label;

// ---------- Pixelové sprity ----------
const SPRITES = {
  mascot: { rows: [
    '...yYy............',
    '...YYY............',
    '...yYy............',
    '....k.............',
    '.....k............',
    '......khhhh.......',
    '....hhRRRRRRh.....',
    '...hRRRRRRRRRR..rr',
    '..hRWWRRRRRRRRRrRr',
    '..RRWbRRRRRRRRRRRr',
    '.RRRRRRRRRRRRRRRr.',
    'RwRwRwRRRRRRRRRRRr',
    'R.....RRRRRRRRrrRr',
    'RwRwRwRRRRRRRrr.rr',
    '.RRRRRRRRRRrrr....',
    '...rrrrrrrr.......',
  ], pal: { R: '#f0503a', r: '#b3301f', h: '#ff8a6a', W: '#ffffff', b: '#1a0c0c', w: '#fff3d6', k: '#7a2a1c', Y: '#7ff9ff', y: '#c9fdff' } },
  plankton: { rows: [
    'a.............',
    '.a....GGG.....',
    '..a..GhGGG....',
    '...aGeGGGGG...',
    '....GGGGGGGg..',
    '....gGGGGGgg..',
    '.....gGGGg..g.',
    '......g.g....g',
    '.....g...g....',
    '....g.....g...',
  ], pal: { G: '#7af5d8', g: '#34bfa0', h: '#d8fff4', e: '#0b2a2a', a: '#b8fff0' } },
  medusa: { rows: [
    '....MMMMMM....',
    '..MMllMMMMMM..',
    '.MMlllMMMMMMM.',
    '.MMllMMMMMMMM.',
    'MMMMMMMMMMMMMM',
    'MMMMMMMMMMMMMm',
    'mMmMmMmMmMmMmm',
    '.m.t..t..t.m..',
    '.t..t.t.t..t..',
    '..t.t..t.t.t..',
    '.t..t..t..t...',
    '..t..t.t..t...',
    '.t...t..t..t..',
    '..t......t....',
  ], pal: { M: '#d2adff', m: '#9f72e6', l: '#f6eeff', t: '#bf98f5' } },
  angler: { rows: [
    '........yYy.....',
    '........YYY.....',
    '.........y......',
    '........a.......',
    '.......a........',
    '...hhhhahh......',
    '.hhAAAAAAAAh....',
    'aAAAAAAAAWWAA...',
    'aaAAAAAAAWbAAA..',
    'aAAAAAAAAAAAAAA.',
    'aaAAAAAAAAwAwAwA',
    'aAAAAAAAAA.....A',
    'aaAAAAAAAAwAwAwA',
    '.aaaAAAAAAAAAAA.',
    '...aaaaaaaaaa...',
  ], pal: { A: '#957bf5', a: '#6248c4', h: '#c4b4ff', W: '#ffe07a', b: '#1a1030', w: '#ffffff', Y: '#ffd86b', y: '#fff6cc' } },
  pearl: { rows: [
    '.....CCCCCC.....',
    '...CChhCCCCCC...',
    'EE.ChhCCCCCCC.EE',
    'EEECCCCCCCCCCEEE',
    '.EECCCCCCCCCCEE.',
    '..CCWWCCCCWWCC..',
    '..CCWbCCCCWbCC..',
    '..CCCCCCCCCCCC..',
    '...cCCCCCCCCc...',
    '..cCcCcCCcCcCc..',
    '.cC.cC.cC.cC.cC.',
    '.c..c..c..c..c..',
    'c..c...c...c..c.',
  ], pal: { C: '#94faff', c: '#45cbd9', h: '#e6ffff', E: '#5ce6d6', W: '#ffffff', b: '#03121c' } },
  none: { rows: [
    '...oooo...',
    '.oo....oo.',
    '.o.ll...o.',
    'o.l......o',
    'o........o',
    'o........o',
    'o........o',
    '.o......o.',
    '.oo....oo.',
    '...oooo...',
  ], pal: { o: '#9bb3cf', l: '#e6f0ff' } },
};
function spriteSVG(name, px, cx, cy) {
  const sp = SPRITES[name];
  const h = sp.rows.length, w = Math.max(...sp.rows.map(r => r.length));
  const x0 = cx - w * px / 2, y0 = cy - h * px / 2;
  let out = '';
  sp.rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const col = sp.pal[row[c]];
      if (col) out += `<rect x="${x0 + c * px}" y="${y0 + r * px}" width="${px + 0.05}" height="${px + 0.05}" fill="${col}"/>`;
    }
  });
  return out;
}
function spriteBox(name, px) {
  const sp = SPRITES[name];
  const h = sp.rows.length, w = Math.max(...sp.rows.map(r => r.length));
  return `<svg class="sprite" viewBox="0 0 ${w * px} ${h * px}" width="${w * px}" height="${h * px}" aria-hidden="true">${spriteSVG(name, px, w * px / 2, h * px / 2)}</svg>`;
}

// ---------- Obrazovky ----------
const app = $('#app');
let timer = null;

function setDepth(totalPts) {
  const t = clamp(totalPts / 700, 0, 1);
  document.documentElement.style.setProperty('--depth', t.toFixed(3));
}

function header(sub) {
  return `<header class="top">
    <div class="brand">${spriteBox('mascot', 2)}<span class="logo">HLUBINA</span></div>
    <div class="sub">${sub}</div>
  </header>`;
}

function dateLabel() {
  return new Date().toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' });
}

function showIntro() {
  stopTimer();
  setDepth(0);
  app.innerHTML = `
  ${header('Ponor #' + diveNo + ' · ' + esc(dateLabel()))}
  ${modeTabs()}
  <section class="card intro">
    <h1 class="title">${MODES[mode].title}</h1>
    <p class="mode-blurb">${MODES[mode].blurb}</p>
    <p class="lead">Sedm kategorií, na každou 20 sekund. Napiš <b>platnou</b> odpověď, kterou ostatní nenapíšou. Čím vzácnější odpověď, tím hlouběji se potopíš.</p>
    <ul class="tiers">
      ${tierRow('plankton', '5–20 b', 'běžná odpověď')}
      ${tierRow('medusa', '30–60 b', 'méně častá')}
      ${tierRow('angler', '70–95 b', 'vzácná')}
      ${tierRow('pearl', '100 b', 'skoro nikdo jiný ji nenapíše')}
      ${tierRow('none', '0 b', 'neplatná nebo pozdě')}
    </ul>
    <p class="small">1 bod = 10 m pod hladinou. Maximum je 700 b, tedy −7 000 m.</p>
    <div class="actions">
      <button class="btn primary" id="start">Začít ponor</button>
      <button class="btn ghost" id="practice">Tréninkový ponor</button>
    </div>
  </section>`;
  $('#start').onclick = () => { practice = null; dive = makeDive(dayNo, false, mode); nextQuestion(); };
  $('#practice').onclick = startPractice;
  bindTabs();
}
function tierRow(t, pts, desc) {
  return `<li><span class="tier-ico">${spriteBox(t, 2)}</span><span class="tier-name" style="color:${TIERS[t].color}">${TIERS[t].name}</span><span class="tier-pts">${pts}</span><span class="tier-desc">${desc}</span></li>`;
}
function startPractice() {
  practice = { answers: [], current: -1, done: false };
  dive = makeDive(dayNo, true, mode);
  nextQuestion();
}

function totalPts(st = S()) { return st.answers.reduce((a, x) => a + (x ? x.pts : 0), 0); }

function nextQuestion() {
  const st = S();
  if (st.answers.length >= QUESTIONS) { st.done = true; persist(); showResults(); return; }
  const qi = st.answers.length;
  st.current = qi; persist();
  const round = dive.rounds[qi];
  setDepth(totalPts());
  app.innerHTML = `
  ${header(modeName() + ' · ' + (practice ? 'trénink' : 'ponor #' + diveNo) + ' · otázka ' + (qi + 1) + '/' + QUESTIONS)}
  <div class="progress">${dive.rounds.map((_, i) => `<span class="pip ${i < qi ? 'done ' + tierOf(st.answers[i].pts) : i === qi ? 'now' : ''}"></span>`).join('')}</div>
  <div class="gauge"><span>Hloubka</span><b>${meters(totalPts())}</b></div>
  <section class="card question">
    <div class="qlabel">Kategorie ${qi + 1}</div>
    <h2 class="qtext">${esc(round.cat.q)}</h2>
    <p class="hint">${esc(round.cat.hint)}</p>
    <div class="timer"><div class="timer-bar" id="tbar"></div><span class="timer-num" id="tnum">${SECONDS}</span></div>
    <form id="form" autocomplete="off">
      <label class="sr" for="answer">Tvoje odpověď</label>
      <input id="answer" class="input" type="text" inputmode="text" enterkeyhint="send" autocapitalize="off" spellcheck="false" maxlength="60" placeholder="Napiš odpověď…">
      <button class="btn primary" type="submit">Odeslat</button>
    </form>
    <p class="feedback" id="fb" aria-live="polite"></p>
  </section>`;
  const input = $('#answer');
  input.focus();
  $('#form').onsubmit = e => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    const idx = matchAnswer(round.cat, val);
    if (idx === null) {
      const fb = $('#fb');
      fb.textContent = `„${val}“ tu neplatí. Zkus jinou odpověď.`;
      input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake');
      input.select();
      return;
    }
    finishQuestion({ input: val, idx, pts: round.pts[idx], timeout: false });
  };
  startTimer(() => finishQuestion({ input: input.value.trim(), idx: null, pts: 0, timeout: true }));
}

function startTimer(onEnd) {
  stopTimer();
  const t0 = performance.now();
  const bar = $('#tbar'), num = $('#tnum');
  const tick = () => {
    const left = Math.max(0, SECONDS - (performance.now() - t0) / 1000);
    bar.style.transform = `scaleX(${left / SECONDS})`;
    bar.classList.toggle('low', left < 5);
    num.textContent = Math.ceil(left);
    if (left <= 0) { stopTimer(); onEnd(); return; }
    timer = requestAnimationFrame(tick);
  };
  timer = requestAnimationFrame(tick);
}
function stopTimer() { if (timer) cancelAnimationFrame(timer); timer = null; }

function finishQuestion(ans) {
  stopTimer();
  const st = S();
  st.answers.push(ans);
  st.current = -1;
  if (st.answers.length >= QUESTIONS) st.done = true;
  persist();
  showReveal(st.answers.length - 1);
}

function showReveal(qi) {
  const st = S();
  const ans = st.answers[qi];
  const round = dive.rounds[qi];
  const tier = tierOf(ans.pts);
  const last = qi === QUESTIONS - 1;
  setDepth(totalPts());
  let body;
  if (ans.timeout) {
    body = `<p class="big-msg">Čas vypršel</p><p class="lead">Bez platné odpovědi zůstáváš v této kategorii u hladiny.</p>`;
  } else {
    const e = round.cat.entries[ans.idx];
    const share = round.shares[ans.idx];
    body = `
      <p class="your">Tvoje odpověď</p>
      <p class="answer">${esc(e.name)}</p>
      <p class="share">Napsalo ji <b>${pf(share)} %</b> dnešních hráčů</p>`;
  }
  app.innerHTML = `
  ${header(modeName() + ' · ' + (practice ? 'trénink' : 'ponor #' + diveNo) + ' · otázka ' + (qi + 1) + '/' + QUESTIONS)}
  <section class="card reveal tier-${tier}">
    <div class="qlabel">${esc(round.cat.q)}</div>
    <div class="catch">${spriteBox(tier, 4)}</div>
    ${body}
    <div class="tier-badge" style="--tc:${TIERS[tier].color}">${TIERS[tier].name}</div>
    <div class="gain"><b>+${ans.pts} b</b><span>${meters(ans.pts)}</span></div>
    <div class="gauge wide"><span>Celkem</span><b>${totalPts()} b · ${meters(totalPts())}</b></div>
    <button class="btn primary" id="next">${last ? 'Vynořit se a otevřít deník' : 'Další kategorie'}</button>
  </section>`;
  const next = $('#next');
  next.focus();
  next.onclick = () => last ? showResults() : nextQuestion();
}

// ---------- Deník ponoru ----------
const ZONES = [
  { to: 200, name: 'Epipelagiál', desc: 'sluneční zóna' },
  { to: 1000, name: 'Mezopelagiál', desc: 'zóna soumraku' },
  { to: 4000, name: 'Bathypelagiál', desc: 'půlnoční zóna' },
  { to: 6000, name: 'Abysopelagiál', desc: 'propast' },
  { to: Infinity, name: 'Hadál', desc: 'hlubokomořské příkopy' },
];
const zoneOf = m => ZONES.find(z => m < z.to) || ZONES[ZONES.length - 1];

function showResults() {
  stopTimer();
  const st = S();
  const total = totalPts();
  const depth = total * M_PER_PT;
  const better = clamp(normCdf(total, dive.mu, dive.sd) * 100, 0.1, 99.9);
  const zone = zoneOf(depth);
  setDepth(total);
  app.innerHTML = `
  ${header((practice ? 'Tréninkový ponor' : 'Deník ponoru #' + diveNo + ' · ' + esc(dateLabel())) + ' · ' + modeName())}
  ${modeTabs()}
  <section class="card result">
    <div class="score-row">
      <div><div class="qlabel">Skóre</div><div class="score">${total}<small> / 700</small></div></div>
      <div class="right"><div class="qlabel">Hloubka</div><div class="score depth">${meters(total)}</div></div>
    </div>
    <p class="zone">Ponor skončil v zóně <b>${zone.name}</b> (${zone.desc}).</p>
  </section>

  <section class="card">
    <h3 class="h3">Dnešní hráči</h3>
    ${gaussSVG(total)}
    <p class="lead center">Lepší než <b class="hl">${pf(better)} %</b> dnešních hráčů</p>
  </section>

  <section class="card">
    <h3 class="h3">Deník ponoru</h3>
    <p class="small">Klepni na úlovek a uvidíš svou odpověď i ty nejvzácnější možné.</p>
    <div class="log-wrap">${diveLogSVG()}</div>
    <div id="detail" class="detail" aria-live="polite"></div>
  </section>

  <section class="card">
    <div class="share-grid" aria-label="Souhrn">${st.answers.map(a => TIERS[tierOf(a.pts)].emoji).join(' ')}</div>
    <div class="actions">
      <button class="btn primary" id="share">Zkopírovat výsledek</button>
      <button class="btn ghost" id="practice">${practice ? 'Další trénink' : 'Tréninkový ponor'}</button>
      ${practice ? '<button class="btn ghost" id="home">Zpět na dnešní ponor</button>' : ''}
    </div>
    <p class="small center" id="copied" aria-live="polite"></p>
    ${practice ? '' : '<p class="small center">Další ponor za <b id="countdown"></b></p>'}
  </section>
  <p class="foot">Kategorie a odpovědi se každý den mění. Podíly odpovědí a rozložení hráčů jsou v této verzi simulované, protože hra nemá server.</p>`;

  document.querySelectorAll('.log-col').forEach(g => {
    const open = () => selectLog(+g.dataset.i);
    g.addEventListener('click', open);
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  let deepest = 0;
  st.answers.forEach((a, i) => { if (a.pts > st.answers[deepest].pts) deepest = i; });
  selectLog(deepest);

  $('#share').onclick = () => copyResult(total, better);
  $('#practice').onclick = startPractice;
  const home = $('#home');
  if (home) home.onclick = () => switchMode(mode);
  bindTabs();
  if (!practice) runCountdown();
}

function gaussSVG(score) {
  const W = 340, H = 130, x0 = 16, x1 = W - 16, yBase = 100, top = 14;
  const X = s => x0 + (s / 700) * (x1 - x0);
  const pdf = s => Math.exp(-0.5 * ((s - dive.mu) / dive.sd) ** 2);
  const pts = [];
  for (let s = 0; s <= 700; s += 5) pts.push([X(s), yBase - pdf(s) * (yBase - top)]);
  const line = 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
  const left = pts.filter(p => p[0] <= X(score));
  const area = left.length ? `M${x0},${yBase} L` + left.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ` L${X(score).toFixed(1)},${(yBase - pdf(score) * (yBase - top)).toFixed(1)} L${X(score).toFixed(1)},${yBase} Z` : '';
  const ticks = [0, 100, 200, 300, 400, 500, 600, 700].map(t =>
    `<line x1="${X(t)}" y1="${yBase}" x2="${X(t)}" y2="${yBase + 4}" class="axis"/><text x="${X(t)}" y="${yBase + 16}" class="tick" text-anchor="middle">${t}</text>`).join('');
  const sx = X(score), sy = yBase - pdf(score) * (yBase - top);
  return `<svg class="gauss" viewBox="0 0 ${W} ${H}" role="img" aria-label="Rozložení skóre dnešních hráčů, tvoje skóre ${score}">
    <path d="${area}" class="g-area"/>
    <path d="${line}" class="g-line"/>
    <line x1="${x0}" y1="${yBase}" x2="${x1}" y2="${yBase}" class="axis"/>
    ${ticks}
    <line x1="${sx}" y1="${top - 6}" x2="${sx}" y2="${yBase}" class="g-you"/>
    <circle cx="${sx}" cy="${sy}" r="3.5" class="g-dot"/>
    <text x="${clamp(sx, 30, W - 30)}" y="${top - 8 < 8 ? 10 : top - 8}" text-anchor="middle" class="g-label">TY</text>
  </svg>`;
}

function diveLogSVG() {
  const st = S();
  const W = 340, H = 340, left = 46, surf = 36, scale = 0.28; // 1000 m -> 280 px
  const colW = (W - left - 6) / QUESTIONS;
  const Y = m => surf + m * scale;
  let s = `<svg class="divelog" viewBox="0 0 ${W} ${H}" role="group" aria-label="Deník ponoru, sedm otázek">
  <defs>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a86b8"/><stop offset="0.25" stop-color="#17608f"/><stop offset="1" stop-color="#0a2c4f"/>
    </linearGradient>
    <filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="${left}" y="${surf}" width="${W - left}" height="${H - surf}" fill="url(#sea)"/>
  <rect x="${left}" y="${surf}" width="${W - left}" height="${200 * scale}" fill="#7ff9ff" opacity="0.05"/>
  <text x="${left + 4}" y="${Y(200) - 4}" class="zone-t">EPIPELAGIÁL</text>
  <text x="${left + 4}" y="${Y(200) + 12}" class="zone-t">MEZOPELAGIÁL</text>
  <line x1="${left}" y1="${Y(200)}" x2="${W}" y2="${Y(200)}" class="zone-l"/>`;
  // vlnky hladiny
  for (let x = left; x < W; x += 8) s += `<rect x="${x}" y="${surf - 2}" width="4" height="2" fill="#7ff9ff" opacity="0.7"/>`;
  for (let m = 0; m <= 1000; m += 125) {
    const major = m % 250 === 0;
    s += `<line x1="${left - (major ? 6 : 3)}" y1="${Y(m)}" x2="${left}" y2="${Y(m)}" class="axis"/>`;
    if (major) s += `<text x="${left - 9}" y="${Y(m) + 4}" text-anchor="end" class="tick">${m ? '−' + m : 0} m</text>`;
    if (major && m) s += `<line x1="${left}" y1="${Y(m)}" x2="${W}" y2="${Y(m)}" class="grid"/>`;
  }
  st.answers.forEach((a, i) => {
    const cx = left + colW * (i + 0.5);
    const depth = a.pts * M_PER_PT;
    const t = tierOf(a.pts);
    const y = Y(depth) + (a.pts ? 0 : 10);
    s += `<g class="log-col" data-i="${i}" tabindex="0" role="button" aria-label="Otázka ${i + 1}: ${esc(dive.rounds[i].cat.q)}, ${a.pts} bodů">
      <rect x="${cx - colW / 2 + 1}" y="0" width="${colW - 2}" height="${H}" class="col-hit"/>
      <text x="${cx}" y="16" text-anchor="middle" class="qnum">Q${i + 1}</text>
      <line x1="${cx}" y1="${surf}" x2="${cx}" y2="${y}" stroke="${TIERS[t].color}" class="cable"/>
      <g filter="url(#glow)">${spriteSVG(t, 1.6, cx, y)}</g>
      <text x="${cx}" y="${Math.min(H - 4, y + 22)}" text-anchor="middle" class="pts" fill="${TIERS[t].color}">${a.pts}</text>
    </g>`;
  });
  return s + '</svg>';
}

function selectLog(i) {
  document.querySelectorAll('.log-col').forEach(g => g.classList.toggle('sel', +g.dataset.i === i));
  const a = S().answers[i];
  const round = dive.rounds[i];
  const t = tierOf(a.pts);
  const order = round.shares.map((s, k) => k).sort((x, y) => round.shares[x] - round.shares[y]);
  const rare = order.slice(0, 4);
  const top = order[order.length - 1];
  const yours = a.timeout
    ? `<p>Čas vypršel${a.input ? ` (rozepsáno: „${esc(a.input)}“)` : ''}.</p>`
    : `<p>Tvoje odpověď: <b>${esc(round.cat.entries[a.idx].name)}</b>, ${pf(round.shares[a.idx])} % hráčů.</p>`;
  $('#detail').innerHTML = `
    <div class="d-head"><span class="d-q">Q${i + 1} · ${esc(round.cat.q)}</span><span class="d-tier" style="color:${TIERS[t].color}">${TIERS[t].name} · ${a.pts} b</span></div>
    ${yours}
    <p class="d-sub">Nejvzácnější platné odpovědi</p>
    <ul class="d-list">${rare.map(k => `<li><span>${esc(round.cat.entries[k].name)}</span><span>${pf(round.shares[k])} % · ${round.pts[k]} b</span></li>`).join('')}</ul>
    <p class="small">Nejčastější: ${esc(round.cat.entries[top].name)} (${pf(round.shares[top])} %, ${round.pts[top]} b)</p>`;
}

function copyResult(total, better) {
  const st = S();
  const txt = `HLUBINA ${modeName()} ${practice ? 'trénink' : '#' + diveNo}\n${total} b · ${meters(total)}\n${st.answers.map(a => TIERS[tierOf(a.pts)].emoji).join('')}\nLepší než ${pf(better)} % hráčů`;
  const done = ok => { $('#copied').textContent = ok ? 'Zkopírováno do schránky.' : txt; };
  try {
    navigator.clipboard.writeText(txt).then(() => done(true), () => done(false));
  } catch (e) { done(false); }
}

let cdTimer = null;
function runCountdown() {
  clearInterval(cdTimer);
  const el = () => $('#countdown');
  const tick = () => {
    const e = el(); if (!e) { clearInterval(cdTimer); return; }
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const s = Math.max(0, Math.floor((next - now) / 1000));
    if (s === 0) { location.reload(); return; }
    const p = n => String(n).padStart(2, '0');
    e.textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`;
  };
  tick();
  cdTimer = setInterval(tick, 1000);
}

// ---------- Mořský sníh v pozadí ----------
(function snow() {
  const c = $('#snow'); if (!c) return;
  const g = c.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let parts = [];
  function size() {
    c.width = Math.ceil(window.innerWidth / 2); c.height = Math.ceil(window.innerHeight / 2);
    parts = Array.from({ length: 110 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, v: 2 + Math.random() * 6, a: 0.2 + Math.random() * 0.5 }));
  }
  size(); window.addEventListener('resize', size);
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    g.clearRect(0, 0, c.width, c.height);
    for (const p of parts) {
      if (!reduce) { p.y -= p.v * dt; if (p.y < -2) { p.y = c.height + 2; p.x = Math.random() * c.width; } }
      g.fillStyle = `rgba(190,240,255,${p.a})`;
      g.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// ---------- Start ----------
if (saved.done) showResults();
else if (saved.answers.length > 0) nextQuestion();
else showIntro();

window.__hlubina = { CATS, MODES, matchAnswer, pointsFor, makeDive, tierOf };
})();
