import type { Metadata } from "next";
import Link from "next/link";
import { DecisionCard } from "@/components/content";
import { LESSONS } from "@/lib/course";
import { DECISIONS } from "@/lib/decisions";

export const metadata: Metadata = {
  title: "Cheat sheet",
  description: "Every decision card from the course in one place: choose A when, choose B when, the trade-off and the default.",
  alternates: { canonical: "/cheatsheet" },
};

export default function CheatSheetPage() {
  return (
    <div className="page">
      <h1>Cheat sheet</h1>
      <p className="page-intro">
        All {DECISIONS.length} decision cards from the course, in lesson order. Read this the night before an interview: each card is one trade-off you should be
        able to argue in either direction.
      </p>
      {LESSONS.map((l) => {
        const cards = DECISIONS.filter((d) => d.lesson === l.slug);
        if (!cards.length) return null;
        return (
          <section key={l.slug} className="cheat-group" aria-labelledby={`cheat-${l.slug}`}>
            <h2 id={`cheat-${l.slug}`}>
              <Link href={`/lessons/${l.slug}`}>
                {l.order}. {l.title}
              </Link>
            </h2>
            {cards.map((d) => (
              <DecisionCard key={d.id} d={d} />
            ))}
          </section>
        );
      })}
    </div>
  );
}
