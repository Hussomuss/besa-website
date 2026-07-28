# Nav Menu Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The open nav menu becomes a distributed full-height index with a moss-toned masked sprig cropped into the bottom-right corner and a veil + staggered-rise open animation, per `docs/superpowers/specs/2026-07-28-nav-menu-panel-design.md`.

**Architecture:** All work lands in one client component, `src/shared/layout/nav-menu.tsx`, plus one new static asset, `public/shapes/moss-sprig.svg`. The sprig is a CSS-masked div painted with the moss token (the `mask-shape` utility + `bg-moss`), following the existing `branch-backdrop.tsx` pattern. The animation is a pure CSS class toggle on a permanently-mounted panel: `visible/invisible` + opacity, with per-row `transition-delay` for the stagger.

**Tech Stack:** Next 16 (App Router), React 19, Tailwind CSS v4 (tokens in the `@theme` block of `src/app/globals.css`), pnpm.

## Global Constraints

- Package manager is **pnpm only**. Never run `npm install`; never create `package-lock.json`.
- **Never** delete `.next` and **never** start a dev server. The user runs their own at `http://localhost:3001` (`:3000` is a different app — checking there gives false results). Visual checks happen in the user's browser or are deferred to the user.
- No hardcoded brand colours or font sizes — only tokens (`bg-moss`, `bg-bone`, `text-ink`, `text-h2`, `text-h3`, `--ease-editorial`, `--header-height` all already exist).
- No user-facing string in a component; nav labels stay in `src/shared/constants/nav-items.ts` (unchanged).
- No eyebrow labels; no hairline rules/dividers — space, tone or scale separate things.
- Mobile first: unprefixed classes are the phone layout; `lg:` adjusts upward.
- Filenames kebab-case. No new barrels.
- There is no test runner in this repo. Each task's verify cycle is: `pnpm exec tsc --noEmit` and `pnpm lint`, both clean, plus the visual notes listed in the task (performed against the user's running dev server, never one you start).
- This Next.js version has breaking changes vs training data. This plan touches no Next API beyond `next/link` as already used in the file; if you find yourself reaching for any other Next API, stop and read `node_modules/next/dist/docs/` first.

## File Structure

- `public/shapes/moss-sprig.svg` — **create** (Task 1). Optimised copy of the hand-drawn sprig, `viewBox="0 0 154 264"`. Sits beside the existing `branch-full.svg` / `branch-narrow.svg` masks.
- `src/shared/layout/nav-menu.tsx` — **modify** (Tasks 2–4). Layout (Task 2), sprig div (Task 3), motion (Task 4). No other file changes. The focus trap / Escape / scroll-lock effect in this file is correct and must not be edited.

---

### Task 1: The sprig asset

**Files:**
- Create: `public/shapes/moss-sprig.svg` (from `C:/Users/hussa/Downloads/5.svg`, 53,710 bytes)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: the static URL `/shapes/moss-sprig.svg` with `viewBox="0 0 154 264"` preserved — Task 3's mask div depends on both the URL and that aspect ratio (154:264).

The mask reads the file's alpha channel, so the baked-in `fill="#231F20"` values are irrelevant and must not be edited — colour comes from the token at the call site.

- [ ] **Step 1: Copy the source into the repo**

```powershell
Copy-Item "C:/Users/hussa/Downloads/5.svg" "public/shapes/moss-sprig.svg"
```

- [ ] **Step 2: Write a svgo config that preserves the viewBox**

svgo's `preset-default` removes `viewBox`, which is load-bearing: `mask-shape` sets `mask-size: 100% 100%`, and without a viewBox the drawing cannot scale to the div. Write this to the session scratchpad (NOT the repo) as `svgo.config.mjs`:

```js
export default {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: { overrides: { removeViewBox: false } },
    },
  ],
};
```

- [ ] **Step 3: Optimise in place at precision 2**

```powershell
pnpm dlx svgo --config "<scratchpad>/svgo.config.mjs" --precision 2 "public/shapes/moss-sprig.svg"
```

(Substitute `<scratchpad>` with the actual scratchpad path. The viewBox units span 0–264, so two decimals is far below visible resolution.)

- [ ] **Step 4: Verify the output**

```powershell
Select-String -Path "public/shapes/moss-sprig.svg" -Pattern 'viewBox="0 0 154 264"'
(Get-Item "public/shapes/moss-sprig.svg").Length
```

Expected: the `viewBox` match prints, and the size is well under 53,710 bytes (roughly 25–40KB). If svgo stripped the viewBox anyway, re-add `viewBox="0 0 154 264"` to the `<svg>` element by hand and re-verify.

- [ ] **Step 5: Commit**

```powershell
git add public/shapes/moss-sprig.svg
git commit -m "feat: add moss sprig mask asset"
```

---

### Task 2: The distributed index layout

**Files:**
- Modify: `src/shared/layout/nav-menu.tsx` (the panel `div` and its contents, currently lines 74–104)

**Interfaces:**
- Consumes: nothing from other tasks (independent of Task 1).
- Produces: the panel/list structure Task 3 inserts the sprig into and Task 4 animates. Task 3 relies on the panel `div` carrying `isolate overflow-hidden` and remaining `position: fixed`; Task 4 relies on the `li` structure shown below.

The five links currently stack at `gap-2` under `pt-28 lg:pt-40`. They become five equal-height rows filling the viewport below the header.

**Do not add a display class (`flex`, `grid`, …) to the panel div in this task.** The panel still uses the `hidden` attribute until Task 4, and Tailwind's preflight only guarantees `hidden` wins because no author display rule fights it. The column is built inside `Container` instead, which works because `fixed inset-0` gives the panel a definite height for `h-full` to resolve against.

- [ ] **Step 1: Replace the panel's padding and add clipping/stacking context**

In `src/shared/layout/nav-menu.tsx`, change the panel div's className:

```tsx
        className="fixed inset-0 z-40 isolate overflow-hidden bg-bone pt-[var(--header-height)] text-ink"
```

(was: `"fixed inset-0 z-40 bg-bone pt-28 text-ink lg:pt-40"`). `overflow-hidden` is for Task 3's edge-cropped sprig; `isolate` documents the stacking context its `-z-10` needs; `pt-[var(--header-height)]` replaces the eyeballed `pt-28 lg:pt-40` so the rows start exactly where the header ends.

- [ ] **Step 2: Distribute the rows**

Replace the `Container`…`</Container>` block inside the panel with:

```tsx
        {/* Container rather than a bare gutter, so the links land on the same
            vertical as the wordmark above them at every width. h-full works
            because the panel is fixed inset-0: the rows divide the space below
            the header, so a taller viewport is an airier menu. */}
        <Container className="h-full">
          <nav aria-label="Primary" className="h-full">
            <ul className="flex h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="flex flex-1 items-center">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-11 items-center font-display text-h3 font-normal lg:text-h2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
```

Changes from current code: `Container` gains `className="h-full"`, `nav` gains `className="h-full"`, `ul` swaps `gap-2` for `h-full` + safe-area bottom padding, each `li` gains `flex flex-1 items-center`. The `Link` line is character-for-character unchanged.

- [ ] **Step 3: Typecheck and lint**

```powershell
pnpm exec tsc --noEmit
pnpm lint
```

Expected: both exit clean.

- [ ] **Step 4: Visual note (user's dev server, do not start one)**

At `http://localhost:3001`, opening the menu should show five rows sharing the height below the header evenly, at phone and desktop widths; Contact clears the bottom edge. If the user isn't available to confirm, state that this check is pending — do not claim it verified.

- [ ] **Step 5: Commit**

```powershell
git add src/shared/layout/nav-menu.tsx
git commit -m "feat: distribute nav panel links down the full viewport"
```

---

### Task 3: The moss sprig

**Files:**
- Modify: `src/shared/layout/nav-menu.tsx` (imports, one module constant, one div inside the panel)

**Interfaces:**
- Consumes: `/shapes/moss-sprig.svg` from Task 1; the panel's `isolate overflow-hidden` from Task 2.
- Produces: the sprig `div` and the `SPRIG` style constant that Task 4 animates (Task 4 replaces this div's className wholesale; only the element and constant need to exist).

- [ ] **Step 1: Add the type import and mask constant**

At the top of `src/shared/layout/nav-menu.tsx`, extend the React import and add the constant after the imports:

```tsx
import { useEffect, useRef, useState, type CSSProperties } from "react";
```

```tsx
/* Painted via mask + bg-moss, exactly as BranchBackdrop documents: inline SVG
   would put ~30KB of traced path data in every page, <img> could not take the
   token. The sprig is moss because the theme says moss, not the file. */
const SPRIG: CSSProperties = {
  "--shape-mask": "url(/shapes/moss-sprig.svg)",
} as CSSProperties;
```

- [ ] **Step 2: Insert the sprig div**

Inside the panel div, immediately **before** `<Container className="h-full">`:

```tsx
        {/* Pressed into the corner: translate crops the stems off the page
            edge, and its percentages resolve against the sprig's own box, so
            the crop survives a resize. Fine line work, so the last links can
            pass over it on a phone and stay legible. */}
        <div
          aria-hidden
          style={SPRIG}
          className="mask-shape pointer-events-none absolute right-0 bottom-0 -z-10 aspect-[154/264] h-[38vh] translate-x-[8%] translate-y-[10%] bg-moss lg:h-[55vh]"
        />
```

- [ ] **Step 3: Typecheck and lint**

```powershell
pnpm exec tsc --noEmit
pnpm lint
```

Expected: both exit clean.

- [ ] **Step 4: Visual note (user's dev server, do not start one)**

At `http://localhost:3001` with the menu open: a moss-coloured hand-drawn sprig sits bottom-right, stems running off the edge, under the link text, no scrollbars introduced. The `8% / 10%` crop and `38vh / 55vh` heights are the spec's starting values — the user tunes them by eye; expect a possible adjustment round. If it cannot be confirmed now, say the check is pending.

- [ ] **Step 5: Commit**

```powershell
git add src/shared/layout/nav-menu.tsx
git commit -m "feat: press a moss sprig into the nav panel corner"
```

---

### Task 4: The veil + staggered rise

**Files:**
- Modify: `src/shared/layout/nav-menu.tsx` (panel visibility mechanics and animation classes; the focus-trap effect is untouched)

**Interfaces:**
- Consumes: the structure from Tasks 2–3 (panel div, row `li`s, sprig div, `SPRIG` constant).
- Produces: the final component. Nothing further consumes it.

The panel stays mounted permanently. `hidden={!isOpen}` is replaced by class-swapped `visibility` + opacity — `visibility: hidden` removes the closed panel from tab order and the accessibility tree exactly as the `hidden` attribute did, and because `visibility` is listed in the transition it flips only after the close fade. All closed-state resets carry `delay-200 duration-0`, so during the 200ms close fade nothing inside the panel visibly changes; rows and sprig snap back to their pre-open state only after the panel is already invisible, ready to stagger again on the next open.

Timing (from the spec): panel fade-in 300ms; rows rise `translate-y-4 → 0` over 500ms on `ease-editorial` (Tailwind generates this utility from the `--ease-editorial` theme token), staggered `60 + 40 × row` ms; sprig eases in last from 260ms; close is one 200ms fade. `motion-reduce` strips every translate; fades remain.

- [ ] **Step 1: Rewrite the component's return block**

Replace the entire file content of `src/shared/layout/nav-menu.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NAV_ITEMS } from "@/shared/constants/nav-items";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/container";

/* Painted via mask + bg-moss, exactly as BranchBackdrop documents: inline SVG
   would put ~30KB of traced path data in every page, <img> could not take the
   token. The sprig is moss because the theme says moss, not the file. */
const SPRIG: CSSProperties = {
  "--shape-mask": "url(/shapes/moss-sprig.svg)",
} as CSSProperties;

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const close = () => {
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    /**
     * The panel is fixed over the page, so without this Tab walks straight out
     * of it into the hero behind. The trigger is part of the cycle because it
     * sits above the panel and acts as the Close control.
     */
    const focusable = () => [
      triggerRef.current,
      ...Array.from(panelRef.current?.querySelectorAll("a[href]") ?? []),
    ].filter((node): node is HTMLElement => node !== null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = focusable();
      if (nodes.length === 0) return;

      const current = nodes.indexOf(document.activeElement as HTMLElement);
      const step = event.shiftKey ? -1 : 1;
      const next = (current + step + nodes.length) % nodes.length;

      event.preventDefault();
      nodes[next].focus();
    };

    panelRef.current?.focus();
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="absolute top-0 right-[var(--menu-right)] flex h-[var(--header-height)] items-center">
      {/* -mr-3 with px-3 buys a 44px hit area while keeping the glyphs
          optically flush with the container gutter. */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="nav-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 -mr-3 inline-flex min-h-11 min-w-11 items-center justify-end px-3 font-sans text-nav font-semibold uppercase"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Always mounted, so aria-controls never dangles and the close fade has
          something to run on. visibility rides the transition: it flips only
          after the fade, and while hidden the panel is out of the tab order
          and the accessibility tree, exactly as the hidden attribute was.
          Closed-state children reset on delay-200 duration-0 — silently, one
          fade after the panel has gone — so every open staggers afresh. */}
      <div
        ref={panelRef}
        id="nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        className={cn(
          "fixed inset-0 z-40 isolate overflow-hidden bg-bone pt-[var(--header-height)] text-ink transition-[opacity,visibility]",
          isOpen ? "visible opacity-100 duration-300" : "invisible opacity-0 duration-200",
        )}
      >
        {/* Pressed into the corner: translate crops the stems off the page
            edge, and its percentages resolve against the sprig's own box, so
            the crop survives a resize. Fine line work, so the last links can
            pass over it on a phone and stay legible. It arrives last and from
            slightly lower, like the rows. */}
        <div
          aria-hidden
          style={SPRIG}
          className={cn(
            "mask-shape pointer-events-none absolute right-0 bottom-0 -z-10 aspect-[154/264] h-[38vh] translate-x-[8%] bg-moss transition-[translate,opacity] lg:h-[55vh]",
            isOpen
              ? "translate-y-[10%] opacity-100 delay-[260ms] duration-700 ease-editorial"
              : "translate-y-[14%] opacity-0 delay-200 duration-0 motion-reduce:translate-y-[10%]",
          )}
        />
        {/* Container rather than a bare gutter, so the links land on the same
            vertical as the wordmark above them at every width. h-full works
            because the panel is fixed inset-0: the rows divide the space below
            the header, so a taller viewport is an airier menu. */}
        <Container className="h-full">
          <nav aria-label="Primary" className="h-full">
            <ul className="flex h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.label} className="flex flex-1 items-center">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    /* The one inline style: the stagger is arithmetic on the
                       row index, which no static class can express. */
                    style={{
                      transitionDelay: isOpen ? `${60 + index * 40}ms` : "200ms",
                    }}
                    className={cn(
                      "inline-flex min-h-11 items-center font-display text-h3 font-normal transition-[translate,opacity] lg:text-h2",
                      isOpen
                        ? "translate-y-0 opacity-100 duration-500 ease-editorial"
                        : "translate-y-4 opacity-0 duration-0 motion-reduce:translate-y-0",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </div>
  );
}
```

Every part of this block other than the animation classes, the sprig div, the `cn` import and the row `style` attribute is existing code and must land character-for-character as shown — in particular the focus-trap effect body.

- [ ] **Step 2: Typecheck and lint**

```powershell
pnpm exec tsc --noEmit
pnpm lint
```

Expected: both exit clean.

- [ ] **Step 3: Visual + keyboard notes (user's dev server, do not start one)**

At `http://localhost:3001`:
- Open: bone veil fades in ~300ms, rows rise one after another top to bottom, sprig arrives last.
- Close: one fast fade, no stagger out. Reopen immediately: the stagger replays.
- Keyboard: Tab cycles Close + five links and nothing behind the panel; Escape closes and returns focus to the trigger; the page behind cannot scroll while open.
- With reduced motion enabled (Windows: Settings → Accessibility → Visual effects → Animation effects off): fades only, nothing translates.

If these cannot be confirmed now, report them as pending — never as verified.

- [ ] **Step 4: Commit**

```powershell
git add src/shared/layout/nav-menu.tsx
git commit -m "feat: veil and staggered rise for the nav panel"
```

---

## Post-plan checks

- All spec "must not change" items hold by construction: the focus-trap effect is byte-identical, aria wiring and trigger label unchanged, copy still in `nav-items.ts`, no new components.
- The spec's verification checklist maps: rows/safe-area → Task 2 step 4; sprig/scrollbars → Task 3 step 4; motion, keyboard, reduced motion → Task 4 step 3; `tsc`/`eslint` → every task.
- Expect one tuning round with the user on the sprig's crop percentages and heights after Task 4 — the spec calls these "tuned visually at implementation".
