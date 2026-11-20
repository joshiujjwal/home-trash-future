# AGENTS.md

## Setup
No package installation required (Node.js 18+ for `node --test`).
```bash
node --test
```

## Code Style
- Vanilla ES6+ JavaScript (`const` over `let`, never `var`, early returns).
- Keep HTML semantic and accessible; avoid inline `<script>` or `<style>` blocks.
- Keep external product links and pricing accurate and cited.

## Testing
- Red/green TDD: add/update tests in `tests/` before editing `src/` or `index.html`.
- Run `node --test` before every commit.

## PR Instructions
- Include `node --test` output and/or browser screenshots as evidence.
- Review AI-generated descriptions against the actual diff.
