# BESA Scaffold and Home Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the reusable scaffold for the BESA Private Office site and ship the home page hero.

**Architecture:** Next 16 App Router with `src/app` holding routing files only. Design tokens live in a single Tailwind v4 `@theme` block. Reusable primitives live in `src/shared/ui`, site chrome in `src/shared/layout`, page sections in `src/features/<name>/components`, and every user-facing string in `src/data`. One client component in the whole tree.

**Tech Stack:** next 16.2.9, react 19.2.4, typescript 5, tailwindcss 4.3.2, clsx, tailwind-merge.

**Spec:** `docs/superpowers/specs/2026-07-27-besa-website-design.md`

## Global Constraints

- Brand colours, exact values, no others: bone `#F7F4EF`, sand `#D9D2C7`, moss `#495648`, ink `#2C2C2A`.
- Headings use Cormorant Garamond. Body, nav, labels and buttons use Inter. No third typeface.
- Every filename is kebab-case, components included: `site-header.tsx`, never `SiteHeader.tsx`. Hooks are `use-x.ts`.
- Exported React components are PascalCase identifiers inside kebab-case files.
- No file named `utils.ts`.
- Imports use the `@/*` alias for `./src/*`. No `../../` paths.
- No user-facing string appears in a component. All copy is imported from `src/data`.
- `src/app/**` contains routing files only: a `metadata` export and a composition of components.
- Functions stay under 20 lines. Maximum 3 parameters. Maximum 2 levels of nesting. No file over 400 lines.
- Constants are `SCREAMING_SNAKE_CASE`. Booleans read as questions (`isOpen`, `hasRule`).
- `shared/ui/index.ts` is the only barrel file in the project.
- `cacheComponents` stays off. Do not enable it.
- Next 16 specifics: `<Image priority>` is deprecated, use `loading="eager"` and `fetchPriority="high"`. `error.tsx` receives `unstable_retry`, not `reset`. `images.qualities` must be declared or non-75 values are silently coerced.
- Verification gate for every task: `npx tsc --noEmit`, `npm run lint`, `npm run build`. There are no unit tests; this is presentational code and the spec puts automated tests out of scope.

---

### Task 1: Foundation — dependencies, config, tokens, root layout

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/shared/lib/cn.ts`
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`

**Interfaces:**
- Consumes: nothing.
- Produces: `cn(...inputs: ClassValue[]): string` from `@/shared/lib/cn`. Tailwind utilities `bg-bone`, `bg-sand`, `bg-moss`, `text-ink`, `text-bone`, `border-sand`, `font-display`, `font-sans`, `text-display`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-label`, `tracking-wordmark`, `ease-editorial`, `max-w-page`, `mask-shape`.

- [ ] **Step 1: Install the two class utilities**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 2: Write `next.config.ts`**

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

- [ ] **Step 3: Replace `src/app/globals.css` entirely**

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

The `@theme inline` block is mandatory for next/font variables; this is the pattern in Next's own Tailwind v4 documentation. Overriding `--font-sans` makes Inter the document default because Preflight resolves `--default-font-family` from it.

- [ ] **Step 4: Create `src/shared/lib/cn.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Replace `src/app/layout.tsx`**

Header and footer are added in Task 9. `Cormorant_Garamond` requires an explicit
`weight`; its accepted values in this version are `'300' | '400' | '500' |
'600' | '700' | 'variable'`. Only 300 and 400 are used (`font-light` on display
headings, `font-normal` on h3 and the wordmark), so only those two are loaded.
`Inter` is variable and needs no `weight`.

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BESA Private Office",
  description:
    "Private lifestyle management for people whose time is already spoken for.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bone text-ink">
        {children}
      </body>
    </html>
  );
}
```

`data-scroll-behavior="smooth"` is required because Next 16 no longer overrides `scroll-behavior`, and the nav anchor-links within the home page.

- [ ] **Step 6: Replace `src/app/page.tsx` with a temporary placeholder**

Real composition arrives in Task 10. This exists only so the build passes.

```tsx
export default function HomePage() {
  return <main className="flex-1" />;
}
```

- [ ] **Step 7: Delete the create-next-app SVGs**

```bash
git rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 8: Verify the tokens compile and are reachable**

```bash
npm run build
```

Expected: build succeeds. Then confirm the custom tokens actually generated utilities rather than being silently ignored:

```bash
grep -o "bg-bone\|text-display\|mask-shape" .next/static/css/*.css | sort -u
```

Expected: nothing yet, because no file uses them. This is correct for Tailwind's on-demand generation. The real check is Step 9.

- [ ] **Step 9: Prove the tokens work end to end**

Temporarily set the `page.tsx` body to `<main className="flex-1 bg-moss text-bone font-display text-display max-w-page mask-shape">test</main>`, run `npm run build`, and confirm:

```bash
grep -c "bg-moss" .next/static/css/*.css
```

Expected: at least 1. If 0, the `@theme` block is malformed. Then revert `page.tsx` to the Step 6 placeholder and rebuild.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: project foundation, design tokens and root layout"
```

---

### Task 2: Route skeleton

Routes must exist before anything links to them, because `typedRoutes` makes an `href` to a non-existent route a compile error.

**Files:**
- Create: `src/app/services/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`
- Create: `src/app/(legal)/layout.tsx`, `src/app/(legal)/privacy-policy/page.tsx`, `src/app/(legal)/terms/page.tsx`
- Create: `src/app/not-found.tsx`, `src/app/error.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: the route literals `/`, `/services`, `/about`, `/contact`, `/privacy-policy`, `/terms` in the generated `.next/types` route union.

- [ ] **Step 1: Create the three main stub pages**

Each is identical in shape. `src/app/services/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return <main className="flex-1" />;
}
```

`src/app/about/page.tsx`, changing both the title and the function name to `AboutPage`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <main className="flex-1" />;
}
```

`src/app/contact/page.tsx`, function name `ContactPage`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <main className="flex-1" />;
}
```

- [ ] **Step 2: Create the legal route group layout**

`src/app/(legal)/layout.tsx`. The group parentheses keep `(legal)` out of the URL.

```tsx
export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-32 md:px-10">
      {children}
    </main>
  );
}
```

- [ ] **Step 3: Create the two legal stub pages**

`src/app/(legal)/privacy-policy/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return null;
}
```

`src/app/(legal)/terms/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return null;
}
```

- [ ] **Step 4: Create `src/app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32">
      <p className="font-sans text-label uppercase">404</p>
      <h1 className="font-display text-h2 font-light">
        This page does not exist.
      </h1>
      <Link href="/" className="font-sans text-label uppercase underline">
        Return home
      </Link>
    </main>
  );
}
```

- [ ] **Step 5: Create `src/app/error.tsx`**

Next 16 passes `unstable_retry`, not `reset`. Using `reset` here would compile but is the deprecated path.

```tsx
"use client";

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32">
      <h1 className="font-display text-h2 font-light">Something went wrong.</h1>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="font-sans text-label uppercase underline"
      >
        Try again
      </button>
    </main>
  );
}
```

- [ ] **Step 6: Verify all routes build and the route types generate**

```bash
npm run build
```

Expected: the build output route table lists `/`, `/about`, `/contact`, `/privacy-policy`, `/services`, `/terms`. Confirm `(legal)` does not appear in any URL.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: route skeleton for all pages, error and not-found boundaries"
```

---

### Task 3: Types, constants and content

**Files:**
- Create: `src/shared/types/ui.ts`, `src/shared/types/content.ts`
- Create: `src/shared/constants/nav-items.ts`, `src/shared/constants/site.ts`
- Create: `src/data/site.ts`, `src/data/home.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Href` from `@/shared/types/ui`
  - `interface ImageContent { src: string; alt: string }`
  - `interface CtaContent { label: string; href: Href }`
  - `interface HeroContent { eyebrow: string; heading: string; lead: string; cta: CtaContent; image: ImageContent }`
  - `interface NavItem { label: string; href: Href }`
  - `NAV_ITEMS: readonly NavItem[]`, `LEGAL_NAV_ITEMS: readonly NavItem[]`
  - `SITE: { name: string; tagline: string; description: string; city: string; phone: string; email: string }`
  - `HOME_HERO: HeroContent`

- [ ] **Step 1: Create `src/shared/types/ui.ts`**

`Href` is derived from `Link` itself rather than the generated global `Route`, so it resolves correctly whether or not `next typegen` has run.

```ts
import type Link from "next/link";
import type { ComponentProps } from "react";

export type Href = ComponentProps<typeof Link>["href"];

export type Tone = "bone" | "sand" | "moss";

export type Shape = "rect" | "arch" | "semicircle";
```

- [ ] **Step 2: Create `src/shared/types/content.ts`**

The spec listed `width` and `height` on `ImageContent`. They are omitted because `ImageFrame` uses `next/image` with `fill`, which forbids `width` and `height`. The frame's aspect ratio governs instead.

```ts
import type { Href } from "@/shared/types/ui";

export interface ImageContent {
  src: string;
  alt: string;
}

export interface CtaContent {
  label: string;
  href: Href;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  lead: string;
  cta: CtaContent;
  image: ImageContent;
}

export interface NavItem {
  label: string;
  href: Href;
}
```

- [ ] **Step 3: Create `src/shared/constants/nav-items.ts`**

`Who we support` and `Our approach` are home page sections, so they anchor rather than route.

```ts
import type { NavItem } from "@/shared/types/content";

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Who we support", href: "/#who-we-support" },
  { label: "About", href: "/about" },
  { label: "Our approach", href: "/#our-approach" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL_NAV_ITEMS: readonly NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;
```

- [ ] **Step 4: Create `src/shared/constants/site.ts`**

```ts
export const SITE_URL = "https://besaprivateoffice.com";
```

This is a placeholder domain recorded as an open question in the spec. It must be correct before deployment or relative Open Graph URLs will fail the build.

- [ ] **Step 5: Create `src/data/site.ts`**

Contact details come from the client mockup and are unconfirmed.

```ts
export const SITE = {
  name: "BESA",
  tagline: "Private Office",
  description:
    "Private lifestyle management for people whose time is already spoken for.",
  city: "London",
  phone: "+44 20 1234 5678",
  email: "hello@besaprivateoffice.com",
} as const;
```

- [ ] **Step 6: Create `src/data/home.ts`**

The Pexels URL was verified to return HTTP 200 and the image was visually checked: a Georgian London townhouse facade with a black door, portrait orientation. It is a development placeholder and must be replaced with licensed photography before launch.

```ts
import type { HeroContent } from "@/shared/types/content";

export const HOME_HERO: HeroContent = {
  eyebrow: "Managing life behind the scenes",
  heading: "Private lifestyle management for people whose time is already spoken for.",
  lead: "We run the household, the diary and the travel, and we do it without needing to be chased.",
  cta: { label: "Our services", href: "/services" },
  image: {
    src: "https://images.pexels.com/photos/17154881/pexels-photo-17154881.jpeg",
    alt: "The facade and front door of a Georgian townhouse in central London.",
  },
};
```

- [ ] **Step 7: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both clean. If `tsc` reports it cannot find `.next/types`, run `npx next build` once first.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: content types, site constants and home page copy"
```

---

### Task 4: Layout primitives — container, section, rule

**Files:**
- Create: `src/shared/ui/container.tsx`, `src/shared/ui/section.tsx`, `src/shared/ui/rule.tsx`

**Interfaces:**
- Consumes: `cn` from `@/shared/lib/cn`, `Tone` from `@/shared/types/ui`.
- Produces:
  - `<Container size?: "page" | "prose" className?: string>`
  - `<Section tone?: Tone spacing?: "none" | "tight" | "default" id?: string className?: string>` rendering a `<section>`
  - `<Rule className?: string>`

- [ ] **Step 1: Create `src/shared/ui/container.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const SIZE_CLASS = {
  page: "max-w-page",
  prose: "max-w-2xl",
} as const;

interface ContainerProps {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  children: ReactNode;
}

export function Container({ size = "page", className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 md:px-10 lg:px-16", SIZE_CLASS[size], className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/shared/ui/section.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Tone } from "@/shared/types/ui";

const TONE_CLASS: Record<Tone, string> = {
  bone: "bg-bone text-ink",
  sand: "bg-sand text-ink",
  moss: "bg-moss text-bone",
};

const SPACING_CLASS = {
  none: "",
  tight: "py-14 md:py-20",
  default: "py-20 md:py-28 lg:py-36",
} as const;

interface SectionProps {
  tone?: Tone;
  spacing?: keyof typeof SPACING_CLASS;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({
  tone = "bone",
  spacing = "default",
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24", TONE_CLASS[tone], SPACING_CLASS[spacing], className)}
    >
      {children}
    </section>
  );
}
```

`scroll-mt-24` stops the fixed header covering an anchored section heading.

- [ ] **Step 3: Create `src/shared/ui/rule.tsx`**

```tsx
import { cn } from "@/shared/lib/cn";

interface RuleProps {
  className?: string;
}

export function Rule({ className }: RuleProps) {
  return <hr className={cn("border-t border-sand", className)} />;
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: container, section and rule layout primitives"
```

---

### Task 5: Typography primitives — heading, text, eyebrow

**Files:**
- Create: `src/shared/ui/heading.tsx`, `src/shared/ui/text.tsx`, `src/shared/ui/eyebrow.tsx`

**Interfaces:**
- Consumes: `cn`.
- Produces:
  - `<Heading as?: "h1" | "h2" | "h3" | "h4" size?: "display" | "h2" | "h3" className?: string>`
  - `<Text size?: "lead" | "body" className?: string>` rendering a `<p>`
  - `<Eyebrow hasRule?: boolean className?: string>`

- [ ] **Step 1: Create `src/shared/ui/heading.tsx`**

Cormorant at display sizes wants weight 300; at h3 size 300 is too thin, so weight is paired with size rather than passed separately.

```tsx
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const SIZE_CLASS = {
  display: "text-display font-light",
  h2: "text-h2 font-light",
  h3: "text-h3 font-normal",
} as const;

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  children: ReactNode;
}

export function Heading({ as: Tag = "h2", size = "h2", className, children }: HeadingProps) {
  return <Tag className={cn("font-display", SIZE_CLASS[size], className)}>{children}</Tag>;
}
```

- [ ] **Step 2: Create `src/shared/ui/text.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const SIZE_CLASS = {
  lead: "text-lead",
  body: "text-body",
} as const;

interface TextProps {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  children: ReactNode;
}

export function Text({ size = "body", className, children }: TextProps) {
  return <p className={cn("font-sans", SIZE_CLASS[size], className)}>{children}</p>;
}
```

- [ ] **Step 3: Create `src/shared/ui/eyebrow.tsx`**

The trailing rule is the short horizontal line beside section labels in the client mockup. It uses `bg-current` so it inherits the band's text colour and works on both bone and moss.

```tsx
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface EyebrowProps {
  hasRule?: boolean;
  className?: string;
  children: ReactNode;
}

export function Eyebrow({ hasRule = false, className, children }: EyebrowProps) {
  return (
    <p className={cn("flex items-center gap-4 font-sans text-label uppercase", className)}>
      {children}
      {hasRule ? <span aria-hidden className="h-px w-12 bg-current opacity-40" /> : null}
    </p>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: heading, text and eyebrow typography primitives"
```

---

### Task 6: Action primitives — button, arrow-link, wordmark

**Files:**
- Create: `src/shared/ui/button.tsx`, `src/shared/ui/arrow-link.tsx`, `src/shared/ui/wordmark.tsx`

**Interfaces:**
- Consumes: `cn`, `Href` from `@/shared/types/ui`, `SITE` from `@/data/site`.
- Produces:
  - `<Button variant?: "solid" | "outline" | "moss" href?: Href type?: "button" | "submit" className?: string>`
  - `<ArrowLink href: Href className?: string>`
  - `<Wordmark tone?: "ink" | "bone" className?: string>`

- [ ] **Step 1: Create `src/shared/ui/button.tsx`**

A discriminated union means a `Button` cannot receive both `href` and `type`.

```tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Href } from "@/shared/types/ui";

const VARIANT_CLASS = {
  solid: "bg-ink text-bone hover:bg-moss",
  outline: "border border-ink text-ink hover:bg-ink hover:text-bone",
  moss: "bg-moss text-bone hover:bg-ink",
} as const;

const BASE_CLASS =
  "inline-flex items-center justify-center px-8 py-4 font-sans text-label uppercase transition-colors duration-300 ease-editorial focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

interface BaseButtonProps {
  variant?: keyof typeof VARIANT_CLASS;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends BaseButtonProps {
  href: Href;
  type?: never;
}

interface ActionButtonProps extends BaseButtonProps {
  href?: never;
  type?: "button" | "submit";
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "solid", className, children } = props;
  const classes = cn(BASE_CLASS, VARIANT_CLASS[variant], className);

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
```

`props` is deliberately not rest-destructured. TypeScript loses discriminated
union narrowing when a union is spread into a rest parameter, so the shared
fields are pulled off individually and `props.href` is tested on the intact
union.

- [ ] **Step 2: Create `src/shared/ui/arrow-link.tsx`**

The arrow slides right on hover. It is an inline SVG rather than a text character so it can be animated and hidden from assistive technology.

```tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import type { Href } from "@/shared/types/ui";

interface ArrowLinkProps {
  href: Href;
  className?: string;
  children: ReactNode;
}

export function ArrowLink({ href, className, children }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 font-sans text-label uppercase focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      {children}
      <svg
        aria-hidden
        viewBox="0 0 24 12"
        className="h-2 w-6 transition-transform duration-300 ease-editorial group-hover:translate-x-1 motion-reduce:transition-none"
        fill="none"
        stroke="currentColor"
      >
        <path d="M0 6h22M17 1l5 5-5 5" />
      </svg>
    </Link>
  );
}
```

- [ ] **Step 3: Create `src/shared/ui/wordmark.tsx`**

Set in type rather than as an SVG asset so it scales and inverts on the moss footer.

```tsx
import { cn } from "@/shared/lib/cn";
import { SITE } from "@/data/site";

const TONE_CLASS = {
  ink: "text-ink",
  bone: "text-bone",
} as const;

interface WordmarkProps {
  tone?: keyof typeof TONE_CLASS;
  className?: string;
}

export function Wordmark({ tone = "ink", className }: WordmarkProps) {
  return (
    <span className={cn("flex flex-col items-center", TONE_CLASS[tone], className)}>
      <span className="font-display text-2xl leading-none font-normal tracking-wordmark">
        {SITE.name}
      </span>
      <span className="font-sans text-[0.5rem] leading-none tracking-wordmark uppercase mt-1.5">
        {SITE.tagline}
      </span>
    </span>
  );
}
```

The tracked wordmark adds trailing space after the final letter, which makes it look left-shifted. `items-center` on the flex column compensates.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: button, arrow-link and wordmark primitives"
```

---

### Task 7: Shape assets and image-frame

**Files:**
- Create: `public/shapes/arch.svg`, `public/shapes/semicircle.svg`
- Create: `src/shared/ui/image-frame.tsx`

**Interfaces:**
- Consumes: `cn`, `Shape` from `@/shared/types/ui`.
- Produces: `<ImageFrame src: string alt: string shape?: Shape ratio?: "portrait" | "arch" | "landscape" | "square" sizes: string isPriority?: boolean className?: string>`

- [ ] **Step 1: Create `public/shapes/arch.svg`**

Copied from `c:/Users/hussa/Downloads/Arch.svg` with the Material purple fill normalised to black, since only alpha matters for a mask and the original colour is misleading.

```xml
<svg width="310" height="310" viewBox="0 0 310 310" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M310 258.727C310 264.96 310 268.076 309.689 270.696C307.259 291.14 291.14 307.259 270.696 309.689C268.076 310 264.96 310 258.727 310H51.2732C45.0405 310 41.9242 310 39.3043 309.689C18.8596 307.259 2.74071 291.14 0.311326 270.696C9.86457e-06 268.076 9.61297e-06 264.96 9.06809e-06 258.727L0 155C-7.48375e-06 69.3959 69.3958 7.48375e-06 155 0C240.604 -7.48375e-06 310 69.3958 310 155V258.727Z" fill="#000000"/>
</svg>
```

- [ ] **Step 2: Create `public/shapes/semicircle.svg`**

```xml
<svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M320 166.921C320 185.19 305.19 200 286.921 200L33.0794 200C14.8102 200 2.20218e-06 185.19 6.05025e-07 166.921L0 160C-7.72516e-06 71.6345 71.6344 7.72516e-06 160 0C248.366 -7.72516e-06 320 71.6344 320 160V166.921Z" fill="#000000"/>
</svg>
```

- [ ] **Step 3: Create `src/shared/ui/image-frame.tsx`**

Adding a future shape is: drop the SVG into `public/shapes/`, add one member to the `Shape` union in `src/shared/types/ui.ts`. No CSS change.

```tsx
import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import type { Shape } from "@/shared/types/ui";

const RATIO_CLASS = {
  portrait: "aspect-[3/4]",
  arch: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
} as const;

interface ImageFrameProps {
  src: string;
  alt: string;
  sizes: string;
  shape?: Shape;
  ratio?: keyof typeof RATIO_CLASS;
  isPriority?: boolean;
  className?: string;
}

export function ImageFrame({
  src,
  alt,
  sizes,
  shape = "rect",
  ratio = "portrait",
  isPriority = false,
  className,
}: ImageFrameProps) {
  const isMasked = shape !== "rect";
  const maskStyle = { "--shape-mask": `url(/shapes/${shape}.svg)` } as CSSProperties;

  return (
    <div
      style={isMasked ? maskStyle : undefined}
      className={cn(
        "relative overflow-hidden",
        RATIO_CLASS[ratio],
        isMasked && "mask-shape",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        loading={isPriority ? "eager" : "lazy"}
        fetchPriority={isPriority ? "high" : "auto"}
      />
    </div>
  );
}
```

`fill` requires a positioned ancestor, which the wrapper's `relative` provides. `priority` is deliberately not used; it is deprecated in Next 16.

- [ ] **Step 4: Verify the build accepts `fetchPriority` on next/image**

```bash
npx tsc --noEmit
```

Expected: clean. If `fetchPriority` is rejected by `ImageProps`, replace that line with `{...(isPriority ? { fetchPriority: "high" as const } : {})}` and re-run.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: arch and semicircle mask shapes with image-frame primitive"
```

---

### Task 8: Scroll reveal

**Files:**
- Create: `src/shared/hooks/use-in-view.ts`, `src/shared/ui/reveal.tsx`
- Create: `src/shared/ui/index.ts`

**Interfaces:**
- Consumes: `cn`.
- Produces:
  - `useInView<T extends HTMLElement>(): { ref: RefObject<T | null>; isInView: boolean }`
  - `<Reveal delay?: number className?: string>`
  - The curated barrel `@/shared/ui` re-exporting every primitive.

- [ ] **Step 1: Create `src/shared/hooks/use-in-view.ts`**

Disconnects after the first intersection so elements never re-animate on scroll back.

```ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}
```

- [ ] **Step 2: Create `src/shared/ui/reveal.tsx`**

The only client component in the tree. If a motion library is ever adopted, this is the single file that changes.

```tsx
"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { useInView } from "@/shared/hooks/use-in-view";

interface RevealProps {
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({ delay = 0, className, children }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-editorial",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create the one sanctioned barrel `src/shared/ui/index.ts`**

```ts
export { ArrowLink } from "./arrow-link";
export { Button } from "./button";
export { Container } from "./container";
export { Eyebrow } from "./eyebrow";
export { Heading } from "./heading";
export { ImageFrame } from "./image-frame";
export { Reveal } from "./reveal";
export { Rule } from "./rule";
export { Section } from "./section";
export { Text } from "./text";
export { Wordmark } from "./wordmark";
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all clean.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scroll reveal primitive and shared ui barrel"
```

---

### Task 9: Site chrome — header, navigation and footer

**Files:**
- Create: `src/shared/layout/primary-nav.tsx`, `src/shared/layout/mobile-nav.tsx`, `src/shared/layout/site-header.tsx`, `src/shared/layout/site-footer.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `NAV_ITEMS`, `LEGAL_NAV_ITEMS`, `SITE`, `Wordmark`, `Container`, `Text`.
- Produces: `<SiteHeader />`, `<SiteFooter />`, both taking no props.

- [ ] **Step 1: Create `src/shared/layout/primary-nav.tsx`**

```tsx
import Link from "next/link";
import { NAV_ITEMS } from "@/shared/constants/nav-items";

export function PrimaryNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="font-sans text-label uppercase transition-opacity duration-300 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 2: Create `src/shared/layout/mobile-nav.tsx`**

Closes on Escape, restores focus to the trigger, and locks body scroll while open.

```tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/shared/constants/nav-items";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="font-sans text-label uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen ? (
        <div id="mobile-nav-panel" className="fixed inset-0 z-40 bg-bone px-6 pt-28">
          <nav aria-label="Primary">
            <ul className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-h3 font-normal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/shared/layout/site-header.tsx`**

Absolute rather than fixed, so it sits over the hero's bone ground without covering content further down.

```tsx
import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Wordmark } from "@/shared/ui/wordmark";
import { PrimaryNav } from "./primary-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="flex items-center justify-between py-8">
        <Link href="/" aria-label="BESA Private Office, home">
          <Wordmark />
        </Link>
        <PrimaryNav />
        <MobileNav />
      </Container>
    </header>
  );
}
```

- [ ] **Step 4: Create `src/shared/layout/site-footer.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Wordmark } from "@/shared/ui/wordmark";
import { SITE } from "@/data/site";
import { NAV_ITEMS, LEGAL_NAV_ITEMS } from "@/shared/constants/nav-items";

export function SiteFooter() {
  return (
    <footer className="bg-moss text-bone">
      <Container className="grid gap-12 py-20 md:grid-cols-3">
        <Wordmark tone="bone" className="items-start" />

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="font-sans text-label uppercase hover:opacity-70">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col gap-3 font-sans text-label uppercase not-italic">
          <span>{SITE.city}</span>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:opacity-70">
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="hover:opacity-70 lowercase">
            {SITE.email}
          </a>
        </address>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-bone/20 py-8 font-sans text-label uppercase md:flex-row md:justify-between">
        <span>&copy; {SITE.name} {SITE.tagline}. All rights reserved.</span>
        <ul className="flex gap-8">
          {LEGAL_NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="hover:opacity-70">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
```

The copyright year is intentionally omitted rather than computed. `new Date()` in a Server Component bakes the build year into static HTML, which then silently goes stale.

- [ ] **Step 5: Wire chrome into `src/app/layout.tsx`**

Add these imports beside the existing ones:

```tsx
import { SiteHeader } from "@/shared/layout/site-header";
import { SiteFooter } from "@/shared/layout/site-footer";
```

Replace the `<body>` contents:

```tsx
      <body className="flex min-h-full flex-col bg-bone text-ink">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
```

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all clean.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: site header, primary and mobile navigation, footer"
```

---

### Task 10: The home hero

**Files:**
- Create: `src/features/home/components/hero.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `HOME_HERO`, `Container`, `Section`, `Eyebrow`, `Heading`, `Text`, `Button`, `ImageFrame`.
- Produces: `<Hero />`, taking no props.

- [ ] **Step 1: Create `src/features/home/components/hero.tsx`**

Server Component. Two-column grid at `lg`, stacking image-first below it. The arch image is oversized and pulled up past the copy column, following the reference imagery.

```tsx
import { HOME_HERO } from "@/data/home";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Eyebrow } from "@/shared/ui/eyebrow";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

export function Hero() {
  const { eyebrow, heading, lead, cta, image } = HOME_HERO;

  return (
    <Section spacing="none" className="overflow-hidden">
      <Container className="grid items-center gap-14 pt-36 pb-20 lg:grid-cols-12 lg:gap-16 lg:pt-44 lg:pb-32">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" size="display" className="mt-8 text-balance">
            {heading}
          </Heading>
          <Text size="lead" className="mt-8 max-w-md">
            {lead}
          </Text>
          <Button href={cta.href} className="mt-12">
            {cta.label}
          </Button>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 lg:-mt-16">
          <ImageFrame
            src={image.src}
            alt={image.alt}
            shape="arch"
            ratio="arch"
            isPriority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="lg:ml-auto lg:max-w-[46rem]"
          />
        </div>
      </Container>
    </Section>
  );
}
```

The hero deliberately does not use `Reveal`. Above-the-fold content appears immediately.

- [ ] **Step 2: Replace `src/app/page.tsx`**

The page holds a metadata export and composition only, per the global constraints.

```tsx
import { Hero } from "@/features/home/components/hero";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
    </main>
  );
}
```

The title comes from the root layout, so no page-level `metadata` export is needed here.

- [ ] **Step 3: Verify it builds**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all clean, and the build route table shows `/` as static.

- [ ] **Step 4: Verify it renders**

```bash
npm run dev
```

Open `http://localhost:3000` and confirm every one of these:

- Wordmark reads BESA over PRIVATE OFFICE, letterspaced, top left.
- Navigation shows five items at desktop width, and collapses to a Menu button below 1024px.
- The heading renders in Cormorant Garamond, not a fallback serif. Compare against the Inter body text; if they look like the same family, the `@theme inline` font wiring is broken.
- The hero photograph loads from Pexels and is masked into an arch with a rounded base.
- The Our Services button is solid ink and turns moss on hover.
- Nothing scrolls horizontally at 375px width.
- The footer is a moss band with an inverted wordmark.

- [ ] **Step 5: Verify the hero image is not lazy-loaded**

In devtools, inspect the hero `<img>`. Expected: `loading="eager"` and `fetchpriority="high"`, and no `loading="lazy"`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: home page hero with arch-masked photography"
```

---

## Notes carried forward

These are recorded in the spec as open questions and are not blocked by this plan:

1. `SITE_URL` in `src/shared/constants/site.ts` is a placeholder. `metadataBase`, `sitemap.ts`, `robots.ts` and `opengraph-image.tsx` are deliberately deferred until the real domain is known, because `metadataBase` with a wrong origin produces silently wrong Open Graph URLs.
2. The phone number and email in `src/data/site.ts` come from the client mockup and are unconfirmed.
3. The hero photograph is a Pexels placeholder and must be replaced with licensed photography before launch.
4. The rewritten copy needs the client's approval. Changing the words touches `src/data/home.ts` only.
5. Remaining home sections (Who we support, Services band, Our approach) and the inner page content are follow-on work using these same primitives. `Reveal` exists and is unused until then.
