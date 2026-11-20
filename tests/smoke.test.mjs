import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");

test("should render interactive SVG pipeline and controls", () => {
  assert.match(html, /id="pipeline-svg"/);
  assert.match(html, /id="toggle-play"/);
  assert.match(html, /id="drop-organic"/);
  assert.match(html, /id="drop-recycle"/);
  assert.match(html, /id="drop-landfill"/);
});

test("should include credits and links for current market options", () => {
  const requiredLinks = [
    "https://www.mill.com/",
    "https://lomi.com/",
    "https://laundryjet.com/",
    "https://mytownew.com/",
    "https://www.envacgroup.com/",
  ];

  for (const url of requiredLinks) {
    assert.ok(html.includes(url), `Missing credit link: ${url}`);
  }
});

test("should link to GitHub Issues for open questions", () => {
  assert.match(
    html,
    /https:\/\/github\.com\/joshiujjwal\/home-trash-future\/issues/
  );
});

test("should include problem statement, landfill analytics, and sort-at-source proposal", () => {
  assert.match(html, /id="problem"/);
  assert.match(html, /id="analytics"/);
  assert.match(html, /id="proposal"/);
  assert.match(html, /Sort at Source|sorting at source/i);
  assert.match(html, /vision/i);
});

