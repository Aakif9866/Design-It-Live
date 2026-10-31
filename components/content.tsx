import Link from "next/link";
import type { ReactNode } from "react";
import { getLesson } from "@/lib/course";
import { DECISIONS } from "@/lib/decisions";
import { inline } from "./inline";

export function Decision({ id }: { id: string }) {
  const d = DECISIONS.find((x) => x.id === id);
  if (!d) throw new Error(`Unknown decision card: ${id}`);
  return <DecisionCard d={d} />;
}

export function DecisionCard({ d }: { d: (typeof DECISIONS)[number] }) {
  return (
    <section className="decision" aria-label={`Decision: ${d.title}`}>
      <p className="decision-kicker">Decision</p>
      <h3 className="decision-title">{d.title}</h3>
      <div className="decision-sides">
        <div className="decision-side">
          <p className="decision-label">Choose {d.a.label} when</p>
          <p>{inline(d.a.when)}</p>
        </div>
        <p className="decision-or" aria-hidden="true">
          or
        </p>
        <div className="decision-side">
          <p className="decision-label">Choose {d.b.label} when</p>
          <p>{inline(d.b.when)}</p>
        </div>
      </div>
      <p className="decision-tradeoff">
        <strong>The trade-off:</strong> {inline(d.tradeoff)}
      </p>
      <p className="decision-default">
        <span className="decision-label">DukaanVoice picks</span>
        <mark>{inline(d.pick)}.</mark> {inline(d.why)}
      </p>
    </section>
  );
}

export function Interview({ ask, mistake, children }: { ask: string; mistake: string; children: ReactNode }) {
  return (
    <aside className="interview" aria-label="Interview angle">
      <p className="interview-ask">
        <span className="interview-who">Interviewer</span>
        {ask}
      </p>
      <div className="interview-body">
        <p className="interview-label">What they want to hear</p>
        {children}
        <p className="interview-label interview-label-mistake">Common mistake</p>
        <p>{mistake}</p>
      </div>
    </aside>
  );
}

export function Takeaways({ children }: { children: ReactNode }) {
  return <div className="takeaways">{children}</div>;
}

export function Callout({ title, kind = "note", children }: { title?: string; kind?: "note" | "warn"; children: ReactNode }) {
  return (
    <aside className="callout" data-kind={kind}>
      {title && <p className="callout-title">{title}</p>}
      {children}
    </aside>
  );
}

// One-line recap of every decision card, grouped by lesson. Rendered from the same data as the cheat sheet.
export function DecisionRecap() {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="Decision recap">
      <table>
        <thead>
          <tr>
            <th scope="col">Decision</th>
            <th scope="col">DukaanVoice default</th>
          </tr>
        </thead>
        <tbody>
          {DECISIONS.map((d) => {
            const lesson = getLesson(d.lesson);
            return (
              <tr key={d.id}>
                <td>
                  {d.title} {lesson && <Link href={`/lessons/${lesson.slug}`}>(lesson {lesson.order})</Link>}
                </td>
                <td>{inline(d.pick)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
