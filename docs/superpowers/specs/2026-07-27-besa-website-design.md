# BESA Private Office — website architecture and home hero

Date: 2026-07-27
Status: approved, ready for implementation planning

## 1. What this is

BESA Private Office is a London lifestyle management and concierge firm serving
private clients: professional athletes, families, executives, and people moving
into the UK. The website is credibility-led. Its job is to make an unfamiliar
reader believe these people are competent and discreet, and then give them a way
to make contact.

The visual direction is Swiss minimalism with an editorial serif: generous
whitespace, a strict grid, hairline rules, uppercase micro-labels on wide
tracking, and large arch-masked photography.

This document covers the scaffold and the home page hero. Remaining home page
sections and the inner pages follow the same primitives and need no further
architectural decisions.

### Brand constants

| Token | Value | Role |
| --- | --- | --- |
| bone | `#F7F4EF` | Page ground |
| sand | `#D9D2C7` | Hairlines, borders, secondary surfaces |
| moss | `#495648` | Services band, footer |
| ink | `#2C2C2A` | Type, buttons |

Headings: Cormorant Garamond. Body, navigation, labels and buttons: Inter.
Both fonts are client decisions and are not open for revision.

## 2. Decisions

### 2.1 No CMS

Copy lives in typed modules under `src/data/`, validated against interfaces in
`src/shared/types/content.ts`. No component contains a user-facing string. This
keeps the copy in version control, costs nothing at runtime, and leaves a clean
seam: a CMS can later populate the same interfaces without a component changing.

### 2.2 No motion library

One client component, `reveal`, implements fade-and-rise on scroll with
`IntersectionObserver`. Everything else in the tree stays a Server Component.
If richer motion is wanted later, `reveal.tsx` is the only file that changes.
`prefers-reduced-motion` disables the transform.

### 2.3 No CSS framework beyond Tailwind v4

Pico CSS was considered and rejected. Pico is classless: its value is sensible
defaults for undesigned markup. This project has a fixed palette, two mandated
typefaces, a bespoke type scale and a mockup that dictates spacing, so nearly
all of Pico's defaults would be overridden while its reset competed with
Tailwind's Preflight. Pico's transferable ideas are adopted directly: CSS custom
properties as the theming layer (which is how Tailwind v4 already works),
semantic HTML, and a closed type and spacing scale.

### 2.4 `cacheComponents` stays off

Next 16 ships `cacheComponents`, which enables Partial Prerendering and the
`use cache` directive. It also makes rendering dynamic by default and fails the
build on any uncached subtree not wrapped in `<Suspense>`.

This site is four static pages with no data fetching. The default static
prerender is already the correct behaviour, so `cacheComponents` would add
ceremony and build-time failure modes for no benefit. Revisit if a booking
system or live availability is added.

### 2.5 Remote images

Photography is not yet available. Placeholder images are remote Pexels URLs,
which requires `images.remotePatterns`. Real photography later is a URL change
in `src/data/`, not a component change.

Hotlinking Pexels is acceptable for development. Before launch the images must
be downloaded, licensed and served locally or from a CDN.

## 3. Directory structure

Derived from the code-organisation doctrine in
`loomaCRM-web/docs/code-organisation`, with the framework's own conventions
winning where the two disagree.

```
src/
├── app/                          # Routing only. No business logic, no copy.
│   ├── layout.tsx                # <html>, fonts, metadataBase, header, footer
│   ├── page.tsx                  # Home: metadata export + section composition
│   ├── globals.css               # @theme tokens. The only stylesheet.
│   ├── error.tsx                 # 'use client', uses unstable_retry
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   ├── services/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── (legal)/                  # Route group: shared narrow layout, no URL segment
│       ├── layout.tsx
│       ├── privacy-policy/page.tsx
│       └── terms/page.tsx
├── shared/
│   ├── ui/                       # Primitives. Zero domain knowledge. One curated index.ts.
│   ├── layout/                   # Site chrome: site-header, site-footer, primary-nav, mobile-nav
│   ├── lib/                      # cn.ts and similar. Never a file named utils.ts.
│   ├── constants/                # nav-items.ts, routes.ts, site.ts
│   ├── hooks/                    # use-in-view.ts
│   └── types/                    # content.ts, ui.ts. The single home for types.
├── features/
│   ├── home/components/          # hero, who-we-support, approach
│   ├── services/components/      # service-card, services-band (used by home and /services)
│   ├── about/components/
│   └── contact/components/       # enquiry-form
└── data/                         # Every user-facing string, typed
    ├── site.ts
    ├── home.ts
    ├── services.ts
    ├── about.ts
    └── legal.ts
public/
└── shapes/
    ├── arch.svg                  # 310x310, tall arch
    └── semicircle.svg            # 320x200, wide dome
```

Rules that keep this stable:

- `app/` holds routing files only. A `page.tsx` contains a `metadata` export and
  a composition of feature components. Nothing else.
- A component belongs in `shared/ui` only if it has no knowledge of BESA. A
  component that knows what a service is belongs to its feature.
- `shared/ui/index.ts` is the one sanctioned barrel. No barrel-per-folder.
- Framework files are never moved or renamed.

### Naming

- Kebab-case for every non-framework filename, components included:
  `site-header.tsx`, not `SiteHeader.tsx`.
- Hooks are `use-x.ts`.
- Exported React components are PascalCase identifiers inside kebab-case files.
- Constants are `SCREAMING_SNAKE_CASE` and live in `shared/constants` or `data`.
- Booleans read as questions: `isOpen`, `hasRule`, `canSubmit`.
- No file named `utils.ts`, and no filename that misdescribes its contents.
- Imports use the existing `@/*` alias for `./src/*`. No relative paths that
  climb out of a directory.

### Limits

Functions stay under 20 lines, ideally under 10. Maximum three parameters;
beyond that, take an options object. Maximum two levels of nesting; use guard
clauses. A file over 400 lines is a defect. Duplication is tolerated below three
occurrences.

## 4. Design tokens

`src/app/globals.css` is the only stylesheet. Verified against the installed
tailwindcss 4.3.2.

```css
@import "tailwindcss";

@theme {
  --color-bone: #f7f4ef;
  --color-sand: #d9d2c7;
  --color-moss: #495648;
  --color-ink: #2c2c2a;

  --container-page: 90rem;

  --text-display: clamp(2.75rem, 1.35rem + 5.6vw, 6rem);
  --text-display--line-height: 1.04;
  --text-display--letter-spacing: -0.02em;

  --text-h2: clamp(2rem, 1.15rem + 3.4vw, 3.5rem);
  --text-h2--line-height: 1.1;
  --text-h2--letter-spacing: -0.015em;

  --text-h3: clamp(1.375rem, 1.15rem + 1vw, 1.875rem);
  --text-h3--line-height: 1.2;

  --text-lead: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lead--line-height: 1.7;

  --text-body: 1rem;
  --text-body--line-height: 1.75;

  --text-label: 0.6875rem;
  --text-label--line-height: 1.2;
  --text-label--letter-spacing: 0.18em;

  --tracking-wordmark: 0.3em;

  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
}

@theme inline {
  --font-display: var(--font-cormorant);
  --font-sans: var(--font-inter);
}

@utility mask-shape {
  mask-image: var(--shape-mask);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  mask-position: center;
}
```

Notes:

- Overriding `--font-sans` makes Inter the document default, because Tailwind's
  Preflight resolves `--default-font-family` from `--font-sans`.
- The `@theme inline` block is required for next/font variables. Next's own
  Tailwind v4 documentation uses exactly this pattern.
- `--container-page` generates `max-w-page`. Tailwind v4 has no configurable
  `container` class; a width token plus explicit gutters replaces it.
- The type scale is fluid via `clamp()`, so it interpolates between 375px and
  1600px without a breakpoint. Paired `--text-*--line-height` and
  `--text-*--letter-spacing` are applied automatically by the `text-*` utility.
- `mask-shape` reads a CSS variable the component sets. Adding a new shape is
  dropping an SVG into `public/shapes/` and adding one member to a union type.

## 5. Primitives

All in `src/shared/ui/`. Server Components unless noted.

| File | Purpose | Key props |
| --- | --- | --- |
| `container.tsx` | Max width and responsive gutters | `size: 'page' \| 'prose'` |
| `section.tsx` | Vertical rhythm, full-bleed tone band, anchor target | `tone: 'bone' \| 'sand' \| 'moss'`, `id`, `spacing` |
| `eyebrow.tsx` | Uppercase tracked micro-label with optional trailing rule | `hasRule` |
| `heading.tsx` | Cormorant display heading | `as: 'h1'..'h4'`, `size: 'display' \| 'h2' \| 'h3'` |
| `text.tsx` | Inter body copy | `size: 'lead' \| 'body'`, `tone` |
| `button.tsx` | Solid ink, outline, and moss variants | `variant`, `href` (renders `Link`) or `type` |
| `arrow-link.tsx` | The `LEARN MORE ->` link, arrow translates on hover | `href`, `children` |
| `rule.tsx` | 1px sand hairline | `orientation` |
| `image-frame.tsx` | `next/image` wrapper with aspect ratio and shape mask | `src`, `alt`, `shape`, `ratio`, `isPriority` |
| `reveal.tsx` | Client. Fade and rise on scroll | `delay` |
| `wordmark.tsx` | BESA / PRIVATE OFFICE set in type | `tone: 'ink' \| 'bone'` |

Site chrome lives in `src/shared/layout/`: `site-header.tsx`,
`primary-nav.tsx`, `mobile-nav.tsx` (client), `site-footer.tsx`.

### image-frame and the shape system

`shape` is a union: `'rect' | 'arch' | 'dome'`. For non-rect values the
component sets `--shape-mask` to `url(/shapes/<name>.svg)` and applies the
`mask-shape` utility. Masks stretch to the frame with `mask-size: 100% 100%`,
which is the intended behaviour: a tall frame turns the arch's semicircular top
into the elongated ellipse the reference imagery uses.

Both supplied SVGs ship with a hardcoded `#6750A4` fill. Fill colour is
irrelevant for `mask-image` on an SVG file, which is read in alpha mode, but the
fill is normalised to `#000` on import so the files are not misleading.

### reveal

`'use client'`. `IntersectionObserver` with a 12% threshold, unobserving after
the first intersection so elements never re-animate. Transitions `opacity` and
`translateY(12px)` over 700ms on `--ease-editorial`. The `delay` prop staggers
siblings. Under `prefers-reduced-motion: reduce` the element renders visible with
no transition.

## 6. Content model

`src/shared/types/content.ts` holds the interfaces. `src/data/*` holds the
values, all `as const` and typed on export.

```ts
export interface HeroContent {
  eyebrow: string;
  heading: string;
  lead: string;
  cta: CtaContent;
  image: ImageContent;
}

export interface ImageContent {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CtaContent {
  label: string;
  href: Route;
}
```

`Route` is the global type `typedRoutes` generates into `.next/types`, so a
broken internal link is a compile error. `tsconfig.json` already includes that
path. The types only exist after a `next dev`, `next build` or `next typegen`
run, so a clean checkout must build once before type checking passes. Non-literal
hrefs need an `as Route` cast.

## 7. Home page

`src/app/page.tsx` exports `metadata` and composes, in order: `<Hero />`,
`<WhoWeSupport />`, `<ServicesBand />`, `<Approach />`. The header and footer
come from the root layout. The file contains no markup beyond that composition.

Navigation anchors to `#who-we-support` and `#our-approach`, which are `id`s on
the corresponding `<Section>`. Next 16 no longer overrides
`scroll-behavior: smooth`, so `<html>` carries `data-scroll-behavior="smooth"`.

### The hero

`src/features/home/components/hero.tsx`. Server Component. Reads `HOME_HERO`
from `src/data/home.ts`.

Layout is a two-column CSS grid at `lg` and above: copy on the left at roughly
42%, image on the right at roughly 58%. Below `lg` it stacks with the image
first. The right column holds a large arch-masked photograph, following the
AURELIA reference rather than the mockup's hard-edged rectangle. The arch is
deliberately oversized, extending past the top of the copy column.

Composition: `<Eyebrow>`, `<Heading as="h1" size="display">`, `<Text size="lead">`,
`<Button variant="solid" href="/services">`, and `<ImageFrame shape="arch">`.

The hero image is the page's Largest Contentful Paint element. In Next 16 the
`priority` prop is deprecated, so it takes `loading="eager"` and
`fetchPriority="high"`. It is the only image on the page with either.

The hero does not use `reveal`. Content above the fold appears immediately.

## 8. Copy

The client's draft was rewritten. The original ran the same three-part cadence
four times, and asserted discretion four times without demonstrating it. These
strings live in `src/data/home.ts`.

**Hero**

> MANAGING LIFE BEHIND THE SCENES
>
> Private lifestyle management for people whose time is already spoken for.
>
> We run the household, the diary and the travel, and we do it without needing
> to be chased.
>
> `OUR SERVICES`

**Who we support**

> Professional athletes. Families. Executives. International clients.
>
> Our clients have complicated lives and very little spare time. We take on
> whatever can sensibly be delegated and run it properly, which usually means
> fewer questions coming back to you.

**Our services**

> Lifestyle and household management. The house and everything in it: staff,
> maintenance, contractors, security, and the ordinary weekly running of the
> place.
>
> Travel and itinerary management. Flights, private aviation, accommodation,
> cars and ground arrangements. Planned in advance, and watched while you
> travel.
>
> Relocation and settling in. Property search, schools, registrations, doctors
> and introductions. From the first viewing to the first month.

**Our approach**

> Most of our work, you will never see.
>
> Clients come to us by introduction and tend to stay for years. We keep what we
> know to ourselves, we do not discuss one client with another, and we would
> rather deal with a problem before it reaches you.

Contact details from the mockup are placeholders and must be confirmed before
launch: London, +44 20 1234 5678, hello@besaprivateoffice.com.

## 9. Framework constraints

Confirmed by reading `node_modules/next/dist/docs` at next 16.2.9. These differ
from Next 14 and 15 habits.

- `<Image priority>` is deprecated. Use `loading="eager"` and
  `fetchPriority="high"`.
- `images.qualities` defaults to `[75]`. Any other `quality` value is silently
  coerced to the nearest allowed value, so the array must be declared.
- `images.domains` is deprecated. Use `remotePatterns`.
- `error.tsx` receives `unstable_retry`, not `reset`.
- `middleware.ts` is renamed `proxy.ts`. Not needed here.
- `params` and `searchParams` are Promises and must be awaited. Global
  `PageProps<'/route'>` and `LayoutProps<'/route'>` types are generated during
  `next dev` and `next build`.
- `next lint` is removed. The existing `"lint": "eslint"` script is correct.
- Turbopack is the default for both dev and build.

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    qualities: [75],
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
```

## 10. Accessibility

Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`. One `<h1>` per
page. Heading levels never skip. Every image has a meaningful `alt`, and
decorative shapes are `aria-hidden`. Visible focus rings on every interactive
element, never removed. The mobile navigation traps focus while open, closes on
Escape, and restores focus to its trigger. `prefers-reduced-motion` is honoured.

Contrast: ink on bone is roughly 13:1, bone on moss roughly 7:1. Sand is used
for surfaces and hairlines only, never for text.

## 11. Out of scope

- Contact form submission. The form is built with markup, validation states and
  styling, but has no submit handler. Wiring it later is one Server Action.
- Any CMS.
- Analytics, cookie consent, i18n.
- Real photography and final legal copy.
- Automated tests. This is presentational code with no logic worth asserting on
  at this stage; the verification gate is `tsc`, `eslint` and `next build`.

## 12. Open questions

1. Contact details in the mockup are placeholders and need confirming.
2. Pexels images must be replaced with licensed photography before launch.
3. The rewritten copy needs the client's approval. Structure will not change if
   the wording does.
4. No domain is chosen, so `metadataBase` uses a placeholder that must be set
   before deployment or relative Open Graph URLs will fail the build.
