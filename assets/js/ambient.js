/**
 * Builds the ambient background layer (animated in `.cc-ambient` in the
 * stylesheet) and a sidebar pause/play button that remembers the choice.
 */
(() => {
  const root = document.documentElement;
  const storageKey = 'cc-ambient';

  /* a random 10 of these are drawn on each page load; every third one rises, the rest float */
  const pool = [
    /* operators and calculus */
    '∑', '∏', '∫', '∬', '∮', '∂', '∇', '√', '∛', '∞', '±', '∓', '×', '÷', '∝', '∘',
    '⊕', '⊗', '′', '!',
    /* relations */
    '=', '≈', '≠', '≡', '≅', '∼', '≤', '≥', '≪', '≫', '⊥', '∥', '∠', '∴', '∵',
    /* logic and sets */
    '∀', '∃', '∄', '¬', '∧', '∨', '⇒', '⇔', '∈', '∉', '⊂', '⊃', '⊆', '⊇', '∪', '∩', '∅',
    'ℕ', 'ℤ', 'ℚ', 'ℝ', 'ℂ', 'ℵ',
    /* Greek letters */
    'α', 'β', 'γ', 'δ', 'ε', 'θ', 'κ', 'λ', 'μ', 'ξ', 'π', 'ρ', 'σ', 'τ', 'φ', 'χ', 'ψ', 'ω',
    'Γ', 'Δ', 'Θ', 'Λ', 'Π', 'Σ', 'Φ', 'Ψ', 'Ω'
  ];

  /* partial Fisher–Yates shuffle: an unbiased random pick without repeats */
  const glyphs = pool.slice();

  for (let i = 0; i < 10; i++) {
    const j = i + Math.floor(Math.random() * (glyphs.length - i));
    [glyphs[i], glyphs[j]] = [glyphs[j], glyphs[i]];
  }

  glyphs.length = 10;

  /* storage can be blocked (private mode, site settings) */
  const readChoice = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (e) {
      return null;
    }
  };

  const saveChoice = (value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch (e) {
      /* the toggle still works for this page */
    }
  };

  /*
   * Applied before the layer exists, so a paused scene never starts moving.
   * Without a saved choice, small screens start still to save battery.
   */
  const choice = readChoice();
  const smallScreen = window.matchMedia('(max-width: 767.98px)').matches;
  root.classList.toggle('cc-still', choice ? choice === 'still' : smallScreen);

  /*
   * Animation delays subtract this, so the motion continues across page loads.
   * It wraps hourly, when some cycles may skip once; at this opacity that's invisible.
   */
  root.style.setProperty('--cc-phase', ((Date.now() / 1000) % 3600).toFixed(2));

  const layer = (className) => {
    const el = document.createElement('div');
    el.className = className;
    return el;
  };

  const ambient = layer('cc-ambient');
  ambient.setAttribute('aria-hidden', 'true');

  const doodles = layer('cc-ambient-doodles');

  glyphs.forEach((glyph, i) => {
    const span = document.createElement('span');
    span.className = i % 3 === 2 ? 'is-rise' : 'is-float';
    span.style.setProperty('--i', i);
    span.textContent = glyph;
    doodles.append(span);
  });

  ambient.append(
    layer('cc-ambient-grid'),
    layer('cc-ambient-light'),
    layer('cc-ambient-grain'),
    doodles
  );

  document.body.prepend(ambient);

  /* pause the motion while scrolling, resuming shortly after it stops */
  let scrollTimer;

  window.addEventListener(
    'scroll',
    () => {
      root.classList.add('cc-scrolling');
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => root.classList.remove('cc-scrolling'), 200);
    },
    { passive: true }
  );

  const sidebarBottom = document.querySelector('#sidebar .sidebar-bottom');

  if (!sidebarBottom) {
    return;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'cc-motion-toggle';

  const icon = document.createElement('i');
  button.append(icon);

  const render = () => {
    const still = root.classList.contains('cc-still');

    icon.className = still ? 'fas fa-play' : 'fas fa-pause';
    button.setAttribute('aria-pressed', String(still));
    button.setAttribute(
      'aria-label',
      still ? 'Play background animation' : 'Pause background animation'
    );
    button.title = button.getAttribute('aria-label');
  };

  button.addEventListener('click', () => {
    const still = root.classList.toggle('cc-still');
    saveChoice(still ? 'still' : 'move');
    render();
  });

  render();
  sidebarBottom.prepend(button);
})();
