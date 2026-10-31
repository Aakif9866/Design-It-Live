"use client";

import { useState } from "react";
import { inline } from "./inline";

const LETTERS = ["A", "B", "C", "D"] as const;
type Letter = (typeof LETTERS)[number];
type Question = { q: string; options: string[]; answer: Letter; why: string };

export function Quiz({ questions }: { questions: Question[] }) {
  return (
    <div className="quiz">
      <ol className="quiz-list">
        {questions.map((q, i) => (
          <QuizQuestion key={i} n={i + 1} {...q} />
        ))}
      </ol>
    </div>
  );
}

function QuizQuestion({ n, q, options, answer, why }: Question & { n: number }) {
  // null = not answered, -1 = revealed without guessing
  const [picked, setPicked] = useState<number | null>(null);
  const correct = LETTERS.indexOf(answer);
  const revealed = picked !== null;

  return (
    <li className="quiz-q">
      <p className="quiz-prompt" id={`q${n}`}>
        {inline(q)}
      </p>
      <div className="quiz-options" role="group" aria-labelledby={`q${n}`}>
        {options.map((opt, j) => {
          const state = !revealed ? "idle" : j === correct ? "correct" : j === picked ? "wrong" : "dim";
          return (
            <button
              key={j}
              type="button"
              className="quiz-option"
              data-state={state}
              aria-pressed={picked === j}
              aria-disabled={revealed}
              onClick={() => !revealed && setPicked(j)}
            >
              <span className="quiz-letter" aria-hidden="true">
                {LETTERS[j]}
              </span>
              <span>{inline(opt)}</span>
              {state === "correct" && <span className="quiz-tag">{picked === j ? "Your answer, correct" : "Correct answer"}</span>}
              {state === "wrong" && <span className="quiz-tag">Your answer</span>}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {revealed ? (
          <div className="quiz-why" data-result={picked === correct ? "right" : picked === -1 ? "shown" : "wrong"}>
            <p>
              <strong>
                {picked === correct ? "Correct. " : picked === -1 ? `The answer is ${answer}. ` : `Not quite. The answer is ${answer}. `}
              </strong>
              {inline(why)}
            </p>
            <button type="button" className="link-button" onClick={() => setPicked(null)}>
              Try this question again
            </button>
          </div>
        ) : (
          <button type="button" className="link-button" onClick={() => setPicked(-1)}>
            Show the answer
          </button>
        )}
      </div>
    </li>
  );
}
