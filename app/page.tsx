import Link from "next/link";
import type { CSSProperties } from "react";
import { ContinueLink } from "@/components/ContinueLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LESSONS, PARTS, PART_IDS, TOTAL_MINUTES, formatMinutes, partLessons, type Part } from "@/lib/course";

const WAVE = [6, 12, 20, 14, 24, 10, 18, 26, 16, 8, 22, 12, 18, 9, 14, 20, 11, 6, 15, 9];

const BLURB: Record<Part, string> = {
  A: "The distributed-systems core every later lesson builds on.",
  B: "How production AI products are engineered, end to end.",
  C: "Traffic spikes, client apps, shipping and interviews.",
};

function PartContents({ part }: { part: Part }) {
  const lessons = partLessons(part);
  const total = lessons.reduce((s, l) => s + l.minutes, 0);
  return (
    <section className="toc-day" aria-labelledby={`toc-${part}`}>
      <header className="toc-head">
        <p className="toc-part">Part {part}</p>
        <h3 id={`toc-${part}`}>{PARTS[part]}</h3>
        <p>
          {lessons.length} lessons, {formatMinutes(total)}. {BLURB[part]}
        </p>
      </header>
      <ol className="toc-list">
        {lessons.map((l, i) => (
          <li key={l.slug} style={{ "--i": i } as CSSProperties}>
            <Link href={`/lessons/${l.slug}`} className="toc-link">
              <span className="toc-num">{String(l.order).padStart(2, "0")}</span>
              <span className="toc-title">{l.title}</span>
              <span className="toc-min">{l.minutes} min</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Home() {
  return (
    <div className="home">
      <header className="home-nav">
        <Link href="/" className="brand">
          Design It Live
        </Link>
        <nav aria-label="Site">
          <ul>
            <li>
              <Link href="/plan">Study plan</Link>
            </li>
            <li>
              <Link href="/cheatsheet">Cheat sheet</Link>
            </li>
            <li>
              <Link href="/glossary">Glossary</Link>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-text">
            <h1>
              Learn system design by <span className="swipe">building one product</span>.
            </h1>
            <p className="hero-lede">
              {LESSONS.length} lessons follow DukaanVoice, an AI assistant that turns customers&rsquo; voice messages into orders for small neighbourhood shops,
              from a 20-shop pilot to two million orders a day. Each idea arrives at the moment the product needs it.
            </p>
            <ContinueLink />
            <p className="hero-facts">About {formatMinutes(TOTAL_MINUTES)} of reading, at your own pace. No setup, no exercises, nothing to install.</p>
          </div>

          <figure className="demo" aria-label="Example: a customer voice message becomes an order summary">
            <div className="bubble">
              <span className="bubble-who">Customer, 7:42 pm</span>
              <span className="voice">
                <span className="voice-play" aria-hidden="true" />
                <span className="wave" aria-hidden="true">
                  {WAVE.map((h, i) => (
                    <span key={i} style={{ height: h }} />
                  ))}
                </span>
                <span className="voice-time">0:08</span>
              </span>
              <span className="transcript">“Hi, can you send two bags of flour and a bottle of laundry detergent?”</span>
            </div>
            <div className="slip">
              <p className="slip-head">
                <span>Order summary</span>
                <span>#0193</span>
              </p>
              <table>
                <tbody>
                  <tr>
                    <td>Wheat flour, 1 kg × 2</td>
                    <td>$3.20</td>
                  </tr>
                  <tr>
                    <td>Laundry detergent, 1 L × 1</td>
                    <td>$4.50</td>
                  </tr>
                  <tr className="total">
                    <td>Total</td>
                    <td>$7.70</td>
                  </tr>
                </tbody>
              </table>
              <p className="slip-foot">Reply 1 to confirm, 2 to change. Payment link follows.</p>
            </div>
            <figcaption>What the assistant does, and what you will design. The order is an illustration.</figcaption>
          </figure>
        </section>

        <section className="home-toc" aria-labelledby="toc-title">
          <div className="section-head">
            <h2 id="toc-title">The course, part by part</h2>
            <p>
              Each lesson opens with the problem the product just hit and ends with the architecture after fixing it. The <Link href="/plan">study plan</Link> has
              a running total of reading time.
            </p>
          </div>
          <div className="toc-days">
            {PART_IDS.map((p) => (
              <PartContents key={p} part={p} />
            ))}
          </div>
        </section>

        <section className="home-outcomes" aria-labelledby="outcomes-title">
          <h2 id="outcomes-title">By the end, you can</h2>
          <ol className="outcomes">
            <li>Explain how real systems handle load, failure and data correctness, from caches and queues to sharding and consistency.</li>
            <li>Spot the small early decisions in any web or mobile app that turn out to matter a lot two years later.</li>
            <li>Describe how production AI products are built: gateways, structured outputs, RAG, agents, evals, guardrails and cost.</li>
            <li>Talk through a system design interview with a repeatable framework and real numbers.</li>
          </ol>
        </section>

        <section className="home-why">
          <div>
            <h2>Who this is for</h2>
            <p>
              Developers who can build a full-stack app (an API, a React front end, a SQL or document database) but have never studied system design formally. It
              suits anyone preparing for system design interviews or about to work on an AI product.
            </p>
            <p>The course builds on what you already know instead of re-teaching it, and stays plain enough that anyone who has shipped a web app can finish it.</p>
          </div>
          <div>
            <h2>Why one product</h2>
            <p>
              Most system design material jumps between a social feed, a URL shortener and a chat app. You learn patterns but not how they fit together. Here every
              concept appears because the product just hit the problem it solves: a holiday traffic spike, a customer charged twice, an AI bill bigger than the
              revenue.
            </p>
            <p>More than half of the reading is AI system design. The rest is the distributed-systems core every engineer is expected to know.</p>
          </div>
        </section>

        <footer className="footer">
          <p>Design It Live. Code under the MIT licence, course text under CC BY 4.0. DukaanVoice and its shops are fictional, invented for this course.</p>
        </footer>
      </main>
    </div>
  );
}
