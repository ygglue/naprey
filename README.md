# Naprey Almario — Portfolio

A fast, accessible, single-page portfolio for **Naprey Almario** — a Davao City–based
PWD advocate, entrepreneur, and educator. The site leads with his story and credibility,
frames his work as client-facing services, and routes enquiries and bookings into
GoHighLevel (GHL).

Built with **Astro 7 + TypeScript** (strict). Static output — no server runtime, deploys
to any static host. Editorial design: self-hosted fonts, a committed warm + ink palette,
and subtle scroll motion, all meeting WCAG 2.1 AA.

---

## Setting up the project

### Prerequisites
- **Node.js ≥ 22.12.0** (`node --version` to check; install via [nvm](https://github.com/nvm-sh/nvm) if needed)
- **npm** (ships with Node)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. (Optional) configure GoHighLevel — see "GoHighLevel integration" below.
#    The site runs fine without this; contact/booking show friendly placeholders.
cp .env.example .env        # then fill in the values

# 3. Start the dev server → http://localhost:4321
npm run dev
```

That's it. Edits hot-reload in the browser.

### Available commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server at http://localhost:4321 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npx astro check` | Type-check all `.astro` files |

---

## Editing content

**All copy lives in [`src/data/content.ts`](src/data/content.ts)** — edit there to update any
section without touching markup. Exports include `hero`, `proof`, `story`, `work` + `services`,
`advocacy`, `recognition`, `timeline`, `affiliations`, `ctaBanner`, `contact`, and `footer`.

---

## GoHighLevel integration

The contact form, booking calendar, and site-wide chat widget are powered by GHL. No code
editing is required — copy three values from the GHL dashboard into `.env` and rebuild.

- Config is read by [`src/data/ghl.ts`](src/data/ghl.ts) from `PUBLIC_GHL_*` env vars.
- Template: [`.env.example`](.env.example) (`.env` itself is gitignored).
- Full step-by-step guide: **[GHL_INTEGRATION.md](GHL_INTEGRATION.md)**.

Until the IDs are set, the contact section shows accessible placeholders with direct
email/phone links, so the site is fully usable before GHL is wired up.

---

## Project structure

```
src/
  data/
    content.ts      ← all site copy (edit here)
    ghl.ts          ← GoHighLevel embed config (reads .env)
  layouts/
    Base.astro      ← HTML shell, meta, skip link, scroll-reveal, GHL chat widget
  components/
    Nav.astro       ← desktop inline links; mobile hamburger dropdown + visible CTA
    Hero.astro      ← typographic hero
    Proof.astro     ← credibility strip
    Story.astro
    Work.astro      ← client-facing Services
    Advocacy.astro
    Recognition.astro
    Timeline.astro
    Affiliations.astro
    CtaBanner.astro ← mid-page conversion CTA
    Contact.astro   ← GHL form + calendar embeds
    Footer.astro
  styles/
    global.css      ← design tokens (fonts, palette, scale), reset, utilities
  pages/
    index.astro     ← composes all sections
client_files/       ← original client materials (PDFs, requirements)
GHL_INTEGRATION.md  ← client-facing GHL setup guide
CLAUDE.md           ← developer notes (design system, a11y, conventions)
```

---

## Design & accessibility

- **Fonts** (self-hosted via `@fontsource`, no third-party requests): Instrument Serif
  (display) + Hanken Grotesk (body).
- **Palette**: committed warm + deep-ink tokens in `global.css`; every text/background
  pair meets WCAG AA (≥4.5:1 text, ≥3:1 large/UI). Re-verify with a contrast checker if
  you change the tokens.
- **Accessibility**: skip link, semantic landmarks, single `<h1>`, ≥44px tap targets,
  visible keyboard focus, keyboard-operable mobile nav, `prefers-reduced-motion` support
  (all motion is gated; content is fully visible without JS), and 200% zoom support.

See [CLAUDE.md](CLAUDE.md) for deeper developer notes.

---

## Deployment

Run `npm run build` and deploy the `dist/` folder to any static host — Netlify, Cloudflare
Pages, or GitHub Pages all work. Remember to set the `PUBLIC_GHL_*` environment variables in
your host (or commit a built `.env`) so the GHL embeds render in production.
