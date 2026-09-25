---
layout: compress
# WARNING: Don't use '//' to comment out code, use '{% comment %}' and '{% endcomment %}' instead.
---

{%- comment -%}
  Copied from jekyll-theme-chirpy 7.6.0; `tex` is unchanged (re-sync it when
  upgrading). Adds the Bonum font and the `#cc-ink` filter used by the stylesheet.

  See: <https://docs.mathjax.org/en/latest/options/input/tex.html#tex-options>
{%- endcomment -%}

MathJax = {
  tex: {
    {%- comment -%} start/end delimiter pairs for in-line math {%- endcomment -%}
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    {%- comment -%} start/end delimiter pairs for display math {%- endcomment -%}
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]']
    ],
    {%- comment -%} equation numbering {%- endcomment -%}
    tags: 'ams'
  },
  output: {
    {%- comment -%} fetched by MathJax 4 from cdn.jsdelivr.net {%- endcomment -%}
    font: 'mathjax-bonum'
  },
  startup: {
    pageReady() {
      {%- comment -%}
        Chrome only applies SVG filters that live in the same document, so the
        filter is injected here. `scale` sets the wobble strength.
      {%- endcomment -%}
      document.body.insertAdjacentHTML(
        'beforeend',
        '<svg width="0" height="0" aria-hidden="true" focusable="false" style="position: absolute">' +
          '<filter id="cc-ink" color-interpolation-filters="sRGB">' +
          '<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />' +
          '<feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />' +
          '</filter>' +
          '</svg>'
      );

      return MathJax.startup.defaultPageReady();
    }
  }
};
