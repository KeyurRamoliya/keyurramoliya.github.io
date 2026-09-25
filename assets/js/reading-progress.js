/**
 * "~N min left" note, from Chirpy's reading time (`span.readtime em`) and the
 * reader's progress through the article (not the related posts and footer).
 */
(() => {
  const minMinutes = 3;
  const article = document.querySelector('#main-wrapper article');
  const readtime = article?.querySelector('header .readtime em');
  const total = readtime ? parseInt(readtime.textContent, 10) : NaN;

  if (!(total >= minMinutes)) {
    return;
  }

  const note = document.createElement('div');
  note.className = 'cc-time-left';
  note.setAttribute('aria-hidden', 'true');
  document.body.append(note);

  /*
   * The article's position is cached and re-measured only when its size
   * changes (e.g. images loading), so scrolling never forces a layout.
   */
  let articleTop = 0;
  let articleHeight = 0;

  const measure = () => {
    articleTop = article.getBoundingClientRect().top + window.scrollY;
    articleHeight = article.offsetHeight;
  };

  let ticking = false;
  let shown = '';

  const update = () => {
    ticking = false;

    const scrollable = articleHeight - window.innerHeight;
    const scrolled = window.scrollY - articleTop;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrolled / scrollable)) : 1;

    if (progress < 0.03 || progress > 0.97) {
      note.classList.remove('is-visible');
      return;
    }

    const text = `~${Math.max(1, Math.ceil(total * (1 - progress)))} min left`;

    /* only touch the DOM when the minute changes */
    if (text !== shown) {
      shown = text;
      note.textContent = text;
    }

    note.classList.add('is-visible');
  };

  /* at most one update per frame */
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  new ResizeObserver(() => {
    measure();
    onScroll();
  }).observe(article);

  measure();
  update();
})();
