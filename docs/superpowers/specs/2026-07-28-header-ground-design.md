# Header ground

The header becomes a wordmark and a menu button, and learns to sit over a
photograph. It is a prerequisite for `/about`, whose hero wants the full
viewport rather than the space under a band, and it lets the home hero reach
the true top edge of the screen.

## Why

Two changes, one motivating case.

The nav list is a product-site convention this site does not need. Five pages,
and a practice whose stated premise is that clients arrive by introduction. A
persistent rail of five links argues against that. Collapsing it to a menu
button at every breakpoint also deletes the `PrimaryNav` / `MobileNav`
duality — two components for one job, differing only in who is allowed to see
them.

The cost is real and is accepted deliberately: `Enquire` stops being visible in
the header. Every page already closes with an enquiry section, and the footer
carries the address, so the conversion is never more than one screen away.

The second change is that a header painted as an opaque band cannot be
overlapped. A band above a hero is a stripe cut off the top of the composition.

## The problem this design solves

`SiteHeader` renders in the root layout, which every route shares. In the App
Router a page cannot pass a prop up to its layout, so `<SiteHeader on="photo">`
is unsayable by the page that knows the answer.

And the answer is not one value per page. It varies along two axes at once.

**By breakpoint.** In `/about`'s hero the photograph breaks a bone canvas in the
centre column only, so at `lg` the header's ends sit over canvas and ink is
correct. Below `lg` the photograph is the full ground and the marks must be
bone.

**By position.** The home hero's photograph is `lg:w-1/2`, the right half. At
`lg` the wordmark stands on bone while the menu trigger stands on the
photograph — one header, two grounds, at the same moment.

## Design

### `Main` states the grounds

`src/shared/layout/main.tsx`, replacing the eight hand-written
`<main className="flex-1">`:

```tsx
type Ground = "bone" | "photo";
interface ResponsiveGround { base: Ground; lg: Ground }
type GroundValue = Ground | ResponsiveGround;

interface MainProps {
  ground: GroundValue;      // under the wordmark
  groundEnd?: GroundValue;  // under the trigger, when it differs
  className?: string;
  children?: ReactNode;
}
```

`ResponsiveGround` is the same shape as `Button`'s `on`, deliberately. That
component already solved the by-breakpoint axis once — `on={{ base: "image", lg:
"bone" }}` on the home hero, commented *"Only the hero needs this: its ground
genuinely changes at lg."* Reusing the shape means one idea and one vocabulary
rather than two.

`groundEnd` is the by-position axis, and defaults to `ground` so only the home
hero pays for it.

`ground` is required rather than defaulted, for the same reason `Button`'s `on`
is required. A default of `bone` means that forgetting the prop on a
photographic page yields ink marks on a photograph: illegible, and silently so.

The four attributes emitted — `data-ground`, `data-ground-lg`,
`data-ground-end`, `data-ground-end-lg` — omit the `-lg` pair when a ground does
not change, so a constant page needs no rule at `lg` and the base one carries
through.

The union is deliberately two values and not a colour name. `photo` describes
what the page puts under the header, not what the header should do about it.
The header decides that.

### The header paints its ends separately

`Wordmark` gains a third tone, `inherit`, which emits no colour class and lets
the mark take `currentColor`. The primitive is told to inherit, not told about
`--mark`; it keeps no knowledge of the header.

`SiteHeader` declares four properties and applies them per end:

```
[--mark:var(--color-ink)]      [--mark-shadow:none]
[--mark-end:var(--color-ink)]  [--mark-end-shadow:none]
```

The shadow is per end rather than on the header, for the same reason the colour
is: at `lg` on home the trigger needs a scrim and the wordmark must not have
one, because a scrim under ink on bone reads as a smudge.

### The wiring, in `globals.css`

```css
body:has(main[data-ground="photo"]) > header {
  position: absolute;
  inset-inline: 0;
  top: 0;
  background: transparent;
}
```

`position: absolute` takes the header out of flow, so `<main>` rises to the top
of the document on its own. The overlap needs no other change — no negative
margin on the page, no height subtracted anywhere.

This is safe **because the header is not sticky**. It passes over the top of the
document and nothing else, which is the one region whose contents the page
author knows. A sticky header would travel over arbitrary content and no static
declaration could stay true; it would force a scroll listener or a scrim over
every page.

Floating is keyed on the *base* ground alone, so it is all-or-nothing per page.
A header that changed from static to absolute at a breakpoint would reflow the
document under the reader.

Then eight rules set the four properties: two for the base grounds, four inside
`@media (width >= 64rem)` for the `-lg` overrides in both directions, and one
last rule for the open panel:

```css
body:has(main) > header:has([aria-expanded="true"]) {
  --mark: var(--color-ink);
  --mark-end: var(--color-ink);
  --mark-shadow: none;
  --mark-end-shadow: none;
}
```

The open panel lays its own bone ground under both marks — it is fixed over the
page at `z-40` while the header sits at `z-50` — so every photo treatment has to
stand down or `Close` and the wordmark vanish into it. It is written last and at
matching specificity `(0,1,3)`, so source order carries it over all the others.

A `text-shadow` rather than a plate behind the header: a plate veils the top of
every photograph in order to protect two small elements, where
`--text-shadow-scrim` buys contrast exactly where the glyphs are. That token
already exists and is documented for precisely this.

### Known limits

The model has two positions and one breakpoint. It covers the header as
designed — a mark at each end, and `lg` as the only place the site's
compositions change — but a third element in the header, or a ground that
changes at `md`, needs the model widened rather than a value added.

`groundEnd` describes the trigger's ground, not the trigger's *width*. A page
whose photograph ends part-way through the trigger would still be wrong; the
declaration assumes each end stands wholly on one thing.

### Nav consolidation

- `primary-nav.tsx` is deleted.
- `mobile-nav.tsx` becomes `nav-menu.tsx`, exporting `NavMenu`. It is no longer
  mobile-only, so the name should stop saying it is.
- The wrapper loses `lg:hidden`; the panel id goes `mobile-nav-panel` →
  `nav-panel`.
- Panel type steps up at `lg` (`text-h3 lg:text-h2`) and its contents move into
  `Container`, so the links align to the same gutter as the wordmark above them
  at every width.
- The focus trap, `Escape` handling, `aria-expanded` / `aria-controls`, the
  44px hit area and the scroll lock are unchanged. That component is already
  correct; only its audience changes.

## The home hero

`ground={{ base: "photo", lg: "bone" }}` with `groundEnd="photo"`: the
photograph reaches the true top edge at every width, and at `lg` only the
wordmark end returns to bone.

The hero's height changes from `min-h-[calc(100svh-var(--header-height))]` to
`min-h-svh`, because the header now floats on it rather than sitting above it.
`--header-height` is *reserved* as `pt-[var(--header-height)]` instead of
subtracted. Same token, and the sum is still exactly one viewport.

## What must not change

- `--header-height` keeps its current value and meaning.
- `SiteFooter`'s `<Wordmark tone="bone">` is unaffected.
- `/about`, `/services`, `/contact`, `/lab`, `(legal)`, `error.tsx` and
  `not-found.tsx` keep the bone band they have today, via `ground="bone"`.
  `/about` flips to a photographic ground when its hero is built.

## Verification

- [x] `tsc --noEmit` and `eslint` clean.
- [x] Every page renders a header, 404 included — the case a route-group
      approach would have broken.
- [x] Home emits `data-ground="photo"`, `data-ground-lg="bone"`,
      `data-ground-end="photo"`, and no `data-ground-end-lg`.
- [x] All eight rules compile into the stylesheet in source order, with the
      open-panel rule last.
- [ ] Visual: the panel opens, traps focus, closes on `Escape` and restores
      focus to the trigger, at desktop widths as well as mobile.
- [ ] Visual: `Close` and the wordmark stay legible while the panel is open on
      a photographic page.
- [ ] Visual: no page scrolls horizontally, and the home hero fills exactly one
      viewport.
