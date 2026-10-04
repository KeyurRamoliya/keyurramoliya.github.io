/* Figures for the mathematicians post (`_includes/mathematicians/`); the lifelines and the network share one pick */
(() => {
  const llFig = document.querySelector('.cc-ll');
  const netFig = document.querySelector('.cc-net');
  if (!llFig && !netFig) return;

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  };

  const instant = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const jump = (label, go) => {
    const b = el('button', 'cc-jump', label);
    b.type = 'button';
    b.addEventListener('click', go);
    return b;
  };

  /* phrased from the picked person's side of the link */
  const verb = (kind, own) => ({
    taught: own ? 'taught' : 'was taught by',
    built: own ? 'built on' : 'was built on by',
    rivals: 'clashed with',
    met: 'met or wrote to'
  })[kind];

  const yearText = (y, ad) => (y < 0 ? `${-y} BC` : y === 0 ? 'AD 1' : ad ? `AD ${y}` : String(y));

  const netData = netFig
    ? JSON.parse(netFig.querySelector('.cc-net-data').textContent)
    : { people: [], links: [] };
  const netIndex = new Map(netData.people.map((p, i) => [p.name, i]));
  const tiesOf = (name) => {
    const i = netIndex.get(name);
    if (i === undefined) return [];
    return netData.links
      .filter((l) => l && (l.a === i || l.b === i))
      .map((link) => ({ link, own: link.a === i, other: link.a === i ? link.b : link.a }));
  };

  const views = [];
  const pick = (name) => views.forEach((render) => render(name));
  /* set by the lifelines, so the network and histogram can point at them */
  let showLife = null;
  let showYears = null;

  if (netFig) {
    const svg = netFig.querySelector('svg');
    const menu = netFig.querySelector('select');
    const panel = netFig.querySelector('.cc-net-panel');
    const nodes = [...svg.querySelectorAll('.cc-net-node')];
    const paths = [...svg.querySelectorAll('.cc-net-link')];
    const pathLayer = svg.querySelector('.cc-net-links');

    views.push((name) => {
      const i = name == null ? undefined : netIndex.get(name);
      nodes.forEach((n) => n.classList.remove('is-on', 'is-lit'));
      paths.forEach((p) => p.classList.remove('is-lit'));
      svg.classList.toggle('is-picking', i !== undefined);
      menu.value = i === undefined ? '' : String(i);
      panel.replaceChildren();
      panel.hidden = i === undefined;
      if (i === undefined) return;

      nodes[i].classList.add('is-on');
      for (const path of paths) {
        const link = netData.links[path.dataset.k];
        if (link.a !== i && link.b !== i) continue;
        path.classList.add('is-lit');
        pathLayer.append(path); /* draws lit threads over the faded ones */
        nodes[link.a === i ? link.b : link.a].classList.add('is-lit');
      }

      const person = netData.people[i];
      const head = el('p', 'cc-net-head');
      const ties = tiesOf(name).sort((x, y) => x.other - y.other);
      head.append(el('b', '', person.label), ` ${person.dates} · ${ties.length} links `);
      if (showLife) head.append(jump('See lifeline ↑', () => showLife(name)));
      const list = el('ul');
      for (const { link, own, other } of ties) {
        const source = el('a', '', 'source');
        source.href = link.url;
        const item = el('li');
        item.append(
          el('span', `cc-net-kind is-${link.kind}`, verb(link.kind, own)),
          ' ',
          el('b', '', netData.people[other].label),
          ` (${link.when}): ${link.note}. `,
          source
        );
        list.append(item);
      }
      panel.append(head, el('p', 'cc-known', person.known), list);
    });

    menu.addEventListener('change', () => pick(menu.value === '' ? null : netData.people[menu.value].name));
    svg.addEventListener('click', (e) => {
      const node = e.target.closest('.cc-net-node');
      pick(!node || node.classList.contains('is-on') ? null : netData.people[node.dataset.i].name);
    });
  }

  if (llFig) {
    const plot = llFig.querySelector('.cc-ll-plot');
    const axis = llFig.querySelector('.cc-ll-axis');
    const cursor = llFig.querySelector('.cc-ll-cursor');
    const cursorLabel = cursor.querySelector('span');
    const range = llFig.querySelector('.cc-ll-range');
    const zoomButtons = Object.fromEntries([...llFig.querySelectorAll('[data-zoom]')].map((b) => [b.dataset.zoom, b]));
    const mini = llFig.querySelector('.cc-ll-mini');
    const miniStrip = llFig.querySelector('.cc-ll-mini-strip');
    const miniWindow = llFig.querySelector('.cc-ll-mini-window');
    const card = llFig.querySelector('.cc-ll-card');
    const chips = [...llFig.querySelectorAll('.cc-ll-region')];
    const bands = [...llFig.querySelectorAll('.cc-ll-band')].map((b) => ({ el: b, from: Number(b.dataset.from), to: Number(b.dataset.to) }));

    /* a single date is a floruit, so it counts as active for a generation either side */
    const people = [...llFig.querySelectorAll('.cc-ll-life')].map((b) => {
      const from = Number(b.dataset.from);
      const to = Number(b.dataset.to);
      const single = from === to;
      return { el: b, name: b.dataset.name, dates: b.dataset.dates, known: b.dataset.known, region: b.dataset.region, single, from, to,
        lo: single ? from - 25 : from, hi: single ? to + 25 : to, label: b.querySelector('.cc-ll-name') };
    });
    const byName = new Map(people.map((p) => [p.name, p]));
    llFig.classList.add('is-ready');

    const ALL = [-1800, 1960];
    const MIN_SPAN = 40;
    let view = [...ALL];
    let width = 1;

    /* lanes fit every name at NAMED_SPAN; wider views show only names with room */
    const NAMED_SPAN = 300;
    let lanes = [];
    const pack = () => {
      const perYear = width / NAMED_SPAN;
      lanes = [];
      for (const p of [...people].sort((a, b) => a.from - b.from)) {
        const end = p.to + (labelWidths.get(p) + (p.single ? 18 : 12)) / perYear;
        let row = lanes.findIndex((lane) => lane.end < p.from - 4 / perYear);
        if (row < 0) row = lanes.push({ end: 0, members: [] }) - 1;
        lanes[row].end = end;
        lanes[row].members.push(p);
        p.el.style.setProperty('--row', row);
      }
    };

    const centuries = [];
    for (let c = Math.floor(ALL[0] / 100); c < Math.ceil(ALL[1] / 100); c++) {
      centuries.push(people.filter((p) => p.lo <= c * 100 + 99 && p.hi >= c * 100).length);
    }
    const peak = Math.max(...centuries);
    for (const n of centuries) {
      const bar = el('span');
      bar.style.setProperty('--h', `${(n / peak) * 100}%`);
      miniStrip.append(bar);
    }

    const x = (y) => ((y - view[0]) / (view[1] - view[0])) * width;
    const yearAtX = (px) => view[0] + (px / width) * (view[1] - view[0]);
    const ticks = [];
    let labelWidths = new Map();

    function layout() {
      width = plot.clientWidth;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const head = parseFloat(getComputedStyle(plot).getPropertyValue('--head')) * rem;
      const lane = parseFloat(getComputedStyle(plot).getPropertyValue('--lane'));
      labelWidths = new Map(people.map((p) => [p, p.label.getBoundingClientRect().width]));
      pack();
      plot.style.height = `${head + lanes.length * lane + 4}px`;
      render();
    }

    function render() {
      const span = view[1] - view[0];
      const ad = view[0] < 0;

      for (const lane of lanes) {
        lane.members.forEach((p, k) => {
          const left = x(p.from);
          const right = x(p.to);
          p.el.style.transform = `translateX(${left.toFixed(1)}px)`;
          p.el.style.width = `${Math.max(right - left, 0).toFixed(1)}px`;
          const nameAt = Math.max(right, left + 4) + 6;
          const next = lane.members[k + 1];
          const room = Math.min(next ? x(next.from) - 6 : Infinity, width) - nameAt;
          p.el.classList.toggle('is-unnamed', nameAt < 0 || room < labelWidths.get(p) + 2);
        });
      }

      for (const band of bands) {
        const left = x(band.from);
        const right = x(band.to);
        band.el.style.left = `${left}px`;
        band.el.style.width = `${Math.max(right - left, 0)}px`;
        band.el.style.paddingLeft = `${Math.max(-left, 0)}px`;
      }

      const scale = width / span;
      const step = [10, 25, 50, 100, 200, 500].find((s) => s * scale >= 64) ?? 500;
      let t = Math.ceil(view[0] / step) * step;
      let i = 0;
      for (; t <= view[1]; t += step, i++) {
        if (!ticks[i]) ticks.push(axis.appendChild(el('span', 'cc-ll-tick')));
        ticks[i].hidden = false;
        ticks[i].style.left = `${x(t)}px`;
        ticks[i].textContent = yearText(t, ad);
      }
      for (; i < ticks.length; i++) ticks[i].hidden = true;

      const from = Math.round(view[0]);
      const to = Math.round(view[1]);
      range.replaceChildren(el('b', '', `${yearText(from, ad)} – ${yearText(to, ad)}`));
      zoomButtons.in.disabled = span <= MIN_SPAN + 0.5;
      zoomButtons.out.disabled = zoomButtons.all.disabled = span >= ALL[1] - ALL[0] - 0.5;

      const whole = ALL[1] - ALL[0];
      miniWindow.style.left = `${((view[0] - ALL[0]) / whole) * 100}%`;
      miniWindow.style.width = `${(span / whole) * 100}%`;
    }

    const setView = (a, b) => {
      const span = Math.min(Math.max(b - a, MIN_SPAN), ALL[1] - ALL[0]);
      const start = Math.min(Math.max(a + (b - a - span) / 2, ALL[0]), ALL[1] - span);
      view = [start, start + span];
      render();
    };
    const zoomAt = (factor, px) => {
      const at = yearAtX(px);
      setView(at - (at - view[0]) * factor, at + (view[1] - at) * factor);
    };
    let tween = 0;
    const glideTo = (a, b) => {
      cancelAnimationFrame(tween);
      if (instant) return setView(a, b);
      const start = [...view];
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min((now - t0) / 350, 1);
        const e = 1 - (1 - k) ** 3;
        setView(start[0] + (a - start[0]) * e, start[1] + (b - start[1]) * e);
        if (k < 1) tween = requestAnimationFrame(step);
      };
      tween = requestAnimationFrame(step);
    };
    const showRange = (a, b) => {
      const pad = (b - a) * 0.15 + 10;
      glideTo(a - pad, b + pad);
    };
    showYears = (a, b) => {
      llFig.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
      showRange(a, b);
    };
    showLife = (name) => {
      const p = byName.get(name);
      if (!p) return;
      llFig.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
      showRange(p.lo, p.hi);
    };

    zoomButtons.in.addEventListener('click', () => {
      const [a, b] = view;
      const q = (b - a) / 4;
      glideTo(a + q, b - q);
    });
    zoomButtons.out.addEventListener('click', () => {
      const [a, b] = view;
      const h = (b - a) / 2;
      glideTo(a - h, b + h);
    });
    zoomButtons.all.addEventListener('click', () => glideTo(...ALL));
    for (const band of bands) {
      band.el.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        showRange(band.from, band.to);
      });
    }

    /* plain wheels are left to scroll the page */
    plot.addEventListener('wheel', (e) => {
      const box = plot.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        zoomAt(Math.exp(e.deltaY * 0.01), e.clientX - box.left);
      } else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        const dy = (e.deltaX / width) * (view[1] - view[0]);
        setView(view[0] + dy, view[1] + dy);
      }
    }, { passive: false });

    plot.addEventListener('dblclick', (e) => {
      if (e.target.closest('.cc-ll-life, .cc-ll-band-name')) return;
      const box = plot.getBoundingClientRect();
      const at = yearAtX(e.clientX - box.left);
      const h = (view[1] - view[0]) / 4;
      glideTo(at - h, at + h);
    });

    const pointers = new Map();
    let dragged = false;
    let pinch = null;
    const release = (e) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (!pointers.size) plot.classList.remove('is-dragging');
    };
    plot.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.cc-ll-band-name')) return;
      pointers.set(e.pointerId, { x: e.clientX, start: e.clientX });
      dragged = false;
      if (pointers.size === 2) {
        const [p1, p2] = [...pointers.values()].map((p) => p.x);
        pinch = { dist: Math.abs(p1 - p2) || 1, view: [...view], mid: (p1 + p2) / 2 - plot.getBoundingClientRect().left };
      }
    });
    plot.addEventListener('pointermove', (e) => {
      const box = plot.getBoundingClientRect();
      /* a mouse released outside the plot never sent its pointerup here */
      if (pointers.has(e.pointerId) && e.pointerType === 'mouse' && e.buttons === 0) release(e);
      if (pointers.has(e.pointerId)) {
        const pointer = pointers.get(e.pointerId);
        const last = pointer.x;
        pointer.x = e.clientX;
        if (pointers.size === 2 && pinch) {
          const [p1, p2] = [...pointers.values()].map((p) => p.x);
          const factor = pinch.dist / (Math.abs(p1 - p2) || 1);
          const at = pinch.view[0] + (pinch.mid / width) * (pinch.view[1] - pinch.view[0]);
          setView(at - (at - pinch.view[0]) * factor, at + (pinch.view[1] - at) * factor);
          dragged = true;
        } else if (pointers.size === 1) {
          if (!dragged) {
            if (Math.abs(e.clientX - pointer.start) < 3) return;
            plot.setPointerCapture(e.pointerId);
            dragged = true;
            plot.classList.add('is-dragging');
          }
          const dy = ((e.clientX - last) / width) * (view[1] - view[0]);
          setView(view[0] - dy, view[1] - dy);
        }
        cursor.hidden = true;
        llFig.classList.remove('is-scanning');
        return;
      }
      if (e.pointerType !== 'mouse') return;
      const px = e.clientX - box.left;
      const year = Math.round(yearAtX(px));
      cursor.hidden = false;
      cursor.style.left = `${px}px`;
      cursor.classList.toggle('is-flip', px > width * 0.6);
      let alive = 0;
      for (const p of people) {
        const on = p.lo <= year && p.hi >= year;
        p.el.classList.toggle('is-alive', on);
        if (on) alive++;
      }
      cursorLabel.textContent = `${yearText(year, view[0] < 0)}: ${alive} alive`;
      llFig.classList.add('is-scanning');
    });
    /* browsers without `overflow: clip` scroll the plot to a focused life outside the view */
    plot.addEventListener('scroll', () => plot.scrollTo(0, 0));
    plot.addEventListener('pointerup', release);
    plot.addEventListener('pointercancel', release);
    plot.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!plot.hasPointerCapture(e.pointerId)) release(e);
      cursor.hidden = true;
      llFig.classList.remove('is-scanning');
    });
    plot.addEventListener('click', (e) => {
      /* only a pointer's click ends a drag; keyboard clicks (detail 0) always go through */
      if (dragged && e.detail > 0) {
        dragged = false;
        e.stopPropagation();
        return;
      }
      if (!e.target.closest('.cc-ll-life, .cc-ll-band-name')) pick(null);
    }, true);

    plot.addEventListener('keydown', (e) => {
      const span = view[1] - view[0];
      const keys = {
        ArrowLeft: () => glideTo(view[0] - span / 4, view[1] - span / 4),
        ArrowRight: () => glideTo(view[0] + span / 4, view[1] + span / 4),
        '+': () => zoomButtons.in.click(),
        '=': () => zoomButtons.in.click(),
        '-': () => zoomButtons.out.click(),
        0: () => zoomButtons.all.click()
      };
      if (e.target !== plot || !keys[e.key]) return;
      e.preventDefault();
      keys[e.key]();
    });

    let miniDrag = null;
    const miniYear = (clientX) => {
      const box = mini.getBoundingClientRect();
      return ALL[0] + ((clientX - box.left) / box.width) * (ALL[1] - ALL[0]);
    };
    mini.addEventListener('pointerdown', (e) => {
      const at = miniYear(e.clientX);
      const span = view[1] - view[0];
      if (e.target === miniWindow) {
        miniDrag = { at, view: [...view] };
        mini.setPointerCapture(e.pointerId);
      } else {
        glideTo(at - span / 2, at + span / 2);
      }
    });
    mini.addEventListener('pointermove', (e) => {
      if (!miniDrag) return;
      const dy = miniYear(e.clientX) - miniDrag.at;
      setView(miniDrag.view[0] + dy, miniDrag.view[1] + dy);
    });
    mini.addEventListener('pointerup', () => (miniDrag = null));
    mini.addEventListener('pointercancel', () => (miniDrag = null));

    addEventListener('resize', layout);
    document.fonts.ready.then(layout);
    layout();

    views.push((name) => {
      const sel = name == null ? undefined : byName.get(name);
      llFig.classList.toggle('is-picking', Boolean(sel));
      for (const p of people) {
        p.el.classList.remove('is-on', 'is-near', 'is-linked');
        p.el.setAttribute('aria-pressed', 'false');
      }
      card.replaceChildren();
      card.hidden = !sel;
      if (!sel) return;

      sel.el.classList.add('is-on');
      sel.el.setAttribute('aria-pressed', 'true');
      let near = 0;
      for (const p of people) {
        if (p !== sel && p.lo <= sel.hi && p.hi >= sel.lo) {
          p.el.classList.add('is-near');
          near++;
        }
      }

      const ties = tiesOf(name);
      const counts = new Map();
      for (const t of ties) {
        byName.get(netData.people[t.other].name)?.el.classList.add('is-linked');
        const phrase = verb(t.link.kind, t.own);
        counts.set(phrase, (counts.get(phrase) ?? 0) + 1);
      }

      const close = el('button', 'cc-ll-card-close', '×');
      close.type = 'button';
      close.setAttribute('aria-label', 'Close');
      close.addEventListener('click', () => pick(null));
      const head = el('p', 'cc-ll-card-head');
      head.append(el('b', '', name), ` ${sel.dates} · ${chips.find((c) => c.dataset.region === sel.region)?.textContent ?? ''}`);
      const body = el('p', 'cc-ll-card-body', `${sel.single ? 'Active' : 'Lived'} alongside ${near} others in the list. `);
      body.append(jump('Zoom to their lifetime', () => showRange(sel.lo, sel.hi)), ' ');
      if (ties.length) {
        body.append(
          `Ties, outlined: ${[...counts].map(([phrase, n]) => `${phrase} ${n}`).join(', ')}. `,
          jump('See in network ↓', () => netFig.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' }))
        );
      } else {
        body.append('No links to others in the list were found.');
      }
      card.append(close, head, el('p', 'cc-known', sel.known), body);
    });

    for (const p of people) {
      p.el.addEventListener('click', () => pick(p.el.classList.contains('is-on') ? null : p.name));
      p.el.addEventListener('focus', () => {
        if (!p.el.matches(':focus-visible')) return;
        const left = x(p.from);
        if (left < 0 || x(p.to) > width) showRange(p.lo, p.hi);
      });
    }

    for (const chip of chips) {
      chip.addEventListener('click', () => {
        chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
        const shown = new Set(chips.filter((c) => c.getAttribute('aria-pressed') === 'true').map((c) => c.dataset.region));
        llFig.classList.toggle('is-filtering', shown.size > 0);
        for (const p of people) p.el.classList.toggle('is-shown', shown.has(p.region));
      });
    }
  }

  const bars = [...document.querySelectorAll('.cc-density-bars > li')];
  if (showYears && bars.length) {
    let hue = Math.random() * 360;
    const choose = (bar) => {
      /* a clear change from the last colour, and never the bars' own blue */
      hue = (hue + 60 + Math.random() * 240) % 360;
      if (Math.abs(hue - 218) < 30) hue = (hue + 90) % 360;
      bars.forEach((b) => {
        b.classList.toggle('is-on', b === bar);
        b.setAttribute('aria-pressed', String(b === bar));
        b.style.removeProperty('--bar');
      });
      bar.style.setProperty('--bar', `hsl(${hue.toFixed(0)} 65% 45%)`);
      const from = Number(bar.dataset.from);
      showYears(from, from + 100);
    };
    for (const bar of bars) {
      bar.setAttribute('role', 'button');
      bar.setAttribute('tabindex', '0');
      bar.setAttribute('aria-label', `${bar.title}. Show in the lifelines`);
      bar.setAttribute('aria-pressed', 'false');
      bar.addEventListener('click', () => choose(bar));
      bar.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        choose(bar);
      });
    }
    bars[0].closest('.cc-density').classList.add('is-live');
  }
})();
