/**
 * Random colors from one generated palette: a highlighter for each new text
 * selection, and on every page load a border for each post image, post card
 * (home and "Further Reading") and the profile photo.
 *
 * The palette is one hue every 3° around the color wheel, leaving out the
 * yellow band. Selections use a soft, translucent tint so text stays
 * readable; borders use a deep solid shade (34% lightness is the lightest at
 * which every hue keeps 3:1 contrast on the paper) so a 1px line stays visible.
 */
(() => {
  const step = 3;
  const skip = [45, 65]; /* yellow hues */

  const hues = [];

  for (let h = 0; h < 360; h += step) {
    if (h < skip[0] || h > skip[1]) {
      hues.push(h);
    }
  }

  const randomHue = (list = hues) => list[Math.floor(Math.random() * list.length)];

  /* --- Borders --- */

  document
    .querySelectorAll(
      [
        '.content img:not(.no-border)',
        '#main-wrapper article > header .preview-img',
        '#post-list .post-preview',
        '#related-posts .post-preview',
        '#sidebar #avatar'
      ].join(', ')
    )
    .forEach((el) => {
      el.style.setProperty('--cc-random-border', `hsl(${randomHue()} 70% 34%)`);
    });

  /* --- Selection highlighter --- */

  /* each pick is at least this far from the last, so consecutive selections look different */
  const minDistance = 60;

  const distance = (a, b) => {
    const d = Math.abs(a - b) % 360;
    return Math.min(d, 360 - d);
  };

  const root = document.documentElement;
  let current = null;

  /* `selectstart` fires for mouse, touch and keyboard selections alike */
  document.addEventListener('selectstart', () => {
    current =
      current === null
        ? randomHue()
        : randomHue(hues.filter((h) => distance(h, current) >= minDistance));

    root.style.setProperty('--cc-selection', `hsl(${current} 90% 72% / 45%)`);
  });
})();
