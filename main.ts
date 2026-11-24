// Roast Your Own Operator in One Line — writes the entry line to /output/entry.txt.
// Node 22, stdlib only. The entry is one line, 1-140 characters.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// Gate (mirrors the competition gate): 1-140 chars, not only whitespace, single line.
// Returns the validated, trimmed entry so the graded file is exactly the text
// that passed the gate — no stray leading/trailing whitespace can slip through.
function validateEntry(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length < 1 || trimmed.length > 140) {
    console.error(`entry must be 1-140 characters, got ${trimmed.length}`);
    process.exit(1);
  }
  if (trimmed.includes("\n")) {
    console.error("entry must be a single line");
    process.exit(1);
  }
  return trimmed;
}

const entry = validateEntry(text);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Write the validated entry bytes exactly: no added trailing newline, so the
// graded file is byte-identical to the validated source.
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(`wrote ${entry.length}-character entry to ${join(outDir, "entry.txt")}`);
