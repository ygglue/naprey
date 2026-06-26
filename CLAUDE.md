# Naprey Almario Portfolio — Developer Notes

## Stack
Astro 7 + TypeScript (strict mode). Static output — no server runtime needed.

## Commands
```bash
npm run dev       # dev server → http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npx astro check  # TypeScript type-check all .astro files
```

## Where to edit content
All copy (text, titles, links, timeline entries, etc.) lives in one file:

**`src/data/content.ts`** — edit here to update any section without touching markup.
Key exports: `hero`, `proof` (credibility strip), `story`, `work` + `services`
(client-facing framing), `advocacy`, `recognition`, `timeline`, `affiliations`,
`ctaBanner` (mid-page ink CTA), `contact`, `footer`.

## Design system (editorial / magazine)
Defined in `src/styles/global.css`:
- **Fonts** (self-hosted via `@fontsource`, zero third-party JS): display =
  **Instrument Serif** (`--font-display`); body/UI = **Hanken Grotesk Variable**
  (`--font-body`). Do not reintroduce Playfair/Inter.
- **Palette** — committed warm + deep ink, all pairs verified WCAG AA:
  `--paper` / `--paper-2` (light surfaces), `--ink` / `--ink-2` (dark/drenched),
  `--ink-soft` & `--paper-soft` (muted text), `--accent` #be4e26 (CTAs/large) and
  `--accent-deep` #9b3d1c (body-size accent text/links). No gradients.
- **Section helpers**: `.section`, `.section--alt` (paper-2), `.section--ink`
  (drenched dark), `.container` / `.container--narrow`, `.kicker`, `.index`, `.btn`.
- **Motion**: subtle scroll-reveal via `[data-reveal]` + IntersectionObserver in
  `Base.astro`. Content is visible by default; the hidden pre-reveal state only
  applies after JS adds `.js-reveal` to `<html>` (skipped under reduced-motion),
  so no-JS / reduced-motion renders show everything. Keep this invariant.

## Go High Level integration
See `GHL_INTEGRATION.md` for the full wiring guide.
Config lives in `.env` (gitignored). Template: `.env.example`.
GHL config is read by `src/data/ghl.ts`.

## Skills installed (project-level)
Located in `.agents/skills/`:
- `astro` (astrolicious) — Astro best practices
- `baseline-ui` (ibelick) — UI quality baseline
- `fixing-accessibility` (ibelick) — accessibility
- `fixing-motion-performance` (ibelick) — animation/motion perf
- `fixing-metadata` (ibelick) — SEO / social meta

## Project structure
```
src/
  data/
    content.ts      ← all site copy (edit here)
    ghl.ts          ← GoHighLevel embed config
  layouts/
    Base.astro      ← HTML shell, meta, skip link, scroll-reveal + GHL chat widget
  components/
    Nav.astro       ← desktop inline links; mobile = hamburger dropdown + visible CTA
    Hero.astro      ← fully typographic (no photo box)
    Proof.astro     ← credibility strip under the hero
    Story.astro
    Work.astro      ← Services list (client-facing framing of `work` + `services`)
    Advocacy.astro
    Recognition.astro
    Timeline.astro
    Affiliations.astro
    CtaBanner.astro ← mid-page drenched-ink conversion CTA
    Contact.astro   ← GHL form + calendar embeds
    Footer.astro
  styles/
    global.css      ← design tokens, reset, shared utilities
  pages/
    index.astro     ← composes all sections (order: Hero→Proof→Story→Work→
                      Advocacy→Recognition→Timeline→Affiliations→CtaBanner→Contact)
client_files/       ← original client materials (PDFs, requirements)
GHL_INTEGRATION.md  ← client-facing GHL setup guide
```

## Accessibility targets
WCAG 2.1 AA minimum. All text/bg colour pairs pass ≥4.5:1 contrast (≥3:1 large/UI) —
re-verify with a contrast checker if palette tokens change. Skip link, semantic
landmarks, single h1, ≥44px tap targets, keyboard focus styles (incl. mobile nav:
Enter opens, Escape closes + restores focus), prefers-reduced-motion, 200% zoom support.

## Pending client deliverables
- Real photos — design is typography-driven and complete without them; add an
  optional photo slot to Hero/Story when assets arrive
- GHL account credentials / embed IDs (see GHL_INTEGRATION.md)
- Social media handles beyond Facebook (Instagram, LinkedIn?)
- Domain and hosting choice (Netlify / Cloudflare Pages / GitHub Pages recommended)
