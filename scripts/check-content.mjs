// Content checks: lesson structure, quiz answer balance, decision/glossary references, word counts.
// Run: npm run check
import { readFileSync, readdirSync } from "node:fs";

const course = readFileSync("lib/course.ts", "utf8");
const lessons = [...course.matchAll(/order: (\d+), slug: "([^"]+)"[^\n]*minutes: (\d+)/g)].map((m) => ({ order: +m[1], slug: m[2], minutes: +m[3] }));
const decisionsSrc = readFileSync("lib/decisions.ts", "utf8");
const decisionIds = [...decisionsSrc.matchAll(/id: "([^"]+)",\n\s+lesson: "([^"]+)"/g)].map((m) => ({ id: m[1], lesson: m[2] }));
const glossarySrc = readFileSync("lib/glossary.ts", "utf8");
const files = readdirSync("content/lessons");
const REQUIRED_H2 = ["The problem", "Interview angle", "Key takeaways", "Quick self-check"];
const REQUIRED_TAGS = ["<Diagram", "<Decision", "<Interview", "<Takeaways", "<Quiz"];

const errors = [];
const letters = { A: 0, B: 0, C: 0, D: 0 };
let total = 0;

const words = (s) => (s.match(/[\p{L}\p{N}₹][\p{L}\p{N}'’.,%₹-]*/gu) || []).length;

for (const l of lessons) {
  const file = files.find((f) => f === `${String(l.order).padStart(2, "0")}-${l.slug}.mdx`);
  if (!file) { errors.push(`missing file for ${l.slug}`); continue; }
  const src = readFileSync(`content/lessons/${file}`, "utf8");
  for (const h of REQUIRED_H2) if (!src.includes(`\n## ${h}\n`) && !src.startsWith(`## ${h}\n`)) errors.push(`${file}: missing "## ${h}"`);
  for (const t of REQUIRED_TAGS) if (!src.includes(t)) errors.push(`${file}: missing ${t}`);

  const answers = [...src.matchAll(/answer: "([A-D])"/g)].map((m) => m[1]);
  if (answers.length !== 3) errors.push(`${file}: ${answers.length} quiz questions, expected 3`);
  if (new Set(answers).size !== answers.length) errors.push(`${file}: repeated answer letter ${answers.join("")}`);
  answers.forEach((a) => letters[a]++);
  const optionBlocks = [...src.matchAll(/options: \[([\s\S]*?)\],\n/g)];
  optionBlocks.forEach((b, i) => {
    const n = (b[1].match(/^\s+"/gm) || []).length;
    if (n !== 4) errors.push(`${file}: question ${i + 1} has ${n} options`);
  });

  const used = [...src.matchAll(/<Decision id="([^"]+)"/g)].map((m) => m[1]);
  for (const id of used) {
    const d = decisionIds.find((x) => x.id === id);
    if (!d) errors.push(`${file}: unknown decision ${id}`);
    else if (d.lesson !== l.slug) errors.push(`${file}: decision ${id} belongs to ${d.lesson}`);
  }
  for (const d of decisionIds.filter((x) => x.lesson === l.slug)) if (!used.includes(d.id)) errors.push(`${file}: decision ${d.id} never rendered`);
  if (used.length < 1 || used.length > 3) errors.push(`${file}: ${used.length} decision cards`);

  // Words: prose + quiz text + interview props + decision cards; code and diagram source excluded.
  const prose = src
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/chart=\{`[\s\S]*?`\}/g, " ")
    .replace(/<\/?[A-Z][A-Za-z]*|\/>|[a-z]+=|[{}[\]]/g, " ");
  const decisionWords = used.reduce((s, id) => {
    const block = decisionsSrc.split(`id: "${id}"`)[1]?.split(/\n  \{|\n\];/)[0] ?? "";
    return s + words(block.replace(/\b(lesson|title|label|when|tradeoff|pick|why)\b:/g, ""));
  }, 0);
  const code = (src.match(/```[\s\S]*?```/g) || []).reduce((s, c) => s + c.split("\n").length - 2, 0);
  const w = words(prose) + decisionWords;
  total += w;
  console.log(`${String(l.order).padStart(2)} ${l.slug.padEnd(26)} ${String(w).padStart(5)} words  ${String(code).padStart(3)} code lines  target ${l.minutes} min, reads ~${Math.round(w / 150)} min`);
}

for (const m of glossarySrc.matchAll(/lesson: "([^"]+)"/g)) if (!lessons.some((l) => l.slug === m[1])) errors.push(`glossary: unknown lesson ${m[1]}`);

console.log(`\nTotal: ${total} words, about ${(total / 150 / 60).toFixed(1)} h at 150 wpm`);
console.log(`Quiz answers: ${JSON.stringify(letters)}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("All content checks passed.");
