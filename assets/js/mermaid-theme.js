/**
 * Mermaid diagrams in the notebook palette, read from the `--cc-*` CSS tokens.
 *
 * Chirpy's `post.min.js` calls `mermaid.initialize({ theme })`, and Mermaid 11
 * resets its config on every call, so a separate override would be wiped.
 * Instead this wraps `initialize` the moment the library sets `window.mermaid`,
 * which is why it must load before the deferred Mermaid bundle.
 */
(() => {
  const token = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(`--cc-${name}`).trim();

  const themeVariables = () => ({
    fontFamily: "'Space Grotesk', sans-serif",
    background: token('bg'),
    textColor: token('text'),
    titleColor: token('heading'),
    lineColor: token('primary'),

    primaryColor: token('surface'),
    primaryTextColor: token('text'),
    primaryBorderColor: token('outline'),
    secondaryColor: token('bg'),
    tertiaryColor: token('bg'),
    mainBkg: token('surface'),
    nodeBorder: token('outline'),
    clusterBkg: token('bg'),
    clusterBorder: token('outline'),
    edgeLabelBackground: token('bg'),

    noteBkgColor: token('surface'),
    noteBorderColor: token('pencil'),
    noteTextColor: token('text'),

    pie1: token('blue'),
    pie2: token('red'),
    pie3: token('green'),
    pie4: token('amber'),
    pie5: token('violet')
  });

  const wrap = (lib) => {
    if (!lib || typeof lib.initialize !== 'function' || lib.ccThemed) {
      return lib;
    }

    const initialize = lib.initialize.bind(lib);

    try {
      lib.initialize = (config = {}) =>
        initialize({
          ...config,
          theme: 'base',
          themeVariables: { ...themeVariables(), ...config.themeVariables }
        });
      lib.ccThemed = true;
    } catch (e) {
      /* a frozen export can't be wrapped; Mermaid keeps its stock theme */
    }

    return lib;
  };

  let mermaidLib = window.mermaid;

  Object.defineProperty(window, 'mermaid', {
    configurable: true,
    get: () => mermaidLib,
    set: (value) => {
      mermaidLib = wrap(value);
    }
  });
})();
