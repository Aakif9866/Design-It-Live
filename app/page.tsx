import Link from "next/link";
import { ContinueLink } from "@/components/ContinueLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LESSONS, PARTS, TOTAL_MINUTES, formatMinutes, type Day } from "@/lib/course";

const WAVE = [6, 12, 20, 14, 24, 10, 18, 26, 16, 8, 22, 12, 18, 9, 14, 20, 11, 6, 15, 9];

function DayContents({ day, blurb }: { day: Day; blurb: string }) {
  const lessons = LESSONS.filter((l) => l.day === day);
  const total = lessons.reduce((s, l) => s + l.minutes, 0);
  return (
    <section className="toc-day" aria-labelledby={`toc-${day}`}>
      <header className="toc-head">
        <h3 id={`toc-${day}`}>{day}</h3>
        <p>
          {formatMinutes(total)}. {blurb}
        </p>
      </header>
      <ol className="toc-list">
        {lessons.map((l, i) => (
          <li key={l.slug}>
            {(i === 0 || lessons[i - 1].part !== l.part) && (
              <p className="toc-part">
                Part {l.part}: {PARTS[l.part]}
              </p>
            )}
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
              <Link href="/plan">Weekend plan</Link>
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
              Learn system design in one weekend, by <span className="swipe">building one product</span>.
            </h1>
            <p className="hero-lede">
              Twenty lessons follow DukaanVoice, an AI assistant that turns WhatsApp voice notes into orders for Indian kirana stores, from 20 shops to two million
              orders a day. You learn each idea at the moment the product needs it.
            </p>
            <ContinueLink />
            <p className="hero-facts">
              About {formatMinutes(TOTAL_MINUTES)} of reading across Saturday and Sunday. No setup, no exercises, nothing to install.
            </p>
          </div>

          <figure className="demo" aria-label="Example: a customer voice note becomes an order slip">
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
              <span className="transcript">“bhaiya 2 kilo atta aur ek Surf Excel bhej do”</span>
            </div>
            <div className="slip">
              <p className="slip-head">
                <span>Sri Lakshmi Kirana</span>
                <span>Order 0193</span>
              </p>
              <table>
                <tbody>
                  <tr>
                    <td>Aashirvaad atta, 1 kg × 2</td>
                    <td>₹130</td>
                  </tr>
                  <tr>
                    <td>Surf Excel Easy Wash, 1 kg × 1</td>
                    <td>₹140</td>
                  </tr>
                  <tr className="total">
                    <td>Total</td>
                    <td>₹270</td>
                  </tr>
                </tbody>
              </table>
              <p className="slip-foot">Reply 1 to confirm, 2 to change. UPI link follows.</p>
            </div>
            <figcaption>What DukaanVoice does, and what you will design. The shop and order are fictional.</figcaption>
          </figure>
        </section>

        <section className="home-toc" aria-labelledby="toc-title">
          <div className="section-head">
            <h2 id="toc-title">The weekend, lesson by lesson</h2>
            <p>
              Each lesson opens with the problem DukaanVoice just hit and ends with the architecture after fixing it. The <Link href="/plan">weekend plan</Link>{" "}
              adds start times and breaks.
            </p>
          </div>
          <div className="toc-days">
            <DayContents day="Saturday" blurb="Foundations in the morning, the first AI lessons after lunch." />
            <DayContents day="Sunday" blurb="The rest of the AI systems, then scale, mobile and shipping." />
          </div>
        </section>

        <section className="home-outcomes" aria-labelledby="outcomes-title">
          <h2 id="outcomes-title">By Sunday night, you can</h2>
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
              Developers who can build a full-stack app (an Express API, a React front end, a MongoDB or Postgres database) but have never studied system design
              formally. If you are preparing for SDE interviews or about to work on an AI product, this is the weekend to do it.
            </p>
            <p>The course builds on what you already know instead of re-teaching it, and stays plain enough that anyone who has shipped a web app can finish it.</p>
          </div>
          <div>
            <h2>Why one product</h2>
            <p>
              Most system design material jumps between Twitter, a URL shortener and a chat app. You learn patterns but not how they fit together. Here every
              concept appears because DukaanVoice just hit the problem it solves: a Diwali traffic spike, a double-charged customer, an AI bill bigger than the
              revenue.
            </p>
            <p>More than half of the reading is AI system design. The rest is the distributed-systems core every engineer is expected to know.</p>
          </div>
        </section>

        <footer className="footer">
          <p>Design It Live. Code under the MIT licence, course text under CC BY 4.0. DukaanVoice is a fictional product invented for this course.</p>
        </footer>
      </main>
    </div>
  );
}
