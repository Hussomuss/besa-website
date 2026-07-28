# Large-screen scaling

Date: 2026-07-28

## The problem

The site has two designed widths: phone and `lg` (1024px). Breakpoint usage
across `src/` is 108 `lg:`, 16 `md:`, 5 `sm:` and exactly one `xl:` — a padding
bump on the who-we-support copy tile. Above `lg` nothing recomposes, and the
quantities that do keep growing stop at five different widths that were never
reconciled with each other:

| Quantity | Stops at | Frozen value |
| --- | --- | --- |
| `--container-page` | 1536px | 1408px content column |
| Container gutters (`lg:px-16`) | 1024px | 64px |
| Section rhythm (`lg:py-36`) | 1024px | 144px |
| `--text-lead` | ~1000px | 19px |
| `--text-h3` | ~1370px | 30px |
| `--text-display` | ~1540px | 72px |
| `--text-h2` | ~1600px | 48px |
| `--text-body` | never grows | 16px |
| `--header-height` | never grows | 104px |

Past 1536 the page is static and the surplus becomes empty gutter: 192px per
side at 1920, 512px at 2560, 952px at 3440.

The spread happened because each `clamp()` restates its own endpoints. Eight
declarations, eight chances to drift, and they drifted.

## The decision

One continuous ramp, no new breakpoint. The composition still switches once, at
`lg`; what becomes continuous is the *scale* — container, gutters, rhythm and
every type token grow together and reach their ceiling at the same width.

The ramp runs **375px → 1792px (112rem)**. At 1792 and above the page is at full
size: 1600px of content inside a 1792px container, with the remainder becoming
outer margin. On a 1920 monitor that reads as 64px outer margin plus a 96px
gutter — 160px of total side space, and 1600px of content.

```
1920 viewport
┌──────────────────────────────────────────────────┐
│  64  │  96  │      content 1600px      │  96  │  64  │
│ outer│gutter│                          │gutter│ outer│
└──────────────────────────────────────────────────┘
        └────────── container 1792 ──────────┘
```

Content is 1600px at every viewport from 1792 up; beyond that only the outer
margin grows (384px per side at 2560, 824px at 3440).

### Why 1792 and not 1920

`max-w-page` is border-box, so 1600px of content at 1920 can be built as
`1920 − 160` gutter or `1792 − 96` gutter. Both land on the same number at the
top; they differ on the way up. A 160px gutter needs a ramp steep enough to put
126px gutters at 1536, where the tuned value today is 64px. A 96px gutter puts
83px there. Routing the surplus into outer margin rather than gutter keeps the
middle of the ramp near the values already signed off.

### The one regression

At **1536** the content column narrows from 1408 to 1370 (−38px). This is
unavoidable, not a tuning error: today's curve is discontinuous — the container
hard-caps at 1536 while the gutters froze back at 1024 — so any continuous ramp
that reaches 1600 at the top must sit below today's line at 1536. Type and
vertical air grow there instead, so width is traded for scale rather than lost.

1536 is worth naming because it is both a real monitor and a 1920 running at
Windows' default 125% scaling.

## Mechanism

One carrier, declared once, read by everything:

```css
/* Progress along the ramp, carried as a length from 0 to 10rem. 375px is the
   narrowest phone we design for; 112rem is the top, and is also where the
   container caps. Every token below reads this. Nothing else restates the
   endpoints — that duplication is what produced the spread this replaces. */
--ramp: clamp(0rem, (100vw - 23.4375rem) * 0.11292, 10rem);
```

Every scaling token is then `calc(min + var(--ramp) * factor)`, where
`factor = (max − min) / 10rem`.

The carrier is a length rather than a 0–1 number because `calc()` cannot divide
a length by a length; a genuinely unitless progress variable requires
`tan(atan2())` tricks. Length × number is valid and plain, and yields the same
single source of truth.

**Verified against Tailwind's own compiler** (v4, via `compile()` from
`tailwindcss/dist/lib.mjs`), because two things about this were worth checking
rather than assuming:

- `--ramp` is not named by any utility, so it had to survive theme pruning. It
  does, along with `--gutter`, `--header-height` and `--container-page`. No
  `@theme static` is needed; the plain `@theme` block is enough.
- `-mx-[var(--gutter)]` negates correctly, emitting
  `margin-inline: calc(var(--gutter) * -1)`. The short form is safe; there is no
  need for an explicit `mx-[calc(var(--gutter)*-1)]`.
- `px-[var(--gutter)]`, `scroll-px-[var(--gutter)]`,
  `py-[calc(6rem+var(--ramp)*0.4)]` and
  `min-h-[min(calc(100svh-var(--header-height)),60rem)]` all compile to the
  expected declarations.

## Tokens

Minimums are today's **computed value at 375px**, not the clamp floors. This
matters: `--text-display`'s floor is `2.25rem`, but it renders 40.5px at 375
because that clamp entered its linear region back at ~207px viewport. Using the
floors would have shrunk the phone.

Factors are chosen so each curve passes through today's value at 375 *and* at
1024, rather than merely starting and ending in the right place. That is what
keeps the phone and the laptop looking like what was already signed off.

| Token | min (375) | factor | max (1792) | 375 | 768 | 1024 | 1536 | 1792+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `--gutter` | `1.5rem` | 0.45 | `6rem` | 24 *(24)* | 44 *(40)* | 57 *(64)* | 83 *(64)* | **96** |
| `--header-height` | `6.5rem` | 0.15 | `8rem` | 104 *(104)* | 111 | 115 | 124 | **128** |
| `--space-section` | `5rem` | 0.875 | `13.75rem` | 80 *(80)* | 119 *(112)* | 144 *(144)* | 195 | **220** |
| `--space-section-tight` | `3.5rem` | 0.55 | `9rem` | 56 *(56)* | 80 *(80)* | 96 | 128 | **144** |
| `--text-display` | `2.533rem` | 0.2967 | `5.5rem` | 40.5 *(40.5)* | 54 | 62 *(58)* | 79 *(72)* | **88** |
| `--text-h2` | `1.89rem` | 0.186 | `3.75rem` | 30.2 *(30.2)* | 38 | 44 *(40)* | 55 *(48)* | **60** |
| `--text-h3` | `1.378rem` | 0.0872 | `2.25rem` | 22.0 *(22.0)* | 26 | 28 *(27)* | 33 *(30)* | **36** |
| `--text-lead` | `1.07rem` | 0.0305 | `1.375rem` | 17.1 *(17.1)* | 18.5 | 19.4 *(19)* | 21 *(19)* | **22** |
| `--text-body` | `1rem` | 0.0125 | `1.125rem` | 16 *(16)* | 16.6 | 16.9 *(16)* | 17.6 *(16)* | **18** |
| `--text-label` | `0.6875rem` | 0.0125 | `0.8125rem` | 11 *(11)* | 11.6 | 11.9 *(11)* | 12.6 *(11)* | **13** |

Values in px. Parenthesised values are today's, where they differ or where the
match is the point.

`--container-page` changes from `96rem` to **`112rem`** and does not ramp — it is
a cap, and below it the container is full-width anyway.

Paired `--text-*--line-height` and `--text-*--letter-spacing` are unchanged.
Letter-spacing is in `em` and scales for free.

## Steps that remain steps

Two things stay discrete, and both are legitimate:

- `Heading`'s `lg:font-light`. Cormorant is loaded at static weights `["300",
  "400"]` (`layout.tsx:10`), so there is nothing to interpolate.
- `Heading`'s `lg:leading-[1.06]` on `display`. Line-height is unitless, and a
  length carrier cannot drive a unitless ratio.

Both are noted in the component so the next reader does not "fix" them.

## Component changes

### Correctness — these break if not done

**`faq.tsx:17`** hardcodes `4rem` to match `lg:px-16`:

```
"lg:-ml-[calc(4rem+max(0px,(100vw-var(--container-page))/2))]"
```

The moment the gutter ramps, that literal desyncs and the FAQ image stops
meeting the viewport edge. It becomes:

```
"lg:-ml-[calc(var(--gutter)+max(0px,(100vw-var(--container-page))/2))]"
```

**`hero.tsx:30`** — cap the hero band:

```
min-h-[min(calc(100svh-var(--header-height)),60rem)]
```

The cap bites only above ~1090px of viewport height, so every 1080p screen is
untouched; a 1440-tall monitor stops at 960px instead of 1312px. This
deliberately revises the "fills exactly one viewport" intent recorded in the
`--header-height` comment in `globals.css`; update that comment to say the hero
fills one viewport up to a 60rem ceiling.

### The gutter rule

A full-bleed child inside `Container` negates `--gutter`, never a literal. Every
current instance of `-mx-6 md:-mx-10 lg:mx-0` becomes
`-mx-[var(--gutter)] lg:mx-0`, which also removes the `md:` variant outright.

| Site | Today | Becomes |
| --- | --- | --- |
| `container.tsx:23` | `px-6 md:px-10 lg:px-16` | `px-[var(--gutter)]` |
| `section.tsx:13` | `py-14 md:py-20` | `py-[var(--space-section-tight)]` |
| `section.tsx:14` | `py-20 md:py-28 lg:py-36` | `py-[var(--space-section)]` |
| `faq.tsx:29` | `pt-20 md:pt-28 lg:pt-36` | `pt-[var(--space-section)]` |
| `faq.tsx:57` | `pb-20 md:pb-28 lg:pb-36` | `pb-[var(--space-section)]` |
| `who-we-support.tsx:41` | `-mx-6 md:-mx-10 lg:mx-0` | `-mx-[var(--gutter)] lg:mx-0` |
| `who-we-support.tsx:43` | `mx-6 md:mx-10 lg:mx-0` | `mx-[var(--gutter)] lg:mx-0` |
| `services-band.tsx:42` | `-mx-6 md:-mx-10 lg:mx-0` | `-mx-[var(--gutter)] lg:mx-0` |
| `services-band.tsx:42` | `px-6 md:px-10 lg:px-0` | `px-[var(--gutter)] lg:px-0` |
| `services-band.tsx:42` | `scroll-px-6 md:scroll-px-10` | `scroll-px-[var(--gutter)]` |
| `error.tsx:13`, `not-found.tsx:6` | `px-6` | `px-[var(--gutter)]` |
| `mobile-nav.tsx:82` | `px-6` | `px-[var(--gutter)]` |

This removes **eleven of the sixteen** `md:` utilities in the codebase. The five
that remain are all composition or weight steps, which is what `md:` should be
reserved for: `md:font-light` (`heading.tsx:12`), `md:grid-cols-3`
(`site-footer.tsx:21`), and `md:flex-row md:justify-between md:items-center`
(`site-footer.tsx:53`).

### Bespoke vertical padding

These carry their own curves today and keep them, ramped rather than stepped:

| Site | Today | Becomes | 375 → 1792 |
| --- | --- | --- | --- |
| `hero.tsx:30` | `pt-16 pb-16 lg:py-24` | `py-[calc(4rem+var(--ramp)*0.44)]` | 64 → 134 |
| `services-band.tsx:14` | `py-24 lg:py-28` | `py-[calc(6rem+var(--ramp)*0.4)]` | 96 → 136 |
| `site-footer.tsx:21` | `py-20` | `py-[calc(5rem+var(--ramp)*0.3)]` | 80 → 128 |
| `(legal)/layout.tsx:9` | `py-32` | `py-[calc(8rem+var(--ramp)*0.4)]` | 128 → 192 |
| `error.tsx:13`, `not-found.tsx:6` | `py-32` | same as legal | 128 → 192 |
| `accordion.tsx:43` | `py-8 lg:py-10` | `py-[calc(2rem+var(--ramp)*0.1)]` | 32 → 48 |
| `who-we-support.tsx:43` | `px-7 md:px-9 lg:px-10 xl:px-12` | `px-[calc(1.75rem+var(--ramp)*0.165)]` | 28 → 54 |
| `who-we-support.tsx:43` | `py-11` | `py-[calc(2.75rem+var(--ramp)*0.175)]` | 44 → 72 |
| `who-we-support.tsx:41` | `lg:min-h-[40rem]` | `lg:min-h-[calc(35.4rem+var(--ramp))]` | 40rem at lg → 45.4rem |
| `mobile-nav.tsx:82` | `pt-28` | `pt-[calc(var(--header-height)+0.5rem)]` | tracks the header |

The `who-we-support` line is the codebase's only `xl:` utility, and it
disappears here.

`services-band.tsx` stays bespoke rather than adopting `spacing="tight"`: its
current curve (96 → 112) is deliberately different from both shared variants,
and folding it into `tight` would cut its mobile padding from 96px to 56px.
Whether the moss band should join the shared rhythm is a separate design call,
not part of this change.

### Measure constraints

`ch`-based caps ride the ramp for free, because they are a function of
font-size. No change at `our-approach.tsx:46`, `accordion.tsx:84`,
`container.tsx:6`, `closing-enquiry.tsx:20`, or the lab files.

`rem`-based caps do not scale and would shrink relative to everything around
them. Each becomes `ch` if it holds running text, and stays on the ramp if it
sizes a box.

`ch` resolves against the *element's own* font-size, so the conversion differs
per element — a `max-w` on a `Text size="lead"` converts against 17.1px, one on
an h3 `Heading` against Cormorant at 22px. The values below are derived to
preserve today's rendered width at 375px, assuming Inter's `0` advance at
~0.55em and Cormorant's at ~0.5em. **Read the exact figures off the browser once
during implementation and commit those** — the advance is a font metric, not
something to be confident about from arithmetic.

| Site | Element | Today | Becomes |
| --- | --- | --- | --- |
| `hero.tsx:43` | `Text` lead | `max-w-[26rem]` | `max-w-[44ch]` |
| `who-we-support.tsx:57` | `Text` body | `max-w-md` | `max-w-[51ch]` |
| `services-band.tsx:28` | `Text` lead | `max-w-md` | `max-w-[48ch]` |
| `service-card.tsx:33` | `Heading` h3 | `max-w-xs` | `max-w-[29ch]` |
| `service-card.tsx:37` | `Text` body | `max-w-xs` | `max-w-[36ch]` |

`services-band.tsx:15` is the exception: `max-w-xl` sits on a `div` wrapping both
a `Heading` and a `Text`, so it constrains a box rather than a line, and `ch`
there would resolve against the inherited body font rather than either child. It
stays in `rem` and joins the ramp:
`max-w-[calc(36rem+var(--ramp)*0.8)]` — 576 → 704px.

At the top of the ramp several `ch` caps stop binding — `max-w-[52ch]` at 18px
is 936px inside a `col-span-6` of 784px, so the column governs. That is correct
behaviour, not a bug: those caps are mid-range constraints, and the grid takes
over on desktop.

### `sizes` recuts

All of these encode the old 1408px content column and the 1536 cap. The new
column is 1600px with unchanged gaps.

| Site | Today | Becomes |
| --- | --- | --- |
| `who-we-support.tsx:68` | `(min-width: 1536px) 465px, (min-width: 1024px) 31vw, 33vw` | `(min-width: 1792px) 530px, (min-width: 1024px) 30vw, 33vw` |
| `who-we-support.tsx:78` | `(min-width: 1536px) 347px, (min-width: 1024px) 23vw, 33vw` | `(min-width: 1792px) 395px, (min-width: 1024px) 22vw, 33vw` |
| `service-card.tsx:29` | `(min-width: 1536px) 456px, (min-width: 1024px) 30vw, (min-width: 640px) 58vw, 78vw` | `(min-width: 1792px) 512px, (min-width: 1024px) 28vw, (min-width: 640px) 58vw, 78vw` |
| `faq.tsx:51` | `(min-width: 1536px) 830px, (min-width: 1024px) 45vw, 100vw` | `(min-width: 1792px) 1130px, (min-width: 1024px) 45vw, 100vw` |

Derivations, so these can be re-derived rather than re-guessed:

- who-we-support tiles sit in a 12-column grid at `gap-1.5` (6px). At a 1600
  inner width, one column is `(1600 − 11×6)/12 = 127.8px`; `col-span-4` is
  `4×127.8 + 3×6 = 529px`, `col-span-3` is `3×127.8 + 2×6 = 395px`.
- service cards are `lg:grid-cols-3` at `gap-8` (32px): `(1600 − 64)/3 = 512px`.
- the FAQ image is `col-span-5` at `gap-x-8` bled left by
  `gutter + (100vw − container)/2`, so it keeps growing past the ramp top: 744px
  at 1792, 808px at 1920, 1128px at 2560. Today's `830px` was cut for ~1920 and
  already under-serves ultrawides; 1130px covers 2560.

**`hero.tsx:20` is correct as-is.** `50vw` is genuinely what the photo occupies:
`lg:w-1/2` spans `50vw → 100vw`, and a centred container's midline *is* `50vw` at
every viewport, so the photo's left edge lands exactly on the col-6/7 boundary
whether the container is capped or not. The gap between the copy column and the
photo holds at a constant 133px from 1792 through 3440.

## Rules to add to AGENTS.md

Under Design rules:

> **One ramp, no desktop breakpoints.** Size is continuous: `--ramp` carries
> progress from 375px to 112rem, and every spacing and type token reads it.
> Composition still switches once, at `lg`. Do not add `xl:` or `2xl:` — if
> something needs to be bigger on a large screen, it needs to be on the ramp.
>
> **Gutters are a token.** A full-bleed child inside `Container` negates
> `--gutter`, never a literal. A `max-w` holding running text is written in
> `ch`; a `max-w` sizing a box reads the ramp.

## Verification

- `pnpm lint` and `pnpm build` clean.
- Theme pruning and the arbitrary-value forms are already verified against
  Tailwind's compiler (see Mechanism); no need to re-check those.
- Read the real `ch` advances off the browser and commit the measured values.
- Check the computed values at 375, 768, 1024, 1536 and 1920 against the token
  table above. 375, 768 and 1024 must match today's rendering; that is the
  regression test for "mobile designed".
- Visual pass at 1920 and at a 1440-tall viewport for the hero cap.

No dev server is started as part of this work.

## Out of scope

- Any change to composition. All 108 `lg:` layout switches stay where they are.
- Whether the moss services band should join the shared vertical rhythm.
- The `lab/` route's own `lab.css`, which is a component sandbox rather than
  site chrome.
