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
  assert.deepEqual(sections, ["tldr", "problem", "analytics", "questions", "options"]);
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

test("should provide a single TLDR Markdown version with the research citations and options last", () => {
  const summary = fs.readFileSync(path.join(rootDir, "tldr.md"), "utf8");
  assert.equal(fs.existsSync(path.join(rootDir, "url.md")), false);
  assert.match(summary, /^# Household trash: TLDR/);
  assert.match(summary, /An open question, not a proposed solution/);
  assert.match(summary, /not households alone/);
  assert.match(summary, /modeled estimate/);
  assert.match(summary, /not proof of an affordable home sorter/);
  const headings = [...summary.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  assert.deepEqual(headings, [
    "What the evidence says",
    "Still open",
    "Current options",
  ]);
  const researchUrls = new Set(
    [...html.matchAll(/href="(https:\/\/[^"]+)"/g)].map((match) => match[1])
      .filter((url) => /^https:\/\/(?:www\.epa\.gov|pmc\.ncbi\.nlm\.nih\.gov|fortune\.com)\//.test(url))
  );
  for (const url of researchUrls) {
    assert.ok(summary.includes(url), `Missing TLDR source: ${url}`);
  }
});

test("should provide a linked, cited TLDR with current options at the bottom", () => {
  const summary = fs.readFileSync(path.join(rootDir, "tldr.md"), "utf8");
  assert.match(html, /<a href="tldr\.md">/);
  assert.doesNotMatch(summary, /url\.md/);
  assert.match(summary, /^# Household trash: TLDR/);
  assert.match(summary, /open question, not a proposed solution/i);
  assert.match(summary, /2018/);
  assert.match(summary, /modeled estimate/);
  assert.match(summary, /Northern Ireland/);
  assert.match(summary, /not proof of an affordable home sorter/i);
  const sourceUrls = [...summary.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map((match) => match[1]);
  assert.ok(sourceUrls.some((url) => url.startsWith("https://www.epa.gov/")));
  assert.ok(sourceUrls.includes("https://pmc.ncbi.nlm.nih.gov/articles/PMC9064103/"));
  assert.ok(sourceUrls.includes("https://fortune.com/2025/06/26/ai-recycling-trash-amp-robotics/"));
  const headings = [...summary.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  assert.equal(headings.at(-1), "Current options");
  assert.match(summary, /Mill/);
  assert.match(summary, /Lomi/);
});

test("should show a sourced TLDR near the top of the page", () => {
  const summary = html.match(/<section id="tldr"[\s\S]*?<\/section>/)?.[0];
  assert.ok(summary);
  assert.ok(html.indexOf('id="tldr"') < html.indexOf('id="problem"'));
  assert.match(summary, /2018/);
  assert.match(summary, /58%/);
  assert.match(summary, /modeled/i);
  assert.match(summary, /Northern Ireland/);
  assert.match(summary, /industrial/i);
  assert.match(summary, /href="#source-1"/);
});

test("should make the sole Markdown version discoverable through HTML and llms.txt", () => {
  const llms = fs.readFileSync(path.join(rootDir, "llms.txt"), "utf8");
  assert.match(html, /<link rel="alternate" type="text\/markdown" href="tldr\.md" \/>/);
  assert.match(html, /<link rel="describedby" href="llms\.txt" \/>/);
  assert.match(llms, /^# home-trash-future\n/);
  assert.match(llms, /\[TLDR\]\(https:\/\/joshiujjwal\.github\.io\/home-trash-future\/tldr\.md\)/);
  assert.doesNotMatch(html + llms, /url\.md/);
});

test("should include accessible original visuals with a source below the data graph", () => {
  assert.match(html, /<img src="src\/household-waste\.svg"[^>]+alt="[^"]+"/);
  assert.match(html, /<img src="src\/waste-composition\.svg"[^>]+alt="[^"]+"/);
  const graph = [...html.matchAll(/<figure\b[^>]*>[\s\S]*?<\/figure>/g)]
    .map((match) => match[0])
    .find((figure) => figure.includes('src="src/waste-composition.svg"'));
  assert.ok(graph);
  assert.match(graph, /<figcaption>[\s\S]*2018[\s\S]*href="#source-1"/);
  for (const file of ["household-waste.svg", "waste-composition.svg"]) {
    const svg = fs.readFileSync(path.join(rootDir, "src", file), "utf8");
    assert.match(svg, /<svg[^>]+viewBox="/);
    assert.match(svg, /<title[^>]*>[^<]+<\/title>/);
    assert.match(svg, /<desc[^>]*>[^<]+<\/desc>/);
  }
});

test("should distinguish measured methane and industrial vision research from modeled and product claims", () => {
  const summary = fs.readFileSync(path.join(rootDir, "tldr.md"), "utf8");
  for (const content of [html, summary]) {
    assert.match(content, /https:\/\/pmc\.ncbi\.nlm\.nih\.gov\/articles\/PMC11904827\//);
    assert.match(content, /https:\/\/doi\.org\/10\.1109\/ACCESS\.2025\.3603903/);
    assert.match(content, /52%/);
    assert.match(content, /surveyed/i);
    assert.match(content, /IEEE Access/);
  }
});

test("should resolve numbered claim citations to references below the article", () => {
  const references = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/)?.[0];
  assert.ok(references);
  assert.match(references, /id="sources"/);
  assert.ok(html.indexOf('id="sources"') > html.indexOf('id="options"'));
  const citations = [...html.matchAll(/class="citation" href="#(source-\d+)"/g)];
  assert.ok(citations.length >= 7);
  for (const match of citations) {
    assert.ok(references.includes(`id="${match[1]}"`), `Missing numbered reference: ${match[1]}`);
  }
  assert.match(references, /Primary research/);
  assert.match(references, /Reporting/);
});
