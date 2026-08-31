/* =============================================
   FLAKA PORTFOLIO — main.js
   ============================================= */

'use strict';

// ─── Navbar scroll effect ───────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  toggleBackToTop();
  highlightNavOnScroll();
});

// ─── Hamburger menu ─────────────────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');
const navCta     = document.querySelector('.nav-cta');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

// ─── Active nav link on scroll ───────────────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

function highlightNavOnScroll() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

// ─── Typed text effect ───────────────────────────────────────────────────────
const typedEl  = document.getElementById('typed-text');
const phrases  = [
  'PHP & MySQL Apps',
  'Dynamic Web Pages',
  'Beautiful UIs with CSS3',
  'Database-Driven Systems',
  'Clean HTML5 Markup',
];
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
let typingTimeout;

function typeLoop() {
  const current = phrases[phraseIdx];

  if (deleting) {
    charIdx--;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingTimeout = setTimeout(typeLoop, 400);
      return;
    }
    typingTimeout = setTimeout(typeLoop, 45);
  } else {
    charIdx++;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting      = true;
      typingTimeout = setTimeout(typeLoop, 1800);
      return;
    }
    typingTimeout = setTimeout(typeLoop, 90);
  }
}
typeLoop();

// ─── Particle system ─────────────────────────────────────────────────────────
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 28;

function createParticle() {
  const p     = document.createElement('div');
  p.className = 'particle';
  const size  = Math.random() * 4 + 2;
  const left  = Math.random() * 100;
  const dur   = Math.random() * 12 + 8;
  const delay = Math.random() * 10;
  const colors = ['#6c63ff', '#00d4ff', '#a78bfa', '#34d399'];
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${left}%;
    animation-duration:${dur}s;
    animation-delay:-${delay}s;
    background:${colors[Math.floor(Math.random() * colors.length)]};
  `;
  particlesContainer.appendChild(p);
}

for (let i = 0; i < PARTICLE_COUNT; i++) createParticle();

// ─── Counter animation ───────────────────────────────────────────────────────
const counters  = document.querySelectorAll('.stat-number');
let countersRan = false;

function animateCounters() {
  if (countersRan) return;
  const heroSection = document.getElementById('home');
  const rect = heroSection.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    countersRan = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const dur    = 1200;
      const step   = Math.ceil(dur / target);
      let current  = 0;
      const timer  = setInterval(() => {
        current++;
        counter.textContent = current;
        if (current >= target) clearInterval(timer);
      }, step);
    });
  }
}
window.addEventListener('scroll', animateCounters);
animateCounters(); // run on load too

// ─── Scroll reveal ───────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.skill-category, .project-card, .contact-method, .info-item, ' +
  '.about-image, .about-text, .section-header, .contact-info, .contact-form'
);

revealEls.forEach(el => el.classList.add('reveal'));

function revealOnScroll() {
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ─── Skill bar animation ──────────────────────────────────────────────────────
const skillFills   = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  const section = document.getElementById('skills');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsAnimated = true;
    skillFills.forEach((fill, i) => {
      setTimeout(() => fill.classList.add('animated'), i * 80);
    });
  }
}
window.addEventListener('scroll', animateSkills);
animateSkills();

// ─── Contact form ─────────────────────────────────────────────────────────────
const contactForm    = document.getElementById('contact-form');
const formSuccess    = document.getElementById('form-success');
const submitBtn      = document.getElementById('contact-submit-btn');
const submitBtnText  = submitBtn.querySelector('.btn-text');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    shakeForm();
    return;
  }
  if (!isValidEmail(email)) {
    highlightField(document.getElementById('contact-email'));
    return;
  }

  // Simulate sending
  submitBtnText.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtnText.textContent = 'Send Message';
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function highlightField(el) {
  el.style.borderColor = '#ec4899';
  el.focus();
  setTimeout(() => (el.style.borderColor = ''), 2000);
}

function shakeForm() {
  contactForm.style.animation = 'none';
  contactForm.offsetHeight; // reflow
  contactForm.style.animation = 'shake 0.4s ease';
}

// Shake keyframe via JS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-5px)}
    80%{transform:translateX(5px)}
  }
`;
document.head.appendChild(shakeStyle);

// ─── Back to top ─────────────────────────────────────────────────────────────
const backToTopBtn = document.getElementById('back-to-top');

function toggleBackToTop() {
  backToTopBtn.classList.toggle('visible', window.scrollY > 500);
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Footer year ─────────────────────────────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ─── Smooth scroll for all anchor links ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Tech pills stagger animation ────────────────────────────────────────────
const pills        = document.querySelectorAll('.pill');
let pillsAnimated  = false;

function animatePills() {
  if (pillsAnimated) return;
  const section = document.getElementById('skills');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    pillsAnimated = true;
    pills.forEach((pill, i) => {
      pill.style.opacity   = '0';
      pill.style.transform = 'translateY(12px)';
      setTimeout(() => {
        pill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        pill.style.opacity    = '1';
        pill.style.transform  = 'translateY(0)';
      }, i * 60);
    });
  }
}
window.addEventListener('scroll', animatePills);
animatePills();

// ─── Project card tilt effect ────────────────────────────────────────────────
document.querySelectorAll('.project-card:not(.project-card-more)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) *  4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── Greeting emoji wave ─────────────────────────────────────────────────────
const greetingEl = document.querySelector('.hero-greeting');
if (greetingEl) {
  greetingEl.style.display     = 'inline-flex';
  greetingEl.style.alignItems  = 'center';
  greetingEl.style.gap         = '6px';
}

// ─── Initial page load animation ─────────────────────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
