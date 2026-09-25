# Upgrading the Chirpy theme

This site runs [jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) with a custom "engineer's notebook" restyle. Several theme files are overridden, so the theme version is **pinned** in `Gemfile` (`gem "jekyll-theme-chirpy", "7.6.0"`) and upgrades should be deliberate.

## Files that replace Chirpy's own

A site file with the same path as a theme file wins, so upstream fixes to these **do not reach the site** until they are merged by hand. Each was copied from **Chirpy 7.6.0**.

| Site file | What to keep when re-syncing |
|---|---|
| `_layouts/home.html` | The parts marked `cc:` (tagline header, featured card, reading time on cards). |
| `assets/css/jekyll-theme-chirpy.scss` | Only the two `@use` lines at the top mirror Chirpy's file (with custom fonts); everything below is the restyle. |
| `assets/js/data/mathjax.js` | The `output` (Bonum font) and `startup` (`#cc-ink` filter) blocks; re-sync the `tex` block. |
| `assets/404.html` | The whole notebook-style note. |

## Files merged with or hooked into Chirpy

These don't replace theme files, so they're lower risk:

- `_data/origin/cors.yml` is **deep-merged** over Chirpy's copy and only overrides `webfonts` and `mathjax.js`. MathJax is pinned to `mathjax@4/tex-mml-chtml-nofont.js`: if Chirpy moves to a new MathJax major version, update this URL to match.
- `_includes/metadata-hook.html` is Chirpy's official (empty) hook for site additions. It loads the site's scripts.

## What depends on Chirpy's internals

These keep building but can **silently break** if Chirpy renames markup, classes or variables:

- **Stylesheet selectors and variables.** The stylesheet targets Chirpy markup (`#post-list`, `#related-posts`, `.post-preview`, `#toc-wrapper .is-active-link`, `.code-header`, `#avatar`, `.sidebar-bottom`, `#archives`, `.table-wrapper`, …) and remaps Chirpy's CSS variables (`--card-shadow`, `--sidebar-btn-color`, `--toc-highlight`, …). Comments cite the Chirpy file and line each override targets.
- **Overrides of hard-coded theme values**: the orange link hover, archive stripes, table header rule, search box width, code header margins. Check they're still needed.
- **Scripts in `assets/js/`**:
  - `mermaid-theme.js` wraps the `mermaid.initialize` call made by Chirpy's `post.min.js`.
  - The "COPIED" stamp relies on the copy button's `timeout` attribute.
  - `reading-progress.js` reads the post's `.readtime em`.
  - Image tape waits for Chirpy to remove the `.shimmer` class from loaded images.
  - `ambient.js` adds its pause button to `#sidebar .sidebar-bottom`.
  - `footnotes.js` relies on kramdown's footnote markup (`sup a.footnote`, `div.footnotes`).

## Upgrade checklist

1. Create a branch and read Chirpy's release notes for every version in between.
2. Change the version in `Gemfile`, then run `bundle update jekyll-theme-chirpy`.
3. Diff each file in **Files that replace Chirpy's own** between the old and new theme versions (`bundle info --path jekyll-theme-chirpy` shows where the gem is installed), and port the upstream changes into the site copies.
4. Build both ways; Sass module or variable renames fail here:
   - `bundle exec jekyll build`
   - `JEKYLL_ENV=production bundle exec jekyll build`
5. Serve `_site` (e.g. `python -m http.server 4000 -d _site`), hard-reload and check:
   - Home page: cards, hover lift, random card borders, featured card, pagination.
   - A post with images, code, tables and "Further Reading": image tape and borders, code header and copy stamp, highlighter headings, TOC, "min left" note.
   - A math post (e.g. *A Mathematical Theory of Communication*): Bonum font, ruled boxes, ink wobble.
   - Tags, categories and archives pages; the About page; `/404.html`.
   - Sidebar: avatar and paper clip, pause button, social icons.
   - Background animation, text-selection colors, and print preview (Ctrl+P).
6. Check the browser console for script errors.
7. Update the "copied from Chirpy 7.6.0" notes in the overridden files to the new version.
