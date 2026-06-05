#!/usr/bin/env node
/**
 * Urbix component reference checker.
 *
 * Checks that every in-scope component directory has a reference file,
 * every reference file is linked from the skill entrypoint, every
 * reference file follows the component contract, and no file links to the
 * removed aggregate API files.
 *
 * Exit 0 on success, 1 on any failure.
 * Pass --verbose to print passing checks as well.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../../..");
const UI_DIR = join(ROOT, "packages/urbix/src/ui");
const REFS_DIR = join(__dirname, "references");
const SKILL_MD_PATH = join(__dirname, "SKILL.md");
const VERBOSE = process.argv.includes("--verbose");

// Required H2 headings per the reference contract (_contract.md).
const REQUIRED_H2 = [
  "Status",
  "Imports",
  "Usage",
  "API",
  "Patterns",
  "Mistakes",
  "Related references",
  "Source files",
];

// Guide files that are not component references (no required headings, no link check).
const NON_COMPONENT_REFS = new Set([
  "_contract.md",
  "contributing.md",
  "getting-started.md",
  "theming.md",
  "foundation.md",
]);

// Removed aggregate API files that must no longer appear as link targets.
const STALE_AGGREGATE_FILES = ["atoms-api.md", "molecules-api.md"];
const VALID_SCOPES = new Set([
  "Public Component",
  "Public Component (deprecated)",
  "Public Component (incubator)",
  "Internal Component",
  "Source-only Component",
]);
const VALID_LIFECYCLES = new Set([
  "not declared",
  "dev",
  "incubator",
  "new",
  "beta",
  "review",
  "rc",
  "stable",
  "deprecated",
]);

// ── SKILL.md parser ──────────────────────────────────────────────────────────

/**
 * Parse the Component Index rows in SKILL.md.
 *
 * Returns:
 *   entries  – Map<"layer/name", { refFile: string }>
 *              Keyed as "atoms/button", "molecules/tabs", etc. to handle
 *              name collisions between layers (e.g. atoms/input vs molecules/input).
 *   linkedFiles – Set<filename> of every references/*.md linked anywhere in SKILL.md
 */
function parseSkillMd(content) {
  const entries = new Map();
  const linkedFiles = new Set();

  // Split content by H3 layer headers so we know which layer each row belongs to.
  const LAYER_TITLES = { Atoms: "atoms", Molecules: "molecules", Organisms: "organisms" };
  const sections = content.split(/^### (Atoms|Molecules|Organisms)/m);

  // Component Index row format:
  //   | `name` *(optional markers)* | desc **→ [references/file.md](./references/file.md)** |
  const rowPattern =
    /^\|\s*`([^`]+)`([^|]*)\|[^|]*\[references\/([^\]]+\.md)\]/gm;

  for (let i = 1; i < sections.length; i += 2) {
    const layer = LAYER_TITLES[sections[i]];
    if (!layer) continue;
    const sectionContent = sections[i + 1] ?? "";
    let m;
    while ((m = rowPattern.exec(sectionContent)) !== null) {
      const [, name, , refFile] = m;
      entries.set(`${layer}/${name}`, { refFile });
      linkedFiles.add(refFile);
    }
  }

  // Also capture every [references/file.md] link (covers Reference Docs table).
  const linkPattern = /\[references\/([^\]]+\.md)\]/g;
  let m;
  while ((m = linkPattern.exec(content)) !== null) {
    linkedFiles.add(m[1]);
  }

  return { entries, linkedFiles };
}

// ── Checker state ─────────────────────────────────────────────────────────────

let failures = 0;

function fail(msg) {
  console.error(`  FAIL  ${msg}`);
  failures++;
}

function ok(msg) {
  if (VERBOSE) console.log(`  ok    ${msg}`);
}

function componentRefFiles() {
  return readdirSync(REFS_DIR)
    .filter((f) => f.endsWith(".md") && !NON_COMPONENT_REFS.has(f))
    .sort();
}

function getSection(content, heading) {
  const marker = `## ${heading}\n`;
  const start = content.indexOf(marker);
  if (start === -1) return "";
  const bodyStart = start + marker.length;
  const next = content.indexOf("\n## ", bodyStart);
  return content.slice(bodyStart, next === -1 ? content.length : next).trim();
}

function getH2Headings(content) {
  return [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

function scopeFromSource(sourceScope) {
  if (sourceScope === "public") return "Public Component";
  if (sourceScope === "internal") return "Internal Component";
  if (sourceScope === "incubator") return "Public Component (incubator)";
  return null;
}

// ── Load SKILL.md ─────────────────────────────────────────────────────────────

const skillContent = readFileSync(SKILL_MD_PATH, "utf8");
const { entries: skillEntries, linkedFiles: skillLinkedFiles } =
  parseSkillMd(skillContent);

// ── Check 1: component dirs → reference files ─────────────────────────────────

console.log("1. Component directories → reference files");
for (const layer of ["atoms", "molecules", "organisms"]) {
  const layerDir = join(UI_DIR, layer);
  if (!existsSync(layerDir)) continue;

  const componentNames = readdirSync(layerDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const name of componentNames) {
    const entry = skillEntries.get(`${layer}/${name}`);
    if (!entry) {
      fail(`${layer}/${name}: not listed in SKILL.md Component Index`);
      continue;
    }
    const refPath = join(REFS_DIR, entry.refFile);
    if (!existsSync(refPath)) {
      fail(`${layer}/${name}: references/${entry.refFile} missing on disk`);
    } else {
      ok(`${layer}/${name} → references/${entry.refFile}`);
    }
  }
}

// ── Check 2: every reference file is linked from SKILL.md ─────────────────────

console.log("\n2. Reference files → SKILL.md links");
for (const file of componentRefFiles()) {
  if (skillLinkedFiles.has(file)) {
    ok(`references/${file}`);
  } else {
    fail(`references/${file}: not linked from SKILL.md`);
  }
}

// ── Check 3: exact H2 heading order in component reference files ───────────────

console.log("\n3. H2 heading order in component references");
for (const file of componentRefFiles()) {
  const content = readFileSync(join(REFS_DIR, file), "utf8");
  const found = getH2Headings(content);
  const expected = REQUIRED_H2.join(" > ");
  const actual = found.join(" > ");
  if (actual === expected) {
    ok(`references/${file}`);
  } else {
    fail(`references/${file}: H2 headings must be exactly "${expected}" (found "${actual}")`);
  }
}

// ── Check 4: status contract ───────────────────────────────────────────────────

console.log("\n4. Status sections");
for (const file of componentRefFiles()) {
  const content = readFileSync(join(REFS_DIR, file), "utf8");
  const status = getSection(content, "Status");
  const scope = status.match(/^- Scope: (.+)$/m)?.[1]?.trim();
  const lifecycle = status.match(/^- Lifecycle: (.+)$/m)?.[1]?.trim();
  const replacement = status.match(/^- Replacement: (.+)$/m)?.[1]?.trim();

  let fileFailed = false;
  if (!scope || !VALID_SCOPES.has(scope)) {
    fail(`references/${file}: invalid or missing "- Scope:" value`);
    fileFailed = true;
  }
  if (!lifecycle || !VALID_LIFECYCLES.has(lifecycle)) {
    fail(`references/${file}: invalid or missing "- Lifecycle:" value`);
    fileFailed = true;
  }
  if (scope === "Public Component (deprecated)" && !replacement) {
    fail(`references/${file}: deprecated references must include "- Replacement:"`);
    fileFailed = true;
  }
  if (scope === "Public Component (deprecated)" && lifecycle !== "deprecated") {
    fail(`references/${file}: deprecated references must use "Lifecycle: deprecated"`);
    fileFailed = true;
  }
  if (!fileFailed) ok(`references/${file}`);
}

// ── Check 5: status.json mirrors ──────────────────────────────────────────────

console.log("\n5. Source status metadata mirrors");
for (const file of componentRefFiles()) {
  const content = readFileSync(join(REFS_DIR, file), "utf8");
  const status = getSection(content, "Status");
  const scope = status.match(/^- Scope: (.+)$/m)?.[1]?.trim();
  const lifecycle = status.match(/^- Lifecycle: (.+)$/m)?.[1]?.trim();
  const sourceFiles = getSection(content, "Source files");
  const statusJsonPath = [...sourceFiles.matchAll(/`(packages\/urbix\/src\/ui\/[^`]+status\.json)`/g)]
    .map((m) => m[1])[0];

  if (!statusJsonPath) {
    ok(`references/${file}`);
    continue;
  }

  const metadata = JSON.parse(readFileSync(join(ROOT, statusJsonPath), "utf8"));
  const expectedScope = scopeFromSource(metadata.scope);
  let fileFailed = false;

  if (expectedScope && scope !== expectedScope) {
    fail(`references/${file}: scope must mirror ${statusJsonPath} (${expectedScope})`);
    fileFailed = true;
  }
  if (metadata.status && lifecycle !== metadata.status) {
    fail(`references/${file}: lifecycle must mirror ${statusJsonPath} (${metadata.status})`);
    fileFailed = true;
  }
  if (!fileFailed) ok(`references/${file}`);
}

// ── Check 6: public import guidance ───────────────────────────────────────────

console.log("\n6. Public import guidance");
for (const file of componentRefFiles()) {
  const content = readFileSync(join(REFS_DIR, file), "utf8");
  const status = getSection(content, "Status");
  const scope = status.match(/^- Scope: (.+)$/m)?.[1]?.trim();
  const imports = getSection(content, "Imports");
  const firstImportSource = imports.match(/from\s+["']([^"']+)["']/)?.[1];

  if (scope?.startsWith("Public Component")) {
    if (firstImportSource === "@urbetrack/urbix") {
      ok(`references/${file}`);
    } else {
      fail(`references/${file}: first import in "## Imports" must come from "@urbetrack/urbix"`);
    }
  } else {
    ok(`references/${file}`);
  }
}

// ── Check 7: source file links exist ──────────────────────────────────────────

console.log("\n7. Source files exist");
for (const file of componentRefFiles()) {
  const content = readFileSync(join(REFS_DIR, file), "utf8");
  const section = getSection(content, "Source files");
  const paths = [...section.matchAll(/`(packages\/urbix\/src\/ui\/[^`]+)`/g)]
    .map((m) => m[1]);

  if (paths.length === 0) {
    fail(`references/${file}: "## Source files" must list at least one packages/urbix/src/ui path`);
    continue;
  }

  let fileFailed = false;
  for (const sourcePath of paths) {
    if (/\.test\.[jt]sx?$/.test(sourcePath)) {
      fail(`references/${file}: "## Source files" should not list test files: ${sourcePath}`);
      fileFailed = true;
      continue;
    }
    if (!existsSync(join(ROOT, sourcePath))) {
      fail(`references/${file}: source path does not exist: ${sourcePath}`);
      fileFailed = true;
    }
  }
  if (!fileFailed) ok(`references/${file}`);
}

// ── Check 8: no stale links to removed aggregate API files ─────────────────────

console.log("\n8. Stale links to removed aggregate API files");
const allMdFiles = [
  SKILL_MD_PATH,
  ...readdirSync(REFS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => join(REFS_DIR, f)),
];

for (const filePath of allMdFiles) {
  const content = readFileSync(filePath, "utf8");
  const rel = filePath.startsWith(ROOT + "/")
    ? filePath.slice(ROOT.length + 1)
    : filePath;

  let staleFound = false;
  for (const staleFile of STALE_AGGREGATE_FILES) {
    // Only flag actual Markdown link syntax: ](path/stale-file) — not prose mentions.
    if (new RegExp(`\\]\\([^)]*${staleFile}[^)]*\\)`).test(content)) {
      fail(`${rel}: stale link to removed aggregate file ${staleFile}`);
      staleFound = true;
    }
  }
  if (!staleFound) ok(rel);
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`\n${"─".repeat(50)}`);
if (failures === 0) {
  console.log("All checks passed.");
  process.exit(0);
} else {
  console.error(`${failures} check(s) failed.`);
  process.exit(1);
}
