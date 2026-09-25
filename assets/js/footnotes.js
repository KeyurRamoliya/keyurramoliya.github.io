/**
 * Footnote margin notes and hover previews. The original footnote list stays,
 * so both copies are `aria-hidden` to avoid screen readers reading notes twice.
 */
(() => {
  const content = document.querySelector('article .content');
  const footnotes = content?.querySelector('.footnotes');

  if (!footnotes) {
    return;
  }

  const noteBody = (ref) => {
    const id = decodeURIComponent(ref.getAttribute('href').slice(1));
    const note = document.getElementById(id);

    if (!note || !footnotes.contains(note)) {
      return null;
    }

    const body = note.cloneNode(true);
    body.removeAttribute('id');
    body.querySelectorAll('.reversefootnote').forEach((backlink) => backlink.remove());
    return body;
  };

  const refs = content.querySelectorAll('sup a.footnote');

  /* a footnote cited more than once gets one margin note, at its first citation */
  const placed = new Set();

  refs.forEach((ref) => {
    const href = ref.getAttribute('href');

    if (placed.has(href)) {
      return;
    }

    const body = noteBody(ref);

    if (!body) {
      return;
    }

    placed.add(href);

    /* the aside is inserted before the top-level block that cites it */
    let block = ref;

    while (block.parentElement && block.parentElement !== content) {
      block = block.parentElement;
    }

    if (block.parentElement !== content) {
      return;
    }

    const num = document.createElement('span');
    num.className = 'cc-sidenote-num';
    num.textContent = ref.textContent;

    const firstParagraph = body.querySelector('p');

    if (firstParagraph) {
      firstParagraph.prepend(num);
    } else {
      body.prepend(num);
    }

    const aside = document.createElement('aside');
    aside.className = 'cc-sidenote';
    aside.setAttribute('aria-hidden', 'true');
    aside.append(...body.childNodes);

    content.insertBefore(aside, block);
  });

  /* hover previews only on devices with a real pointer */
  if (!window.matchMedia('(hover: hover)').matches) {
    return;
  }

  const pop = document.createElement('div');
  pop.className = 'cc-footnote-pop';
  pop.setAttribute('aria-hidden', 'true');
  document.body.append(pop);

  const margin = 8;

  const show = (ref) => {
    const body = noteBody(ref);

    if (!body) {
      return;
    }

    pop.replaceChildren(...body.childNodes);
    pop.classList.add('is-visible');

    /* measured after it's filled; kept inside the viewport horizontally */
    const rect = ref.getBoundingClientRect();
    const maxLeft = document.documentElement.clientWidth - pop.offsetWidth - margin;
    const left = Math.max(margin, Math.min(rect.left, maxLeft));

    pop.style.left = `${left + window.scrollX}px`;
    pop.style.top = `${rect.bottom + window.scrollY + margin}px`;
  };

  const hide = () => pop.classList.remove('is-visible');

  refs.forEach((ref) => {
    ref.addEventListener('mouseenter', () => show(ref));
    ref.addEventListener('focus', () => show(ref));
    ref.addEventListener('mouseleave', hide);
    ref.addEventListener('blur', hide);
  });
})();
