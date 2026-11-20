# CLAUDE.md

## Commands
- **Test:** `node --test`
- **Local preview:** `python3 -m http.server 8080`

## Directory Map
- `index.html` — Main GitHub Pages entry point (pipeline SVG, options table, open questions)
- `src/` — Vanilla JS (`app.js`) and CSS (`styles.css`)
- `tests/` — Node built-in test runner (`node:test`) smoke tests
- `docs/` — System spec (`spec.md`) and ADRs (`adr/`)

## Conventions
- Zero-build static site: keep `index.html`, `src/app.js`, and `src/styles.css` runnable directly in any modern browser without npm build steps.
- All external product credits must use `target="_blank" rel="noopener noreferrer"`.

## Workflow
1. Read `TODO.md`
2. Run `node --test` first
3. Follow red/green TDD: write failing test -> implement -> pass
4. Commit with descriptive message
5. Update `CLAUDE.md` / `TODO.md` with lessons learned
