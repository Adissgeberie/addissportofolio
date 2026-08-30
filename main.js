/* ============================================================
   PORTFOLIO — MAIN JAVASCRIPT
   ============================================================ */

(function () {
  "use strict";

  /* ── 1. NAVBAR: scroll-aware + active section ── */
  const navbar   = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links li a[href^='#'], .nav-drawer a[href^='#']");
  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    // Scrolled class
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active link via IntersectionObserver (fallback: manual check)
    let currentId = "";
    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) currentId = sec.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
    });

    // Back-to-top button
    const btn = document.getElementById("back-to-top");
    if (btn) {
      btn.classList.toggle("show", window.scrollY > 400);
    }

    // Proficiency bars — trigger when skills section in view
    const skillsSec = document.getElementById("skills");
    if (skillsSec) {
      const rect = skillsSec.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        animateBars();
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── 2. SMOOTH NAV CLICK ── */
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        closeDrawer();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h") || "72");
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ── 3. HAMBURGER MENU ── */
  const hamburger = document.getElementById("nav-hamburger");
  const drawer    = document.getElementById("nav-drawer");

  function closeDrawer() {
    hamburger && hamburger.classList.remove("open");
    drawer    && drawer.classList.remove("open");
  }

  if (hamburger && drawer) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      drawer.classList.toggle("open");
    });
    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !drawer.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  /* ── 4. TYPING ANIMATION ── */
  const typedEl = document.getElementById("typed-text");
  const roles   = [
    "Full-Stack Developer",
    "PHP / .NET Engineer",
    "MySQL Architect",
    "Desktop App Developer",
    "Problem Solver",
  ];
  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let typingTimer;

  function typeLoop() {
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        typingTimer = setTimeout(typeLoop, 2000); // pause before delete
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }
    typingTimer = setTimeout(typeLoop, deleting ? 60 : 90);
  }

  if (typedEl) typeLoop();

  /* ── 5. SCROLL REVEAL (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => revealObs.observe(el));

  /* ── 6. PROFICIENCY BARS ── */
  let barsAnimated = false;
  function animateBars() {
    if (barsAnimated) return;
    barsAnimated = true;
    document.querySelectorAll(".prof-bar-fill").forEach((bar) => {
      const pct = bar.dataset.pct || "0";
      bar.style.width = pct + "%";
    });
  }

  /* ── 7. HERO ORB PARALLAX ── */
  const orbs = document.querySelectorAll(".orb");
  let rafId;
  document.addEventListener("mousemove", (e) => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      orbs.forEach((orb, i) => {
        const strength = (i + 1) * 14;
        orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
    });
  });

  /* ── 8. CONTACT FORM ── */
  const form       = document.getElementById("contact-form");
  const formWrap   = document.getElementById("form-content");
  const formSuccess= document.getElementById("form-success");

  function validateField(input) {
    const group = input.closest(".form-group");
    const errEl = group && group.querySelector(".form-error-msg");
    const val   = input.value.trim();
    let   valid = true;
    let   msg   = "";

    if (!val) {
      valid = false;
      msg   = "This field is required.";
    } else if (input.type === "email") {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val)) {
        valid = false;
        msg   = "Please enter a valid email address.";
      }
    }

    if (group) group.classList.toggle("error", !valid);
    if (errEl) errEl.textContent = msg;
    return valid;
  }

  if (form) {
    // Real-time validation on blur
    form.querySelectorAll("input, textarea").forEach((inp) => {
      inp.addEventListener("blur", () => validateField(inp));
      inp.addEventListener("input", () => {
        const group = inp.closest(".form-group");
        if (group && group.classList.contains("error")) validateField(inp);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = [...form.querySelectorAll("input, textarea")];
      const allValid = inputs.every((inp) => validateField(inp));

      if (!allValid) return;

      // Simulate submission
      const btn = form.querySelector(".btn-submit");
      btn.textContent = "Sending…";
      btn.disabled    = true;

      setTimeout(() => {
        formWrap.style.display   = "none";
        formSuccess.classList.add("show");
      }, 1600);
    });
  }

  /* ── 9. BACK TO TOP ── */
  const backBtn = document.getElementById("back-to-top");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── 10. COUNTER ANIMATION ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    let   start  = 0;
    const dur    = 1800;
    const step   = 16;
    const increment = target / (dur / step);

    const tick = () => {
      start = Math.min(start + increment, target);
      el.textContent = Math.floor(start) + suffix;
      if (start < target) setTimeout(tick, step);
    };
    tick();
  }

  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("[data-target]").forEach((el) => counterObs.observe(el));

})();
