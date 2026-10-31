"use client";

import { useState } from "react";
import { setDone, useDone } from "@/lib/progress";

export function MarkDone({ slug }: { slug: string }) {
  const done = useDone().includes(slug);
  const [justStamped, setJustStamped] = useState(false);

  return (
    <div className="markdone">
      <button
        type="button"
        className="button"
        data-variant={done ? "quiet" : "primary"}
        aria-pressed={done}
        onClick={() => {
          setJustStamped(!done);
          setDone(slug, !done);
        }}
      >
        {done ? "Mark as not done" : "Mark as done"}
      </button>
      {done && (
        <span className="stamp stamp-done" data-animate={justStamped} aria-live="polite">
          Done
        </span>
      )}
    </div>
  );
}
