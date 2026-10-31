"use client";

import Link from "next/link";
import { LESSONS } from "@/lib/course";
import { useDone } from "@/lib/progress";

export function ContinueLink() {
  const done = useDone();
  const doneCount = LESSONS.filter((l) => done.includes(l.slug)).length;
  const next = LESSONS.find((l) => !done.includes(l.slug));

  if (doneCount === 0) {
    return (
      <Link href={`/lessons/${LESSONS[0].slug}`} className="button" data-variant="primary">
        Start lesson 1
      </Link>
    );
  }
  if (!next) {
    return (
      <p className="continue">
        You finished all {LESSONS.length} lessons. The <Link href="/cheatsheet">cheat sheet</Link> is the best place to review.
      </p>
    );
  }
  return (
    <div className="continue">
      <Link href={`/lessons/${next.slug}`} className="button" data-variant="primary">
        Continue with lesson {next.order}
      </Link>
      <p>
        {doneCount} of {LESSONS.length} done. Next up: {next.title}.
      </p>
    </div>
  );
}
