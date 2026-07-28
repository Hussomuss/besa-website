# Button system — filled by default, one gesture, typed grounds

Supersedes the button paragraph in `AGENTS.md` and section 5 of
`2026-07-27-besa-website-design.md`.

## 1. What this is

A replacement for `src/shared/ui/button.tsx`. The button becomes filled at
rest, gains three axes of configuration (emphasis, colour, ground), and gets a
type-level guard that makes an illegible combination fail to compile.

It stays one component with one gesture. Nothing here licenses a second button.

### Why

The current button is a hairline that fills on hover. Hover does not exist on a
touch screen, so a phone visitor sees only its resting half — the button never
completes. Worse, iOS latches `:hover` after a tap until the next touch
elsewhere, so on the occasions the fill does fire it stays lit.

The hero already pays for this. Its button carries four override classes
(`max-lg:[--wipe-fill:…]`, `max-lg:border-bone/40`, `max-lg:text-bone`,
`max-lg:hover:text-ink`) purely because a hairline disappears into a
photograph. That is `AGENTS.md`'s "never restyle a button inline" rule being
broken at the most visible call site on the site, and it is a symptom rather
than a lapse: the component cannot express a light button on a dark ground.

## 2. The gesture

One gesture, every emphasis, every ground. A plane of the partner colour rises
from the baseline.

| | Value |
|---|---|
| Property | `transform: scaleY(0 → 1)`, `transform-origin: bottom` |
| Curve | `cubic-bezier(0.33, 1, 0.68, 1)` — "Firm", medium stiffness, critical damping |
| Duration | `440ms` |
| Label lift | `translateY(-2px)`, `520ms`, `cubic-bezier(0.34, 1.5, 0.64, 1)`, `70ms` delay |

### 2.1 Why the plane does not overshoot

The plane is clipped by the button. A curve that passes `scaleY(1)` arrives
early and holds against the top edge — the overshoot is not rendered. On the
plane, stiffness shows in how fast it leaves the baseline and damping shows
only in the approach, so a sprung curve buys nothing and costs legibility of
intent.

The label is not clipped. It is therefore the only place in the gesture where a
spring survives, which is what the lift is for.

### 2.2 Why the lift lags

The 70ms delay is the difference between the plane appearing to push the label
and the two appearing to be wired to the same switch. Without it the effect
reads as a glitch; with it, as contact.

### 2.3 Partner colours, not opposites

The rise colour is the fill's tonal partner: `ink ↔ moss`, `bone ↔ sand`. Both
members of a pair take the same label colour, so **the label never changes
colour mid-gesture**.

This deletes the reduced-motion trap the current button has to gate against.
Today `globals.css` stops the wipe's transform under reduced motion while
`button.tsx` must separately stop the colour transition, or the label crawls
from ink to bone over half a second on an already-ink ground. With no colour
animation there is nothing left to desynchronise.

## 3. API

```ts
type Emphasis = "contained" | "outline";
type Colour = "ink" | "moss" | "sand" | "bone";
type Ground = "bone" | "sand" | "moss" | "image";
type Width = "auto" | "full";
```

| Prop | Default | Notes |
|---|---|---|
| `on` | required | The ground the button sits on |
| `emphasis` | `"contained"` | |
| `colour` | follows `on` | Maximum contrast against the ground |
| `width` | `"auto"` | `full` is `w-full`, nothing else |

### 3.1 Emphasis

| | Rest | On rise |
|---|---|---|
| `contained` | filled `colour` | partner colour rises, label unchanged |
| `outline` | hairline `colour`, transparent ground | `colour` fills, label flips to ground |

`outline` is the only place a label colour transition remains, and it keeps the
existing reduced-motion gate.

**Ghost is not in scope.** A ghost that fills solid on rise is identical to
`outline` at the end of the gesture, which makes it an emphasis that differs
only at rest. If a third weight is wanted later it needs its own gesture, and
that is a separate decision.

### 3.2 Colour follows ground

Light grounds (`bone`, `sand`) default to `ink`. Dark grounds (`moss`, `image`)
default to `bone`. The default is therefore always the maximum-contrast choice,
and `colour` is only written when something other than maximum contrast is
wanted — as on the closing enquiry, which takes moss.

### 3.3 Responsive ground

`on` accepts either a `Ground` or `{ base: Ground; lg: Ground }`. Only the hero
needs the pair, and it needs it because its ground genuinely changes: below
`lg` the copy sits on the photograph under `scrim-hero`; at `lg` the photo
moves to `lg:w-1/2` and the copy column is on bone.

With the colour defaulting per ground, the hero's whole configuration is
`on={{ base: "image", lg: "bone" }}` — replacing four override classes with one
prop, and yielding bone on mobile and ink on desktop without stating either.

### 3.4 Width

`auto` is intrinsic. `full` is `w-full` and nothing else — no cap, no
breakpoint. It spans whatever container it is given, which is the five-column
copy tile on the hero, the sand copy tile on who-we-support, and the
six-column text column on the closing enquiry. Not the viewport in any of the
three.

It is a prop rather than a `className` so that the two answers stay the only
two answers, and a call site cannot quietly introduce a third width.

## 4. Rigidity

The guard is type-level. There is no runtime check and no lint rule.

### 4.1 Measured contrast

Ratios computed from the four `@theme` tokens (`bone #f7f4ef`, `sand #d9d2c7`,
`moss #495648`, `ink #2c2c2a`). `image` is treated as dark: the mobile hero
scrim holds the copy zone well below sand.

| | on bone | on sand | on moss |
|---|---|---|---|
| `ink` | 12.8:1 | 9.3:1 | **1.8:1** |
| `moss` | 7.1:1 | 5.2:1 | — |
| `sand` | **1.4:1** | — | 5.2:1 |
| `bone` | — | **1.4:1** | 7.1:1 |

Which collapses to two groups: light grounds take `ink` or `moss`; dark grounds
take `bone` or `sand`.

### 4.2 The union

```ts
type Palette =
  | { on: "bone" | "sand"; colour?: "ink" | "moss" }
  | { on: "moss" | "image"; colour?: "bone" | "sand" };
```

`<Button on="sand" colour="sand">` does not compile.

### 4.3 What this does not cover

`Section tone="moss"` with `Button on="bone"` type-checks and is wrong. Closing
that needs the ground to come from React context, which would make the button a
client component for no interactive benefit. The required `on` prop is accepted
as the cheaper guard; the desync is a known and deliberate gap.

## 5. Mobile

Three declarations that decide whether the button feels native, all currently
absent:

- `touch-action: manipulation` — removes iOS's 300ms double-tap wait
- `-webkit-tap-highlight-color: transparent` — removes Android's grey flash
  over the fill
- `user-select: none` — a long press shows the pressed state instead of
  selecting the label

Every hover rule sits behind `@media (hover: hover)`, so iOS cannot latch a
hover state after a tap. `:active` carries the whole gesture on touch.

## 6. Tokens

Added to the single `@theme` block in `globals.css`:

```css
--ease-rise: cubic-bezier(0.33, 1, 0.68, 1);
```

`--ease-editorial` stays for everything else. No new colours; the palette is
unchanged.

## 7. Call sites

| Call site | `on` | `emphasis` | `colour` | `width` |
|---|---|---|---|---|
| Hero | `{ base: "image", lg: "bone" }` | contained | default (`bone` → `ink`) | full |
| Who we support | `sand` | contained | default (`ink`) | full |
| Service card ×3 | `moss` | **outline** | default (`bone`) | auto |
| Closing enquiry | `bone` | contained | `moss` | full |
| `not-found` | `bone` | contained | default | auto |
| `error` | `bone` | contained | default | auto |

The service cards keep a hairline. Three filled bone blocks down the moss band
is too much weight for a secondary action inside a card that is already a link,
and it is the reason `outline` exists at all: one filled action per section,
outline for the repeated action inside a card.

`buttonClasses()` stays exported for the service card, which cannot nest a link.

## 8. Removals

- The `wipe` utility in `globals.css`, replaced by the rise
- `ButtonVariant` and its `default` / `inverse` entries, replaced by
  `emphasis` + `colour` + `on`
- The hero's four override classes
- `link-underline` is untouched; it is for navigation links, not actions

## 9. AGENTS.md

The "One button, site-wide" paragraph describes two variants on opposite
grounds and must be rewritten. The rule that survives is stronger and should be
stated as such: **one component, one gesture, many grounds.** Emphasis and
colour are configuration, not new buttons, and a second component or a bespoke
hover class remains forbidden.

## 10. Verification

- `npx tsc --noEmit` and `npx eslint src` clean
- A deliberately illegible combination fails to compile
- Every call site renders with no button-specific override class
- Reduced motion: plane and label snap, nothing crawls
- Checked on a touch device, not only a pointer

## 11. Open

Duration (`440ms`) and label coupling (lagged) are the defaults taken from the
lab; both are single-value changes. `/lab` keeps its Button section so they can
be retuned against the real component.
