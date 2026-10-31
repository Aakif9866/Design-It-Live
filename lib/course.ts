export type Part = "A" | "B" | "C";
export type Day = "Saturday" | "Sunday";
export type Session = "morning" | "afternoon";

export type Lesson = {
  order: number;
  slug: string;
  title: string;
  part: Part;
  day: Day;
  session: Session;
  minutes: number;
  summary: string;
};

export const PARTS: Record<Part, string> = {
  A: "Foundations",
  B: "AI systems",
  C: "Scale, mobile and shipping",
};

export const LESSONS: Lesson[] = [
  { order: 1, slug: "welcome", title: "Welcome, and meet DukaanVoice", part: "A", day: "Saturday", session: "morning", minutes: 10, summary: "How this course works, the weekend plan, and the product you will design for two days." },
  { order: 2, slug: "thinking-like-a-designer", title: "Thinking like a system designer", part: "A", day: "Saturday", session: "morning", minutes: 20, summary: "Requirements, back-of-envelope math, and token math that turns traffic into a monthly AI bill." },
  { order: 3, slug: "the-boring-v1", title: "The boring v1", part: "A", day: "Saturday", session: "morning", minutes: 20, summary: "A monolith, one Postgres database, a WhatsApp webhook and a clean REST API." },
  { order: 4, slug: "data-modeling", title: "Data modeling that survives growth", part: "A", day: "Saturday", session: "morning", minutes: 20, summary: "SQL vs NoSQL, a schema for shops and orders, indexes, row locks for stock, and multi-tenancy." },
  { order: 5, slug: "one-way-doors", title: "Small decisions, huge consequences", part: "A", day: "Saturday", session: "morning", minutes: 25, summary: "The early choices that are cheap today and very expensive to undo in two years." },
  { order: 6, slug: "caching", title: "Caching and read scaling", part: "A", day: "Saturday", session: "morning", minutes: 15, summary: "Cache-aside, TTLs, invalidation, CDNs, read replicas and what you should never cache." },
  { order: 7, slug: "async-systems", title: "Async systems: queues, workers, webhooks", part: "A", day: "Saturday", session: "morning", minutes: 20, summary: "Queues, retries with jitter, dead-letter queues, idempotent consumers and the outbox pattern." },
  { order: 8, slug: "llms-as-components", title: "LLMs as a system component", part: "B", day: "Saturday", session: "afternoon", minutes: 20, summary: "Treat the model as a slow, expensive, unreliable dependency, and design around it." },
  { order: 9, slug: "voice-pipeline", title: "The voice pipeline", part: "B", day: "Saturday", session: "afternoon", minutes: 20, summary: "Speech-to-text, understanding and reply, with a latency budget for every stage." },
  { order: 10, slug: "llm-gateway", title: "The LLM gateway", part: "B", day: "Saturday", session: "afternoon", minutes: 25, summary: "One internal service for fallbacks, routing, quotas, logging and caching across providers." },
  { order: 11, slug: "structured-outputs", title: "Structured outputs and tool calling", part: "B", day: "Sunday", session: "morning", minutes: 20, summary: "Turning “2 kilo atta” into validated JSON, tool calls and a confirmation before money moves." },
  { order: 12, slug: "rag", title: "RAG done right", part: "B", day: "Sunday", session: "morning", minutes: 25, summary: "Embeddings, hybrid search, reranking, tenant filters and keeping the index fresh." },
  { order: 13, slug: "agents-vs-workflows", title: "Agents vs workflows", part: "B", day: "Sunday", session: "morning", minutes: 20, summary: "When to hard-code the steps, when to let the model choose them, and how to keep it safe." },
  { order: 14, slug: "context-and-memory", title: "Context engineering and memory", part: "B", day: "Sunday", session: "morning", minutes: 15, summary: "What goes into the context window, in what order, and what the system should remember." },
  { order: 15, slug: "evals-and-observability", title: "Evals and AI observability", part: "B", day: "Sunday", session: "morning", minutes: 20, summary: "Golden datasets, LLM-as-judge, prompt regression tests and tracing every model call." },
  { order: 16, slug: "safety-and-privacy", title: "Safety, guardrails and privacy", part: "B", day: "Sunday", session: "morning", minutes: 20, summary: "Prompt injection, output validation, PII, tenant isolation and India’s DPDP Act." },
  { order: 17, slug: "ai-cost", title: "AI cost engineering", part: "B", day: "Sunday", session: "morning", minutes: 20, summary: "Unit economics per order, token budgets, cascades and the self-hosting break-even." },
  { order: 18, slug: "diwali-scale", title: "Diwali night: scaling to millions", part: "C", day: "Sunday", session: "afternoon", minutes: 20, summary: "Spikes, backpressure, sharding, CAP, circuit breakers, graceful degradation and SLOs." },
  { order: 19, slug: "frontend-and-mobile", title: "Frontend and mobile decisions that matter", part: "C", day: "Sunday", session: "afternoon", minutes: 20, summary: "Offline-first, sync conflicts, streaming AI into the UI, rendering modes and forced updates." },
  { order: 20, slug: "ship-it", title: "Ship it, and the interview playbook", part: "C", day: "Sunday", session: "afternoon", minutes: 20, summary: "CI/CD, canaries, observability, the final architecture and a framework for any interview." },
];

export const TOTAL_MINUTES = LESSONS.reduce((sum, l) => sum + l.minutes, 0);

export function lessonFile(lesson: Lesson) {
  return `${String(lesson.order).padStart(2, "0")}-${lesson.slug}`;
}

export function getLesson(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}

export function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}
