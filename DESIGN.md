# DESIGN.md

Visual direction for Design It Live. The owner's answers are quoted as given; everything marked *(agent)* is a detail filled in to carry those answers out, and can be changed.

## Owner's brief (2026-10-31)

- **Personality:** "Engineers notebook + dark, polished, colourful. Dark + hints of vibrant colors here and there."
- **Palette:** black and white plus one colour: one main accent, plus a few small vibrant hints.
- **Typography:** serif body, sans headings.
- **Energy:** balanced. The home page has some personality and a little motion; lesson pages stay calm.
- **Theme:** dark by default, with a working light mode and a toggle.

Dial: ENERGY 2 / RHYTHM 2 / MOTION 2

## How the brief is carried out *(agent)*

### Colour

| Token | Dark | Light | Used for |
| --- | --- | --- | --- |
| background | `#0F1012` | `#F8F7F3` | page |
| surface | `#17191C` | `#FFFFFF` | cards, sidebar, code |
| ink | `#EDEBE5` | `#151515` | text |
| muted | `#A6A49D` | `#57564F` | secondary text |
| **accent (lime highlighter)** | `#D4F55A` | `#D4F55A` as marker, `#4D6B00` as text | the one main accent |
| hint: cyan | `#63C7F5` | `#0A6A93` | diagrams only |
| hint: pink | `#FF7AA2` | `#B8235A` | mistakes and warnings only |

- The accent is a **highlighter**, because an engineer marks up their notebook with one. It appears on links and focus in dark mode, primary buttons, text selection, the current lesson, the "DukaanVoice default" in decision cards and one phrase in the home headline. Nowhere else.
- Cyan is kept to diagrams, so the architecture drawings read as a separate layer from the text.
- Pink only marks things that went wrong: wrong quiz answers, the "common mistake" in interview notes and warning callouts. It always comes with a text label, never colour alone.
- In light mode, lime as text fails contrast, so it is used as a marker behind dark text, and links and focus use the darker olive `#4D6B00`.

### Type

- **Body: Literata.** A serif designed for long reading on screens, with an optical-size axis. The course is about six and a half hours of reading.
- **Headings: Anek Latin,** semi-condensed. It is from Ek Type, an Indian foundry, which fits a course set in Indian kirana shops, and the narrow width keeps long lesson titles on two lines.
- **Code: JetBrains Mono.** Used only for code. It is chosen for its clearly different `0 O l 1`, not as decoration.

### The notebook motif

- **Highlighter marks** are the single repeated gesture (see Colour).
- **Margin numbers:** the lesson number and section numbers sit in the left margin, like a numbered notebook page.
- **No grid or dot-paper backgrounds.** They are the stock way to say "notebook" (antislop R-07). The highlighter and the margin numbers do that job instead.

### Motion

- On the home page, the headline's highlighter swipe draws in once, and the example voice note turns into an order slip once. Both happen on load and never loop.
- Lesson pages use hover and press states only. "Mark as done" gives brief feedback.
- Under `prefers-reduced-motion: reduce`, nothing moves.

### Shape

- There is one radius, 6px, for cards and buttons.
- Inline code chips use 3px.
- Nothing is pill-shaped.
- There is only one shadow: the mobile lesson drawer, because it sits above the page.
