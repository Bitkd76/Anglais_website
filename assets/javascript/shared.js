// ─── CURSOR ───
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// ─── PARTICLES ───
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.5 - 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.speedX; this.y += this.speedY; this.life++;
      if (this.life > this.maxLife || this.y < 0) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fillStyle = `rgba(184,212,160,${this.opacity})`;
      ctx.fill();
    }
  }
  const particles = [];
  for (let i = 0; i < 60; i++) particles.push(new Particle());
  (function animParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animParticles);
  })();
}

// ─── COUNTERS (index only) ───
function animateCounter(el, target, suffix, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.round(start).toLocaleString('en-GB') + suffix;
  }, 16);
}
const c1 = document.getElementById('counter1');
const c2 = document.getElementById('counter2');
const c3 = document.getElementById('counter3');
if (c1 && c2 && c3) {
  setTimeout(() => {
    animateCounter(c1, 1000000, '', 2000);
    animateCounter(c2, 69, '%', 1500);
    animateCounter(c3, 1600, '', 1800);
  }, 800);
}

// ─── SCROLL REVEAL ───
document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 }).observe(el);
});

// ─── LEAVES ───
const leavesBg = document.getElementById('leavesBg');
if (leavesBg) {
  const leafSVGs = [
    `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><path d="M30 5 C10 20 5 45 30 75 C55 45 50 20 30 5Z" fill="white"/><line x1="30" y1="5" x2="30" y2="75" stroke="rgba(0,0,0,0.1)" stroke-width="0.5"/></svg>`,
    `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg"><path d="M5 25 C20 5 60 5 75 25 C60 45 20 45 5 25Z" fill="white"/></svg>`,
    `<svg viewBox="0 0 50 70" xmlns="http://www.w3.org/2000/svg"><path d="M25 5 C5 15 5 55 25 65 C45 55 45 15 25 5Z" fill="white"/></svg>`,
  ];
  for (let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    div.className = 'leaf';
    const s = 30 + Math.random() * 60;
    div.style.cssText = `left:${Math.random()*100}%;width:${s}px;height:${s}px;animation-duration:${10+Math.random()*15}s;animation-delay:-${Math.random()*20}s;`;
    div.innerHTML = leafSVGs[Math.floor(Math.random() * leafSVGs.length)];
    leavesBg.appendChild(div);
  }
}
