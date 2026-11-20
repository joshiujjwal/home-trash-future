# home-trash-future — Task Breakdown

## How to Use This File
Workflow per task:
1. Write tests FIRST (red phase)
2. Implement until tests pass (green phase)
3. Review diff manually
4. Commit with descriptive message
5. Update `CLAUDE.md` / `AGENTS.md` if you learned something new (compound loop)

## Phase 0: Foundation ✅
- [x] Directory structure & zero-build static setup
- [x] Smoke test suite (`node --test`)
- [x] AI config files (`CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`)

## Phase 1: Interactive Pipeline Animation ✅
- [x] Write spec in `docs/spec.md`
- [x] SVG pneumatic/gravity pipeline diagram (`index.html`)
- [x] Animated item routing & live diversion metrics (`src/app.js`)
- [x] Smoke test verifying animation controls & credits

## Phase 2: Cost & Sustainability Calculator ⬜
- [ ] Failing tests for interactive household cost/ROI & CO2/bag-plastic calculator
- [ ] Add sliders for household size, # of room ports, and composter choice ($499 Lomi vs $799 Mill)
- [ ] Output 5-year TCO, time saved (hrs/yr), and landfill diversion %
- [ ] Manual browser verification with screenshot

## Phase 3: Open Questions & Community Specs ⬜
- [ ] Seed GitHub Issues for core bottlenecks (wet/dry separation, clog prevention, low-cost vision sorting, curbside shuttle)
- [ ] Add ADR for pneumatic pipe diameter & wet/dry split decision

## Phase 4: Ship ⬜
- [ ] Enable GitHub Pages on `main` branch (`/`)
- [ ] Verify live URL and mobile responsiveness

## Parking Lot 🅿️
- 3D WebGL / Three.js isometric home cutaway view
- Bill of Materials (BOM) for DIY Raspberry Pi + camera + air-jet diverter prototype

## Lessons Learned 📝
- Zero-build vanilla HTML/SVG/JS deploys cleanly to GitHub Pages without bundler overhead.
