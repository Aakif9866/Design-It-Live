import type { ReactNode } from "react";
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
      <div className="decision-ledger">
        <div className="decision-side">
          <p className="decision-label">Choose {d.a.label} when</p>
          <p>{inline(d.a.when)}</p>
        </div>
        <div className="decision-side">
          <p className="decision-label">Choose {d.b.label} when</p>
          <p>{inline(d.b.when)}</p>
        </div>
      </div>
      <p className="decision-tradeoff">
        <strong>The trade-off:</strong> {inline(d.tradeoff)}
      </p>
      <div className="decision-default">
        <span className="stamp">DukaanVoice default</span>
        <p>
          <strong>{inline(d.pick)}.</strong> {inline(d.why)}
        </p>
      </div>
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
