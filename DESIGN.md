---
name: RentAR
description: Landing page for RentAR — direct, agency-free long-term rentals in Córdoba, Argentina
colors:
  brand-blue: "#004D98"
  brand-blue-dark: "#003B74"
  brand-gold: "#D7B15D"
  brand-gold-ink: "#8C6B1D"
  brand-sky: "#A0D1EF"
  brand-sky-light: "#E3F2FB"
  ink: "#12202E"
  paper: "#F7F9FB"
typography:
  display:
    fontFamily: "League Spartan, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "League Spartan, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "League Spartan, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "League Spartan, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "League Spartan, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  pill: "9999px"
  md: "1rem"
  lg: "1.5rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-blue}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.brand-blue-dark}"
  button-secondary:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.brand-blue}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  card-property:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: RentAR

## Overview

**Creative North Star: "El trato directo"**

RentAR's whole visual language exists to make one thing feel true on sight: you are dealing with a real owner, not an agency counter. Every surface stays close, warm, and legible rather than corporate or glossy — a deep institutional blue gives the trust of paperwork done right, a warm gold marks the moment money changes hands, and a soft sky blue keeps the page light instead of bureaucratic. Nothing in the system tries to look like a big real-estate portal; it looks like a well-run, honest desk.

The system is quiet by default and spends its one loud gesture on the process itself: the hero's circular motion diagram (search → contact → sign → pay) is the single animated centerpiece, everything else moves only enough to acknowledge the user's scroll or hover. Cards are plain and information-dense rather than decorated; the only recurring embellishment is the pill shape, used consistently for anything actionable.

Confirmed rejection: no kicker/eyebrow labels above headings anywhere in the system — headings carry their own weight. No card-of-icon+heading+text as a page-structure default (the "Cómo funciona" section deliberately uses a connected numbered timeline instead).

**Key Characteristics:**
- Deep institutional blue as the only "loud" hue for interactive elements; gold reserved specifically for money/value.
- Large, soft rounding (pill buttons, `rounded-2xl`/`rounded-3xl` containers) — never sharp corners.
- Quiet, soft-lifted white cards on a barely-off-white page, not a bright-white/gray-900 pairing.
- One authored motion moment per view (hero loop; scroll-reveal timeline), never scattered decoration.
- League Spartan throughout — no secondary typeface, ever.

## Colors

The palette is small and function-coded: blue carries every clickable/primary action, gold appears only where money or value is being communicated, sky blue is atmosphere (backgrounds, dividers, hover fills), never text.

### Primary
- **Azul Escribanía** (`#004D98`): the only color used for primary buttons, links, active filter states, focus rings, icon strokes inside white node circles, and the numbered nodes in the "Cómo funciona" timeline. If it's clickable and important, it's this blue.
- **Azul Escribanía Oscuro** (`#003B74`): the hover/active state of the above. Never used at rest.

### Secondary
- **Dorado Trámite** (`#D7B15D` / ink variant `#8C6B1D`): reserved for money — the property price on each card, and the text-selection highlight. The raw `#D7B15D` is also the accent stroke on the hero's guide circle and the traveling node dot. `#8C6B1D` is the only text-safe gold (≥4.5:1 on white/paper); `#D7B15D` itself must never carry small text — see the Contrast Rule below.
- **Celeste Cordobés** (`#A0D1EF`, tint `#E3F2FB`): atmosphere only — the hero/how-it-works section backgrounds, the search bar's gradient lead-in, hover fills on secondary buttons and chips, the node ring glow. Never used for text or icons.

### Neutral
- **Ink** (`#12202E`): all body copy at full or `/70` opacity (never lower — see the Contrast Rule). Doubles as the near-black used at low opacity for hairline borders (`border-black/5`, `ring-black/5`).
- **Paper** (`#F7F9FB`): the page background. Cards sit on it in solid white to read as one step "up."

### Named Rules
**The Money-Is-Gold Rule.** Gold appears exactly where currency does (the price line) and nowhere else as a content color; everywhere else it is atmosphere (backgrounds, guide lines, selection). Do not use gold for a second, unrelated emphasis just because it is "the accent."

**The Contrast Rule.** No text on a light surface goes below `ink/70` (≈6.1:1 on white/paper) or below `brand-gold-ink` for gold text (≈4.96:1). `ink/60`, `ink/50`, and raw `brand-gold` (`#D7B15D`) are correct for large decorative fills but must never carry small text.

## Typography

**Display/Body Font:** League Spartan, with `system-ui, sans-serif` as fallback — one family for the entire system, at different weights and sizes only.

**Character:** A single confident geometric sans doing all the work: bold and tight-tracked at display size for headlines, regular weight for body copy. No serif, no mono, no second display face — the "one voice" is deliberate.

### Hierarchy
- **Display** (700, `text-4xl`→`text-5xl` / 2.25rem→3rem, line-height 1.05, `tracking-tight`): the H1 hero headline only.
- **Headline** (700, `text-2xl`→`text-4xl`, tight tracking): section H2s ("Propiedades disponibles…", "De la búsqueda a las llaves…").
- **Title** (600, `text-lg`/1.125rem): property card titles, timeline step titles (H3s).
- **Body** (400, 1rem/1.5): paragraph copy; kept short (2–3 lines) rather than run long — this is a landing, not an article, so the 65–75ch measure guidance does not apply to its short blurbs.
- **Label** (600, `text-sm`/0.875rem): nav links, form labels, button text, metadata rows on cards (dormitorios · m² · índice).

### Named Rules
**The No-Eyebrow Rule.** No small uppercase/tracked label ever sits directly above a heading as a kicker. If a heading needs a category or context marker, it goes *below* the heading (see PropertyCard's neighborhood/type line) or is folded into the heading's own words.

## Layout

Single-column page, `max-w-6xl` centered container, `px-4`/`sm:px-6` side gutters. Section rhythm is generous and consistent: `py-14`/`sm:py-16` for standard sections, `py-16`/`sm:py-20` for the "Cómo funciona" band.

Responsive strategy is mobile-first with three effective tiers: mobile (default, single column), `sm:` (640px, 2-column grids, header desktop nav still hidden), `lg:`/`xl:` (1024px/1280px, full desktop nav, 3–4 column property grid, hero becomes two-column). The header's nav/CTAs collapse into a hamburger below `md:`.

The hero's search bar is intentionally pulled up over the hero's bottom edge with a negative margin (`-mt-16`/`lg:-mt-24`), so it reads as one continuous unit with the hero rather than a separate block starting the next section — the only place in the layout that overlaps sections this way.

## Elevation & Depth

Suavemente elevado — "softly lifted." Depth is used sparingly and only to separate a card from the page, never to draw attention to itself: white cards get a soft, small shadow at rest (`shadow-sm`) with a slightly stronger one plus a 1px lift on hover (`hover:-translate-y-1 hover:shadow-lg`), always paired with a hairline `ring-black/5` rather than a hard border. Buttons carry a soft colored shadow tinted to their own color (`shadow-brand-blue/20`) rather than a generic gray shadow.

### Shadow Vocabulary
- **Resting card** (`shadow-sm` + `ring-1 ring-black/5`): PropertyCard and the SearchBar panel at rest.
- **Hover-lifted card** (`shadow-lg` + `-translate-y-1`): PropertyCard on hover — the only interactive elevation change in the system.
- **Colored button shadow** (`shadow-lg shadow-brand-blue/20`): primary CTAs (hero buttons, "Buscar más propiedades").
- **Deep container shadow** (`shadow-2xl shadow-brand-blue/20`): the hero's ProcessLoopMotif container, the one place elevation is used for visual weight rather than separation.

### Named Rules
**The Earned-Shadow Rule.** A shadow only appears on something the user can act on (a card, a button) or the single hero showpiece. Static content blocks (headings, paragraphs, the footer) stay flat.

## Shapes

Rounding is large and consistent, never sharp: `rounded-full` (pill) for every button, badge, and filter chip; `rounded-2xl` (1rem) for cards and the search panel; `rounded-3xl` (1.5rem) for the hero's motif container, the single largest surface in the system. Borders are hairlines only (`border-black/10` on inputs, `ring-black/5` on cards) — never a heavy or colored border, and never a colored `border-left`/`border-right` accent stripe.

## Components

### Buttons
- **Shape:** `rounded-full` (pill), always — no square or slightly-rounded buttons anywhere.
- **Primary:** `bg-brand-blue` / white text / `px-6 py-3` (hero/section CTAs) or `px-4 py-2` (header-scale); `shadow-lg shadow-brand-blue/20`.
- **Hover/Focus:** primary hover darkens to `brand-blue-dark`; all focus states use the global 2px `brand-blue` outline with 2px offset (never a color/glow substitute).
- **Secondary/Ghost:** white background, `brand-blue` text, `ring-1 ring-brand-blue/20`, hover fills with `brand-sky-light`. Used for lower-emphasis actions ("Ver cómo funciona", header "Iniciar sesión").
- **Placeholder state:** header "Iniciar sesión"/"Publicar propiedad" and the grid's "Buscar más propiedades" render as real primary/secondary buttons with no destination yet (per PRODUCT.md, the full auth/search surfaces don't exist yet) — they must never look disabled or broken, just genuinely styled buttons that currently do nothing.

### Chips (SearchBar characteristics)
- **Style:** pill, `border` default (`border-black/10 bg-paper text-ink/80`); selected state inverts to solid `bg-brand-blue text-white`.
- **State:** toggle (multi-select), `aria-pressed` reflects state — no separate "filter chip vs action chip" visual language, one chip style throughout.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (PropertyCard, SearchBar panel).
- **Background:** solid white on the `paper` page background.
- **Shadow Strategy:** see Elevation & Depth — resting `shadow-sm`, hover-lifted on PropertyCard only.
- **Border:** `ring-1 ring-black/5` hairline, no visible border color.
- **Internal Padding:** `p-4` (PropertyCard body), `p-4`→`sm:p-6` (SearchBar panel).

### Inputs / Fields
- **Style:** `bg-paper` (not white — a subtle inset feel inside the white SearchBar card), `border border-black/10`, `rounded-lg`.
- **Focus:** border shifts to `brand-blue`, no glow/shadow added.
- **Range slider:** native input styled via `accent-brand-blue`; the current value is always echoed in the label text itself (never hidden behind the thumb position alone).

### Navigation
- **Style:** text links at label scale (`text-sm font-medium`, `text-ink/80`), hover to `brand-blue`, no underline at rest or on hover.
- **Mobile:** header collapses to a hamburger below `md:`; the open panel lists the same links as a stacked list plus the two CTA buttons full-width.

### Signature Component: the process timeline / loop
Two purpose-built pieces carry the system's one authored motion idea, and they deliberately mirror each other's structure (4 stages: buscar → contactar → firmar → pagar):
- **HowItWorks timeline:** numbered `brand-blue` circles (not icons) connected by a hairline `brand-blue/15` rule, laid out horizontally on `sm:` and vertically on mobile; each step fades/slides in on scroll via `IntersectionObserver` and reverses when it leaves view (see Do's and Don'ts).
- **ProcessLoopMotif (hero):** the same 4-stage idea rendered as a looping diagram — a dashed guide circle, 4 white icon nodes at the cardinal points, and a gold dot that travels the circle every 8s, pulsing each node exactly as it arrives. This is the only place icons (search/chat/pen/receipt, hand-authored single-stroke SVG) appear in the system.

## Do's and Don'ts

### Do:
- **Do** keep gold (`#D7B15D`/`#8C6B1D`) tied to money/value content only (price line, selection highlight); everywhere else gold is atmosphere, not content color.
- **Do** use `rounded-full` for every button/badge/chip and `rounded-2xl`/`rounded-3xl` for containers — no other radius values.
- **Do** drive any "in/out of view" animation off a persistent `IntersectionObserver` that toggles both ways, so a section that already played its entrance replays it correctly if the user scrolls away and back (this was a shipped bug fix — see HowItWorks' `useInView`).
- **Do** pair a CSS `transform` animation only with elements that have no SVG `transform` *attribute* on the same node — nest a static positioning `<g>` around an animated inner `<g>` instead (see ProcessLoopMotif; mixing the two silently drops the attribute's translate in spec-compliant browsers).

### Don't:
- **Don't** put a small uppercase/tracked "kicker" label directly above any H1/H2/H3 — ever, regardless of how tempting it is to add context above a heading (The No-Eyebrow Rule).
- **Don't** build a new section as a row of identical icon+heading+paragraph cards — that page-scaffold default is explicitly rejected in this system; find a structure specific to the content (see the HowItWorks timeline as the model to follow instead).
- **Don't** use `ink/60`, `ink/50`, or raw `brand-gold` for text of any size — they fall under the 4.5:1 contrast floor on this system's light backgrounds (The Contrast Rule).
- **Don't** add a second typeface, a colored `border-left`/`border-right` accent, gradient text, or a hard offset/neobrutalist shadow — none of these belong to this world.
