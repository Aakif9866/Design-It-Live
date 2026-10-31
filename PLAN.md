# Design It Live: build plan

## 1. Design plan

> Superseded on 2026-10-31. The frontend was rebuilt from the owner's brief in [DESIGN.md](DESIGN.md) (dark engineer's notebook, lime highlighter). This section is kept as history.

### First draft (rejected)

White page, Inter for everything, one indigo accent, rounded cards with a soft grey shadow for
every component, a gradient hero, small all-caps labels above each heading.

Critique: this is the default look of every course and SaaS landing page. Nothing in it says
"Indian shop", "voice note" or "engineering drawing". Every component would be the same card with
a different icon, so a reader skimming lesson 14 could not tell a decision card from a quiz.

### Revised concept: the khata and the blueprint

A kirana shopkeeper keeps a **khata**: a ruled ledger with a red margin line where every sale is
written in blue ink. An engineer works on a **blueprint**: a navy sheet with chalk-white lines.
This course sits exactly between the two, so:

- **Light mode is the khata page.** Cool white paper, blue-black ink, a red margin line running down
  the reading column with the lesson number hanging in the margin, like a bill number.
- **Dark mode is the blueprint.** Deep navy, chalk text, diagrams drawn as light lines on grid.
- Ledger conventions are used for structure, not decoration: the weekend plan is a ledger with a
  running total column; takeaways end with the accountant's double rule; decision cards are a
  two-column "this side / that side" ledger with a rubber-stamped default.

### Palette

| Name | Light (khata) | Dark (blueprint) | Role |
| --- | --- | --- | --- |
| Paper | `#F4F6F7` | `#0E1B2E` | page background |
| Ink | `#1A2332` | `#E4ECF4` | body text |
| Royal ink | `#1F4FBF` | `#7FB2F0` | links, diagram strokes, focus ring |
| Margin red | `#C2333A` | `#FF8F86` | margin line, stamps, wrong answers |
| Haldi | `#E3A21A` | `#F0B84A` | interview notes (fill and border only, never text on paper) |
| Paan green | `#2C7A4B` | `#6CCB94` | correct answers, done state |

Plus two derived neutrals per mode (rule lines, muted text). All text pairs checked to WCAG AA.

### Type

- **Anek Latin** (Ek Type, an Indian foundry), semi-condensed, for headings, lesson numbers and UI.
  It has the narrow, confident shape of a painted shop signboard.
- **Literata** for body text. It was designed for long-form screen reading; this is a six-hour read.
- **JetBrains Mono** only inside code blocks and inline code. Never for labels.
- Scale (1.25 ratio from 18px body): 18 / 22.5 / 28 / 35 / 44 / 55. Body line-height 1.7, measure
  capped at 68ch.

### Layout

```
desktop (≥ 1024px)
┌───────────────┬─────────────────────────────────────────────┐
│ Design It Live│      │                                       │
│ 6 of 20 done  │  07  │ Async systems: queues, workers,       │
│ ───────────── │      │ webhooks                              │
│ Saturday      │      │ Saturday afternoon, about 20 minutes  │
│ ✓ 1 Welcome   │      │                                       │
│ ✓ 2 Thinking  │      │ body text, 68ch max                   │
│ ● 7 Async     │      │                                       │
│    The problem│      │ ┌ Fig 7.1 ─────────────── blueprint ┐ │
│    Queues     │      │ │      mermaid diagram               │ │
│    ...        │      │ └────────────────────────────────────┘ │
│ Sunday        │      │ ┌ Decision ─────┬──────────────┐       │
│ ○ 8 LLMs      │      │ │ Choose A when │ Choose B when│ STAMP │
│               │      │ └───────────────┴──────────────┘       │
└───────────────┴──────┴───────────────────────────────────────┘
              red margin line ┘

mobile (360px): sidebar becomes a drawer behind a "Lessons" button in a slim top bar; the margin
line moves to 12px from the left edge; the lesson number sits above the title.
```

### Component treatments (each must be recognisable at a glance)

- **Diagram**: blueprint panel with a faint grid, "Fig 7.1" caption below, horizontal scroll if needed.
- **Decision**: ledger with two columns split by a vertical rule, trade-off line beneath, and a
  rotated rubber stamp "DukaanVoice default" in margin red.
- **Interview**: haldi left border, the interviewer's question set as a speech bubble, then what
  they want to hear and the common mistake.
- **Quiz**: an order slip with a perforated top edge; options are rows; reveal ticks the right row
  in paan green and marks a wrong pick in margin red.
- **Takeaways**: plain list closed by a double rule, like the total at the bottom of a bill.
- **Callout**: thin royal-ink rule on the left, used for asides and warnings.

### Principles

1. Reading comes first. Nothing animates, floats or fights the paragraph you are on.
2. Every visual device must come from the khata or the blueprint, and must carry meaning.
3. Each kind of content has one look, used consistently across all 20 lessons.

### Motion

One deliberate moment: the "Mark as done" rubber stamp lands (scale and slight rotate, 180ms).
Quiz reveal uses a short colour transition. Everything is disabled under `prefers-reduced-motion`.

## 2. Architecture

- Next.js 16 App Router, fully static. `lib/course.ts` is the manifest. Lessons are
  `content/lessons/NN-slug.mdx`, loaded with `@next/mdx` and a dynamic import.
- Decision cards live in `lib/decisions.ts`; `<Decision id="..."/>` renders one, the cheat sheet
  renders all. Glossary lives in `lib/glossary.ts`.
- On-page sections: the `h2` MDX component sets an id from its text; the sidebar reads the same
  headings from the MDX source at build time with the same slug function.
- `scripts/check-content.mjs` verifies: every lesson has the required components, 3 quiz
  questions, valid decision ids, balanced answer letters; it prints word counts.

## 3. Canonical DukaanVoice numbers (use these everywhere)

Illustrative exchange rate: ₹85 per US$1.

| Stage | Shops | Orders/day | Where it appears |
| --- | --- | --- | --- |
| v1 pilot | 20 shops in Hyderabad | ~600 | L1, L3, L4 |
| Early growth | 500 | ~15,000 | L5, L6 |
| Regional | 2,000 (Telangana + Andhra Pradesh) | ~60,000 | L7 to L12 |
| Scale-up | 10,000 | ~300,000 | L13 to L17 |
| Target (year 2) | 50,000 | 2,000,000 | L2 math, L18 Diwali |

- Average shop: 40 orders/day. 4 inbound customer messages per order. 1.5 voice notes per order.
- Year-2 load: 8M messages/day ≈ 93 msg/s average; normal evening peak 3x ≈ 280 msg/s;
  Diwali peak 10x average ≈ 930 msg/s (call it about 1,000).
- Voice note: average 8 seconds, Opus at roughly 16 kbit/s ≈ 16 KB. 3M voice notes/day ≈ 48 GB/day,
  about 1.4 TB per 30 days.
- Order row with items ≈ 1 KB → 2 GB/day. Message rows ≈ 0.5 KB → 4 GB/day.
- Tokens per order (all LLM calls): about 2,500 input, 300 output.
- Illustrative prices: small model $0.15 / 1M input, $0.60 / 1M output; large model $3 / $15.
  Speech-to-text (STT) $0.006 per audio minute.
- Cost per order: small model ≈ $0.00056 ≈ ₹0.05; large model ≈ $0.012 ≈ ₹1.02;
  STT ≈ 1.5 × 8s ≈ 12s ≈ $0.0012 ≈ ₹0.10.
- Revenue: ₹1,499 per shop per month, ~1,200 orders per shop per month ≈ ₹1.25 per order.
  AI budget: at most ₹0.25 per order (20% of revenue). Target blended: ≈ ₹0.18.
- Voice-to-confirmation latency target: p95 under 6 s. SLO: 99.9% of orders confirmed correctly,
  ~43 minutes of error budget per 30 days for availability.

## 4. Course outline

Answer key (60 questions, 15 per letter, no letter twice in a lesson):

| L | Answers | L | Answers | L | Answers | L | Answers |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | B D A | 6 | B A D | 11 | D C A | 16 | D B C |
| 2 | C A D | 7 | D C B | 12 | A B C | 17 | C A D |
| 3 | D B C | 8 | A B C | 13 | C D B | 18 | B D A |
| 4 | A C B | 9 | C D A | 14 | B A D | 19 | A C B |
| 5 | C D A | 10 | B A D | 15 | A C B | 20 | D B C |

Every lesson follows: The problem → concepts (several h2s) → diagrams → code → decision cards →
Interview angle → Key takeaways → Quiz → prev/next + mark as done.

### Part A, Saturday morning
1. **Welcome + meet DukaanVoice** (10). How to read, weekend plan, the product, the v1 flow,
   end-state teaser. Diagram: end-state architecture (simplified). Decision: read in order vs jump.
2. **Thinking like a system designer** (20). Functional vs non-functional, DAU → QPS → storage →
   bandwidth, peak factors, token math. Diagram: estimation funnel. Decisions: average vs peak
   sizing; latency vs correctness priority. Code: a cost calculator.
3. **The boring v1** (20). Monolith, Postgres, Next.js + Node API, WhatsApp webhook intake, REST
   design, status codes, versioning. Diagrams: v1 architecture, webhook sequence. Decisions:
   monolith vs microservices; REST vs GraphQL. Code: Express webhook handler, route table.
4. **Data modeling that survives growth** (20). SQL vs NoSQL vs Mongo background, schema, B-tree
   indexes, composite index order, transactions and `SELECT ... FOR UPDATE`, multi-tenancy.
   Diagrams: ER diagram, tenancy models. Decisions: SQL vs document DB; tenancy model; locking.
5. **Small decisions, huge consequences** (25). IDs, money, time, deletes, idempotency keys,
   pagination, sessions vs JWT, files on S3, enums, API versioning for old apps, naming.
   Diagram: idempotency flow. Decisions: ID format; pagination; sessions vs JWT.
6. **Caching and read scaling** (15). Cache-aside, TTLs, invalidation, Redis, CDN, replicas, lag,
   what not to cache. Diagram: read path with cache and replica. Decisions: cache pattern; replica reads.
7. **Async systems** (20). Why voice is async, queues, retries with backoff and jitter, DLQ,
   at-least-once, idempotent consumers, outbox, webhook verify + dedupe. Diagrams: async pipeline,
   outbox. Decisions: BullMQ vs SQS; outbox vs direct publish.

### Part B, Saturday afternoon and Sunday morning
8. **LLMs as a system component** (20). TTFT, tokens, context windows, pricing, rate limits,
   nondeterminism, model choice by task. Diagram: request lifecycle. Decisions: small vs large; stream vs wait.
9. **The voice pipeline** (20). STT → understanding → reply, streaming, latency budget, code-mixed
   language, audio storage, sync vs async. Diagrams: pipeline, latency budget. Decisions: sync vs
   async path; text vs voice reply.
10. **The LLM gateway** (25). Provider abstraction, fallbacks, cascades, retries, timeouts, per-tenant
    quotas, logging, exact and semantic caches, prompt caching. Diagram: gateway. Decisions: build vs
    buy; semantic cache.
11. **Structured outputs and tool calling** (20). Zod schemas, tool calls, repair loops, confidence,
    human confirmation. Diagram: tool loop. Decisions: structured output vs tools; auto-confirm threshold.
12. **RAG done right** (25). Embeddings, pgvector vs vector DB, chunking, hybrid search, RRF,
    reranking, metadata filters, freshness, failure modes. Diagrams: retrieval pipeline, indexing.
    Decisions: pgvector vs dedicated; hybrid vs vector-only.
13. **Agents vs workflows** (20). Workflow vs agent loop, analytics agent, step and cost limits,
    durable execution, MCP, multi-agent. Diagrams: order workflow vs agent loop. Decisions:
    workflow vs agent; single vs multi-agent.
14. **Context engineering and memory** (15). Conversation state, summarisation, context order,
    per-shop context, prompt versioning, memory vs fetch. Diagram: context assembly. Decision: memory vs fetch.
15. **Evals and AI observability** (20). Golden sets, offline vs online, LLM-as-judge, CI
    regression, tracing, drift. Diagram: eval loop. Decisions: judge vs exact checks; offline vs online.
16. **Safety, guardrails, privacy** (20). Prompt injection, prices never from the LLM, validation,
    PII redaction, tenant isolation, DPDP Act, retention, abuse. Diagram: trust boundaries.
    Decisions: redaction point; retention.
17. **AI cost engineering** (20). Unit economics, budgets, caching, batching, cascades, smaller and
    fine-tuned models, self-hosting break-even. Diagram: cost waterfall. Decisions: self-host vs API;
    fine-tune vs prompt.

### Part C, Sunday afternoon
18. **Diwali night** (20). Spikes, autoscaling, backpressure, load shedding, queue levelling, token
    bucket, partitioning and sharding, multi-region, CAP, timeouts, circuit breakers, degradation,
    SLOs. Diagrams: spike architecture, circuit breaker states. Decisions: shard key; consistency per feature.
19. **Frontend and mobile** (20). Offline-first, sync and conflicts, optimistic UI, push, SSE vs
    WebSockets, SSR/CSR/static, forced update. Diagrams: offline sync. Decisions: SSE vs WebSockets;
    rendering mode; conflict strategy.
20. **Ship it + interview playbook** (20). CI/CD, flags, canaries, observability, on-call, final
    architecture, interview framework, decision recap. Diagrams: deploy pipeline, final architecture.
    Decision: canary vs blue-green.

## 5. Word budget

~150 words per minute minus diagram and quiz time. 10 min ≈ 1,100; 15 ≈ 1,700; 20 ≈ 2,300;
25 ≈ 2,800 words. Target total ≈ 45,000 to 50,000 words.
