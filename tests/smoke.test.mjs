import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");

test("should present an open question without a proposed system or simulated results", () => {
  assert.match(html, /open question/i);
  assert.doesNotMatch(html, /id="(?:proposal|pipeline|pipeline-svg|stat-diverted)"/);
  assert.doesNotMatch(html, /<script\b|<style\b|style=|working spec|zero-touch|70%/i);
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

test("should include dated, sourced waste data with its scope and uncertainty", () => {
  assert.match(html, /id="problem"/);
  assert.match(html, /id="analytics"/);
  assert.match(html, /2018/);
  assert.match(html, /292\.4 million/);
  assert.match(html, /32\.1%/);
  assert.match(html, /not a household-only/i);
  assert.match(html, /58%/);
  assert.match(html, /modeled estimate/i);
  const requiredSources = [
    "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials",
    "https://www.epa.gov/land-research/quantifying-methane-emissions-landfilled-food-waste",
    "https://www.epa.gov/land-research/field-bin-environmental-impacts-us-food-waste-management-pathways",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC9064103/",
    "https://fortune.com/2025/06/26/ai-recycling-trash-amp-robotics/",
  ];
  for (const url of requiredSources) {
    assert.ok(html.includes(url), `Missing research citation: ${url}`);
  }
  assert.match(html, /Northern Ireland/);
  assert.match(html, /not evidence of an affordable household/i);
});

test("should put neutrally described current options at the bottom", () => {
  const sections = [...html.matchAll(/<section id="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(sections, ["problem", "analytics", "questions", "options"]);
  const options = html.match(/<section id="options"[\s\S]*?<\/section>/)?.[0];
  assert.ok(options);
  assert.match(options, /Mill Food Recycler/);
  assert.match(options, /Lomi 3/);
  assert.match(options, /manufacturer claims/i);
  assert.match(options, /2026-11-21/);
  assert.match(options, /pre-order/i);
  assert.doesNotMatch(options, /Hits the.*target|pieces of this stack|monthly empty/i);
});

test("should keep navigation valid and external citations safe", () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/<a\b([^>]+)>/g)) {
    const attributes = match[1];
    const href = attributes.match(/\bhref="([^"]+)"/)?.[1];
    if (href?.startsWith("#")) {
      assert.ok(ids.has(href.slice(1)), `Broken navigation: ${href}`);
    }
    if (href?.startsWith("https://")) {
      assert.match(attributes, /target="_blank"/);
      assert.match(attributes, /rel="noopener noreferrer"/);
    }
  }
});

test("should provide a Markdown version with the same citations and options last", () => {
  const markdown = fs.readFileSync(path.join(rootDir, "url.md"), "utf8");
  assert.match(markdown, /^# What does the future of household trash look like\?/);
  assert.match(markdown, /An open question, not a proposed solution/);
  assert.match(markdown, /not a household-only/);
  assert.match(markdown, /modeled estimate/);
  assert.match(markdown, /not evidence of an affordable household/);
  const headings = [...markdown.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  assert.deepEqual(headings, [
    "The question",
    "Data & research",
    "Open questions",
    "Current options & related systems",
  ]);
  const externalUrls = new Set(
    [...html.matchAll(/href="(https:\/\/[^"]+)"/g)].map((match) => match[1])
  );
  for (const url of externalUrls) {
    assert.ok(markdown.includes(url), `Missing Markdown source: ${url}`);
  }
});
