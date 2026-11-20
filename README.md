# Home Trash Future

![Status: Early Development](https://img.shields.io/badge/status-%F0%9F%9A%A7%20Early%20Development-yellow)

An open architecture, interactive pipeline animation, and cost/sustainability comparison for an **end-to-end automated household waste disposal system** — combining whole-home pneumatic/gravity chutes, centralized robotic sorting, ~$500–$1,000 food dehydrators/composters, and compact heat-sealed task bags.

- **Live GitHub Pages:** https://joshiujjwal.github.io/home-trash-future/
- **Open Questions:** [GitHub Issues](https://github.com/joshiujjwal/home-trash-future/issues)

## Tech Stack

- Vanilla HTML5, CSS3, SVG, and ES6+ JavaScript (zero-build static site for GitHub Pages)
- Node.js built-in test runner (`node --test`) for smoke & content verification

## Current Options, Costs & Credits

| System / Product | Role in Pipeline | Est. Cost (USD) | Link / Credit |
| :--- | :--- | :--- | :--- |
| **Lomi (Lomi 2 / 3)** | Countertop food dehydrator & grinder (3L) | ~$499 (or $299 + $120/yr filters) | [lomi.com](https://lomi.com/) |
| **Mill Food Recycler** | Floor-standing food dehydrator & grinder (6.5L, 80% vol cut) | $799 (Essential) – $1,149 (Plus) | [mill.com](https://www.mill.com/) |
| **Laundry Jet** | Whole-home pneumatic vacuum transport (inspiration) | $1,869–$4,995+ hardware ($2.4k–$15k installed) | [laundryjet.com](https://laundryjet.com/) |
| **TOWNEW (T1S / T3)** | Self-sealing & auto-changing thermoplastic bag bin | ~$85–$150 (+ refill rings) | [mytownew.com](https://mytownew.com/) |
| **Envac** | Municipal/district underground pneumatic waste pipes | Commercial / municipal scale | [envacgroup.com](https://www.envacgroup.com/) |

## Getting Started

```bash
git clone https://github.com/joshiujjwal/home-trash-future.git
cd home-trash-future
node --test
# Open index.html in a browser or serve locally:
python3 -m http.server 8080
```

## Project Structure

```text
home-trash-future/
├── index.html                    # Interactive GitHub Pages site + SVG animation
├── src/
│   ├── app.js                    # SVG pipeline animation & live metrics
│   └── styles.css                # Dark-mode responsive layout
├── tests/
│   └── smoke.test.mjs            # Smoke tests for page structure & links
├── docs/
│   ├── spec.md                   # End-to-end system specification
│   └── adr/
│       └── 0001-template.md      # Architecture Decision Record template
├── .github/
│   └── copilot-instructions.md   # GitHub Copilot context
├── README.md
├── TODO.md
├── CLAUDE.md
├── AGENTS.md
└── .gitignore
```

## Contributing

1. Follow **red/green TDD**: write failing tests in `tests/` before changing code.
2. Keep PRs small and focused, and include **test output or screenshots** as evidence.
3. Have a design answer for one of our open questions? Open an [Issue](https://github.com/joshiujjwal/home-trash-future/issues/new) or PR!
