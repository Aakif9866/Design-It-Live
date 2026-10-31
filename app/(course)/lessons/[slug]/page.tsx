import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { MarkDone } from "@/components/MarkDone";
import { LESSONS, PARTS, getLesson, lessonFile } from "@/lib/course";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = getLesson((await params).slug);
  if (!lesson) return {};
  const title = `${lesson.order}. ${lesson.title}`;
  return {
    title,
    description: lesson.summary,
    alternates: { canonical: `/lessons/${lesson.slug}` },
    openGraph: { title, description: lesson.summary, type: "article", url: `/lessons/${lesson.slug}` },
  };
}

export default async function LessonPage({ params }: Props) {
  const lesson = getLesson((await params).slug);
  if (!lesson) notFound();
  const { default: Content } = await import(`@/content/lessons/${lessonFile(lesson)}.mdx`);
  const prev = LESSONS[lesson.order - 2];
  const next = LESSONS[lesson.order];

  return (
    <article className="lesson" style={{ "--lesson": `"${String(lesson.order).padStart(2, "0")}"` } as CSSProperties}>
      <header className="lesson-head">
        <p className="lesson-num" aria-hidden="true">
          {String(lesson.order).padStart(2, "0")}
        </p>
        <p className="lesson-part">
          Part {lesson.part}, {PARTS[lesson.part]}
        </p>
        <h1>{lesson.title}</h1>
        <p className="lesson-meta">
          Lesson {lesson.order} of {LESSONS.length}. {lesson.day} {lesson.session}, about {lesson.minutes} minutes of reading.
        </p>
      </header>
      <div className="prose">
        <Content />
      </div>
      <footer className="lesson-foot">
        <MarkDone slug={lesson.slug} />
        <nav className="pager" aria-label="Lesson navigation">
          {prev ? (
            <Link href={`/lessons/${prev.slug}`} rel="prev" className="pager-link">
              <span className="pager-dir">Previous lesson</span>
              {prev.order}. {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/lessons/${next.slug}`} rel="next" className="pager-link pager-next">
              <span className="pager-dir">Next lesson</span>
              {next.order}. {next.title}
            </Link>
          ) : (
            <Link href="/cheatsheet" className="pager-link pager-next">
              <span className="pager-dir">You made it</span>
              Review the cheat sheet
            </Link>
          )}
        </nav>
      </footer>
    </article>
  );
}
