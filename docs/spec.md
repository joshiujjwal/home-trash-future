# System Specification — Home Trash Future

## Overview & Problem Statement
Household waste management is fragmented, manual, and low-autonomy: users sort at multiple small bins, tie/carry bags, and deal with odors and contaminated recyclables. Meanwhile, commercial building blocks already exist in silos (whole-home pneumatic laundry chutes, ~$500–$1,000 food dehydrators, self-sealing bins).

This project specifies and visualizes an **end-to-end automated household waste pipeline** optimized for **cost, time, autonomy, and sustainability**.

## Functional Requirements
- [x] Interactive SVG animation showing items moving from room inlets (Kitchen, Bath, Office) through tubes to a Central Robotic Hub.
- [x] Three sorted output streams: Organics (Mill/Lomi dehydrator), Recyclables (4:1 compactor), and Landfill (heat-sealed task bags).
- [x] User controls to pause/play and inject specific item types (`+ Organic`, `+ Recyclable`, `+ Landfill`).
- [x] Comparison table with real-world pricing and credit links (Lomi, Mill, Laundry Jet, TOWNEW, Envac).
- [x] Open Questions section linking directly to GitHub Issues for community input.
- [ ] Interactive TCO / ROI calculator comparing manual bins vs. Mill/Lomi + pneumatic hub.

## Non-Functional Requirements
- [x] Zero-build static deployment compatible with GitHub Pages.
- [x] Responsive layout supporting desktop and mobile viewports.
- [x] Accessible SVG `role="img"` and `aria-label` attributes.

## Data Model (Simulation Items)
```json
{
  "kind": "organic | recycle | landfill",
  "stage": "inlet | outlet",
  "progress": 0.0,
  "inlet": "SVGPathElement",
  "outlet": "SVGPathElement"
}
```

## Test Plan
- **Smoke tests (`tests/smoke.test.mjs`)**: Verify `index.html` contains the SVG pipeline, interactive buttons, all 5 credited product links, and the GitHub Issues link.
- **Future unit tests**: Calculator math for 5-year TCO, volume reduction, and diversion rate.

## Open Questions
1. **Wet vs. Dry Separation**: Should kitchens use a local ~$500–$800 food recycler while pneumatic tubes handle dry waste only?
2. **Clog Prevention**: How to handle oversized cardboard, glass, or sticky items in 4–6" pipes?
3. **Low-Cost Vision Sorting**: Can a <$600 camera + air-jet + load cell achieve >95% sorting accuracy?
4. **Curbside Handoff**: Rail/rover shuttle vs. manual monthly brick transfer?
