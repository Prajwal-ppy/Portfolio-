/* ===================================
   PRAJWAL YADAV — PORTFOLIO SCRIPT
   v2.0 — Animations, Particles, etc.
=================================== */

// =====================
// PARTICLE BACKGROUND
// =====================
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COUNT = 60;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

// =====================
// NAVBAR SCROLL EFFECT
// =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// =====================
// HAMBURGER MENU
// =====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// =====================
// ACTIVE NAV HIGHLIGHT
// =====================
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-item[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

// =====================
// SCROLL REVEAL
// =====================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// =====================
// TYPEWRITER EFFECT
// =====================
const typewriterEl = document.getElementById('typewriter');
const words = [
  'things with React + Node.js',
  'REST APIs that actually work',
  'full-stack MERN apps',
  'stuff I learn, then ship',
  'IoT projects with ESP32',
  'web apps from scratch',
];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
  const current = words[wordIndex];
  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, 40);
  } else {
    typewriterEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1600);
      return;
    }
    setTimeout(typeWriter, 70);
  }
}
setTimeout(typeWriter, 800);

// =====================
// PROFICIENCY BARS
// =====================
const proficiencyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.proficiency-fill');
      const pct = entry.target.querySelector('.proficiency-pct');
      if (!fill || !pct) return;

      const targetWidth = fill.getAttribute('data-width');
      const targetPct = parseInt(pct.getAttribute('data-pct'));

      // Animate bar
      requestAnimationFrame(() => {
        fill.style.width = targetWidth;
      });

      // Animate counter
      let count = 0;
      const interval = setInterval(() => {
        if (count >= targetPct) {
          clearInterval(interval);
          pct.textContent = targetPct + '%';
        } else {
          count += 2;
          pct.textContent = Math.min(count, targetPct) + '%';
        }
      }, 18);

      proficiencyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.proficiency-item').forEach(item => {
  proficiencyObserver.observe(item);
});

// =====================
// CONTACT FORM — real send via FormSubmit.co
// =====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    // Don't call e.preventDefault() — let the form POST for real
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"
        viewBox="0 0 24 24" style="animation:spin 0.8s linear infinite">
        <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20" opacity="0.4"/>
        <path d="M12 2a10 10 0 0 1 10 10"/>
      </svg>
      Sending...
    `;
    btn.disabled = true;
    // Note: page will navigate away to _next URL after FormSubmit delivers the email
  });
}

// =====================
// SMOOTH ANCHOR SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// =====================
// SPIN ANIMATION (CSS-in-JS fallback)
// =====================
const style = document.createElement('style');
style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(style);
