import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS, PARTS, PART_IDS, TOTAL_MINUTES, formatMinutes, partLessons, type Part } from "@/lib/course";

export const metadata: Metadata = {
  title: "Study plan",
  description: "All twenty lessons grouped into three parts, with reading time per lesson and a running total.",
  alternates: { canonical: "/plan" },
};

const BLURB: Record<Part, string> = {
  A: "The distributed-systems core: requirements, data, caching and async work. Part B leans on all of it.",
  B: "How production AI products are engineered: models as dependencies, voice, gateways, RAG, agents, evals, safety and cost.",
  C: "Traffic spikes, mobile and frontend decisions, shipping, and a framework for system design interviews.",
};

function PartLedger({ part, carried }: { part: Part; carried: number }) {
  const lessons = partLessons(part);
  const total = lessons.reduce((s, l) => s + l.minutes, 0);
  const runningAt = (i: number) => carried + lessons.slice(0, i + 1).reduce((s, l) => s + l.minutes, 0);
  return (
    <div className="ledger-wrap">
      <table className="ledger">
        <thead>
          <tr>
            <th scope="col">Lesson</th>
            <th scope="col" className="num">
              Minutes
            </th>
            <th scope="col" className="num">
              Course total
            </th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((l, i) => (
            <tr key={l.slug}>
              <td>
                <Link href={`/lessons/${l.slug}`}>
                  {l.order}. {l.title}
                </Link>
              </td>
              <td className="num">{l.minutes}</td>
              <td className="num">{formatMinutes(runningAt(i))}</td>
            </tr>
          ))}
          <tr className="total">
            <td>Part {part}</td>
            <td className="num">{total}</td>
            <td className="num">{formatMinutes(carried + total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function PlanPage() {
  return (
    <div className="page">
      <h1>Study plan</h1>
      <p className="page-intro">
        {LESSONS.length} lessons, about {formatMinutes(TOTAL_MINUTES)} of reading in total, including time for diagrams and quizzes. Read at your own pace: each
        lesson stands on its own, and the end of each part is a natural place to stop. Reading in order works best, because later lessons reuse earlier
        decisions.
      </p>
      {PART_IDS.map((part, i) => {
        const carried = PART_IDS.slice(0, i).reduce((s, p) => s + partLessons(p).reduce((t, l) => t + l.minutes, 0), 0);
        return (
          <section key={part} aria-labelledby={`part-${part}`}>
            <h2 id={`part-${part}`}>
              Part {part}: {PARTS[part]}
            </h2>
            <p className="page-intro">{BLURB[part]}</p>
            <PartLedger part={part} carried={carried} />
          </section>
        );
      })}
    </div>
  );
}
