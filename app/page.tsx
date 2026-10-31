import Link from "next/link";
import { ContinueLink } from "@/components/ContinueLink";
import { LESSONS, TOTAL_MINUTES, formatMinutes, type Day } from "@/lib/course";

const WAVE = [6, 12, 20, 14, 24, 10, 18, 26, 16, 8, 22, 12, 18, 9, 14, 20, 11, 6, 15, 9];

function DayColumn({ day }: { day: Day }) {
  const lessons = LESSONS.filter((l) => l.day === day);
  const total = lessons.reduce((s, l) => s + l.minutes, 0);
  return (
    <div>
      <div className="day-head">
        <h3>{day}</h3>
        <span>{formatMinutes(total)}</span>
      </div>
      <ol className="day-list">
        {lessons.map((l) => (
          <li key={l.slug}>
            <Link href={`/lessons/${l.slug}`}>
              {l.order}. {l.title}
            </Link>
            <span className="num">{l.minutes} min</span>
          </li>
        ))}
      </ol>
    </div>
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
      </header>

      <main id="main">
        <section className="hero">
          <div>
            <h1>Learn system design in one weekend, by building one product.</h1>
            <p className="hero-lede">
              Twenty lessons follow DukaanVoice, an AI assistant that turns WhatsApp voice notes into orders for Indian kirana stores, from 20 shops to two million
              orders a day. You learn each idea at the moment the product needs it.
            </p>
            <ContinueLink />
            <p className="hero-facts">
              About {formatMinutes(TOTAL_MINUTES)} of reading across Saturday and Sunday. No setup, no exercises, nothing to install.
            </p>
          </div>

          <div className="demo" aria-label="Example: a customer voice note becomes an order slip">
            <div className="demo-chat">
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
              <p className="slip-foot">
                <span>Reply 1 to confirm, 2 to change</span>
                <span className="stamp">UPI link ready</span>
              </p>
            </div>
          </div>
        </section>

        <section className="home-section">
          <h2>What you will be able to do by Sunday night</h2>
          <ol className="outcomes">
            <li>Explain how real systems handle load, failure and data correctness, from caches and queues to sharding and consistency.</li>
            <li>Spot the small early decisions in any web or mobile app that turn out to matter a lot two years later.</li>
            <li>Describe how production AI products are built: gateways, structured outputs, RAG, agents, evals, guardrails and cost.</li>
            <li>Talk through a system design interview with a repeatable framework and real numbers.</li>
          </ol>
        </section>

        <section className="home-section home-cols">
          <div>
            <h2>Who this is for</h2>
            <p>
              Developers who can build a full-stack app (an Express API, a React front end, a MongoDB or Postgres database) but have never studied system design
              formally. If you are preparing for SDE interviews or about to work on an AI product, this is the weekend to do it.
            </p>
            <p>
              The course builds on what you already know instead of re-teaching it, and stays plain enough that anyone who has shipped a web app can finish it.
            </p>
          </div>
          <div>
            <h2>Why one product</h2>
            <p>
              Most system design material jumps between Twitter, a URL shortener and a chat app. You learn patterns but not how they fit together. Here every
              concept appears because DukaanVoice just hit the problem it solves: a Diwali traffic spike, a double-charged customer, an AI bill bigger than the
              revenue.
            </p>
            <p>About 60% of the reading is AI system design. The rest is the distributed-systems core every engineer is expected to know.</p>
          </div>
        </section>

        <section className="home-section">
          <h2>The weekend at a glance</h2>
          <div className="home-cols">
            <DayColumn day="Saturday" />
            <DayColumn day="Sunday" />
          </div>
          <p>
            See the <Link href="/plan">weekend plan</Link> for suggested start times and breaks.
          </p>
        </section>

        <footer className="footer">
          <p>
            Design It Live. Code under the MIT licence, course text under CC BY 4.0. DukaanVoice is a fictional product invented for this course.
          </p>
        </footer>
      </main>
    </div>
  );
}
