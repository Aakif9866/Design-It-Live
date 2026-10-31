# DESIGN.md

Visual direction for Design It Live.

## Source

On 2026-10-31 the owner asked for the frontend to be rebuilt with the local **frontend-design-aesthetic** skill (`~/.claude/skills/frontend-design-aesthetic`, derived from the Klyro blog), with its upgrade targets applied: more motion, a much darker dark mode and a more colourful palette.

This replaces two earlier directions:
- a dark "engineer's notebook" with a lime highlighter, which the owner said "looks pretty odd";
- a solid orchid accent, which was dropped part way through.

What carries over from the owner's earlier brief: dark by default with a working light toggle, serif body with sans headings, and the pinkish-violet colour they asked for, which now lives in the gradient.

**antislop note:** the indigo-purple-pink gradient is a pattern antislop flags (R-01). It is kept because the owner chose this skill, and it is limited to the places listed below rather than used across the page.

## Colour

| Role | Dark | Light |
| --- | --- | --- |
| page | `#0A0A0A` | `#FFFFFF` |
| card | `#141414` | `#F9FAFB` |
| popover / drawer | `#1C1C1C` | `#F3F4F6` |
| body text | `#E5E7EB` | `#374151` |
| headings | `#FFFFFF` | `#111827` |
| muted text | `#9CA3AF` | `#6B7280` |
| **accent (teal)** | `#2DD4BF` | `#0F766E` text, `#0D9488` borders |
| gradient | `#818CF8 → #C084FC → #F472B6` | `#4F46E5 → #9333EA → #DB2777` |
| mistakes only (amber) | `#FBBF24` | `#B45309` |

- **Teal is the workhorse.** It is used for links, outlined buttons, borders on cards that matter (decision cards, the order slip), section numbers, the current lesson and correct quiz answers.
- **The gradient** is used on:
  - the brand mark and the favicon;
  - primary buttons ("Start Saturday", "Mark as done"), which always use the darker stops so white text passes on every stop;
  - small motifs: the hero underline, short section dividers, nav hover underlines, the progress bar, the outcome numbers and the glossary letters.
- **Amber** only marks things that went wrong: wrong quiz answers, the "common mistake" notes and warning callouts. It always comes with a text label.
- Every text and background pair was checked with the antislop contrast script and passes WCAG AA.

## Shape and elevation

- Cards round two opposite corners only: `1.25rem 0 1.25rem 0`. Smaller controls use `0.6rem 0 0.6rem 0`.
- Elevation comes from borders, not shadows. In dark mode the borders are a faint white line, `rgba(255,255,255,.1)`. Only the mobile drawer has a shadow at rest.
- An 8px teal strip runs across the top of every page.

## Type

- **Body: Literata.** A serif built for long on-screen reading; the course is about six and a half hours.
- **Headings: Anek Latin,** semi-condensed, from an Indian foundry.
- **Code: JetBrains Mono,** used for code only.
- **Size:** the hero and lesson titles jump from 2rem on phones to 3.6rem on desktop, as one step rather than a gradual scale.

## Motion

All motion is CSS only and turned off under `prefers-reduced-motion`.

- **Entrance:**
  - The hero, the lesson header and page titles fade and slide in.
  - The home contents list staggers in at 40ms per row.
  - The hero underline draws in once.
- **Hover:**
  - Day cards and the previous/next cards lift by 4px.
  - A gradient underline draws in under a lesson title.
  - Outlined buttons invert to filled.
- **Press:** buttons shrink slightly (`scale(.95)`).
- **Timing:** nothing runs longer than 500ms.
