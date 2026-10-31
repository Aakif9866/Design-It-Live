import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { LESSONS, TOTAL_MINUTES, formatMinutes, type Day } from "@/lib/course";

export const metadata: Metadata = {
  title: "Weekend plan",
  description: "A Saturday and Sunday schedule for the course, with start times, breaks and a running total.",
  alternates: { canonical: "/plan" },
};

// Breaks are inserted after the lesson with this order number.
const BREAKS: Record<number, { minutes: number; label: string }> = {
  4: { minutes: 15, label: "Tea break. Stand up, walk around." },
  7: { minutes: 75, label: "Lunch. Do not read anything technical." },
  9: { minutes: 10, label: "Short break." },
  14: { minutes: 15, label: "Tea break." },
  17: { minutes: 75, label: "Lunch." },
  19: { minutes: 10, label: "Short break before the final lesson." },
};

const START = { Saturday: 9 * 60 + 30, Sunday: 9 * 60 + 30 };

function clock(min: number) {
  const h = Math.floor(min / 60);
  const m = String(min % 60).padStart(2, "0");
  return `${((h + 11) % 12) + 1}:${m} ${h >= 12 ? "pm" : "am"}`;
}

type Row = { lesson: (typeof LESSONS)[number]; start: number; running: number; br?: { start: number; minutes: number; label: string } };

// Pure schedule calculation: start times, breaks and a running reading total.
function schedule(day: Day, carried: number) {
  let t = START[day];
  let running = carried;
  const rows: Row[] = [];
  for (const lesson of LESSONS.filter((l) => l.day === day)) {
    const start = t;
    t += lesson.minutes;
    running += lesson.minutes;
    const br = BREAKS[lesson.order];
    rows.push({ lesson, start, running, br: br && { start: t, ...br } });
    if (br) t += br.minutes;
  }
  return { rows, end: t, running };
}

function DayLedger({ day, carried }: { day: Day; carried: number }) {
  const { rows, end, running } = schedule(day, carried);
  return (
    <div className="ledger-wrap">
      <table className="ledger">
        <thead>
          <tr>
            <th scope="col">Starts</th>
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
          {rows.map(({ lesson: l, start, running: total, br }) => (
            <Fragment key={l.slug}>
              <tr>
                <td className="time">{clock(start)}</td>
                <td>
                  <Link href={`/lessons/${l.slug}`}>
                    {l.order}. {l.title}
                  </Link>
                </td>
                <td className="num">{l.minutes}</td>
                <td className="num">{formatMinutes(total)}</td>
              </tr>
              {br && (
                <tr className="break">
                  <td className="time">{clock(br.start)}</td>
                  <td colSpan={3}>
                    {br.label} {br.minutes} minutes.
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
          <tr className="total">
            <td className="time">{clock(end)}</td>
            <td>{day} reading</td>
            <td className="num">{running - carried}</td>
            <td className="num">{formatMinutes(running)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function PlanPage() {
  const saturday = LESSONS.filter((l) => l.day === "Saturday").reduce((s, l) => s + l.minutes, 0);
  return (
    <div className="page">
      <h1>The weekend plan</h1>
      <p className="page-intro">
        {formatMinutes(TOTAL_MINUTES)} of reading, split into two days with real breaks. The start times are only a suggestion; the order matters more than the
        clock. If a lesson runs long, skip the next break rather than the lesson&rsquo;s quiz.
      </p>
      <h2>Saturday</h2>
      <p className="page-intro">Foundations in the morning, then the first AI lessons after lunch.</p>
      <DayLedger day="Saturday" carried={0} />
      <h2>Sunday</h2>
      <p className="page-intro">The rest of the AI systems material in the morning, then scale, mobile and the interview playbook.</p>
      <DayLedger day="Sunday" carried={saturday} />
    </div>
  );
}
