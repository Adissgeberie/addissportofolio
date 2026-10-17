/* =============================================
   FLAKA PORTFOLIO — style.css
   ============================================= */

/* ---------- CSS Variables ---------- */
:root {
  --clr-bg:          #080818;
  --clr-bg-2:        #0d0d24;
  --clr-bg-3:        #12122e;
  --clr-surface:     #1a1a3e;
  --clr-surface-2:   #22225a;
  --clr-border:      rgba(108, 99, 255, 0.18);

  --clr-primary:     #6c63ff;
  --clr-primary-2:   #857dff;
  --clr-accent:      #00d4ff;
  --clr-accent-2:    #00b8dc;
  --clr-green:       #34d399;
  --clr-amber:       #f59e0b;
  --clr-pink:        #ec4899;

  --clr-text:        #e8e8f5;
  --clr-text-2:      #a0a0c0;
  --clr-text-3:      #6a6a90;
  --clr-white:       #ffffff;

  --grad-primary:    linear-gradient(135deg, #6c63ff 0%, #00d4ff 100%);
  --grad-hero:       radial-gradient(ellipse at 70% 50%, rgba(108,99,255,0.25) 0%, rgba(0,212,255,0.1) 50%, transparent 75%);
  --grad-card:       linear-gradient(145deg, #1a1a3e 0%, #12122e 100%);

  --shadow-sm:       0 2px 12px rgba(0,0,0,0.4);
  --shadow-md:       0 8px 32px rgba(0,0,0,0.5);
  --shadow-lg:       0 20px 60px rgba(0,0,0,0.6);
  --shadow-glow:     0 0 30px rgba(108,99,255,0.35);
  --shadow-glow-cyan:0 0 30px rgba(0,212,255,0.25);

  --radius-sm:       8px;
  --radius-md:       14px;
  --radius-lg:       20px;
  --radius-xl:       28px;
  --radius-full:     9999px;

  --transition:      all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  --nav-h:           72px;
  --container-max:   1200px;
  --container-pad:   clamp(1rem, 5vw, 2rem);
}

/* ---------- Reset & Base ---------- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-h);
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--clr-bg);
  color: var(--clr-text);
  line-height: 1.7;
  overflow-x: hidden;
}

img { display: block; max-width: 100%; height: auto; }
a  { text-decoration: none; color: inherit; }
ul { list-style: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* ---------- Scrollbar ---------- */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--clr-bg); }
::-webkit-scrollbar-thumb { background: var(--clr-primary); border-radius: var(--radius-full); }

/* ---------- Selection ---------- */
::selection { background: rgba(108,99,255,0.35); color: var(--clr-white); }

/* =============================================
   UTILITIES
   ============================================= */
.container {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  transition: var(--transition);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.08);
  opacity: 0;
  transition: var(--transition);
}
.btn:hover::before { opacity: 1; }

.btn-primary {
  background: var(--grad-primary);
  color: var(--clr-white);
  box-shadow: 0 4px 20px rgba(108,99,255,0.4);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(108,99,255,0.55);
}

.btn-ghost {
  background: transparent;
  color: var(--clr-text);
  border: 1.5px solid var(--clr-border);
}
.btn-ghost:hover {
  border-color: var(--clr-primary);
  color: var(--clr-primary);
  transform: translateY(-2px);
}

.btn-full { width: 100%; justify-content: center; }
.btn-sm   { padding: 0.55rem 1.25rem; font-size: 0.875rem; }

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}
.section-tag {
  display: inline-block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--clr-accent);
  background: rgba(0,212,255,0.1);
  border: 1px solid rgba(0,212,255,0.25);
  padding: 0.35rem 1rem;
  border-radius: var(--radius-full);
  margin-bottom: 1rem;
}
.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 700;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}
.section-subtitle {
  color: var(--clr-text-2);
  font-size: 1.05rem;
  max-width: 520px;
  margin-inline: auto;
}

/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* =============================================
   NAVIGATION
   ============================================= */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  transition: var(--transition);
}

.navbar.scrolled {
  background: rgba(8, 8, 24, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--clr-border);
  box-shadow: var(--shadow-md);
}

.nav-container {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--clr-white);
  transition: var(--transition);
}
.nav-logo:hover { color: var(--clr-primary); }
.logo-bracket { color: var(--clr-primary); }

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.nav-link {
  font-size: 0.925rem;
  font-weight: 500;
  color: var(--clr-text-2);
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-sm);
  transition: var(--transition);
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px; left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px; height: 2px;
  background: var(--grad-primary);
  border-radius: var(--radius-full);
  transition: var(--transition);
}
.nav-link:hover, .nav-link.active {
  color: var(--clr-white);
}
.nav-link:hover::after, .nav-link.active::after {
  transform: translateX(-50%) scaleX(1);
}

.nav-cta { margin-left: 0.5rem; padding: 0.55rem 1.4rem; font-size: 0.9rem; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 24px; height: 2px;
  background: var(--clr-text);
  border-radius: var(--radius-full);
  transition: var(--transition);
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* =============================================
   HERO
   ============================================= */
.hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  background: var(--clr-bg);
  overflow: hidden;
}

/* BG shapes */
.hero-bg-shapes { position: absolute; inset: 0; pointer-events: none; }
.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: floatShape 10s ease-in-out infinite;
}
.shape-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%);
  top: -150px; right: -100px;
  animation-delay: 0s;
}
.shape-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%);
  bottom: 0; left: -80px;
  animation-delay: -4s;
}
.shape-3 {
  width: 250px; height: 250px;
  background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%);
  top: 40%; left: 40%;
  animation-delay: -7s;
}

@keyframes floatShape {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -30px) scale(1.05); }
  66%       { transform: translate(-20px, 20px) scale(0.95); }
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--clr-primary);
  opacity: 0.35;
  animation: floatParticle linear infinite;
}

@keyframes floatParticle {
  0%   { transform: translateY(100vh) scale(0); opacity: 0; }
  10%  { opacity: 0.4; }
  90%  { opacity: 0.2; }
  100% { transform: translateY(-100px) scale(1); opacity: 0; }
}

/* Hero layout */
.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  padding-top: var(--nav-h);
  padding-bottom: 3rem;
}

/* Hero text */
.hero-greeting {
  font-size: 1rem;
  color: var(--clr-accent);
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}
.hero-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
}
.name-main {
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-role {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 500;
  color: var(--clr-text-2);
  margin-bottom: 1.5rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.4em;
  flex-wrap: wrap;
}
.typed-wrapper { display: inline-flex; align-items: center; gap: 2px; }
.typed-text { color: var(--clr-accent); font-weight: 600; }
.cursor {
  display: inline-block;
  color: var(--clr-primary);
  animation: blink 0.85s step-end infinite;
  font-weight: 300;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.hero-description {
  color: var(--clr-text-2);
  font-size: 1.05rem;
  max-width: 480px;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.stat { display: flex; flex-direction: column; }
.stat-number {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--clr-white);
  line-height: 1;
}
.stat-plus { font-size: 1.2rem; font-weight: 700; color: var(--clr-primary); }
.stat-label { font-size: 0.8rem; color: var(--clr-text-3); margin-top: 2px; }
.stat-divider {
  width: 1px; height: 40px;
  background: var(--clr-border);
}

/* Hero Visual */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-ring {
  position: relative;
  width: 320px; height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container {
  width: 220px; height: 220px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
  box-shadow: var(--shadow-glow);
}
.avatar-svg { width: 100%; height: 100%; }

.ring {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  animation: spin linear infinite;
}
.ring-outer {
  width: 290px; height: 290px;
  border-width: 1.5px;
  border-color: var(--clr-primary) transparent transparent transparent;
  animation-duration: 10s;
}
.ring-middle {
  width: 260px; height: 260px;
  border-width: 1.5px;
  border-color: transparent var(--clr-accent) transparent transparent;
  animation-duration: 7s;
  animation-direction: reverse;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Tech Badges */
.tech-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(13, 13, 36, 0.9);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-sm);
  padding: 7px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--clr-text);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-md);
  animation: floatBadge ease-in-out infinite;
  z-index: 3;
  white-space: nowrap;
}
.badge-1 { top: 15px;  right: -30px; animation-duration: 4s; animation-delay: 0s; }
.badge-2 { bottom: 30px; left: -30px; animation-duration: 5s; animation-delay: -1.5s; }
.badge-3 { top: 70px;  left: -60px;  animation-duration: 4.5s; animation-delay: -0.8s; }
.badge-4 { bottom: 80px; right: -50px; animation-duration: 3.8s; animation-delay: -2s; }
.badge-5 { top: 50%;  right: -70px; animation-duration: 5.2s; animation-delay: -3s; }

@keyframes floatBadge {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.scroll-dot {
  width: 6px; height: 24px;
  border: 2px solid rgba(108,99,255,0.5);
  border-radius: var(--radius-full);
  position: relative;
  overflow: hidden;
}
.scroll-dot::after {
  content: '';
  position: absolute;
  top: 3px; left: 50%;
  transform: translateX(-50%);
  width: 3px; height: 6px;
  background: var(--clr-primary);
  border-radius: var(--radius-full);
  animation: scrollDown 1.8s ease-in-out infinite;
}
@keyframes scrollDown {
  0%   { top: 3px; opacity: 1; }
  80%  { top: 12px; opacity: 0; }
  100% { top: 3px; opacity: 0; }
}

/* =============================================
   ABOUT
   ============================================= */
.about {
  padding: 6rem 0;
  background: var(--clr-bg-2);
  position: relative;
}
.about::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--clr-primary), transparent);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.about-img-wrap {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: visible;
}
.about-illustration {
  width: 100%;
  border-radius: var(--radius-lg);
  border: 1px solid var(--clr-border);
  background: var(--clr-bg-3);
  display: block;
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}
.about-exp-badge {
  position: absolute;
  bottom: -20px; right: -20px;
  background: var(--grad-primary);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  text-align: center;
  box-shadow: var(--shadow-glow);
}
.exp-number {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--clr-white);
  line-height: 1;
}
.exp-label { font-size: 0.75rem; color: rgba(255,255,255,0.85); }

.about-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 700;
  color: var(--clr-white);
  margin-bottom: 1.25rem;
  line-height: 1.3;
}
.about-desc {
  color: var(--clr-text-2);
  margin-bottom: 1rem;
  line-height: 1.85;
}
.about-desc strong { color: var(--clr-primary); }

.about-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.75rem 0;
}
.info-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-md);
  padding: 0.875rem 1rem;
  transition: var(--transition);
}
.info-item:hover { border-color: var(--clr-primary); transform: translateY(-2px); }
.info-icon { font-size: 1.2rem; }
.info-label { display: block; font-size: 0.75rem; color: var(--clr-text-3); margin-bottom: 2px; }
.info-value  { display: block; font-size: 0.9rem; font-weight: 600; color: var(--clr-text); }
.status-available { color: var(--clr-green) !important; }

.about-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

/* =============================================
   SKILLS
   ============================================= */
.skills {
  padding: 6rem 0;
  background: var(--clr-bg);
  position: relative;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.skill-category {
  background: var(--grad-card);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  transition: var(--transition);
}
.skill-category:hover {
  border-color: rgba(108,99,255,0.4);
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow);
}

.skill-cat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.skill-cat-icon {
  width: 40px; height: 40px;
  background: rgba(108,99,255,0.15);
  border: 1px solid rgba(108,99,255,0.3);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-primary);
  flex-shrink: 0;
}
.skill-cat-header h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--clr-white);
}

.skill-items { display: flex; flex-direction: column; gap: 1rem; }

.skill-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--clr-text-2);
  margin-bottom: 6px;
}
.skill-info span:last-child {
  font-weight: 600;
  color: var(--clr-primary);
}

.skill-bar {
  height: 6px;
  background: rgba(255,255,255,0.07);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.skill-fill {
  height: 100%;
  width: 0%;
  background: var(--grad-primary);
  border-radius: var(--radius-full);
  transition: width 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.skill-fill.animated { width: var(--target); }

/* Tech Pills */
.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  padding-top: 1rem;
}
.pill {
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--clr-primary);
  background: rgba(108,99,255,0.1);
  border: 1px solid rgba(108,99,255,0.25);
  border-radius: var(--radius-full);
  padding: 0.4rem 1rem;
  transition: var(--transition);
  cursor: default;
}
.pill:hover {
  background: rgba(108,99,255,0.2);
  border-color: var(--clr-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108,99,255,0.3);
}

/* =============================================
   PROJECTS
   ============================================= */
.projects {
  padding: 6rem 0;
  background: var(--clr-bg-2);
  position: relative;
}
.projects::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--clr-accent), transparent);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

.project-card {
  background: var(--grad-card);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}
.project-card:hover {
  border-color: rgba(108,99,255,0.45);
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

.project-card-featured {
  border-color: rgba(0,212,255,0.25);
}
.project-card-featured:hover {
  border-color: var(--clr-accent);
  box-shadow: var(--shadow-lg), var(--shadow-glow-cyan);
}

/* Project image area */
.project-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--clr-bg-3);
}
.project-image img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.project-card:hover .project-image img { transform: scale(1.06); }

/* Overlay on hover */
.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 8, 24, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
  backdrop-filter: blur(4px);
}
.project-card:hover .project-overlay { opacity: 1; }

.project-links { display: flex; gap: 0.75rem; }

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--grad-primary);
  color: var(--clr-white);
  transition: var(--transition);
  transform: translateY(10px);
}
.project-card:hover .project-link { transform: translateY(0); }
.project-link:hover { opacity: 0.9; transform: translateY(-2px) !important; }

.project-link-ghost {
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.3);
  color: var(--clr-text);
  transition-delay: 0.05s;
}
.project-link-ghost:hover { border-color: var(--clr-accent); color: var(--clr-accent); }

/* Badge */
.project-badge {
  position: absolute;
  top: 12px; left: 12px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(108,99,255,0.85);
  color: var(--clr-white);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  backdrop-filter: blur(8px);
}
.project-badge-featured {
  background: rgba(0,212,255,0.85);
  color: #00182e;
}

/* Project info */
.project-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--clr-white);
  margin-bottom: 0.6rem;
}
.project-description {
  font-size: 0.875rem;
  color: var(--clr-text-2);
  line-height: 1.75;
  margin-bottom: 1rem;
  flex: 1;
}
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--clr-accent);
  background: rgba(0,212,255,0.1);
  border: 1px solid rgba(0,212,255,0.2);
  border-radius: var(--radius-full);
  padding: 0.25rem 0.7rem;
}
.project-meta {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--clr-border);
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--clr-text-3);
}

/* More card */
.project-card-more {
  border: 2px dashed rgba(108,99,255,0.3);
  background: transparent;
  min-height: 300px;
  cursor: default;
}
.project-card-more:hover {
  border-color: var(--clr-primary);
  background: rgba(108,99,255,0.05);
  transform: translateY(-4px);
  box-shadow: none;
}
.project-more-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  gap: 1rem;
  height: 100%;
}
.more-icon {
  color: rgba(108,99,255,0.4);
  transition: var(--transition);
}
.project-card-more:hover .more-icon { color: var(--clr-primary); }
.project-more-inner h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--clr-text-2);
}
.project-more-inner p {
  font-size: 0.875rem;
  color: var(--clr-text-3);
  line-height: 1.7;
}

/* =============================================
   CONTACT
   ============================================= */
.contact {
  padding: 6rem 0;
  background: var(--clr-bg);
  position: relative;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 4rem;
  align-items: start;
}

.contact-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--clr-white);
  margin-bottom: 1rem;
}
.contact-desc {
  color: var(--clr-text-2);
  line-height: 1.85;
  margin-bottom: 2rem;
}

.contact-methods { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  transition: var(--transition);
}
.contact-method:hover {
  border-color: var(--clr-primary);
  transform: translateX(6px);
  box-shadow: -4px 0 20px rgba(108,99,255,0.2);
}
.method-icon {
  width: 44px; height: 44px;
  background: rgba(108,99,255,0.12);
  border: 1px solid rgba(108,99,255,0.25);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-primary);
  flex-shrink: 0;
  transition: var(--transition);
}
.contact-method:hover .method-icon {
  background: var(--clr-primary);
  color: var(--clr-white);
}
.method-label { display: block; font-size: 0.75rem; color: var(--clr-text-3); }
.method-value { display: block; font-size: 0.9rem; font-weight: 600; color: var(--clr-text); }

.contact-availability {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--clr-green);
}
.availability-dot {
  width: 10px; height: 10px;
  background: var(--clr-green);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(52,211,153,0.5);
  animation: pulse-dot 1.8s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
  50%       { box-shadow: 0 0 0 8px rgba(52,211,153,0); }
}

/* Contact Form */
.contact-form {
  background: var(--grad-card);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-xl);
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--clr-text-2);
}
.form-group input,
.form-group textarea {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius-md);
  padding: 0.8rem 1rem;
  font-size: 0.925rem;
  font-family: 'Inter', sans-serif;
  color: var(--clr-text);
  transition: var(--transition);
  resize: none;
  outline: none;
}
.form-group input::placeholder,
.form-group textarea::placeholder { color: var(--clr-text-3); }
.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--clr-primary);
  background: rgba(108,99,255,0.06);
  box-shadow: 0 0 0 3px rgba(108,99,255,0.12);
}

.form-success {
  display: none;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--clr-green);
  background: rgba(52,211,153,0.08);
  border: 1px solid rgba(52,211,153,0.25);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
}
.form-success.show { display: flex; }

/* =============================================
   FOOTER
   ============================================= */
.footer {
  padding: 2.5rem 0;
  background: var(--clr-bg-2);
  border-top: 1px solid var(--clr-border);
}
.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
}
.footer-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--clr-white);
}
.footer-copy {
  font-size: 0.875rem;
  color: var(--clr-text-3);
}
.heart { color: var(--clr-pink); }
.footer-socials { display: flex; gap: 0.75rem; }
.social-link {
  width: 38px; height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-sm);
  color: var(--clr-text-2);
  transition: var(--transition);
}
.social-link:hover {
  background: var(--clr-primary);
  border-color: var(--clr-primary);
  color: var(--clr-white);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(108,99,255,0.4);
}

/* =============================================
   BACK TO TOP
   ============================================= */
.back-to-top {
  position: fixed;
  bottom: 2rem; right: 2rem;
  z-index: 900;
  width: 44px; height: 44px;
  background: var(--grad-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-white);
  box-shadow: var(--shadow-glow);
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  transition: var(--transition);
}
.back-to-top.visible {
  opacity: 1;
  pointer-events: all;
  transform: translateY(0);
}
.back-to-top:hover { transform: translateY(-3px); }

/* =============================================
   RESPONSIVE
   ============================================= */
@media (max-width: 1024px) {
  .hero-content      { gap: 2.5rem; }
  .projects-grid     { grid-template-columns: 1fr 1fr; }
  .project-card-more { display: none; }
}

@media (max-width: 900px) {
  .skills-grid   { grid-template-columns: 1fr; }
  .about-content { grid-template-columns: 1fr; gap: 3rem; }
  .contact-content { grid-template-columns: 1fr; gap: 2.5rem; }
  .about-image { max-width: 420px; margin-inline: auto; }
}

@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }

  .nav-links.mobile-open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: var(--nav-h); left: 0; right: 0;
    background: rgba(8,8,24,0.97);
    backdrop-filter: blur(20px);
    padding: 2rem var(--container-pad);
    gap: 0.5rem;
    border-bottom: 1px solid var(--clr-border);
    z-index: 999;
  }
  .nav-links.mobile-open .nav-link { font-size: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--clr-border); }
  .nav-links.mobile-open + .btn { display: flex; margin: 0; }

  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: calc(var(--nav-h) + 2rem);
    gap: 3rem;
  }
  .hero-description { margin-inline: auto; }
  .hero-cta  { justify-content: center; }
  .hero-stats { justify-content: center; }
  .hero-visual { display: none; }

  .projects-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .footer-content { flex-direction: column; text-align: center; }
}

@media (max-width: 480px) {
  .hero-stats   { gap: 1rem; }
  .about-info-grid { grid-template-columns: 1fr; }
  .contact-form { padding: 1.5rem; }
  .back-to-top  { bottom: 1rem; right: 1rem; }
}
