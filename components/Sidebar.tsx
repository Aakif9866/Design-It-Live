"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LESSONS, type Day } from "@/lib/course";
import type { Heading } from "@/lib/headings";
import { useDone } from "@/lib/progress";

const DAYS: Day[] = ["Saturday", "Sunday"];

export function Sidebar({ headings }: { headings: Record<string, Heading[]> }) {
  const pathname = usePathname();
  const done = useDone();
  const [open, setOpen] = useState(false);
  const current = LESSONS.find((l) => pathname === `/lessons/${l.slug}`);
  const doneCount = LESSONS.filter((l) => done.includes(l.slug)).length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="topbar">
        <Link href="/" className="brand">
          Design It Live
        </Link>
        <button type="button" className="button" data-variant="quiet" aria-expanded={open} aria-controls="course-nav" onClick={() => setOpen(!open)}>
          {open ? "Close lessons" : "Lessons"}
        </button>
      </div>
      {open && <div className="scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
      <aside id="course-nav" className="sidebar" data-open={open} aria-label="Course">
        <Link href="/" className="brand brand-side">
          Design It Live
        </Link>
        <div className="progress" aria-label={`${doneCount} of ${LESSONS.length} lessons done`}>
          <p>
            {doneCount} of {LESSONS.length} lessons done
          </p>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${(doneCount / LESSONS.length) * 100}%` }} />
          </div>
        </div>
        <nav onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          {DAYS.map((day) => (
            <div key={day} className="nav-day">
              <p className="nav-day-title">{day}</p>
              <ol className="nav-lessons">
                {LESSONS.filter((l) => l.day === day).map((l) => {
                  const isCurrent = current?.slug === l.slug;
                  const isDone = done.includes(l.slug);
                  return (
                    <li key={l.slug}>
                      <Link href={`/lessons/${l.slug}`} className="nav-lesson" aria-current={isCurrent ? "page" : undefined} data-done={isDone}>
                        <span className="nav-num" aria-hidden="true">
                          {isDone ? "✓" : l.order}
                        </span>
                        <span>
                          {l.title}
                          {isDone && <span className="sr-only"> (done)</span>}
                        </span>
                      </Link>
                      {isCurrent && (
                        <ol className="nav-sections" aria-label="On this page">
                          {headings[l.slug]?.map((h) => (
                            <li key={h.id}>
                              <a href={`#${h.id}`}>{h.text}</a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
          <ul className="nav-extra">
            <li>
              <Link href="/plan" aria-current={pathname === "/plan" ? "page" : undefined}>
                Weekend plan
              </Link>
            </li>
            <li>
              <Link href="/cheatsheet" aria-current={pathname === "/cheatsheet" ? "page" : undefined}>
                Cheat sheet
              </Link>
            </li>
            <li>
              <Link href="/glossary" aria-current={pathname === "/glossary" ? "page" : undefined}>
                Glossary
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
