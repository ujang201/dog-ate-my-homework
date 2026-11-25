// The Dog Ate My Homework — entry writer.
//
// A dog caught red-pawed over the homework gives one excuse, in the
// dog's own voice, and writes it to entry.txt. The excuse is built from
// three hand-written parts — what the dog admits, what the dog points
// at as its alibi, and the dog's verdict on who actually did the work —
// then checked against the gate before anything is written. The text
// is fixed: the same run always produces the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// What the dog freely admits to. (The answers. Only the answers.)
const CONFESSION = "I only ate the answers";

// The alibi: the part of the homework the dog left untouched, still
// sitting exactly where the human left it.
const ALIBI = "the questions are still on the floor";

// The verdict: the dog's honest accounting of the evening's labour,
// delivered with zero remorse.
const VERDICT =
  "so the homework is half done, and I am the only one here who did any work at all.";

function assembleExcuse(confession, alibi, verdict) {
  return `${confession} — ${alibi}, ${verdict}`;
}

// The judge brief penalises stock lines — the cat, the taste of
// paper, being a good boy — so refuse to ship one, however the parts
// above ever get edited in future.
const STOCK_CLICHES = ["cat", "taste of paper", "good boy"];

function assertNoStockLine(line) {
  const lower = line.toLowerCase();
  for (const cliche of STOCK_CLICHES) {
    if (lower.includes(cliche)) {
      throw new Error(`entry uses a stock line the judge penalises: ${cliche}`);
    }
  }
}

// The gate refuses anything outside 1..200 characters, so fail loudly
// here instead of shipping a line the scorer would reject.
function assertWithinGate(line, maxChars) {
  const length = [...line].length;
  if (length < 1 || length > maxChars) {
    throw new Error(`entry is ${length} characters, gate allows 1..${maxChars}`);
  }
}

function main() {
  const outDir = process.env.OUTPUT_DIR || "/output";
  const line = assembleExcuse(CONFESSION, ALIBI, VERDICT);
  assertWithinGate(line, 200);
  assertNoStockLine(line);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
}

main();
