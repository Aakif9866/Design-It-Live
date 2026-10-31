import { readFileSync } from "node:fs";
import path from "node:path";
import { LESSONS, lessonFile } from "./course";
import { slugify } from "./slug";

export type Heading = { id: string; text: string };

// Reads the h2s straight from the MDX source, skipping code fences.
// The h2 MDX component uses the same slugify, so ids always match.
export function lessonHeadings(file: string): Heading[] {
  const src = readFileSync(path.join(process.cwd(), "content/lessons", `${file}.mdx`), "utf8");
  const out: Heading[] = [];
  let inFence = false;
  for (const line of src.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    const m = !inFence && line.match(/^## (.+)$/);
    if (m) {
      const text = m[1].replace(/[`*_]/g, "").trim();
      out.push({ id: slugify(text), text });
    }
  }
  return out;
}

export function allHeadings(): Record<string, Heading[]> {
  return Object.fromEntries(LESSONS.map((l) => [l.slug, lessonHeadings(lessonFile(l))]));
}
