import type { Metadata } from "next";
import Link from "next/link";
import { getLesson } from "@/lib/course";
import { GLOSSARY } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Every term introduced in the course, with a one-line definition and a link to the lesson that explains it.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }));
  const letters = [...new Set(sorted.map((t) => t.term[0].toUpperCase()))];
  return (
    <div className="page">
      <h1>Glossary</h1>
      <p className="page-intro">
        {GLOSSARY.length} terms, each with the lesson where it is explained properly. Acronyms are listed by their short form.
      </p>
      {letters.map((letter) => (
        <section key={letter} aria-labelledby={`g-${letter}`}>
          <h2 id={`g-${letter}`} className="glossary-letter">
            {letter}
          </h2>
          <dl className="glossary-list">
            {sorted
              .filter((t) => t.term[0].toUpperCase() === letter)
              .map((t) => {
                const lesson = getLesson(t.lesson);
                return (
                  <div key={t.term}>
                    <dt>{t.term}</dt>
                    <dd>
                      {t.def}{" "}
                      {lesson && (
                        <Link href={`/lessons/${lesson.slug}`}>
                          Lesson {lesson.order}
                        </Link>
                      )}
                    </dd>
                  </div>
                );
              })}
          </dl>
        </section>
      ))}
    </div>
  );
}
