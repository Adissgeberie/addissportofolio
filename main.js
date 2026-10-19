/* =============================================
   GEBREMARYAM PORTFOLIO — main.js
   ============================================= */

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('section[id], .hero[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => observerNav.observe(sec));

/* ---------- Hamburger mobile menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('mobile-open');
});

// Close on nav link click
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('mobile-open');
  });
});

/* ---------- Typed text animation ---------- */
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Web Applications',
  'Full-Stack Systems',
  'PHP & MySQL Apps',
  'Responsive UIs',
  'REST APIs',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typingSpeed = 1400; // pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

setTimeout(type, 600);

/* ---------- Floating particles ---------- */
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 18;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 2;
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    animation-duration: ${Math.random() * 12 + 8}s;
    animation-delay: ${Math.random() * -15}s;
    opacity: ${Math.random() * 0.4 + 0.1};
  `;
  particlesContainer.appendChild(p);
}

/* ---------- Scroll-reveal animation ---------- */
const revealEls = document.querySelectorAll(
  '.hero-text, .hero-visual, .about-image, .about-text, ' +
  '.skill-category, .project-card, .contact-info, .contact-form, ' +
  '.section-header, .tech-pills'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Skill bars animation ---------- */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ---------- Counter animation ---------- */
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ---------- Back to top button ---------- */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Contact form (EmailJS) ---------- */

// ===================================================
//  REPLACE THESE 3 VALUES WITH YOUR EMAILJS DETAILS
//  Dashboard → https://dashboard.emailjs.com
// ===================================================
const EMAILJS_PUBLIC_KEY  = 'slAyt87oI378Ebv_X';
const EMAILJS_SERVICE_ID  = 'service_ppzv28s';
const EMAILJS_TEMPLATE_ID = 'template_5t3bucn';
// ===================================================

const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('contact-submit-btn');
const btnText     = submitBtn ? submitBtn.querySelector('.btn-text') : null;
const successMsg  = document.getElementById('form-success');

// Initialise EmailJS with your public key
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // --- Gather & validate fields ---
    const nameEl    = document.getElementById('contact-name');
    const emailEl   = document.getElementById('contact-email');
    const subjectEl = document.getElementById('contact-subject');
    const messageEl = document.getElementById('contact-message');

    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const subject = subjectEl.value.trim();
    const message = messageEl.value.trim();

    // Simple client-side validation
    if (!name || !email || !subject || !message) {
      [nameEl, emailEl, subjectEl, messageEl].forEach(el => {
        if (!el.value.trim()) el.style.borderColor = '#ef4444';
      });
      return;
    }

    // Reset error borders
    [nameEl, emailEl, subjectEl, messageEl].forEach(el => {
      el.style.borderColor = '';
    });

    // --- Loading state ---
    if (btnText) btnText.textContent = 'Sending…';
    submitBtn.disabled = true;
    if (successMsg) {
      successMsg.style.display = 'none';
      successMsg.classList.remove('show');
    }

    // --- Send via EmailJS ---
    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS SDK not loaded');
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  name,
        from_email: email,
        subject:    subject,
        message:    message,
        reply_to:   email,
      });

      // Success
      if (successMsg) {
        successMsg.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Message sent! I'll get back to you soon.
        `;
        successMsg.style.display = 'flex';
        successMsg.classList.add('show');
      }
      contactForm.reset();

    } catch (err) {
      console.error('EmailJS send error:', err);

      if (successMsg) {
        successMsg.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Failed to send. Please email me directly at
          <a href="mailto:gebremaryamgebru738@gmail.com" style="color:#00d4ff;margin-left:4px;">
            gebremaryamgebru738@gmail.com
          </a>
        `;
        successMsg.style.cssText = 'display:flex; background:rgba(239,68,68,0.08); border-color:rgba(239,68,68,0.3);';
        successMsg.classList.add('show');
      }

    } finally {
      if (btnText) btnText.textContent = 'Send Message';
      submitBtn.disabled = false;

      // Auto-hide message after 6 seconds
      setTimeout(() => {
        if (successMsg) {
          successMsg.style.display = 'none';
          successMsg.classList.remove('show');
          successMsg.style.cssText = '';
        }
      }, 6000);
    }
  });
}
