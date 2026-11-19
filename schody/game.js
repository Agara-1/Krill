// KRILL TOWER — pixelova hra: vybehni po schodech mrakodrapu co nejvys.
(() => {
'use strict';

// ---------- Platno a skalovani ----------
const W = 112;
let H = 200;
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

function resize() {
  const aspect = window.innerHeight / window.innerWidth;
  H = Math.max(180, Math.min(240, Math.round(W * aspect)));
  canvas.width = W;
  canvas.height = H;
  const scale = Math.min(window.innerWidth / W, window.innerHeight / H);
  canvas.style.width = Math.floor(W * scale) + 'px';
  canvas.style.height = Math.floor(H * scale) + 'px';
  ctx.imageSmoothingEnabled = false;
}
window.addEventListener('resize', resize);
resize();

// ---------- Konstanty ----------
const STEP_W = 12;          // vodorovny posun jednoho schodu
const STEP_H = 8;           // vyska jednoho schodu
const STEPS_PER_FLOOR = 10; // kolik schodu je jedno patro
const FLOOR_H = STEP_H * STEPS_PER_FLOOR;
const MAX_COL = 3;          // jak daleko se schody muzou odchylit od stredu
const PLAYER_SCREEN_Y = 0.68;

// ---------- Pixelovy font 3x5 ----------
const FONT = {
  A:'25755',B:'65656',C:'34443',D:'65556',E:'74647',F:'74644',G:'34553',
  H:'55755',I:'72227',J:'11152',K:'55655',L:'44447',M:'57755',N:'65555',
  O:'25552',P:'65644',Q:'25563',R:'65655',S:'34216',T:'72222',U:'55557',
  V:'55552',W:'55775',X:'55255',Y:'55222',Z:'71247',
  '0':'75557','1':'26227','2':'61247','3':'61216','4':'55711','5':'74616',
  '6':'34757','7':'71222','8':'75757','9':'75716',
  ':':'02020','!':'22202','-':'00700','.':'00002','/':'11244',' ':'00000',
  '<':'12421','>':'42124','+':'02720','?':'61202'
};

function textWidth(str, s = 1) { return str.length * 4 * s - s; }

function drawText(str, x, y, color, s = 1, shadow = '#000') {
  str = String(str).toUpperCase();
  const pass = (ox, oy, col) => {
    ctx.fillStyle = col;
    for (let i = 0; i < str.length; i++) {
      const g = FONT[str[i]] || FONT['?'];
      for (let r = 0; r < 5; r++) {
        const bits = +g[r];
        for (let c = 0; c < 3; c++) {
          if (bits & (4 >> c)) ctx.fillRect(x + ox + (i * 4 + c) * s, y + oy + r * s, s, s);
        }
      }
    }
  };
  if (shadow) pass(s, s, shadow);
  pass(0, 0, color);
}
function drawTextC(str, cx, y, color, s = 1, shadow) {
  drawText(str, Math.round(cx - textWidth(str, s) / 2), y, color, s, shadow);
}

// ---------- Pomocne funkce ----------
const rand = Math.random;
function hash(a, b) {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = (h ^ (h >>> 13)) * 1274126177 | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
function mix(a, b, t) {
  return [0, 1, 2].map(i => Math.round(a[i] + (b[i] - a[i]) * t));
}
const rgb = c => `rgb(${c[0]},${c[1]},${c[2]})`;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ---------- Ulozeni ----------
function load(key, def) { try { const v = localStorage.getItem(key); return v === null ? def : JSON.parse(v); } catch (e) { return def; } }
function save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
let best = load('krill_best', 0);
let totalCoins = load('krill_coins', 0);
let muted = load('krill_muted', false);

// ---------- Zvuk (WebAudio, 8bit pipani) ----------
let actx = null;
function audio() {
  if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
  if (actx && actx.state === 'suspended') actx.resume();
  return actx;
}
function beep(freq, dur = 0.06, type = 'square', vol = 0.08, slide = 0) {
  if (muted) return;
  const a = audio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, a.currentTime);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), a.currentTime + dur);
  g.gain.setValueAtTime(vol, a.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
  o.connect(g); g.connect(a.destination);
  o.start(); o.stop(a.currentTime + dur);
}
const sfx = {
  step: n => beep(320 + (n % 8) * 30, 0.05, 'square', 0.05),
  coin: () => { beep(988, 0.06, 'square', 0.06); setTimeout(() => beep(1319, 0.1, 'square', 0.06), 60); },
  fall: () => beep(500, 0.7, 'sawtooth', 0.08, -440),
  floor: () => { beep(523, 0.08); setTimeout(() => beep(659, 0.08), 80); setTimeout(() => beep(784, 0.14), 160); },
  start: () => { beep(392, 0.08); setTimeout(() => beep(523, 0.12), 90); },
};

// ---------- Sprite hrace (8x11) ----------
// 1 vlasy, 2 kuze, 3 tricko, 4 kalhoty, 5 boty, 6 oko, 7 celenka
const PAL = { 1:'#3a2414', 2:'#f2c39b', 3:'#e8402f', 4:'#2d4fa3', 5:'#f5f5f5', 6:'#1a1a1a', 7:'#ffd23f' };
const SPR_RUN1 = [
  '..1111..',
  '.111111.',
  '.777777.',
  '.122262.',
  '..2222..',
  '..3333..',
  '.233332.',
  '..3333..',
  '..4444..',
  '.44..44.',
  '.55...55',
];
const SPR_RUN2 = [
  '..1111..',
  '.111111.',
  '.777777.',
  '.122262.',
  '..2222..',
  '..3333..',
  '..33332.',
  '.23333..',
  '..4444..',
  '...444..',
  '...555..',
];
const SPR_FALL = [
  '2..11..2',
  '3.1111.3',
  '33777733',
  '.322223.',
  '..2622..',
  '..3333..',
  '..3333..',
  '..4444..',
  '.44..44.',
  '44....44',
  '5......5',
];
function drawSprite(spr, x, y, flip) {
  for (let r = 0; r < spr.length; r++) {
    const row = spr[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[flip ? row.length - 1 - c : c];
      if (ch === '.') continue;
      ctx.fillStyle = PAL[ch];
      ctx.fillRect(x + c, y + r, 1, 1);
    }
  }
}

// ---------- Obloha podle vysky ----------
const SKY = [
  { a: 0,   top: '#4aa3ff', bot: '#b8e4ff' },
  { a: 120, top: '#3a74d9', bot: '#ffb36b' },
  { a: 240, top: '#2b2160', bot: '#d2577c' },
  { a: 380, top: '#0b0d2a', bot: '#2b2366' },
  { a: 600, top: '#000000', bot: '#0b0d2a' },
].map(k => ({ a: k.a, top: hexToRgb(k.top), bot: hexToRgb(k.bot) }));
function skyAt(alt) {
  for (let i = 0; i < SKY.length - 1; i++) {
    const k0 = SKY[i], k1 = SKY[i + 1];
    if (alt <= k1.a) {
      const t = clamp((alt - k0.a) / (k1.a - k0.a), 0, 1);
      return { top: mix(k0.top, k1.top, t), bot: mix(k0.bot, k1.bot, t) };
    }
  }
  const l = SKY[SKY.length - 1];
  return { top: l.top, bot: l.bot };
}

// ---------- Dekorace ----------
const stars = Array.from({ length: 60 }, () => ({ x: rand() * W, y: rand() * 400, b: rand() }));
const clouds = Array.from({ length: 40 }, (_, i) => ({
  wy: -200 - i * 90 - rand() * 60,
  x: rand() * 200 - 40,
  w: 14 + Math.floor(rand() * 18),
  speed: 2 + rand() * 4,
}));
const skyline = [];
for (let x = -20; x < W + 40;) {
  const w = 6 + Math.floor(rand() * 10);
  skyline.push({ x, w, h: 14 + Math.floor(rand() * 40) });
  x += w + 1;
}

// ---------- Stav hry ----------
let state = 'title'; // title | play | falling | over
let steps, p, score, timeLeft, coinsRun, dir;
let player, camX, camY, particles, popups, shake, stateT, newBest, flash, started;

function genStep(prev, prevDir) {
  let d = prevDir;
  if (rand() < 0.42) d = -d;
  if (prev.col + d > MAX_COL || prev.col + d < -MAX_COL) d = -d;
  return { col: prev.col + d, dir: d, coin: rand() < 0.1, taken: false };
}
function ensureSteps(n) {
  while (steps.length < n) {
    const prev = steps[steps.length - 1];
    steps.push(genStep(prev, prev.dir));
  }
}
function reset() {
  steps = [{ col: 0, dir: 1, coin: false, taken: true }];
  ensureSteps(60);
  steps[1].coin = false;
  p = 0; score = 0; timeLeft = 1; coinsRun = 0; dir = 1;
  player = { x: 0, y: 0, fx: 0, fy: 0, tx: 0, ty: 0, t: 1, vy: 0, vx: 0, frame: 0, flip: false };
  camX = 0; camY = 0;
  particles = []; popups = []; shake = 0; stateT = 0; newBest = false; flash = 0; started = false;
}
reset();

const worldX = col => col * STEP_W;
const worldY = i => -i * STEP_H;

function drainRate() { return 0.12 + Math.min(score, 400) * 0.0012; }

function stepInput(d) {
  if (state === 'title') { startGame(); return; }
  if (state === 'over') { if (stateT > 0.6) { reset(); startGame(); } return; }
  if (state !== 'play') return;
  started = true;
  const next = steps[p + 1];
  player.flip = d < 0;
  if (next.col - steps[p].col === d) {
    p++; score++;
    timeLeft = Math.min(1, timeLeft + 0.075);
    ensureSteps(p + 60);
    moveTo(worldX(next.col), worldY(p));
    player.frame ^= 1;
    sfx.step(score);
    dust(worldX(next.col), worldY(p));
    if (next.coin && !next.taken) {
      next.taken = true; coinsRun++;
      timeLeft = Math.min(1, timeLeft + 0.12);
      popups.push({ x: worldX(next.col), y: worldY(p) - 14, t: 0, txt: '+1', col: '#ffd23f' });
      for (let i = 0; i < 6; i++) particles.push({ x: worldX(next.col), y: worldY(p) - 8, vx: (rand() - 0.5) * 60, vy: -rand() * 60, life: 0.5, col: '#ffd23f' });
      sfx.coin();
    }
    if (score % (STEPS_PER_FLOOR * 5) === 0) {
      popups = popups.filter(po => !po.big);
      popups.push({ x: worldX(next.col), y: worldY(p) - 20, t: 0, txt: 'PATRO ' + (score / STEPS_PER_FLOOR), col: '#7cf27c', big: true });
      flash = 0.15;
      sfx.floor();
    }
  } else {
    // spatny smer — slapnes do prazdna
    moveTo(worldX(steps[p].col + d), worldY(p + 1));
    fall();
  }
}
function moveTo(x, y) {
  player.fx = player.x; player.fy = player.y;
  player.tx = x; player.ty = y; player.t = 0;
}
function fall() {
  state = 'falling'; stateT = 0;
  player.vy = -60; player.vx = (player.flip ? -1 : 1) * 15;
  shake = 0.35;
  sfx.fall();
  if (score > best) { best = score; newBest = true; save('krill_best', best); }
  totalCoins += coinsRun; save('krill_coins', totalCoins);
}
function startGame() { state = 'play'; stateT = 0; sfx.start(); }

function dust(x, y) {
  for (let i = 0; i < 3; i++) {
    particles.push({ x: x + (rand() - 0.5) * 8, y: y - 1, vx: (rand() - 0.5) * 20, vy: -rand() * 15, life: 0.35, col: '#e6e6ee' });
  }
}

// ---------- Ovladani ----------
window.addEventListener('keydown', e => {
  if (e.repeat) return;
  audio();
  const k = e.key.toLowerCase();
  if (k === 'arrowleft' || k === 'a') { stepInput(-1); e.preventDefault(); }
  else if (k === 'arrowright' || k === 'd') { stepInput(1); e.preventDefault(); }
  else if (k === ' ' || k === 'enter') {
    if (state === 'title') startGame();
    else if (state === 'over' && stateT > 0.6) { reset(); startGame(); }
    e.preventDefault();
  }
  else if (k === 'm') { muted = !muted; save('krill_muted', muted); }
});
function pointer(clientX, clientY) {
  audio();
  const r = canvas.getBoundingClientRect();
  const x = (clientX - r.left) / r.width * W;
  const y = (clientY - r.top) / r.height * H;
  // ikonka zvuku vpravo nahore
  if (x > W - 14 && y < 26 && y > 12) { muted = !muted; save('krill_muted', muted); return; }
  if (state === 'title' || state === 'over') { stepInput(0); return; }
  stepInput(x < W / 2 ? -1 : 1);
}
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  for (const t of e.changedTouches) pointer(t.clientX, t.clientY);
}, { passive: false });
canvas.addEventListener('mousedown', e => pointer(e.clientX, e.clientY));
document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

// ---------- Update ----------
function update(dt) {
  stateT += dt;
  shake = Math.max(0, shake - dt);
  flash = Math.max(0, flash - dt);

  if (state === 'play') {
    if (started) {
      timeLeft -= drainRate() * dt;
      if (timeLeft <= 0) { timeLeft = 0; player.flip = !player.flip; fall(); }
    }
  }

  // pohyb hrace
  if (state === 'falling' || state === 'over') {
    if (player.t < 1) {
      player.t = Math.min(1, player.t + dt / 0.08);
      player.x = player.fx + (player.tx - player.fx) * player.t;
      player.y = player.fy + (player.ty - player.fy) * player.t;
    } else {
      player.vy += 260 * dt;
      player.x += player.vx * dt;
      player.y += player.vy * dt;
    }
    if (state === 'falling' && stateT > 1.0) { state = 'over'; stateT = 0; }
  } else if (player.t < 1) {
    player.t = Math.min(1, player.t + dt / 0.07);
    const e = player.t;
    player.x = player.fx + (player.tx - player.fx) * e;
    player.y = player.fy + (player.ty - player.fy) * e - Math.sin(e * Math.PI) * 3;
  } else {
    player.x = player.tx; player.y = player.ty;
  }

  // kamera
  const targetX = state === 'play' || state === 'title' ? player.x : camX;
  const targetY = state === 'play' || state === 'title' ? player.y : camY;
  camX += (targetX - camX) * Math.min(1, dt * 10);
  camY += (targetY - camY) * Math.min(1, dt * 12);

  for (const pa of particles) { pa.x += pa.vx * dt; pa.y += pa.vy * dt; pa.vy += 120 * dt; pa.life -= dt; }
  particles = particles.filter(pa => pa.life > 0);
  for (const po of popups) po.t += dt;
  popups = popups.filter(po => po.t < (po.big ? 1.4 : 0.7));
  for (const c of clouds) { c.x += c.speed * dt; if (c.x > W + 60) c.x = -60; }
}

// ---------- Kresleni ----------
let ox = 0, oy = 0; // offset kamery do obrazovky
const sx = x => Math.round(x - camX + W / 2 + ox);
const sy = y => Math.round(y - camY + H * PLAYER_SCREEN_Y + oy);

function drawSky(alt) {
  const s = skyAt(alt);
  const bands = 14;
  for (let i = 0; i < bands; i++) {
    ctx.fillStyle = rgb(mix(s.top, s.bot, i / (bands - 1)));
    const y0 = Math.floor(i * H / bands);
    ctx.fillRect(0, y0, W, Math.ceil(H / bands) + 1);
  }
  // hvezdy
  const night = clamp((alt - 220) / 200, 0, 1);
  if (night > 0) {
    for (const st of stars) {
      const y = ((st.y + (-camY) * 0.02) % 400);
      if (y > H) continue;
      const tw = (Math.sin(perfNow * 3 + st.b * 20) + 1) / 2;
      if (st.b * night < 0.15 + tw * 0.1) continue;
      ctx.fillStyle = st.b > 0.85 ? '#fff6c8' : '#ffffff';
      ctx.fillRect(Math.floor(st.x), Math.floor(y), 1, 1);
    }
    // mesic
    ctx.globalAlpha = night;
    drawMoon(W - 26, 34);
    ctx.globalAlpha = 1;
  } else {
    // slunce
    const sunY = 30 + alt * 0.35;
    if (sunY < H) drawSun(18, Math.round(sunY), alt);
  }
}
function drawSun(cx, cy, alt) {
  const c = alt > 100 ? '#ffd27a' : '#fff1a8';
  ctx.fillStyle = c;
  ctx.fillRect(cx - 4, cy - 6, 9, 13);
  ctx.fillRect(cx - 6, cy - 4, 13, 9);
  ctx.fillRect(cx - 5, cy - 5, 11, 11);
}
function drawMoon(cx, cy) {
  ctx.fillStyle = '#f4f1d8';
  ctx.fillRect(cx - 3, cy - 5, 7, 11);
  ctx.fillRect(cx - 5, cy - 3, 11, 7);
  ctx.fillRect(cx - 4, cy - 4, 9, 9);
  ctx.fillStyle = '#d6d1ae';
  ctx.fillRect(cx - 2, cy - 2, 2, 2);
  ctx.fillRect(cx + 2, cy + 1, 2, 2);
}

function drawSkyline(alt) {
  const night = clamp((alt - 220) / 200, 0, 1);
  const base = Math.round(H * PLAYER_SCREEN_Y + 10 + (-camY) * 0.25);
  if (base - 60 > H) return;
  const colFar = rgb(mix([120, 150, 200], [25, 25, 60], night));
  const colNear = rgb(mix([80, 105, 160], [15, 15, 40], night));
  for (let layer = 0; layer < 2; layer++) {
    ctx.fillStyle = layer ? colNear : colFar;
    const off = layer ? 0 : 5;
    const px = layer ? 0.15 : 0.08;
    for (const b of skyline) {
      const h = layer ? b.h * 0.7 : b.h;
      const x = Math.round(((b.x + off * 3 - camX * px) % (W + 60) + W + 60) % (W + 60) - 30);
      ctx.fillRect(x, base - h - off, b.w, h + 200);
    }
  }
  // okenka v noci
  if (night > 0.3) {
    ctx.fillStyle = '#ffd86b';
    for (const b of skyline) {
      const x = Math.round(((b.x - camX * 0.15) % (W + 60) + W + 60) % (W + 60) - 30);
      for (let yy = 4; yy < b.h * 0.7 - 2; yy += 4)
        for (let xx = 1; xx < b.w - 1; xx += 3)
          if (hash(b.x + xx, yy) > 0.75) ctx.fillRect(x + xx, base - b.h * 0.7 + yy, 1, 1);
    }
  }
}

function drawClouds(front) {
  for (let i = 0; i < clouds.length; i++) {
    const c = clouds[i];
    if ((i % 4 === 0) !== front) continue;
    const par = front ? 1.15 : 0.6;
    const y = Math.round((c.wy - camY) * par + H * PLAYER_SCREEN_Y);
    if (y < -20 || y > H + 20) continue;
    const x = Math.round(c.x - camX * (front ? 0.6 : 0.2));
    ctx.fillStyle = front ? 'rgba(255,255,255,0.85)' : '#ffffff';
    ctx.fillRect(x, y, c.w, 4);
    ctx.fillRect(x + 3, y - 3, c.w - 8, 3);
    ctx.fillRect(x + 6, y - 5, c.w / 3 | 0, 2);
    ctx.fillStyle = front ? 'rgba(200,210,235,0.85)' : '#d4dcf0';
    ctx.fillRect(x + 1, y + 4, c.w - 2, 2);
  }
}

// mrakodrap za schody
const B_W = 72;
function drawTower(alt) {
  const night = clamp((alt - 220) / 200, 0, 1);
  const s = skyAt(alt);
  const left = Math.round(W / 2 - B_W / 2 - camX * 0.5 + ox);
  const wall = rgb(mix([150, 158, 178], [40, 42, 70], night));
  const wallDark = rgb(mix([110, 116, 140], [28, 30, 52], night));
  const glass = mix(s.top, [255, 255, 255], 0.25);
  const glass2 = mix(s.bot, [255, 255, 255], 0.15);
  const groundY = sy(STEP_H);

  ctx.fillStyle = wall;
  ctx.fillRect(left, 0, B_W, Math.min(H, groundY));
  ctx.fillStyle = wallDark;
  ctx.fillRect(left, 0, 2, Math.min(H, groundY));
  ctx.fillRect(left + B_W - 2, 0, 2, Math.min(H, groundY));

  // patra viditelna na obrazovce
  const topWorld = camY - H * PLAYER_SCREEN_Y - FLOOR_H;
  const botWorld = camY + H * (1 - PLAYER_SCREEN_Y) + FLOOR_H;
  const f0 = Math.floor(-botWorld / FLOOR_H);
  const f1 = Math.ceil(-topWorld / FLOOR_H);
  for (let f = Math.max(0, f0); f <= f1; f++) {
    const fy = sy(-f * FLOOR_H) + STEP_H; // spodek patra
    // okna
    for (let c = 0; c < 7; c++) {
      const wx = left + 4 + c * 10;
      const wy = fy - FLOOR_H + 10;
      const lit = night > 0.2 && hash(f, c) > 0.55;
      if (lit) {
        ctx.fillStyle = hash(c, f) > 0.5 ? '#ffd86b' : '#ffe9a8';
      } else {
        ctx.fillStyle = rgb(mix(glass, glass2, (c % 2) * 0.5));
      }
      ctx.fillRect(wx, wy, 6, FLOOR_H - 22);
      // odlesk
      if (!lit) {
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fillRect(wx + 1, wy + 2, 1, 10);
      }
      ctx.fillStyle = wallDark;
      ctx.fillRect(wx, wy + FLOOR_H - 22, 6, 1);
    }
    // podlahova rimsa s cislem patra
    ctx.fillStyle = wallDark;
    ctx.fillRect(left, fy - 9, B_W, 3);
    if (f > 0) {
      const label = String(f);
      ctx.fillStyle = '#1d2140';
      const lw = textWidth(label) + 4;
      ctx.fillRect(left + 3, fy - 17, lw, 8);
      drawText(label, left + 5, fy - 16, '#7cf27c', 1, null);
    }
  }

  // ulice a vchod
  if (groundY < H + 40) {
    ctx.fillStyle = '#3c3f52';
    ctx.fillRect(left + B_W / 2 - 9, groundY - 26, 18, 26);
    ctx.fillStyle = '#9fd3ff';
    ctx.fillRect(left + B_W / 2 - 7, groundY - 24, 6, 24);
    ctx.fillRect(left + B_W / 2 + 1, groundY - 24, 6, 24);
    ctx.fillStyle = '#e8402f';
    ctx.fillRect(left + B_W / 2 - 14, groundY - 32, 28, 5);
    drawTextC('KRILL', left + B_W / 2, groundY - 40, '#ffd23f', 1, '#000');
    ctx.fillStyle = '#8a8c99';
    ctx.fillRect(0, groundY, W, 5);
    ctx.fillStyle = '#b6b8c4';
    ctx.fillRect(0, groundY, W, 1);
    ctx.fillStyle = '#2b2d38';
    ctx.fillRect(0, groundY + 5, W, H);
    ctx.fillStyle = '#e6d34a';
    for (let x = -((camX * 1) % 16 + 16) % 16; x < W; x += 16) ctx.fillRect(Math.round(x + ox), groundY + 14, 8, 2);
  }
}

function drawStep(i) {
  const st = steps[i];
  const x = sx(worldX(st.col)) - STEP_W / 2;
  const y = sy(worldY(i));
  if (y < -10 || y > H + 10) return;
  // podpera
  ctx.fillStyle = '#4b4e63';
  ctx.fillRect(x + 4, y + 5, 4, 3);
  // schod
  ctx.fillStyle = '#5a5d73';
  ctx.fillRect(x, y + 1, STEP_W, 4);
  ctx.fillStyle = '#a7a9ba';
  ctx.fillRect(x, y, STEP_W, 3);
  ctx.fillStyle = '#e4e5ee';
  ctx.fillRect(x, y, STEP_W, 1);
  ctx.fillStyle = '#ffcf3a';
  ctx.fillRect(x, y + 3, 2, 1); ctx.fillRect(x + 4, y + 3, 2, 1); ctx.fillRect(x + 8, y + 3, 2, 1);
  // mince
  if (st.coin && !st.taken) {
    const bob = Math.round(Math.sin(perfNow * 5 + i) * 1.5);
    const cx = x + STEP_W / 2 - 2, cy = y - 9 + bob;
    const spin = Math.floor(perfNow * 6 + i) % 4;
    const w = spin === 1 || spin === 3 ? 2 : 4;
    ctx.fillStyle = '#b8860b';
    ctx.fillRect(cx + (4 - w) / 2, cy, w, 5);
    ctx.fillStyle = '#ffd23f';
    ctx.fillRect(cx + (4 - w) / 2, cy, Math.max(1, w - 1), 4);
  }
}

function drawPlayer() {
  const x = sx(player.x) - 4;
  const y = sy(player.y) - 11;
  let spr = player.frame ? SPR_RUN2 : SPR_RUN1;
  if (state === 'falling' || state === 'over') spr = SPR_FALL;
  if (state === 'title') spr = Math.floor(perfNow * 2) % 2 ? SPR_RUN1 : SPR_RUN2;
  // stin
  if (state === 'play' || state === 'title') {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(x + 1, sy(player.ty) - 1, 6, 1);
  }
  drawSprite(spr, x, y, player.flip);
}

function drawHUD() {
  ctx.fillStyle = 'rgba(8,10,30,0.55)';
  ctx.fillRect(0, 0, W, 33);
  ctx.fillStyle = 'rgba(8,10,30,0.8)';
  ctx.fillRect(0, 33, W, 1);
  // casovy pruh
  const bw = 70, bx = (W - bw) / 2, by = 4;
  ctx.fillStyle = '#000';
  ctx.fillRect(bx - 1, by - 1, bw + 2, 6);
  ctx.fillStyle = '#3a1020';
  ctx.fillRect(bx, by, bw, 4);
  const col = timeLeft > 0.5 ? '#5ee35e' : timeLeft > 0.25 ? '#ffd23f' : '#ff4a3a';
  const blink = timeLeft < 0.25 && Math.floor(perfNow * 8) % 2;
  ctx.fillStyle = blink ? '#ffffff' : col;
  ctx.fillRect(bx, by, Math.round(bw * timeLeft), 4);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillRect(bx, by, Math.round(bw * timeLeft), 1);

  drawTextC(String(score), W / 2, 13, '#ffffff', 2);
  drawTextC('PATRO ' + Math.floor(score / STEPS_PER_FLOOR), W / 2, 26, '#cfe8ff', 1);

  // mince
  ctx.fillStyle = '#ffd23f';
  ctx.fillRect(3, 14, 4, 5);
  ctx.fillStyle = '#b8860b';
  ctx.fillRect(6, 14, 1, 5);
  drawText(String(coinsRun), 9, 14, '#ffd23f');

  drawMuteIcon();
}
function drawMuteIcon() {
  const x = W - 11, y = 14;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y + 1, 2, 3);
  ctx.fillRect(x + 2, y, 1, 5);
  ctx.fillRect(x + 3, y - 1, 1, 7);
  if (muted) {
    ctx.fillStyle = '#ff4a3a';
    ctx.fillRect(x + 5, y, 1, 1); ctx.fillRect(x + 6, y + 1, 1, 1); ctx.fillRect(x + 7, y + 2, 1, 1);
    ctx.fillRect(x + 7, y, 1, 1); ctx.fillRect(x + 5, y + 2, 1, 1);
  } else {
    ctx.fillRect(x + 5, y + 1, 1, 3);
    ctx.fillRect(x + 7, y, 1, 5);
  }
}

function drawControls() {
  // napoveda dole: leva/prava pulka obrazovky
  const y = H - 16;
  const a = state === 'play' && score < 15 ? 0.9 : 0.25;
  ctx.globalAlpha = a;
  ctx.fillStyle = '#000';
  ctx.fillRect(4, y - 2, 22, 13);
  ctx.fillRect(W - 26, y - 2, 22, 13);
  drawText('<', 10, y + 1, '#ffffff', 2, null);
  drawText('>', W - 20, y + 1, '#ffffff', 2, null);
  ctx.globalAlpha = 1;
}

function panel(x, y, w, h) {
  ctx.fillStyle = '#000';
  ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  ctx.fillStyle = '#1d2140';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#3a4074';
  ctx.fillRect(x, y, w, 1);
  ctx.fillRect(x, y, 1, h);
}

function drawTitle() {
  ctx.fillStyle = 'rgba(10,12,40,0.35)';
  ctx.fillRect(0, 0, W, H);
  panel(6, 18, W - 12, 86);
  const bob = Math.round(Math.sin(perfNow * 2) * 2);
  drawTextC('KRILL', W / 2, 24 + bob, '#ffd23f', 4, '#7a2a10');
  drawTextC('TOWER', W / 2, 48 + bob, '#ffffff', 4, '#2d4fa3');
  drawTextC('VYBEHNI MRAKODRAP!', W / 2, 74, '#cfe8ff', 1);
  if (Math.floor(perfNow * 2) % 2) drawTextC('KLEPNI PRO START', W / 2, H - 46, '#ffffff', 1);
  drawTextC('< >  NEBO  A D', W / 2, H - 34, '#9fb4d9', 1);
  drawTextC('REKORD ' + best, W / 2, 88, '#7cf27c', 1);
  drawTextC('MINCE ' + totalCoins, W / 2, 96, '#ffd23f', 1);
}

function drawGameOver() {
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(0, 0, W, H);
  const pw = 88, ph = 82, px = (W - pw) / 2, py = Math.round(H / 2 - 52);
  panel(px, py, pw, ph);
  drawTextC('PAD!', W / 2, py + 6, '#ff4a3a', 3);
  drawTextC('SCHODY', W / 2, py + 26, '#9fb4d9');
  drawTextC(String(score), W / 2, py + 33, '#ffffff', 2);
  drawTextC('PATRO ' + Math.floor(score / STEPS_PER_FLOOR), W / 2, py + 46, '#cfe8ff');
  drawTextC('REKORD ' + best, W / 2, py + 55, '#7cf27c');
  drawTextC('MINCE +' + coinsRun, W / 2, py + 63, '#ffd23f');
  if (newBest && Math.floor(perfNow * 4) % 2) drawTextC('NOVY REKORD!', W / 2, py + 72, '#ffd23f');
  if (stateT > 0.6 && Math.floor(perfNow * 2) % 2) drawTextC('KLEPNI = ZNOVU', W / 2, py + ph + 8, '#ffffff');
}

let perfNow = 0;
function render() {
  const alt = Math.max(0, -camY / STEP_H);
  ox = shake > 0 ? Math.round((rand() - 0.5) * 4) : 0;
  oy = shake > 0 ? Math.round((rand() - 0.5) * 4) : 0;

  drawSky(alt);
  drawSkyline(alt);
  drawClouds(false);
  drawTower(alt);

  const from = Math.max(0, p - 30), to = Math.min(steps.length - 1, p + 30);
  for (let i = from; i <= to; i++) drawStep(i);

  for (const pa of particles) {
    ctx.fillStyle = pa.col;
    ctx.fillRect(sx(pa.x), sy(pa.y), 1, 1);
  }
  drawPlayer();
  drawClouds(true);

  for (const po of popups) {
    const y = sy(po.y) - Math.round(po.t * 18);
    if (po.big) drawTextC(po.txt, W / 2, 40 - Math.round(po.t * 6), po.col, 2);
    else drawTextC(po.txt, sx(po.x), y, po.col, 1);
  }

  if (flash > 0) { ctx.fillStyle = `rgba(255,255,255,${flash * 2})`; ctx.fillRect(0, 0, W, H); }

  if (state === 'title') drawTitle();
  else {
    drawHUD();
    if (state === 'play') drawControls();
    if (state === 'over') drawGameOver();
  }
}

// ---------- Smycka ----------
let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  perfNow = now / 1000;
  update(dt);
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// pro testy
window.__krill = { get state() { return state; }, get score() { return score; }, get steps() { return steps; }, get p() { return p; }, stepInput };
})();
